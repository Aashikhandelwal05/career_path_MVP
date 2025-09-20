

```markdown
# CareerPath – AI-Powered Career Discovery Platform

**Tagline:** From Confusion to Clarity — Personalized AI career guidance for India's next generation.

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [The Guided Discovery Journey](#-the-guided-discovery-journey)
- [Features](#-features)
- [Technical Architecture](#-technical-architecture)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Screenshots (Demo Flow)](#-screenshots-demo-flow)
- [Future Roadmap](#-future-roadmap)
- [Social Impact & Market Vision](#-social-impact--market-vision)
- [Team](#-team)
- [License](#-license)

## 🌍 Overview

CareerPath is an AI-powered career advisor designed for Indian students and young professionals who are confused about their career choices.
Instead of providing generic advice, our platform:

- Personalizes recommendations based on a student's background & goals
- Bridges the gap between skills and careers with our "AI Skill Bridge" technology
- Shows real-world pathways through career stories, earnings, and action steps

**🚀 MVP Goal:** Demonstrate how a student can go from "confused" to "clear" in just one session using our 4-stage Guided Discovery Journey.

## 🚨 Problem Statement

- 86% of Indian students feel confused about career choices
- Millions graduate each year, but only ~10% find jobs aligned with their studies
- Traditional counseling = generic, outdated, disconnected from job market
- Social stigma around non-traditional paths → students ignore high-earning alternatives

**🎯 Need:** A modern, personalized, and dynamic career advisory platform that adapts to new job roles and individual strengths.

## ✨ Our Solution

We built CareerPath to be more than a platform — it's a personal cofounder for your career journey.

### ✅ What's Working Now (MVP)

- FastAPI backend + React frontend
- Onboarding flow to capture interests & goals
- Personalized feed with curated career paths (mock/video placeholders)
- AI Skill Bridge simulated with mock AI API responses
- Deployed live:
  - Frontend: Vercel
  - Backend: Railway

### 🚀 What's Coming (Full Vision)

- Llama-powered AI → Real skill gap analysis + roadmaps
- Content pipeline → Career videos, transcripts, AI-powered skill extraction
- Database (PostgreSQL/Cloud SQL) for scalable user data & career content
- Experience Hub → Micro-internships, mentorships, real projects

## 🧭 The Guided Discovery Journey

### 1. Personalization Engine (Onboarding)
User answers a few quick questions → generates a personal "For You" feed

### 2. Dual-Mode Discovery (Library)
- Recommended paths (AI-curated)
- Explorer mode (self-browse all stories)

### 3. AI Skill Bridge (Core Innovation)
AI connects user's existing skills to unexpected careers

Example: "Your B.Tech skills in problem-solving & planning can help you as a Makeup Artist by managing complex event logistics."

### 4. Experience Hub (Action Catalyst)
Shows real-world projects, internships, or mentorships (mock in MVP)

## ⚡ Features

### MVP (Hackathon Build)
- React + FastAPI deployment
- Onboarding flow with user profile
- Career feed with sample stories
- Mock AI responses showing personalized guidance
- Public deployment (Vercel + Railway)

### Future (Full Vision)
- Llama API integration for AI analysis
- Real video content with transcripts
- Mentor marketplace & micro-internships
- Skill roadmap with milestones & resources
- Multi-language support (Hindi, Tamil, Telugu, etc.)

## 🏗️ Technical Architecture

### Current MVP
```
React Frontend (Vercel)  <——>  FastAPI Backend (Railway)  <——>   AI Layer
```

### Production Vision
```
React Frontend (Vercel)  
     ↕
FastAPI Backend (Cloud Run / Railway)  
     ↕
Cloud SQL (PostgreSQL) + Cloud Storage (Videos)  
     ↕
Vertex AI Pipeline (Llama, Speech-to-Text, Skill Analysis)
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- Llama API key (for AI tools, planned)

### Frontend Setup
```bash
git clone https://github.com/your-username/careerpath.git
cd careerpath/frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📖 API Documentation

### Base URL
MVP: https://careerpath-production-fd70.up.railway.app

### Sample Endpoints
- `GET /api/videos` → List of curated career videos (mock data)
- `GET /api/job/{id}` → Career details (mock data)
- `POST /api/user/signup` → Create user profile
- `POST /api/ask` → AI response (mock Llama)

### Sample Response (AI Ask):
```json
{
  "response": "Your B.Tech background gives you logical problem-solving skills useful in creative fields like Makeup.",
  "career_title": "Makeup Artist"
}
```

## 📸 Screenshots (Demo Flow)

1. Landing Page → Inspiring value proposition
2. Onboarding → Simple, guided flow
3. Career Feed → Cards with stories
4. AI Modal → Personalized insights

### 🎯 Impact Goals
- Reduce graduate unemployment by 15% in target cities
- Help students discover non-traditional, high-earning paths
- Normalize career diversity (beyond engineering/medical)


## 📄 License

This project is licensed under the MIT License.

Built with ❤️ to guide India's students into a brighter career future.
```


