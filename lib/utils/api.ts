import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './auth';

const BASE_URL = 'https://two47sma.onrender.com';
// process.env.NEXT_PUBLIC_API_URL || 

interface ApiSuccessResponse<T> {
  data: T;
  error?: never;
}

interface ApiErrorResponse {
  data?: never;
  error: {
    message: string;
    statusCode?: number;
    details?: unknown;
  };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  points: number;
  profileImage?: string;
}

// Backend response interfaces
interface BackendSuccessResponse<T> {
  status: 'success';
  data?: T;
  token?: string;
  message?: string;
}

interface BackendErrorResponse {
  status: 'error' | 'fail';
  message: string;
  error?: {
    message?: string;
    details?: unknown;
  };
}

type BackendResponse<T> = BackendSuccessResponse<T> | BackendErrorResponse;
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const contentType = response.headers.get('Content-Type') || '';

    let backendData: BackendResponse<T>;
    if (contentType.includes('application/json')) {
      backendData = await response.json() as BackendResponse<T>;
    } else {
      const text = await response.text();
      toast.error('Unexpected server response format');
      return {
        error: {
          message: response.statusText,
          statusCode: response.status,
          details: text
        }
      };
    }

    if (!response.ok || backendData.status === 'error' || backendData.status === 'fail') {
      const errorMessage = backendData.message || 'Something went wrong';
      
      return {
        error: {
          message: errorMessage,
          statusCode: response.status,
          details: (backendData as BackendErrorResponse).error?.details
        }
      };
    }

    // Handle successful response
    if (backendData.status === 'success') {
      // For login, the token is at the top level
      if ('token' in backendData && backendData.token) {
        return { data: { token: backendData.token } as T };
      }
      
      // For other responses, return the data
      if ('data' in backendData && backendData.data) {
        return { data: backendData.data };
      }
      
      // For responses with just a message
      if ('message' in backendData && backendData.message) {
        return { data: { message: backendData.message } as T };
      }
    }

    return { data: backendData as T };
  } catch (error: unknown) {
    let errorMessage = 'Network request failed';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as { message?: string }).message === 'string') {
      errorMessage = (error as { message: string }).message;
    }
    toast.error(errorMessage);

    return {
      error: {
        message: errorMessage,
        statusCode: 500
      }
    };
  }
}

// Auth API functions with proper typing
export const login = async (
  credentials: { email: string; password: string }
): Promise<ApiResponse<{ token: string }>> => {
  return fetchApi<{ token: string }>('/api/buyer/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const signup = async (
  userData: { email: string, password: string, passwordConfirm: string }
): Promise<ApiResponse<{ message: string }>> => {
  
  return fetchApi<{ message: string }>('/api/buyer/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const verifyEmail = async (
  token: string
): Promise<ApiResponse<{ token: string }>> => {
  return fetchApi<{ token: string }>(`/api/buyer/verify-email/${token}`);
};

export const forgotPassword = async (
  email: string
): Promise<ApiResponse<{ message: string }>> => {
  return fetchApi<{ message: string }>('/api/buyer/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (
  token: string, 
  password: string
): Promise<ApiResponse<{ message: string }>> => {
  return fetchApi<{ message: string }>(`/api/buyer/reset-password/${token}`, {
    method: 'PATCH',
    body: JSON.stringify({ password }),
  });
};




async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  const backendData = await response.json() as BackendSuccessResponse<T>;
  
  // Return the data from the backend response
  if (backendData.data) {
    return backendData.data;
  }
  
  return backendData as T;
}

// Add these to your existing API functions
export const getUserProfile = async (): Promise<UserProfile> => {
  return fetchWithAuth<UserProfile>('/api/buyer/profile');
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  return fetchWithAuth<UserProfile>('/api/buyer/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const uploadProfileImage = async (file: File): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('profileImage', file);

  const response = await fetch(`${BASE_URL}/api/buyer/profile/image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Image upload failed');
  }

  const backendData = await response.json() as BackendSuccessResponse<{ imageUrl: string }>;
  return backendData.data || { imageUrl: '' };
};