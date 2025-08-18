import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './auth';
import { UserProfile } from '@/types/users';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://two47sma.onrender.com';

interface ApiSuccessResponse<T> {
  success: true;
  token: string;
  data: T;
  statusCode?: number;
}

interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    details?: unknown;
  };
}

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
    let responseData;

    if (contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      return {
        success: false,
        error: {
          message: response.statusText || 'Invalid response format',
          statusCode: response.status,
          details: text
        }
      };
    }

    if (!response.ok) {
      // Handle your backend's error response structure
      const errorMessage = responseData.message || 
                         responseData.error?.message || 
                         'Something went wrong';
      
      toast.error(errorMessage);
      
      return {
        success: false,
        error: {
          message: errorMessage,
          statusCode: response.status,
          details: responseData.error?.details
        }
      };
    }

    // Handle successful response
    return {
      success: true,
      token: responseData.token,
      data: responseData.data || responseData,
      statusCode: response.status
    };

  } catch (error: unknown) {
    console.error('API request failed:', error);
    let errorMessage = 'Network request failed';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    toast.error(errorMessage);

    return {
      success: false,
      error: {
        message: errorMessage,
        statusCode: 500
      }
    };
  }
}

async function fetchWithAuth<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  
  if (!token) {
    toast.error('Authentication required');
    return {
      success: false,
      error: {
        message: 'No authentication token found',
        statusCode: 401
      }
    };
  }

  return fetchApi<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
}

// Auth API functions
export const login = async (credentials: { email: string; password: string }) => {
  const response = await fetchApi<{ token: string }>('/api/buyer/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.success && response.token) {
    return response;
  }
  
  return response;
};

export const signup = async (userData: { 
  email: string, 
  password: string, 
  passwordConfirm: string 
}) => {
  return fetchApi<{ message: string }>('/api/buyer/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const verifyEmail = async (token: string) => {
  return fetchApi<{ token: string }>(`/api/buyer/verify-email/${token}`);
};

export const forgotPassword = async (email: string) => {
  return fetchApi<{ message: string }>('/api/buyer/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (token: string, password: string) => {
  return fetchApi<{ message: string }>(`/api/buyer/reset-password/${token}`, {
    method: 'PATCH',
    body: JSON.stringify({ password }),
  });
};

// Profile API functions
export const getUserProfile = async () => {
  return fetchWithAuth<UserProfile>('/api/buyer/profile');
};

export const updateUserProfile = async (data: Partial<UserProfile>) => {
  return fetchWithAuth<UserProfile>('/api/buyer/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const uploadProfileImage = async (file: File) => {
  const token = getToken();
  if (!token) {
    toast.error('Authentication required');
    return {
      success: false,
      error: {
        message: 'No authentication token found',
        statusCode: 401
      }
    };
  }

  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const response = await fetch(`${BASE_URL}/api/buyer/profile/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || 'Image upload failed';
      toast.error(errorMessage);
      return {
        success: false,
        error: {
          message: errorMessage,
          statusCode: response.status,
          details: responseData.error?.details
        }
      };
    }

    return {
      success: true,
      data: responseData.data || { imageUrl: responseData.imageUrl },
      statusCode: response.status
    };

  } catch (error: unknown) {
    console.error('Image upload failed:', error);
    let errorMessage = 'Image upload failed';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toast.error(errorMessage);

    return {
      success: false,
      error: {
        message: errorMessage,
        statusCode: 500
      }
    };
  }
};

// Define order response types
interface OrderResponse {
  id: string;
  customerId: string;
  orderNumber: string;
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    variantId: string;
    variantName: string;
    quantity: number;
    price: number;
    total: number;
    weight: number;
    weightUnit: string;
    farmerId: string;
  }>;
  subtotal: number;
  tax: number;
  shipping: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    method: string;
    cost: number;
    estimatedDelivery?: string;
    trackingNumber?: string;
  };
  payment: {
    method: string;
    transactionId?: string;
    status: string;
    paidAt?: string;
    total: number;
  };
  total: number;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// Orders API functions
export const getUserOrders = async () => {
  return fetchWithAuth<OrderResponse[]>('/api/buyer/orders');
};

export const getOrderById = async (orderId: string) => {
  return fetchWithAuth<OrderResponse>(`/api/buyer/orders/${orderId}`);
};