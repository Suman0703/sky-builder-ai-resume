import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut, FileText, FolderOpen, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const auth = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout()
    setIsMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg shadow-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between" style={{ height: '60px' }}>

        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">
            SKY<span className="text-blue-200 font-medium">BUILDER</span>
          </span>
        </Link>

        {/* Right side Container */}
        <div className="flex items-center gap-4">

          {/* Theme toggle (Always visible) */}
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
                : <Sun className="w-3 h-3 text-yellow-500" />}
            </span>
          </button>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden sm:flex items-center gap-4">
            {auth.isLoggedIn ? (
              <>
                <Link to="/myresumes"
                  className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white font-semibold transition">
                  <FolderOpen className="w-4 h-4" /> My Resumes
                </Link>
                <span className="text-blue-100 text-sm font-medium border-l border-white/20 pl-4">
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
          </nav>

          {/* Mobile Hamburger Button (Hidden on Desktop) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-white p-1 hover:bg-white/10 rounded-lg transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-[60px] left-0 w-full bg-blue-900 border-t border-white/10 shadow-2xl flex flex-col py-4 px-4 gap-2 animate-in slide-in-from-top-2 duration-200">
          {auth.isLoggedIn ? (
            <>
              <span className="text-blue-200 text-sm font-medium px-2 pb-2 mb-2 border-b border-white/10">
                Hi, {auth.user?.name} 👋
              </span>
              <Link to="/myresumes" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-white font-semibold px-2 py-3 hover:bg-white/10 rounded-lg transition">
                <FolderOpen className="w-5 h-5 text-blue-200" /> My Resumes
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-white font-semibold px-2 py-3 hover:bg-white/10 rounded-lg transition text-left w-full">
                <LogOut className="w-5 h-5 text-blue-200" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold px-2 py-3 hover:bg-white/10 rounded-lg transition">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold px-2 py-3 hover:bg-white/10 rounded-lg transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}