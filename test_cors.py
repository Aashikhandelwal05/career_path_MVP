#!/usr/bin/env python3
"""
Test script to verify CORS configuration
"""

import requests
import os

def test_cors_preflight(backend_url, frontend_url):
    """Test CORS preflight request"""
    print(f"Testing CORS preflight for backend: {backend_url}")
    print(f"Origin: {frontend_url}")
    
    try:
        # Test OPTIONS request for /api/videos endpoint
        response = requests.options(
            f"{backend_url}/api/videos",
            headers={
                "Origin": frontend_url,
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
        
        print(f"Access-Control-Allow-Origin: {allow_origin}")
        print(f"Access-Control-Allow-Methods: {allow_methods}")
        print(f"Access-Control-Allow-Headers: {allow_headers}")
        
        if response.status_code == 200:
            print("✅ CORS Preflight Test: PASSED")
            if frontend_url in allow_origin or allow_origin == '*':
                print("✅ CORS Origin Check: PASSED")
            else:
                print("❌ CORS Origin Check: FAILED")
        else:
            print("❌ CORS Preflight Test: FAILED")
            
    except Exception as e:
        print(f"❌ CORS Test Error: {e}")

if __name__ == "__main__":
    # Get URLs from environment or use defaults
    backend_url = os.getenv("BACKEND_URL", "https://careerpath-production-fd70.up.railway.app")
    frontend_url = os.getenv("FRONTEND_URL", "https://career-path-phi.vercel.app")
    
    print("=== CORS Configuration Test ===\n")
    
    test_cors_preflight(backend_url, frontend_url)
    
    print("\n=== Test Complete ===")