# 🔍 CORS Debugging Guide for Career Nirvana

This guide will help you debug and fix CORS issues between your frontend and backend.

## 🎯 Current Issue

You're seeing these errors in the browser console:
```
OPTIONS /api/videos 400 Bad Request
Access-Control-Allow-Origin header missing
```

## ✅ Fixes Implemented

1. **Added explicit OPTIONS handler** in [backend/app/main.py](file:///d:/career-nirvana/backend/app/main.py):
   ```python
   @app.options("/{rest_of_path:path}")
   async def preflight_handler(request: Request):
       return JSONResponse(content={"ok": True})
   ```

2. **Updated CORS configuration** in [backend/.env](file:///d:/career-nirvana/backend/.env) to include the correct frontend URL:
   ```
   CORS_ORIGINS=http://localhost:8080,http://localhost:8081,http://127.0.0.1:8080,https://career-path-phi.vercel.app
   ```

3. **Moved CORS middleware** to be applied immediately after app initialization.

## 🧪 Testing Commands

### Using curl (Linux/Mac)
```bash
# Test preflight request
curl -i -X OPTIONS https://careerpath-production-fd70.up.railway.app/api/videos \
  -H "Origin: https://career-path-phi.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"

# Test actual request
curl -i https://careerpath-production-fd70.up.railway.app/api/videos \
  -H "Origin: https://career-path-phi.vercel.app"
```

### Using curl (Windows)
```cmd
# Test preflight request
curl -i -X OPTIONS https://careerpath-production-fd70.up.railway.app/api/videos ^
  -H "Origin: https://career-path-phi.vercel.app" ^
  -H "Access-Control-Request-Method: GET" ^
  -H "Access-Control-Request-Headers: Content-Type"

# Test actual request
curl -i https://careerpath-production-fd70.up.railway.app/api/videos ^
  -H "Origin: https://career-path-phi.vercel.app"
```

### Using Python script
```bash
python test_cors.py
```

## 🚀 Required Actions

1. **Redeploy the backend** on Railway to apply the changes
2. **Check Railway logs** after redeployment to verify the OPTIONS requests are returning 200
3. **Test with the commands above** to verify CORS headers are present
4. **Refresh the frontend** and check the browser console for errors

## ✅ Expected Results

After successful deployment, the curl command should return:

```
HTTP/1.1 200 OK
access-control-allow-origin: https://career-path-phi.vercel.app
access-control-allow-methods: *
access-control-allow-headers: *
```

## 🚨 If Issues Persist

1. **Check Railway environment variables** - Make sure `CORS_ORIGINS` includes `https://career-path-phi.vercel.app`
2. **Verify the backend URL** - Make sure you're using the correct Railway URL
3. **Check for middleware conflicts** - Ensure no other middleware is interfering with CORS
4. **Review Railway logs** - Look for any errors during request processing

## 📞 Support

If you're still experiencing issues:

1. Run the test commands above and share the output
2. Check Railway logs for any error messages
3. Verify all environment variables are correctly set
4. Ensure both frontend and backend have been redeployed