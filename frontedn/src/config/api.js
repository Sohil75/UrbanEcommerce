
import axios from 'axios';
const DEPLOYED='https://urbanecommerce-1.onrender.com'
const LOCALHOST='http://localhost:5454'

export const API_BASE_URL = LOCALHOST;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt'); // Fetch token at runtime
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
