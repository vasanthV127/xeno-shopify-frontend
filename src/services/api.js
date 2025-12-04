import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => 
    axiosInstance.post('/auth/login', { email, password }),
  
  signup: (data) => 
    axiosInstance.post('/auth/signup', data),
};

export const dashboardService = {
  getStats: () => 
    axiosInstance.get('/dashboard/stats'),
  
  getTopCustomers: (limit = 5) => 
    axiosInstance.get(`/dashboard/top-customers?limit=${limit}`),
  
  getOrdersByDate: (startDate, endDate) => 
    axiosInstance.get(`/dashboard/orders-by-date?startDate=${startDate}&endDate=${endDate}`),
};

export const shopifyService = {
  syncData: () => 
    axiosInstance.post('/shopify/sync'),
};

export default axiosInstance;
