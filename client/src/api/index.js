import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

export const userAPI = {
  create: (userData) => api.post('/users', userData),
  get: (username) => api.get(`/users/${username}`)
};


export const aiAPI = {
  chat: (message) => api.post('/ai/chat', { message }),
  evaluate: (portfolioData) => api.post('/ai/evaluate', { portfolioData })
};