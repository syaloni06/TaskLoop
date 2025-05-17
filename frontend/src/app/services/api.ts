// services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskloop.onrender.com', // Change this if your Express backend is hosted elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
