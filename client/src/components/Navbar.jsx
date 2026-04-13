import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut, FileText, FolderOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const auth = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg shadow-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between" style={{ height: '60px' }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">
            Resume<span className="text-blue-200 font-medium">AI</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* My Resumes link — only when logged in */}
          {auth.isLoggedIn && (
            <Link to="/myresumes"
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/80 hover:text-white font-semibold transition">
              <FolderOpen className="w-4 h-4" /> My Resumes
            </Link>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-11 h-6 rounded-full bg-white/20 border border-white/30 relative flex items-center transition-all hover:bg-white/30"
            title="Toggle theme"
          >
            <span
              className="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 flex items-center justify-center"
              style={{ transform: dark ? 'translateX(22px)' : 'translateX(2px)' }}
            >
              {dark
                ? <Moon className="w-3 h-3 text-blue-800" />
                : <Sun  className="w-3 h-3 text-yellow-500" />}
            </span>
          </button>

          {auth.isLoggedIn ? (
            <>
              <span className="text-blue-100 text-sm font-medium hidden sm:block">
                Hi, {auth.user?.name?.split(' ')[0]} 👋
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-white bg-white/15 border border-white/25 rounded-lg px-3 py-1.5 hover:bg-white/25 transition font-semibold"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm text-white font-semibold hover:text-blue-200 transition">
                Login
              </Link>
              <Link to="/signup"
                className="text-sm font-bold bg-white text-blue-800 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition shadow">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}