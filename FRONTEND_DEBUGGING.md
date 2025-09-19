# 🐛 Frontend Debugging Guide for Career Stories Issue

## 📋 Current Status

You've confirmed that all backend endpoints are working correctly:
- ✅ `https://your-railway-app.up.railway.app/api/health`
- ✅ `https://your-railway-app.up.railway.app/api/videos`
- ✅ `https://your-railway-app.up.railway.app/api/job/golgappa_seller`

But the career stories are still not showing up on your Vercel frontend.

## 🔍 Step-by-Step Debugging Process

### 1. Verify Environment Variables in Vercel

Double-check your Vercel environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Confirm you have:
   ```
   VITE_API_BASE_URL=https://your-actual-railway-app.up.railway.app
   ```
3. Make sure it's available for both Production and Preview environments

### 2. Check Browser Network Tab

1. Open your Vercel frontend in Chrome/Firefox
2. Press F12 to open Developer Tools
3. Go to the Network tab
4. Refresh the page
5. Look for these requests:
   - `api/videos` (should return 200 with JSON data)
   - `api/job/{id}` (when clicking on a story)

Check:
- Are requests going to your Railway backend URL?
- Are they returning 200 status codes?
- Are they returning the expected JSON data?

### 3. Check Browser Console Tab

Look for any error messages:
- CORS errors
- Network errors
- JavaScript exceptions
- 404 errors for API requests

### 4. Test with Our Connection Test Page

Visit `https://your-vercel-app.vercel.app/connection-test.html` to run a direct API test.

### 5. Force Redeploy Frontend

Since we fixed the hardcoded API URL, you need to redeploy:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Find latest deployment and click "Redeploy"

### 6. Check React Query Devtools (if available)

If you have React Query Devtools installed:
1. Open your site
2. Look for the Query Devtools icon in the bottom right
3. Check the status of the "videos" query

## 🧪 Manual API Test

You can manually test the API connection by adding this to your browser's console:

```javascript
// Test videos endpoint
fetch('/api/videos')
  .then(response => response.json())
  .then(data => console.log('Videos:', data))
  .catch(error => console.error('Error:', error));

// Test with full URL
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
fetch(`${apiUrl}/api/videos`)
  .then(response => response.json())
  .then(data => console.log('Videos (full URL):', data))
  .catch(error => console.error('Error (full URL):', error));
```

## 🔧 Common Issues and Solutions

### Issue 1: Environment Variable Not Applied
**Symptoms**: API requests still going to localhost or old URL
**Solution**: Redeploy frontend after setting environment variable

### Issue 2: CORS Configuration
**Symptoms**: CORS errors in browser console
**Solution**: Verify Railway `CORS_ORIGINS` includes your exact Vercel URL

### Issue 3: Network/Firewall Issues
**Symptoms**: Network errors or timeouts
**Solution**: Check if your Railway app is publicly accessible

### Issue 4: React Query Cache
**Symptoms**: Stale data or no data loading
**Solution**: Clear browser cache and hard refresh (Ctrl+F5)

## 📞 If Issues Persist

If you're still having problems after trying all these steps:

1. Share screenshots of:
   - Your Vercel environment variables
   - Browser Network tab showing API requests
   - Browser Console errors
   - The connection test page results

2. Provide your exact URLs:
   - Vercel frontend URL
   - Railway backend URL

3. Check Railway logs for any errors when processing requests from your frontend

## 🛠️ Quick Verification Commands

Locally verify your data files are correct:

```bash
cd backend
python -c "import json; data = json.load(open('data/videos.json')); print('Videos count:', len(data)); print('Sample:', data[0] if data else 'None')"
python -c "import json; data = json.load(open('data/jobs.json')); print('Jobs count:', len(data)); print('Sample:', data[0] if data else 'None')"
```

Both should return 10 and show sample data.