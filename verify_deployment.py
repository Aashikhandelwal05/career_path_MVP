#!/usr/bin/env python3
"""
Script to verify that CORS fixes have been deployed to production
"""

import requests
import time

def test_cors_preflight():
    """Test CORS preflight request"""
    print("Testing CORS preflight request...")
    print("=" * 50)
    
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
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        # Check for required CORS headers
        allow_origin = response.headers.get('Access-Control-Allow-Origin', '')
        allow_methods = response.headers.get('Access-Control-Allow-Methods', '')
        allow_headers = response.headers.get('Access-Control-Allow-Headers', '')
        
        print(f"\nCORS Headers:")
        print(f"  Access-Control-Allow-Origin: {allow_origin}")
        print(f"  Access-Control-Allow-Methods: {allow_methods}")
        print(f"  Access-Control-Allow-Headers: {allow_headers}")
        
        if response.status_code == 200:
            print("\n✅ CORS Preflight Test: PASSED")
            if "career-path-phi.vercel.app" in allow_origin or allow_origin == '*':
                print("✅ CORS Origin Check: PASSED")
                return True
            else:
                print("❌ CORS Origin Check: FAILED")
                return False
        else:
            print(f"\n❌ CORS Preflight Test: FAILED (Status: {response.status_code})")
            return False
            
    except Exception as e:
        print(f"❌ CORS Test Error: {e}")
        return False

def test_actual_request():
    """Test actual API request"""
    print("\nTesting actual API request...")
    print("=" * 50)
    
    try:
        response = requests.get(
            "https://careerpath-production-fd70.up.railway.app/api/videos",
            headers={
                "Origin": "https://career-path-phi.vercel.app"
            },
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        
        # Check for required CORS headers
        allow_origin = response.headers.get('Access-Control-Allow-Origin', '')
        print(f"Access-Control-Allow-Origin: {allow_origin}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Videos found: {len(data)}")
            print("✅ Actual Request Test: PASSED")
            return True
        else:
            print(f"❌ Actual Request Test: FAILED (Status: {response.status_code})")
            return False
            
    except Exception as e:
        print(f"❌ Actual Request Test Error: {e}")
        return False

def main():
    print("🚀 Career Nirvana CORS Deployment Verification")
    print("=" * 60)
    
    # Test preflight request
    preflight_success = test_cors_preflight()
    
    # Wait a moment before next test
    time.sleep(2)
    
    # Test actual request
    actual_success = test_actual_request()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    if preflight_success and actual_success:
        print("🎉 ALL TESTS PASSED!")
        print("✅ CORS configuration is working correctly")
        print("✅ Your frontend should now be able to connect to the backend")
    else:
        print("⚠️  SOME TESTS FAILED")
        if not preflight_success:
            print("❌ CORS preflight requests are not working")
            print("   This usually means the backend changes haven't been deployed yet")
        if not actual_success:
            print("❌ Actual API requests are not working")
            print("   Check if the backend is running and accessible")
        
        print("\n🔧 Troubleshooting steps:")
        print("1. Verify that you've deployed the backend changes to Railway")
        print("2. Check that the CORS_ORIGINS environment variable includes https://career-path-phi.vercel.app")
        print("3. Confirm that the custom OPTIONS handler is in your main.py file")
        print("4. Check Railway logs for any errors")

if __name__ == "__main__":
    main()