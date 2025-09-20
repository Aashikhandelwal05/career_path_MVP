# 🚀 CareerPath – AI-Powered Career Discovery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.68%2B-009688?logo=fastapi)](https://fastapi.tiangolo.com/)

**Tagline:** From Confusion to Clarity — Personalized AI career guidance for India's next generation.

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [🚨 Problem Statement](#-problem-statement)
- [✨ Our Solution](#-our-solution)
- [🧭 The Guided Discovery Journey](#-the-guided-discovery-journey)
- [⚡ Features](#-features)
- [🏗️ Technical Architecture](#-technical-architecture)
- [🚀 Installation & Setup](#-installation--setup)
- [📖 API Documentation](#-api-documentation)
- [📸 Screenshots (Demo Flow)](#-screenshots-demo-flow)
- [🎯 Social Impact & Market Vision](#-social-impact--market-vision)
- [🔮 Future Roadmap](#-future-roadmap)
- [👥 Team](#-team)
- [📄 License](#-license)

## 🌟 Overview

CareerPath is an AI-powered career advisor designed for Indian students and young professionals who are confused about their career choices.

Instead of providing generic advice, our platform:

- 🎯 **Personalizes recommendations** based on a student's background & goals
- 🔗 **Bridges the gap** between skills and careers with our "AI Skill Bridge" technology
- 🌟 **Shows real-world pathways** through career stories, earnings, and action steps

**🚀 MVP Goal:** Demonstrate how a student can go from "confused" to "clear" in just one session using our 4-stage Guided Discovery Journey.

## 🚨 Problem Statement

📊 **The Challenge:**
- 86% of Indian students feel confused about career choices
- Millions graduate each year, but only ~10% find jobs aligned with their studies
- Traditional counseling = generic, outdated, disconnected from job market
- Social stigma around non-traditional paths → students ignore high-earning alternatives

**🎯 Need:** A modern, personalized, and dynamic career advisory platform that adapts to new job roles and individual strengths.

## ✨ Our Solution

We built CareerPath to be more than a platform — it's a personal cofounder for your career journey.

### ✅ What's Working Now (MVP)

✅ **Tech Stack:**
- Frontend: React + TypeScript + Vite
- Backend: FastAPI (Python)
- Deployment: Vercel (Frontend) + Railway (Backend)

✅ **Core Features:**
- 🚀 FastAPI backend + React frontend
- 👤 Onboarding flow to capture interests & goals
- 📚 Personalized feed with curated career paths (mock/video placeholders)
- 🤖 AI Skill Bridge simulated with mock AI API responses
- 🌐 Public deployment:
  - Frontend: Vercel
  - Backend: Railway

### 🚀 What's Coming (Full Vision)

🔮 **Future Enhancements:**
- 🦙 Llama-powered AI → Real skill gap analysis + roadmaps
- 🎥 Content pipeline → Career videos, transcripts, AI-powered skill extraction
- 🗄️ Database (PostgreSQL/Cloud SQL) for scalable user data & career content
- 💼 Experience Hub → Micro-internships, mentorships, real projects

## 🧭 The Guided Discovery Journey

### 1️⃣ Personalization Engine (Onboarding)
User answers a few quick questions → generates a personal "For You" feed

### 2️⃣ Dual-Mode Discovery (Library)
- 🤖 Recommended paths (AI-curated)
- 🔍 Explorer mode (self-browse all stories)

### 3️⃣ AI Skill Bridge (Core Innovation)
AI connects user's existing skills to unexpected careers

**Example:** _"Your B.Tech skills in problem-solving & planning can help you as a Makeup Artist by managing complex event logistics."_

### 4️⃣ Experience Hub (Action Catalyst)
Shows real-world projects, internships, or mentorships (mock in MVP)

## ⚡ Features

### MVP (Hackathon Build)
- ⚛️ React + FastAPI deployment
- 👤 Onboarding flow with user profile
- 📚 Career feed with sample stories
- 🤖 Mock AI responses showing personalized guidance
- 🌐 Public deployment (Vercel + Railway)
- 📱 Responsive design for all devices

### Future (Full Vision)
- 🦙 Llama API integration for AI analysis
- 🎥 Real video content with transcripts
- 👩‍🏫 Mentor marketplace & micro-internships
- 🛣️ Skill roadmap with milestones & resources
- 🌍 Multi-language support (Hindi, Tamil, Telugu, etc.)

## 🏗️ Technical Architecture

### Current MVP
```
React Frontend (Vercel)  ←→  FastAPI Backend (Railway)  ←→  AI Layer
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
- OpenRouter API key (for AI tools, planned)

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

1. 🏠 Landing Page → Inspiring value proposition
2. 👤 Onboarding → Simple, guided flow
3. 📚 Career Feed → Cards with stories
4. 🤖 AI Modal → Personalized insights

## 🎯 Social Impact & Market Vision

### 🌍 Impact Goals
- Reduce graduate unemployment by 15% in target cities
- Help students discover non-traditional, high-earning paths
- Normalize career diversity (beyond engineering/medical)

### 💼 Market Opportunity
- 50M+ students in India seeking career guidance annually
- $2B+ edtech market in India
- Growing demand for personalized learning solutions

## 🔮 Future Roadmap

### Phase 1: Enhanced Personalization (Q1 2025)
- [ ] Real AI integration with OpenRouter
- [ ] Expanded career database (50+ careers)
- [ ] User profile enhancement

### Phase 2: Content & Community (Q2 2025)
- [ ] Video content pipeline
- [ ] User-generated stories
- [ ] Community features

### Phase 3: Experience Hub (Q3 2025)
- [ ] Micro-internships marketplace
- [ ] Mentor matching system
- [ ] Skill assessment tools

### Phase 4: Scale & Monetization (Q4 2025)
- [ ] Multi-language support
- [ ] Mobile app launch
- [ ] Premium features

## 👥 Team

- 👨‍💻 **Aashik H** - Full Stack Developer & AI Integration
- 👩‍💻 **[Your Name]** - UI/UX Designer & Frontend Developer
- 👨‍💼 **[Your Name]** - Product Manager & Business Strategy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built with ❤️ to guide India's students into a brighter career future.</strong>
</p>

<p align="center">
  <a href="https://career-path-theta.vercel.app">🌐 Visit Live Demo</a> •
  <a href="https://github.com/your-username/careerpath/issues">🐛 Report Bug</a> •
  <a href="https://github.com/your-username/careerpath/issues">✨ Request Feature</a>
</p>