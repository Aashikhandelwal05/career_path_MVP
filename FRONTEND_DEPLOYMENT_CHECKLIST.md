# 🚀 Frontend Deployment Verification Checklist

This checklist helps verify that your frontend deployment is working correctly with the backend API.

## ✅ Pre-Deployment Checklist

1. **Environment Variables**:
   - [ ] `VITE_API_BASE_URL` is set to `https://careerpath-production-fd70.up.railway.app` in your Vercel project settings
   - [ ] Environment variables are set for both Production and Preview environments

2. **Code Changes**:
   - [ ] All CORS fixes have been implemented in the backend
   - [ ] Backend has been deployed to Railway with the new configuration
   - [ ] Frontend code is up to date with the latest changes

3. **Build Process**:
   - [ ] Frontend has been rebuilt with the correct environment variables
   - [ ] Build completed without errors

## 🧪 Post-Deployment Testing

### 1. Basic Frontend Access
Visit: https://career-path-phi.vercel.app
- [ ] Page loads without errors
- [ ] No console errors in browser developer tools

### 2. API Connection Test
Visit: https://career-path-phi.vercel.app/api-test.html
- [ ] API Base URL shows `https://careerpath-production-fd70.up.railway.app`
- [ ] Career Stories test shows "PASSED" with 10 stories found

### 3. Manual API Testing
Run these commands in your terminal:

```bash
# Test backend directly
curl -i "https://careerpath-production-fd70.up.railway.app/api/videos" \
  -H "Origin: https://career-path-phi.vercel.app"

# Expected result: HTTP/1.1 200 OK with JSON data
```

### 4. Browser Developer Tools Testing
1. Open https://career-path-phi.vercel.app in your browser
2. Press F12 to open Developer Tools
3. Go to the Network tab
4. Refresh the page
5. Look for:
   - [ ] Request to `/api/videos` (should show the full backend URL)
   - [ ] Status 200 for the API request
   - [ ] JSON response with career stories

## 🚨 Troubleshooting

### If Career Stories Are Not Loading:

1. **Check Environment Variables**:
   - Verify `VITE_API_BASE_URL` is correctly set in Vercel dashboard
   - Ensure it's set for both Production and Preview environments

2. **Check Build Status**:
   - Confirm the frontend was rebuilt after setting environment variables
   - Vite injects environment variables at build time, so changes require a rebuild

3. **Check Browser Console**:
   - Look for JavaScript errors that might prevent API calls
   - Check for CORS errors (should be fixed with our backend changes)

4. **Check Network Tab**:
   - Verify API requests are being made to the correct URL
   - Check request and response headers for CORS issues

### If You See CORS Errors:

1. **Verify Backend Deployment**:
   - Confirm the backend changes have been deployed to Railway
   - Check that `CORS_ORIGINS` includes `https://career-path-phi.vercel.app`

2. **Test Backend Directly**:
   - Use the curl command above to verify backend CORS configuration

## 📞 Support

If issues persist:

1. Share screenshots of:
   - Vercel environment variables
   - Browser Network tab showing failed requests
   - Browser Console errors
   - curl test results

2. Provide your exact URLs:
   - Frontend URL: https://career-path-phi.vercel.app
   - Backend URL: https://careerpath-production-fd70.up.railway.app