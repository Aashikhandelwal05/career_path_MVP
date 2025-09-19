"""
Career Nirvana Backend API
FastAPI application for career guidance platform with OpenRouter AI integration
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from pydantic import BaseModel
from typing import Optional, Literal
import json
import os
from typing import List, Dict, Any
import httpx
from dotenv import load_dotenv
import logging
import uuid

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Career Nirvana API",
    description="Backend API for Career Guidance Platform with AI Integration",
    version="1.0.0"
)

# CORS configuration
# Get CORS origins from environment variable or use defaults
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:8080,http://localhost:8081,http://127.0.0.1:8080,https://career-path-phi.vercel.app")
cors_origins_list = [origin.strip() for origin in cors_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fallback OPTIONS handler to ensure all preflight requests return 200
@app.options("/{rest_of_path:path}")
async def preflight_handler(request: Request):
    response = JSONResponse(content={"ok": True})
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

# Mount static files for images
images_path = os.path.join(os.path.dirname(__file__), "..", "images")
if os.path.exists(images_path):
    app.mount("/images", StaticFiles(directory=images_path), name="images")

# Data models
class VideoCard(BaseModel):
    id: str
    title: str
    short_description: str
    thumbnail: str | None = None

class JobDetail(BaseModel):
    id: str
    title: str
    qualification: str
    skills: List[str]
    earning: str
    investment: str
    pros: List[str]
    cons: List[str]
    growth: str
    description: str

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class UserProfile(BaseModel):
    id: str
    name: str
    status: str
    field_of_study: str
    interests: str
    goal: str

# Updated AIRequest model to include user context
class AIRequest(BaseModel):
    job_id: str
    question: Optional[str] = None
    history: Optional[List[ChatMessage]] = []
    user_id: Optional[str] = None

class AIResponse(BaseModel):
    response: str
    career_title: str

# Data loading functions
def load_json_data(filename: str) -> Dict[str, Any]:
    """Load JSON data from the data directory."""
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", filename)
    try:
        with open(data_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail=f"Data file {filename} not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Invalid JSON in {filename}")

def save_json_data(filename: str, data: Any) -> None:
    """Save JSON data to the data directory."""
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", filename)
    try:
        with open(data_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving data to {filename}: {str(e)}")

def load_users_data() -> List[Dict[str, Any]]:
    """Load users data from the data directory."""
    try:
        data = load_json_data("users.json")
        if isinstance(data, list):
            return data
        return []
    except HTTPException:
        # If file doesn't exist, return empty list
        return []

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user by ID from users data."""
    users = load_users_data()
    for user in users:
        if isinstance(user, dict) and user.get("id") == user_id:
            return user
    return None

# Health check endpoint
@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "Career Nirvana API is running!",
        "version": "1.0.0",
        "status": "healthy"
    }

# CORS configuration check endpoint
@app.get("/api/config")
async def get_cors_config():
    """Get current CORS configuration."""
    return {
        "cors_origins": cors_origins_list,
        "environment": os.getenv("ENVIRONMENT", "development")
    }

# API Routes
@app.get("/api/videos", response_model=List[VideoCard])
async def get_videos():
    """
    Get all video cards for the homepage.
    Returns list of career video cards with basic information.
    """
    try:
        videos_data = load_json_data("videos.json")
        return videos_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading videos: {str(e)}")

@app.get("/api/job/{job_id}", response_model=JobDetail)
async def get_job_details(job_id: str):
    """
    Get detailed information about a specific career/job.
    
    Args:
        job_id: String identifier for the job (e.g., "golgappa_seller")
    
    Returns:
        JobDetail: Comprehensive job information including skills, earning potential, etc.
    """
    try:
        jobs_data = load_json_data("jobs.json")
        
        # Find the job by ID
        job = None
        for job_item in jobs_data:
            if isinstance(job_item, dict) and job_item.get("id") == job_id:
                job = job_item
                break
        
        if not job:
            raise HTTPException(
                status_code=404, 
                detail=f"Job with ID '{job_id}' not found"
            )
        
        return JobDetail(**job)  # type: ignore
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading job details: {str(e)}")

