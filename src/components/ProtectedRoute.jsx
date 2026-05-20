// src/components/ProtectedRoute.jsx
// Wraps routes that require authentication
// Redirects to /login if not logged in

import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    // Replace current history entry so back button works correctly
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

// Usage in App.jsx:
// <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   }
// />