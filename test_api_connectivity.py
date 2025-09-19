#!/usr/bin/env python3
"""
Test script to verify API connectivity between frontend and backend
"""

import requests
import os
from urllib.parse import urljoin

def test_backend_api(backend_url):
    """Test backend API endpoints"""
    print(f"Testing backend API at: {backend_url}")
    
    # Test health endpoint
    try:
        health_url = urljoin(backend_url, "/api/health")
        print(f"Testing health endpoint: {health_url}")
        response = requests.get(health_url, timeout=10)
        if response.status_code == 200:
            print("✅ Health check: PASSED")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ Health check: FAILED (Error: {e})")
    
    # Test videos endpoint
    try:
        videos_url = urljoin(backend_url, "/api/videos")
        print(f"Testing videos endpoint: {videos_url}")
        response = requests.get(videos_url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Videos endpoint: PASSED ({len(data)} videos found)")
        else:
            print(f"❌ Videos endpoint: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ Videos endpoint: FAILED (Error: {e})")
    
    # Test a specific job endpoint
    try:
        job_url = urljoin(backend_url, "/api/job/golgappa_seller")
        print(f"Testing job endpoint: {job_url}")
        response = requests.get(job_url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Job endpoint: PASSED")
            print(f"   Job title: {data.get('title', 'N/A')}")
        else:
            print(f"❌ Job endpoint: FAILED (Status: {response.status_code})")
    except Exception as e:
        print(f"❌ Job endpoint: FAILED (Error: {e})")

def test_cors_configuration(backend_url, frontend_url):
    """Test CORS configuration"""
    print(f"\nTesting CORS configuration:")
    print(f"Backend URL: {backend_url}")
    print(f"Frontend URL: {frontend_url}")
    
    try:
        videos_url = urljoin(backend_url, "/api/videos")
        response = requests.get(videos_url, headers={
            "Origin": frontend_url
        }, timeout=10)
        
        # Check if the Origin is in the response headers
        allow_origin = response.headers.get('Access-Control-Allow-Origin', '')
        if frontend_url in allow_origin or allow_origin == '*':
            print("✅ CORS check: PASSED")
            print(f"   Allowed origins: {allow_origin}")
        else:
            print(f"❌ CORS check: FAILED")
            print(f"   Backend allows: {allow_origin}")
            print(f"   Frontend needs: {frontend_url}")
    except Exception as e:
        print(f"❌ CORS check: FAILED (Error: {e})")

if __name__ == "__main__":
    # Get URLs from environment or use defaults
    backend_url = os.getenv("BACKEND_URL", "https://careerpath-production-fd70.up.railway.app")
    frontend_url = os.getenv("FRONTEND_URL", "https://career-path-flame.vercel.app")
    
    print("=== API Connectivity Test ===\n")
    
    test_backend_api(backend_url)
    test_cors_configuration(backend_url, frontend_url)
    
    print("\n=== Test Complete ===")