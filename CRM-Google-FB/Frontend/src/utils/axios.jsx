// src/utils/axios.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  // withCredentials: true,
  // timeout: 5000, // Timeout for requests
});

// Add request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle server errors or network errors
      console.error(error.response.data.message || error.message);
    } else {
      console.error('Network error', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
