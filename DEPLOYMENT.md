# 🚀 Career Path Deployment Guide

This guide explains how to deploy the Career Path application with proper connectivity between the frontend and backend.

## 🏗️ Architecture Overview

- **Frontend**: React + TypeScript application hosted on Vercel
- **Backend**: Python FastAPI application hosted on Railway
- **Database**: JSON files stored on Railway (no external database)
- **AI Service**: gemini API for career guidance

## 🔧 Backend Deployment (Railway)

### Environment Variables

Set these environment variables in your Railway project:

```
API_KEY=your_api_key
CORS_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:8080,http://localhost:8081
ENVIRONMENT=production
```

### Deployment Process

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Python project and use Nixpacks
3. Set the environment variables mentioned above
4. Deploy the application

The backend will be available at `https://your-railway-app.up.railway.app`

## 🌐 Frontend Deployment (Vercel)

### Environment Variables

Set this environment variable in your Vercel project:

```
VITE_API_BASE_URL=https://your-railway-app.up.railway.app
```

### Deployment Process

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite React project
3. Set the environment variable mentioned above
4. Deploy the application

The frontend will be available at `https://your-vercel-app.vercel.app`

## 🔗 Connection Verification

After deploying both applications:

1. Visit your Vercel frontend URL
2. Open browser Developer Tools (F12)
3. Go to the Network tab
4. Refresh the page
5. Verify that requests to `/api/videos` are going to your Railway backend
6. Check that the requests return 200 status codes with JSON data

## 🧪 Testing Endpoints

You can test these endpoints directly on your Railway backend:

- `GET /api/health` - Health check
- `GET /api/videos` - Career stories list
- `GET /api/job/{id}` - Career details
- `POST /api/ask` - AI chat

## 🚨 Common Issues and Solutions

### CORS Errors

If you see CORS errors in the browser console:

1. Verify that `CORS_ORIGINS` in Railway includes your exact Vercel URL
2. Redeploy the Railway backend after updating environment variables

### API Connection Failures

If the frontend can't connect to the backend:

1. Verify that `VITE_API_BASE_URL` in Vercel points to your Railway backend
2. Redeploy the Vercel frontend after updating environment variables
3. Check that your Railway backend is publicly accessible

### Environment Variables Not Applied

If environment variables don't seem to take effect:

1. Redeploy the application after setting environment variables
2. Check that environment variables are set for the correct environment (Production/Preview)

## 🛠️ Local Development

For local development:

1. Start the backend:
   ```bash
   cd backend
   python run.py
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at `http://localhost:8080`

## 📞 Support

If you encounter issues with deployment or connectivity:

1. Check the browser Network tab for failed requests
2. Check the Railway logs for backend errors
3. Verify all environment variables are correctly set
4. Ensure both applications have been redeployed after configuration changes