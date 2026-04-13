import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { authAPI } from '../api'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)

  const auth     = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name || !email || !password || !confirm) {
      toast.error('Please fill all fields')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res  = await authAPI.signup({ name, email, password })
      auth.login(res.data.user, res.data.token)
      toast.success('Account created! Welcome ' + res.data.user.name + ' 🎉')
      navigate('/builder')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition text-sm"
  const lbl = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">

            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-blue-800 dark:text-blue-300" />
              </div>
              <h1 className="font-serif text-3xl text-gray-900 dark:text-white">Create account</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Start building your resume today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div>
                <label className={lbl}>Full Name</label>
                <input type="text" placeholder="Rahul Sharma"
                  value={name} onChange={e => setName(e.target.value)}
                  className={inp} />
              </div>
              <div>
                <label className={lbl}>Email Address</label>
                <input type="email" placeholder="rahul@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className={inp} />
              </div>
              <div>
                <label className={lbl}>Password</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} placeholder="Min 6 characters"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className={inp + ' pr-11'} />
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={lbl}>Confirm Password</label>
                <input type="password" placeholder="Re-enter password"
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  className={inp} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700 dark:text-blue-400 font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}