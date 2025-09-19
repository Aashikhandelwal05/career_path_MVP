// Base API configuration and utilities
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Safe URL builder to prevent double slashes
function buildApiUrl(base: string, endpoint: string): string {
  // Remove trailing slash from base URL if present
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Combine with single slash
  return `${cleanBase}/${cleanEndpoint}`;
}

export interface VideoCard {
  id: string;
  title: string;
  short_description: string;
  thumbnail?: string;
}

export interface JobDetail {
  id: string;
  title: string;
  qualification: string;
  skills: string[];
  earning: string;
  investment: string;
  pros: string[];
  cons: string[];
  growth: string;
  description: string;
}

export interface AIResponse {
  response: string;
  career_title: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// User profile interface
export interface UserProfile {
  id: string;
  name: string;
  status: string;
  field_of_study: string;
  interests: string;
  goal: string;
}

// Generic API function
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Build safe URL to prevent double slashes
  const url = buildApiUrl(API_BASE_URL, endpoint);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
}

// Video API functions
export const videoAPI = {
  // Fetch all videos from the backend
  getVideos: (): Promise<VideoCard[]> => {
    return apiRequest<VideoCard[]>('api/videos');
  },
};

// Jobs API functions
export const jobAPI = {
  // Fetch job details by ID
  getJobById: (id: string): Promise<JobDetail> => {
    return apiRequest<JobDetail>(`api/job/${id}`);
  },
};

// User API functions
export const userAPI = {
  // Create a new user profile
  signup: (user: Omit<UserProfile, 'id'>): Promise<UserProfile> => {
    // Generate a simple ID (in a real app, this would be done server-side)
    const userWithId: UserProfile = {
      ...user,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    return apiRequest<UserProfile>('api/user/signup', {
      method: 'POST',
      body: JSON.stringify(userWithId),
    });
  },
  
  // Get user profile by ID
  getProfile: (id: string): Promise<UserProfile> => {
    return apiRequest<UserProfile>(`api/user/profile/${id}`);
  }
};

// AI API functions
export const aiAPI = {
  // Ask AI about a specific career with user context
  askAboutCareer: (jobId: string, question?: string, history?: ChatMessage[], userId?: string): Promise<AIResponse> => {
    return apiRequest<AIResponse>('api/ask', {
      method: 'POST',
      body: JSON.stringify({ 
        job_id: jobId,
        question: question,
        history: history || [],
        user_id: userId,
      }),
    });
  },
};