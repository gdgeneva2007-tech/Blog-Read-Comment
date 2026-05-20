// src/context/AuthContext.jsx
// Provides auth state to the entire app
// Any component can read: user, login, logout

import { createContext, useState, useEffect } from 'react'
import client from '../api/client'

// Create the context object
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // loading = true while we check localStorage on startup

  // On app startup, restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Called after successful login
  const login = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  // Called when user logs out
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // signup: calls API, does NOT log in automatically
  // you can change this to auto-login if you prefer
  const signup = async (formData) => {
    const response = await client.post('/auth/signup', formData)
    return response.data
  }

  // Exposed values and functions
  const value = {
    user,       // current user object or null
    loading,    // true while checking localStorage
    login,      // call this after successful login
    logout,     // call this to log out
    signup,     // call this to create account
    isLoggedIn: !!user,  // convenience boolean
  }

  return (
    <AuthContext.Provider value={value}>
      {/* Do not render children until we know auth state */}
      {!loading && children}
    </AuthContext.Provider>
  )
}