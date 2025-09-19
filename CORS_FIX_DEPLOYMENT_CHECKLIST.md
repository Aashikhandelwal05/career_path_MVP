# 🚀 CORS Fix Deployment Checklist

This checklist ensures all CORS fixes are properly deployed to production.

## ✅ Changes Made

1. **Updated CORS Origins in [.env](file:///d:/career-nirvana/backend/.env) File**:
   - Changed from `https://career-path-flame.vercel.app` to `https://career-path-phi.vercel.app`
   - File: [backend/.env](file:///d:/career-nirvana/backend/.env)

2. **Added Custom OPTIONS Handler**:
   - Ensures all preflight requests return 200 OK with proper CORS headers
   - File: [backend/app/main.py](file:///d:/career-nirvana/backend/app/main.py)

3. **Verified Configuration**:
   - Tested locally with curl commands
   - Confirmed 200 OK responses with correct CORS headers

## 📋 Deployment Steps

### 1. Push Changes to GitHub
```bash
git add .
git commit -m "Fix CORS configuration for new frontend URL"
git push origin main
```

### 2. Update Railway Environment Variables
In the Railway dashboard:
1. Go to your backend project
2. Click on "Variables"
3. Update `CORS_ORIGINS` to:
   ```
   http://localhost:8080,http://localhost:8081,http://127.0.0.1:8080,https://career-path-phi.vercel.app
   ```
4. Save changes

### 3. Deploy Backend to Railway
1. Railway should automatically deploy after pushing to GitHub
2. Or manually trigger deployment in Railway dashboard

### 4. Deploy Frontend to Vercel
1. Push frontend changes to GitHub (if any)
2. Vercel should automatically deploy
3. Or manually trigger deployment in Vercel dashboard

## 🧪 Post-Deployment Testing

### Test CORS Preflight Request
```bash
curl -i -X OPTIONS https://careerpath-production-fd70.up.railway.app/api/videos \
  -H "Origin: https://career-path-phi.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"
```

Expected response:
```
HTTP/1.1 200 OK
access-control-allow-origin: https://career-path-phi.vercel.app
access-control-allow-credentials: true
access-control-allow-methods: *
access-control-allow-headers: *
```

### Test Actual API Request
```bash
curl -i https://careerpath-production-fd70.up.railway.app/api/videos \
  -H "Origin: https://career-path-phi.vercel.app"
```

Expected response:
```
HTTP/1.1 200 OK
access-control-allow-origin: https://career-path-phi.vercel.app
access-control-allow-credentials: true
Content-Type: application/json
```

## 🚨 Troubleshooting

If issues persist:

1. **Check Railway Logs**:
   - Look for any errors during request processing
   - Verify environment variables are correctly loaded

2. **Verify Environment Variables**:
   - Confirm `CORS_ORIGINS` includes `https://career-path-phi.vercel.app`
   - Check for trailing slashes or extra spaces

3. **Check Railway Deployment**:
   - Ensure latest code has been deployed
   - Check build logs for any errors

4. **Frontend Configuration**:
   - Verify `VITE_API_BASE_URL` points to the correct backend URL
   - Ensure frontend has been redeployed after any configuration changes

## 📞 Support

If you continue to experience issues:

1. Run the test commands above and share the output
2. Check Railway logs for error messages
3. Verify all environment variables are correctly set
4. Ensure both frontend and backend have been redeployed