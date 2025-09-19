# 🛠️ Career Nirvana Deployment Fix Checklist

## ✅ Issues Identified and Fixed

1. **Hardcoded API URL**: Frontend was using a hardcoded Railway URL instead of environment variables
2. **Double Slash URLs**: API endpoint construction was causing `//api/videos` instead of `/api/videos`

## 📋 Deployment Steps

### 1. Redeploy Frontend (Critical)
Since we've fixed the code, you must redeploy your frontend:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments
4. Click "Redeploy" on your latest deployment

### 2. Verify Environment Variables
Make sure these are correctly set in Vercel:
- **Key**: `VITE_API_BASE_URL`
- **Value**: Your Railway backend URL (e.g., `https://your-app.up.railway.app`)
- **Available for**: Both Production and Preview

### 3. Check Railway CORS Configuration
Ensure your Railway backend has the correct CORS origins:
- **Key**: `CORS_ORIGINS`
- **Value**: Should include your Vercel frontend URL
- Example: `https://your-vercel-app.vercel.app,http://localhost:8080,http://localhost:8081`

## 🔍 Verification Steps

### After Redeployment:
1. Visit your Vercel frontend
2. Open Developer Tools (F12)
3. Go to Network tab
4. Refresh the page
5. Look for requests to:
   - `/api/videos` (should return 200 with JSON data)
   - Check that URLs don't have double slashes

### Test with Connection Test Page:
Visit `https://your-vercel-app.vercel.app/connection-test.html`

## 🧪 Manual Testing

You can also test directly in the browser console:

```javascript
// Check the API base URL
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Test videos endpoint
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
fetch(`${apiUrl}/api/videos`)
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => console.log('Videos data:', data))
  .catch(error => console.error('Error:', error));
```

## 🚨 Common Issues and Solutions

### Issue 1: Still Getting 400 Bad Request
**Cause**: Double slash URLs still being generated
**Solution**: 
1. Verify redeployment is complete
2. Clear browser cache and hard refresh (Ctrl+F5)
3. Check Network tab for exact URLs being requested

### Issue 2: CORS Errors
**Cause**: Railway CORS configuration doesn't include your Vercel URL
**Solution**:
1. Update `CORS_ORIGINS` in Railway environment variables
2. Redeploy Railway backend

### Issue 3: Environment Variable Not Applied
**Cause**: Frontend redeployment needed after environment variable changes
**Solution**: Redeploy frontend

## 📞 If Issues Persist

If you're still having problems:

1. Share screenshots of:
   - Vercel environment variables
   - Browser Network tab showing failed requests
   - Browser Console errors
   - Railway logs

2. Provide your exact URLs:
   - Vercel frontend URL
   - Railway backend URL

## 🔄 Quick Reference

### Backend Endpoints (should all be working):
- `GET /api/health` - Health check
- `GET /api/videos` - Career stories list
- `GET /api/job/{id}` - Career details
- `POST /api/ask` - AI chat

### Frontend Environment Variables:
```
VITE_API_BASE_URL=https://your-railway-app.up.railway.app
```

### Backend Environment Variables:
```
OPENROUTER_API_KEY=your_openrouter_key
CORS_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:8080
```