#!/bin/bash

# Test CORS preflight request
echo "Testing CORS preflight request for /api/videos endpoint..."
echo "====================================================="

curl -i -X OPTIONS https://careerpath-production-fd70.up.railway.app/api/videos \
  -H "Origin: https://career-path-phi.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"

echo -e "\n\nTesting actual GET request..."
echo "==========================="

curl -i https://careerpath-production-fd70.up.railway.app/api/videos \
  -H "Origin: https://career-path-phi.vercel.app"