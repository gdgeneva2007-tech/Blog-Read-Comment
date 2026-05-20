// src/hooks/useAuth.js
// Custom hook to easily access auth context in any component

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}

// Usage in any component:
// import { useAuth } from '../hooks/useAuth'
// const { user, login, logout, isLoggedIn } = useAuth()