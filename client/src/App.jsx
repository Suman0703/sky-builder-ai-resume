import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage    from './pages/Landingpage'
import LoginPage      from './pages/Loginpage'
import SignupPage     from './pages/Signuppage'
import BuilderPage    from './pages/BuilderPage'
import MyResumesPage  from './pages/MyResumesPage'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px' }
      }} />
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/signup"    element={<SignupPage />} />
        <Route path="/builder"   element={<ProtectedRoute><BuilderPage /></ProtectedRoute>} />
        <Route path="/myresumes" element={<ProtectedRoute><MyResumesPage /></ProtectedRoute>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}