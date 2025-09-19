#!/usr/bin/env python3
"""
Test script to verify API URL construction and prevent double slashes
"""

import requests
import time

def test_api_urls():
    """Test various API URL constructions"""
    print("Testing API URL constructions...")
    print("=" * 50)
    
    base_url = "https://careerpath-production-fd70.up.railway.app"
    headers = {"Origin": "https://career-path-phi.vercel.app"}
    
    # Test cases with different URL constructions
    test_cases = [
        {
            "name": "Correct URL (no double slashes)",
            "url": f"{base_url}/api/videos",
            "expected_status": 200
        },
        {
            "name": "URL with double slashes",
            "url": f"{base_url}//api/videos",
            "expected_status": 405  # Should fail with 405 Method Not Allowed
        }
    ]
    
    results = []
    
    for test_case in test_cases:
        print(f"\nTesting: {test_case['name']}")
        print(f"URL: {test_case['url']}")
        
        try:
            response = requests.get(test_case['url'], headers=headers, timeout=10)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == test_case['expected_status']:
                print("✅ Test result: PASSED")
                results.append(True)
            else:
                print(f"❌ Test result: FAILED (expected {test_case['expected_status']})")
                results.append(False)
                
            # Show response headers for debugging
            if response.status_code == 405:
                print("Headers:", dict(response.headers))
                
        except Exception as e:
            print(f"❌ Test result: ERROR - {e}")
            results.append(False)
    
    return all(results)

def test_safe_url_builder():
    """Test the safe URL builder function"""
    print("\n\nTesting Safe URL Builder Function...")
    print("=" * 50)
    
    # Safe URL builder function (same as in frontend)
    def build_api_url(base, endpoint):
        # Remove trailing slash from base URL if present
        clean_base = base.endswith('/') and base[:-1] or base
        # Remove leading slash from endpoint if present
        clean_endpoint = endpoint.startswith('/') and endpoint[1:] or endpoint
        # Combine with single slash
        return f"{clean_base}/{clean_endpoint}"
    
    # Test cases
    test_cases = [
        {
            "name": "Base without slash, endpoint without slash",
            "base": "https://careerpath-production-fd70.up.railway.app",
            "endpoint": "api/videos",
            "expected": "https://careerpath-production-fd70.up.railway.app/api/videos"
        },
        {
            "name": "Base with slash, endpoint without slash",
            "base": "https://careerpath-production-fd70.up.railway.app/",
            "endpoint": "api/videos",
            "expected": "https://careerpath-production-fd70.up.railway.app/api/videos"
        },
        {
            "name": "Base without slash, endpoint with slash",
            "base": "https://careerpath-production-fd70.up.railway.app",
            "endpoint": "/api/videos",
            "expected": "https://careerpath-production-fd70.up.railway.app/api/videos"
        },
        {
            "name": "Base with slash, endpoint with slash",
            "base": "https://careerpath-production-fd70.up.railway.app/",
            "endpoint": "/api/videos",
            "expected": "https://careerpath-production-fd70.up.railway.app/api/videos"
        }
    ]
    
    results = []
    
    for test_case in test_cases:
        print(f"\nTesting: {test_case['name']}")
        result = build_api_url(test_case['base'], test_case['endpoint'])
        passed = result == test_case['expected']
        
        print(f"Base: {test_case['base']}")
        print(f"Endpoint: {test_case['endpoint']}")
        print(f"Result: {result}")
        print(f"Expected: {test_case['expected']}")
        
        if passed:
            print("✅ Test result: PASSED")
            results.append(True)
        else:
            print("❌ Test result: FAILED")
            results.append(False)
    
    return all(results)

def main():
    print("🚀 Career Nirvana API URL Construction Test")
    print("=" * 60)
    
    # Test API URLs
    api_test_passed = test_api_urls()
    
    # Wait a moment
    time.sleep(1)
    
    # Test safe URL builder
    builder_test_passed = test_safe_url_builder()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    if api_test_passed and builder_test_passed:
        print("🎉 ALL TESTS PASSED!")
        print("✅ API URLs are constructed correctly")
        print("✅ Safe URL builder function works properly")
        print("\nYour frontend should now be able to connect to the backend without double slash issues.")
    else:
        print("⚠️  SOME TESTS FAILED")
        if not api_test_passed:
            print("❌ API URL construction has issues")
        if not builder_test_passed:
            print("❌ Safe URL builder function has issues")
        
        print("\n🔧 Troubleshooting steps:")
        print("1. Check that your frontend uses the safe URL builder function")
        print("2. Verify that API_BASE_URL doesn't have a trailing slash")
        print("3. Ensure endpoints don't have leading slashes when passed to apiRequest")

if __name__ == "__main__":
    main()