@app.post("/api/ask", response_model=AIResponse)
async def ask_ai_about_career(request: AIRequest):
    """
    Ask AI about a specific career using OpenRouter API.
    
    Args:
        request: AIRequest containing job_id and optional question
    
    Returns:
        AIResponse: AI-generated response about the career
    """
    try:
        # Get job details first
        jobs_data = load_json_data("jobs.json")
        job = None
        for job_item in jobs_data:
            if isinstance(job_item, dict) and job_item.get("id") == request.job_id:
                job = job_item
                break
        
        if not job:
            raise HTTPException(
                status_code=404, 
                detail=f"Job with ID '{request.job_id}' not found"
            )
        
        # Prepare context for AI
        job_context = f"""
        Career: {job.get('title', 'N/A')}
        Description: {job.get('description', 'N/A')}
        Qualification Required: {job.get('qualification', 'N/A')}
        Skills Needed: {', '.join(job.get('skills', []))}
        Earning Potential: {job.get('earning', 'N/A')}
        Investment Required: {job.get('investment', 'N/A')}
        Advantages: {', '.join(job.get('pros', []))}
        Challenges: {', '.join(job.get('cons', []))}
        Growth Prospects: {job.get('growth', 'N/A')}
        """
        
        # Check if we have user context for personalization
        if request.user_id:
            user = get_user_by_id(request.user_id)
            if user:
                # Create personalized prompt
                system_prompt = f"""
SYSTEM INSTRUCTIONS:
You are "Pathfinder AI," a warm, encouraging, and insightful career cofounder. Your user is a college student in India who is feeling lost. Your primary mission is to build their confidence by revealing the hidden connections between their current field of study and the new career they are exploring. Your tone should be supportive and wise. ALWAYS use the provided user context to make your answer personal. Keep responses concise and use 2-3 bullet points for the main answer.

USER CONTEXT:
- User's Field of Study: "{user.get('field_of_study', 'Not specified')}"
- Career Being Explored: "{job.get('title', 'Not specified')}"
- User's Interests: "{user.get('interests', 'Not specified')}"
- User's Career Goals: "{user.get('goal', 'Not specified')}"
                """.strip()
            else:
                # Use generic prompt
                system_prompt = (
                    "You are a helpful career counselor. "
                    "Answer concisely with 3-5 short, actionable bullet points. "
                    "Be specific and to the point."
                )
        else:
            # Use generic prompt
            system_prompt = (
                "You are a helpful career counselor. "
                "Answer concisely with 3-5 short, actionable bullet points. "
                "Be specific and to the point."
            )
        
        # Build conversation messages (include prior history for continuous chat)
        conversation_messages = [
            {"role": "system", "content": system_prompt},
        ]
        
        # Add job context
        conversation_messages.append({
            "role": "user",
            "content": (
                "Use this career context to answer succinctly:\n" + job_context.strip()
            ),
        })
        
        if request.history:
            # Append previous turns
            for m in request.history:
                conversation_messages.append({"role": m.role, "content": m.content})
        if request.question:
            conversation_messages.append({"role": "user", "content": request.question})
        
        # OpenRouter API configuration
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=500, 
                detail="OpenRouter API key not configured"
            )
        
        # Make request to OpenRouter
        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:8000",  # Optional: helps with rate limiting
                        "X-Title": "Career Nirvana"  # Optional: helps with monitoring
                    },
                    json={
                        "model": "meta-llama/llama-3.2-3b-instruct:free",  # Using a more reliable free model
                        "messages": conversation_messages,
                        "max_tokens": 300,
                        "temperature": 0.7
                    }
                )
                
                print(f"OpenRouter response status: {response.status_code}")
                print(f"OpenRouter response text: {response.text[:200]}...")
                
            except httpx.TimeoutException:
                raise HTTPException(
                    status_code=500, 
                    detail="AI service timeout - please try again"
                )
            except httpx.RequestError as e:
                raise HTTPException(
                    status_code=500, 
                    detail=f"AI service connection error: {str(e)}"
                )
        
        if response.status_code != 200:
            error_detail = f"AI service error: {response.status_code}"
            try:
                error_response = response.json()
                if "error" in error_response:
                    error_detail += f" - {error_response['error'].get('message', 'Unknown error')}"
            except:
                error_detail += f" - {response.text[:100]}"
            
            raise HTTPException(
                status_code=500, 
                detail=error_detail
            )
        
        try:
            ai_response = response.json()
            ai_message = ai_response["choices"][0]["message"]["content"]
        except KeyError as e:
            print(f"Unexpected response structure: {response.text[:200]}")
            raise HTTPException(
                status_code=500, 
                detail=f"Unexpected AI response format: missing {str(e)}"
            )
        
        return AIResponse(
            response=ai_message,
            career_title=job.get('title', 'Unknown Career')  # type: ignore
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error getting AI response: {str(e)}"
        )

# Additional utility endpoints
@app.get("/api/health")
async def health_check():
    """Extended health check with system information."""
    return {
        "status": "healthy",
        "api_version": "1.0.0",
        "endpoints": {
            "videos": "/api/videos",
            "job_details": "/api/job/{job_id}",
            "ai_chat": "/api/ask",
            "user_signup": "/api/user/signup",
            "user_profile": "/api/user/profile/{user_id}"
        }
    }

@app.post("/api/user/signup", response_model=UserProfile)
async def signup_user(user: UserProfile):
    """
    Create a new user profile.
    
    Args:
        user: UserProfile containing user information
    
    Returns:
        UserProfile: The created user profile with ID
    """
    try:
        # Load existing users
        users = load_users_data()
        
        # Generate ID if not provided
        if not user.id:
            user.id = str(uuid.uuid4())
        
        # Check if user already exists (by name for simplicity)
        for existing_user in users:
            if isinstance(existing_user, dict) and existing_user.get("name") == user.name:
                # Update existing user
                existing_user.update(user.dict())
                save_json_data("users.json", users)
                return UserProfile(**existing_user)
        
        # Add new user
        user_dict = user.dict()
        users.append(user_dict)
        save_json_data("users.json", users)
        
        return user
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error creating user profile: {str(e)}"
        )

@app.get("/api/user/profile/{user_id}", response_model=UserProfile)
async def get_user_profile(user_id: str):
    """
    Get user profile by ID.
    
    Args:
        user_id: String identifier for the user
    
    Returns:
        UserProfile: User profile information
    """
    try:
        user = get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=404, 
                detail=f"User with ID '{user_id}' not found"
            )
        
        return UserProfile(**user)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error loading user profile: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)