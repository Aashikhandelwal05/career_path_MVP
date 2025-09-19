# Career Nirvana Backend API

FastAPI backend for the Career Nirvana platform with OpenRouter AI integration.

**Note: This backend is now configured to work with the production frontend at https://career-path-theta.vercel.app**

## 🚀 Deployment Options

This backend can be deployed in multiple ways:

1. **Local Development** - Run directly on your machine
2. **Railway** - Deploy to Railway platform (recommended)
3. **Other Cloud Providers** - Deploy to platforms like Heroku, Render, etc.

## 🚀 Features

- **RESTful API** with FastAPI
- **OpenRouter AI Integration** using `openai/gpt-oss-120b:free` model
- **CORS Support** for frontend integration
- **Static File Serving** for images
- **Environment Configuration** with `.env` files
- **Comprehensive Error Handling**
- **API Documentation** with Swagger UI

## 📋 Prerequisites

- Python 3.8+
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your OpenRouter API key
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```

## 🏃‍♂️ Running the Server

### Development Mode
```bash
# From the backend directory
python run.py
```

Or directly:
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
python main.py
```

Or with gunicorn:
```bash
gunicorn -c gunicorn.conf.py app.main:app
```

### Railway Deployment

The backend is configured for easy deployment to Railway with the following files:
- `Procfile` - Defines the start command using gunicorn
- `runtime.txt` - Specifies Python version
- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Build configuration with virtual environment support
- `gunicorn.conf.py` - Gunicorn production configuration

The API will be available at:
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## 📚 API Endpoints

### 1. Health Check
```http
GET /
GET /api/health
```
Returns server status and basic information.

### 2. Get Videos
```http
GET /api/videos
```
Returns all career video cards for the homepage.

**Response:**
```json
[
  {
    "id": "golgappa_seller",
    "title": "Golgappa Seller",
    "thumbnail": "/images/golgappa.jpg",
    "short_description": "A popular street food business with low investment and high demand."
  }
]
```

### 3. Get Job Details
```http
GET /api/job/{job_id}
```
Returns detailed information about a specific career.

**Example:** `GET /api/job/golgappa_seller`

**Response:**
```json
{
  "id": "golgappa_seller",
  "title": "Golgappa Seller",
  "qualification": "No formal education required",
  "skills": ["Cooking", "Hygiene", "Customer Service"],
  "earning": "₹8,000–₹25,000 / month",
  "investment": "₹3,000–₹10,000 (stall, utensils, ingredients)",
  "pros": ["Low startup cost", "Quick earnings"],
  "cons": ["Weather dependent", "Unstable income"],
  "growth": "Can expand into a food stall or small restaurant",
  "description": "Prepares and sells golgappa/pani puri to customers in high-traffic areas."
}
```

### 4. Ask AI About Career
```http
POST /api/ask
```
Get AI-powered career advice using OpenRouter.

**Request Body:**
```json
{
  "job_id": "golgappa_seller",
  "question": "What skills do I need to get started?"
}
```

**Response:**
```json
{
  "response": "To get started as a Golgappa Seller, you'll need...",
  "career_title": "Golgappa Seller"
}
```

## 📁 Project Structure

```
backend/
├── app/
│   └── main.py          # FastAPI application
├── data/
│   ├── videos.json      # Video cards data
│   └── jobs.json        # Job details data
├── images/              # Static image files (optional)
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
├── .env.example        # Environment template
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENROUTER_API_KEY` | OpenRouter API key | Required |
| `API_HOST` | Server host | `0.0.0.0` |
| `API_PORT` | Server port | `8000` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:8080,...` |
| `ENVIRONMENT` | Environment mode | `development` |

### Adding Images

1. Create an `images` directory in the backend folder
2. Add your career images (golgappa.jpg, makeup.jpg, etc.)
3. Images will be served at `/images/{filename}`

## 🧪 Testing the API

### Using curl
```bash
# Test health endpoint
curl http://localhost:8000/

# Get all videos
curl http://localhost:8000/api/videos

# Get specific job
curl http://localhost:8000/api/job/golgappa_seller

# Ask AI (requires OpenRouter API key)
curl -X POST http://localhost:8000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"job_id":"golgappa_seller","question":"Tell me about this career"}'
```

### Using the Swagger UI
1. Start the server
2. Open http://localhost:8000/docs
3. Try out the endpoints interactively

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Use a different port
   uvicorn app.main:app --port 8001
   ```

2. **OpenRouter API errors:**
   - Check your API key in `.env`
   - Verify you have credits in your OpenRouter account
   - Ensure the model `openai/gpt-oss-120b:free` is available

3. **CORS errors:**
   - Check `CORS_ORIGINS` in `.env`
   - Ensure frontend URL is included

4. **File not found errors:**
   - Verify `videos.json` and `jobs.json` exist in `data/` directory
   - Check file permissions

### Logs and Debugging

Enable detailed logging:
```bash
uvicorn app.main:app --log-level debug
```

## 🔄 Integration with Frontend

The backend is designed to work with the React frontend running on `http://localhost:8080`. 

### CORS Configuration
The API allows requests from:
- `http://localhost:8080` (main frontend)
- `http://localhost:8081` (alternative port)
- `http://127.0.0.1:8080`
- `https://career-path-theta.vercel.app` (production frontend)

### API Base URL
The frontend is configured to call `http://localhost:8000` by default.

### Railway Deployment Notes

When deploying to Railway:
1. The backend will automatically use the `PORT` environment variable provided by Railway
2. CORS origins can be configured using the `CORS_ORIGINS` environment variable
3. Set your `OPENROUTER_API_KEY` in Railway environment variables
4. The backend uses a virtual environment to avoid PEP 668 externally managed environment issues
5. The backend will be accessible at your Railway-provided URL

To deploy to Railway:
1. Connect your GitHub repository to Railway
2. Railway will automatically detect and use the configuration files
3. Add your `OPENROUTER_API_KEY` as an environment variable in the Railway dashboard
4. Add `CORS_ORIGINS` environment variable with value: `http://localhost:8080,http://localhost:8081,http://127.0.0.1:8080,https://career-path-theta.vercel.app`
5. The application will automatically start using the Procfile configuration

## 📝 Development Notes

- The API uses `openai/gpt-oss-120b:free` model as specified in project requirements
- All endpoints include proper error handling and validation
- Static file serving is configured for the images directory
- CORS is properly configured for frontend integration
- Environment variables are used for all configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Career Nirvana platform.