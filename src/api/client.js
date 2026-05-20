// src/api/client.js
// Axios is like fetch but with better defaults
// This file sets up a central API client

import axios from 'axios'

const client = axios.create({
  // Read API URL from environment variable
  // In .env: VITE_API_URL=http://localhost:5000
  // VITE_ prefix required for Vite to expose env vars
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

// ─────────────────────────────────────────────────────
// Request Interceptor
// Runs BEFORE every request is sent
// Automatically attaches the JWT token
// ─────────────────────────────────────────────────────
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    // Every request now has: Authorization: Bearer eyJ...
  }

  return config
})

// ─────────────────────────────────────────────────────
// Response Interceptor
// Runs AFTER every response is received
// Handles token expiry globally
// ─────────────────────────────────────────────────────
client.interceptors.response.use(
  // Success: just return the response
  (response) => response,

  // Error: check if it is an auth error
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      // Clear storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default client