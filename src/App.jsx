// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
// import your project pages below:
// import Dashboard from './pages/Dashboard'

function App(){
  return (
    //AuthProvider wraps everything so all components 
    //can access auth state via useAuth()
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{padding:'1rem'}}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Signup />}/>
            {/* Protected route example: */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}

            <Route path="*" element={<NotFound />}/>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App