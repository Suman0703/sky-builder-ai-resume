import axios from 'axios'

// 🧠 SMART DETECT: Check if we are running locally or on the live internet
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const BASE_URL = isLocalhost 
  ? 'http://localhost:5000/api'                           // Use local server if testing on computer
  : 'https://sky-builder-ai-resume.onrender.com/api';     // Use live Render server if on Vercel

const api = axios.create({
  baseURL: BASE_URL,
})

// Attaches your JWT token to requests if the user is logged in
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login:  (data) => api.post('/auth/login', data),
}

export const resumeAPI = {
  save:   (data)       => api.post('/resume', data),
  get:    ()           => api.get('/resume'),
  update: (id, data)   => api.put(`/resume/${id}`, data),
  delete: (id)         => api.delete(`/resume/${id}`),
}

export const aiAPI = {
  generateSummary: (data) => api.post('/ai/summary', data),
  generateObjective: (data) => api.post('/ai/objective', data),
}

export default api