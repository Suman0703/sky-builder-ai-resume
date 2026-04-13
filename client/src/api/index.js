import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

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
}

export default api