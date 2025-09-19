# Personalized AI Responses with User Signup Feature

This document describes the implementation of a personalized AI response system that collects user information through a signup process to provide tailored career advice.

## Features Implemented

### 1. Homepage with Signup Button
- Homepage is displayed first without requiring signup
- Added a "Get Started" button that navigates to the signup page
- Users can explore content before signing up

### 2. User Signup Page
- Created a step-by-step signup form with specific questions:
  - First name (text input)
  - Current status (multiple choice)
  - Primary field of study (multiple choice)
  - Topics of interest (multiple selection)
  - Main goal (multiple choice)
- Implemented form validation
- Added responsive design using shadcn/ui components
- Added progress indicator to show users their progress through the form

### 3. User Data Storage
- User profile information is stored in a JSON file on the backend (`data/users.json`)
- Data persistence ensures users don't need to re-enter information on subsequent visits

### 4. Personalized AI Prompts
- Modified the backend AI service to accept user context information
- Created dynamic prompt templates that incorporate user data:
  - Field of study
  - Career interests
  - Career goals
- Updated the frontend to send user profile data with AI requests
- Implemented fallback to generic prompts when user data is not available

## Technical Implementation

### Frontend Changes
1. **Modified Components**:
   - `Hero.tsx`: Added "Get Started" button that navigates to signup
   - `App.tsx`: Removed automatic redirect to signup
   - `SignupPage.tsx`: Updated form to match required questions with step-by-step approach

2. **API Service Updates**:
   - `api.ts`: Updated user profile interface to match new data structure
   - `useAPI.ts`: Updated hooks to handle new user profile data

### Backend Changes
1. **Enhanced UserProfile Model**:
   - Added fields for status, interests, and goal
   - Updated signup endpoint to handle new data structure

2. **User Management Endpoints**:
   - `/api/user/signup`: Create a new user profile
   - `/api/user/profile/{user_id}`: Get user profile by ID

3. **Personalized Prompt Generation**:
   - Implemented dynamic prompt construction based on user context
   - Created "Pathfinder AI" persona with specific instructions for personalized responses
   - Maintained fallback to generic prompts when user data is not available

4. **Data Storage**:
   - User profiles are stored in `data/users.json`
   - JSON file storage for persistence across sessions

## How It Works

1. **User Journey**:
   - User visits homepage and can explore content
   - User clicks "Get Started" button to navigate to signup
   - User completes the step-by-step signup form with specific questions
   - User data is stored in the backend JSON file
   - User is redirected to homepage with personalized experience

2. **AI Personalization**:
   - When user asks a question about a career, their user ID is sent to the backend
   - Backend retrieves user profile from JSON storage
   - Backend constructs a personalized prompt incorporating:
     - User's field of study
     - User's interests
     - User's career goals
     - Career information
   - AI generates a response tailored to the user's context
   - Response is displayed to the user

## Example Interaction

**Scenario**: A user with a "B.A. in History" is viewing the "Makeup Artist" page.

**User asks**: "What is the typical career progression?"

**Personalized AI Response**:
```
"That's a great question! For a Makeup Artist, the progression often starts with building a portfolio through freelance work for events and weddings. As your reputation grows, you can start your own salon or even work with celebrity clients. What's really interesting for you, with your B.A. in History, is your deep understanding of different eras and cultures. This could give you a unique niche in theatrical or film makeup, recreating historical looks with authenticity—a skill that can set you apart and accelerate your career progression."
```

## Files Modified/Added

### Modified Files
- `src/App.tsx`
- `src/components/Hero.tsx`
- `src/components/SignupPage.tsx`
- `src/services/api.ts`
- `src/hooks/useAPI.ts`
- `backend/app/main.py`
- `SIGNUP_FEATURE.md` (this file)

## API Endpoints

### User Management
- `POST /api/user/signup` - Create a new user profile
- `GET /api/user/profile/{user_id}` - Get user profile by ID

### AI Integration
- `POST /api/ask` - Ask AI about a career (with user context)

## Testing

To test the implementation:

1. Start the backend server
2. Start the frontend development server
3. Visit the homepage
4. Click the "Get Started" button
5. Complete the step-by-step signup form with the specific questions
6. Navigate to a career story page
7. Ask the AI a question
8. Verify that the response is personalized based on your provided information

## Future Improvements

1. **Enhanced Personalization**: Add more user context fields for even more tailored responses
2. **Profile Management**: Allow users to edit their profiles after initial signup
3. **Analytics**: Track which personalization elements are most effective
4. **Security**: Implement proper authentication and authorization for user profiles