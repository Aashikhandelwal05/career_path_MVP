# 🚨 Career Stories Not Loading - Troubleshooting Guide

## 🔍 Issue Summary

You've deployed your frontend to Vercel and backend to Railway with proper environment variables, but the career stories are still not showing up.

## ✅ What's Working

Based on your confirmation, these are correctly configured:
- Vercel environment variable `VITE_API_BASE_URL` set to Railway URL
- Railway `CORS_ORIGINS` includes your Vercel frontend URL
- Railway `OPENROUTER_API_KEY` is set correctly
- Both frontend and backend have been redeployed

## 🧪 Diagnostic Steps

### 1. Test API Endpoints Directly

Visit your Railway backend URL directly to verify it's working:
```
https://your-railway-app.up.railway.app/api/health
https://your-railway-app.up.railway.app/api/videos
https://your-railway-app.up.railway.app/api/job/golgappa_seller
```

You should see JSON responses for all these endpoints.

### 2. Check Browser Developer Tools

1. Open your Vercel frontend in a browser
2. Press F12 to open Developer Tools
3. Go to the Network tab
4. Refresh the page
5. Look for requests to:
   - `/api/videos` 
   - `/api/job/{id}`
6. Check if these requests are:
   - Being made to the correct URL (your Railway backend)
   - Returning successful responses (200 status)
   - Returning the expected JSON data

### 3. Check Console Errors

In the Console tab of Developer Tools, look for any error messages related to:
- CORS errors
- Network errors
- JavaScript exceptions

### 4. Test with API Test Page

Visit `https://your-vercel-app.vercel.app/api-test.html` to run a comprehensive API test.

## 🔧 Potential Issues and Fixes

### Issue 1: Hardcoded API URL (FIXED)
**Problem**: The frontend was hardcoded to use a specific Railway URL instead of the environment variable.
**Fix**: Updated [frontend/src/services/api.ts](file:///d:/career-nirvana/frontend/src/services/api.ts) to use `import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'`

### Issue 2: Asset Mapping Mismatch
**Problem**: There might be mismatches between IDs in the data files and the asset mapping.
**Verification**: Confirmed that all IDs in [backend/data/videos.json](file:///d:/career-nirvana/backend/data/videos.json) match the mapping in [frontend/src/lib/utils.ts](file:///d:/career-nirvana/frontend/src/lib/utils.ts).

### Issue 3: CORS Configuration
**Problem**: Even though you've set `CORS_ORIGINS`, there might be an issue with the configuration.
**Verification**: Check that your Railway environment variables include your exact Vercel URL:
```
CORS_ORIGINS=https://your-exact-vercel-app.vercel.app,http://localhost:8080,http://localhost:8081
```

## 🚀 Next Steps

1. **Redeploy the frontend** - Since we fixed the hardcoded API URL, you need to redeploy the frontend for the changes to take effect.

2. **Monitor the Network tab** - After redeployment, check the Network tab to see if API requests are now going to your Railway backend.

3. **Check Railway logs** - In your Railway dashboard, check the logs for your backend service to see if it's receiving requests from your frontend.

4. **Verify environment variables** - Double-check that all environment variables are correctly set in both Vercel and Railway.

## 📞 If Issues Persist

If the stories still aren't loading after redeployment:

1. Share the exact URLs of your Vercel frontend and Railway backend
2. Provide screenshots of the Network tab showing failed requests
3. Share any error messages from the Console tab
4. Check the Railway logs for any errors

## 🛠️ Quick Verification Commands

You can run these commands locally to verify your data files are correct:

```bash
cd backend
python -c "import json; data = json.load(open('data/videos.json')); print('Videos count:', len(data))"
python -c "import json; data = json.load(open('data/jobs.json')); print('Jobs count:', len(data))"
```

Both should return 10.