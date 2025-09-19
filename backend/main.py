#!/usr/bin/env python3
"""
Career Nirvana Backend Server for Railway Deployment
Production-ready script to start the FastAPI server
"""

import os
import sys
from dotenv import load_dotenv

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

# Import the FastAPI app
from app.main import app

# For gunicorn deployment
if __name__ == "__main__":
    import uvicorn
    
    # Get configuration from environment
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))  # Railway uses PORT environment variable
    
    print(f"🚀 Starting Career Nirvana API Server...")
    print(f"🌐 Server will be available at: http://{host}:{port}")
    print(f"📚 API Documentation: http://{host}:{port}/docs")
    
    # Start the server (production mode)
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=False,  # Disable auto-reload for production
        log_level="info"
    )