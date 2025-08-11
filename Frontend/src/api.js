// frontend/src/api.js - Enhanced with better error handling
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API_URL:', API_URL); // Debug log

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add debugging to requests
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('Full URL:', config.baseURL + config.url);
    console.log('Request data:', config.data);
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add debugging to responses
api.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url);
    console.log('Response data:', response.data);
    console.log('Response status:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error Details:');
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing tokens and redirecting');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.log('Forbidden - user lacks permissions');
    } else if (error.response?.status === 404) {
      console.log('Not Found - endpoint may not exist');
    } else if (error.response?.status >= 500) {
      console.log('Server Error - backend issue');
    } else if (error.code === 'ECONNABORTED') {
      console.log('Request timeout');
    } else if (error.code === 'ERR_NETWORK') {
      console.log('Network error - check if backend is running');
    }
    
    return Promise.reject(error);
  }
);

// Auth functions with enhanced error handling
export const register = async (userData) => {
  try {
    console.log('Attempting registration with data:', { ...userData, password: '[HIDDEN]' });
    const response = await api.post('/signup', userData);
    console.log('Registration successful');
    return response;
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    console.log('Attempting login with email:', userData.email);
    const response = await api.post('/login', userData);
    console.log('Login successful');
    return response;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getMe = async () => {
  try {
    console.log('Fetching user profile');
    const response = await api.get('/me');
    return response;
  } catch (error) {
    console.error('Failed to fetch user profile:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getProtectedData = async () => {
  try {
    console.log('Fetching protected data');
    const response = await api.get('/protected');
    return response;
  } catch (error) {
    console.error('Failed to fetch protected data:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Utility functions
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const logout = () => {
  console.log('Logging out user');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');
  window.location.href = '/login';
};

export default api;

/*
// frontend/src/api.js - Add debugging
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API_URL:', API_URL); // Debug log

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add debugging to requests
api.interceptors.request.use((config) => {
  console.log('Making request to:', config.url);
  console.log('Full URL:', config.baseURL + config.url);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add debugging to responses
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.log('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const register = (userData) => api.post('/signup', userData);
export const login = (userData) => api.post('/login', userData);
export const getMe = () => api.get('/me');
export const getProtectedData = () => api.get('/protected');

export default api;
*/