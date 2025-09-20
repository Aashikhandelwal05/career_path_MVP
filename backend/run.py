#!/usr/bin/env python3
"""
Career Path Backend Server Runner
Quick script to start the FastAPI server
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    # Get configuration from environment
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))
    
    print(f"🚀 Starting Career Path API Server...")
    print(f"🌐 Server will be available at: http://{host}:{port}")
    print(f"📚 API Documentation: http://localhost:{port}/docs")
    print(f"🔧 Make sure your OpenRouter API key is set in .env file")
    
    # Start the server
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=True,  # Enable auto-reload for development
        log_level="info"
    )