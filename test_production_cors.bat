@echo off
echo ====================================================
echo  Career Nirvana CORS Production Test
echo ====================================================

echo.
echo Testing CORS preflight request...
echo ------------------------------------
curl.exe -i -X OPTIONS https://careerpath-production-fd70.up.railway.app/api/videos ^
  -H "Origin: https://career-path-phi.vercel.app" ^
  -H "Access-Control-Request-Method: GET" ^
  -H "Access-Control-Request-Headers: Content-Type"

echo.
echo.
echo Testing actual API request...
echo -------------------------------
curl.exe -i https://careerpath-production-fd70.up.railway.app/api/videos ^
  -H "Origin: https://career-path-phi.vercel.app"

echo.
echo.
echo ====================================================
echo  Test Complete
echo ====================================================
echo.
echo If the first request returns "HTTP/1.1 200 OK" with CORS headers,
echo and the second request returns "HTTP/1.1 200 OK" with JSON data,
echo then your CORS configuration is working correctly.
echo.
pause