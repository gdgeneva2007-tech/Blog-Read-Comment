// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound