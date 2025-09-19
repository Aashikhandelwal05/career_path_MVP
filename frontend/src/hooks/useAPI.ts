import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { videoAPI, jobAPI, aiAPI, userAPI, VideoCard, JobDetail, AIResponse, ChatMessage, UserProfile } from '../services/api';

// Query keys for caching
export const QUERY_KEYS = {
  VIDEOS: 'videos',
  JOB: 'job',
  AI_RESPONSE: 'ai-response',
  USER_PROFILE: 'user-profile',
} as const;

// Hook for fetching videos
export const useVideos = () => {
  return useQuery<VideoCard[], Error>({
    queryKey: [QUERY_KEYS.VIDEOS],
    queryFn: videoAPI.getVideos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook for fetching job details by ID
export const useJob = (id: string) => {
  return useQuery<JobDetail, Error>({
    queryKey: [QUERY_KEYS.JOB, id],
    queryFn: () => jobAPI.getJobById(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Hook for user signup
export const useSignup = () => {
  const queryClient = useQueryClient();
  
  return useMutation<UserProfile, Error, Omit<UserProfile, 'id'>>({
    mutationFn: userAPI.signup,
    onSuccess: (data) => {
      // Cache the user profile
      queryClient.setQueryData([QUERY_KEYS.USER_PROFILE, data.id], data);
      
      // Store user ID in localStorage for future requests
      localStorage.setItem('userId', data.id);
    },
  });
};

// Hook for fetching user profile
export const useUserProfile = (id: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: [QUERY_KEYS.USER_PROFILE, id],
    queryFn: () => userAPI.getProfile(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for asking AI about a career
export const useAskAI = () => {
  const queryClient = useQueryClient();
  
  return useMutation<AIResponse, Error, { jobId: string; question?: string; history?: ChatMessage[]; userId?: string }>({
    mutationFn: ({ jobId, question, history, userId }) => aiAPI.askAboutCareer(jobId, question, history, userId),
    onSuccess: (data, variables) => {
      // Cache the AI response for potential reuse
      queryClient.setQueryData(
        [QUERY_KEYS.AI_RESPONSE, variables.jobId], 
        data
      );
    },
  });
};