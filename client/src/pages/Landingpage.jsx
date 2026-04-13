import { Link } from 'react-router-dom'
import { FileText, Zap, Download, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const features = [
  { icon: Zap,        title: 'AI-Powered Suggestions', desc: 'Rule-based AI logic auto-suggests professional content based on your input.' },
  { icon: FileText,   title: 'Live Preview',           desc: 'See your resume update in real-time as you fill in your details.' },
  { icon: Download,   title: 'PDF Download',           desc: 'Export a clean, professional PDF resume in one click.' },
  { icon: Shield,     title: 'Secure & Private',       desc: 'Your data is stored securely. Login required to save your progress.' },
]

const steps = [
  'Create a free account or log in',
  'Fill in your personal details, education, and skills',
  'Let AI suggest your professional summary',
  'Download your resume as a PDF',
]

export default function LandingPage() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 dark:from-gray-950 dark:via-blue-950 dark:to-blue-900">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)', backgroundSize:'60px 60px'}} />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-blue-100 text-sm font-semibold mb-8">
            <Zap className="w-4 h-4 text-yellow-300" /> AI-Powered Resume Builder
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-white font-normal leading-tight mb-6">
            Build a Professional Resume<br />
            <span className="text-blue-200">in Minutes, Not Hours</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Our intelligent system guides you step-by-step, suggests content, and automatically formats your resume into a stunning professional layout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isLoggedIn ? '/builder' : '/signup'}
              className="inline-flex items-center gap-2 bg-white text-blue-800 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition shadow-xl text-base"
            >
              {isLoggedIn ? 'Go to Builder' : 'Get Started Free'} <ArrowRight className="w-5 h-5" />
            </Link>
            {!isLoggedIn && (
              <Link to="/login"
                className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/25 transition text-base">
                I have an account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-gray-900 dark:text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
              <p className="text-gray-700 dark:text-blue-100 font-medium text-sm leading-relaxed pt-1">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white text-center mb-12">Why ResumeAI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-4">Ready to build your resume?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Join thousands of students who landed their dream jobs.</p>
        <Link to={isLoggedIn ? '/builder' : '/signup'}
          className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-bold px-10 py-4 rounded-xl transition shadow-lg text-base">
          {isLoggedIn ? 'Open Builder' : 'Create Free Account'} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-8 text-center text-sm text-gray-400">
        © 2025 ResumeAI Builder · Built with React, Node.js & MongoDB
      </footer>
    </div>
  )
}