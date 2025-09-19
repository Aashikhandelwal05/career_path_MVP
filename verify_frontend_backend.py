#!/usr/bin/env python3
"""
Script to verify frontend-backend connectivity for Career Nirvana
"""

import requests
import time

def test_frontend_access():
    """Test if frontend is accessible"""
    print("Testing frontend access...")
    print("=" * 40)
    
    try:
        response = requests.get("https://career-path-phi.vercel.app", timeout=10)
        if response.status_code == 200:
            print("✅ Frontend is accessible")
            return True
        else:
            print(f"❌ Frontend access failed (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ Frontend access error: {e}")
        return False

def test_backend_api():
    """Test backend API endpoints"""
    print("\nTesting backend API...")
    print("=" * 40)
    
    base_url = "https://careerpath-production-fd70.up.railway.app"
    headers = {"Origin": "https://career-path-phi.vercel.app"}
    
    # Test videos endpoint
    try:
        response = requests.get(f"{base_url}/api/videos", headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Videos endpoint: {len(data)} career stories found")
        else:
            print(f"❌ Videos endpoint failed (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ Videos endpoint error: {e}")
        return False
    
    # Test a specific job endpoint
    try:
        response = requests.get(f"{base_url}/api/job/golgappa_seller", headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Job endpoint: {data.get('title', 'Unknown')} details retrieved")
        else:
            print(f"❌ Job endpoint failed (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ Job endpoint error: {e}")
        return False
    
    return True

def test_cors_configuration():
    """Test CORS configuration"""
    print("\nTesting CORS configuration...")
    print("=" * 40)
    
    try:
        response = requests.options(
            "https://careerpath-production-fd70.up.railway.app/api/videos",
            headers={
                "Origin": "https://career-path-phi.vercel.app",
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "Content-Type"
            },
            timeout=10
        )
        
        if response.status_code == 200:
            allow_origin = response.headers.get('Access-Control-Allow-Origin', '')
            if "career-path-phi.vercel.app" in allow_origin:
                print("✅ CORS preflight request: PASSED")
                print(f"   Allowed origin: {allow_origin}")
                return True
            else:
                print("❌ CORS preflight request: FAILED")
                print(f"   Allowed origin: {allow_origin}")
                return False
        else:
            print(f"❌ CORS preflight request failed (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ CORS preflight request error: {e}")
        return False

def main():
    print("🚀 Career Nirvana Frontend-Backend Verification")
    print("=" * 60)
    
    # Test frontend access
    frontend_ok = test_frontend_access()
    
    # Wait a moment
    time.sleep(1)
    
    # Test backend API
    backend_ok = test_backend_api()
    
    # Wait a moment
    time.sleep(1)
    
    # Test CORS
    cors_ok = test_cors_configuration()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 VERIFICATION SUMMARY")
    print("=" * 60)
    
    if frontend_ok and backend_ok and cors_ok:
        print("🎉 ALL TESTS PASSED!")
        print("✅ Frontend is accessible")
        print("✅ Backend API is working")
        print("✅ CORS configuration is correct")
        print("\nYour Career Nirvana application should be fully functional!")
        print("Visit https://career-path-phi.vercel.app to see the working application.")
    else:
        print("⚠️  SOME TESTS FAILED")
        if not frontend_ok:
            print("❌ Frontend is not accessible")
        if not backend_ok:
            print("❌ Backend API has issues")
        if not cors_ok:
            print("❌ CORS configuration has issues")
        
        print("\n🔧 Troubleshooting steps:")
        if not frontend_ok:
            print("   1. Check if your frontend is properly deployed to Vercel")
        if not backend_ok:
            print("   2. Verify that your backend is running and accessible")
        if not cors_ok:
            print("   3. Check Railway environment variables")
            print("   4. Verify that CORS_ORIGINS includes https://career-path-phi.vercel.app")

if __name__ == "__main__":
    main()