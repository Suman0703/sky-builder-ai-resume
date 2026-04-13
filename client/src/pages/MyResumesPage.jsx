import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Trash2, Edit, Plus, Calendar, User } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { resumeAPI } from '../api'

export default function MyResumesPage() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchResumes()
  }, [])

  async function fetchResumes() {
    try {
      const res = await resumeAPI.get()
      setResumes(res.data)
    } catch (err) {
      toast.error('Could not load resumes')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this resume?')) return
    try {
      await resumeAPI.delete(id)
      setResumes(resumes.filter(r => r._id !== id))
      toast.success('Resume deleted')
    } catch {
      toast.error('Could not delete resume')
    }
  }

  function handleLoad(resume) {
    // Save to localStorage so BuilderPage can load it
    localStorage.setItem('loadResume', JSON.stringify(resume))
    navigate('/builder')
    toast.success('Resume loaded in builder!')
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 dark:text-white">My Resumes</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {resumes.length} saved resume{resumes.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => { localStorage.removeItem('loadResume'); navigate('/builder') }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded-xl transition shadow-lg"
          >
            <Plus className="w-4 h-4" /> New Resume
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <span className="w-8 h-8 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && resumes.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-10 h-10 text-blue-300" />
            </div>
            <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-2">No resumes yet</h2>
            <p className="text-gray-400 text-sm mb-6">Create your first resume and save it to see it here</p>
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded-xl transition"
            >
              <Plus className="w-4 h-4" /> Create Resume
            </button>
          </div>
        )}

        {/* Resume cards grid */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map(resume => (
              <div key={resume._id}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

                {/* Card top — mini resume preview */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white font-bold text-sm truncate">
                        {resume.personal?.firstName || resume.personal?.lastName
                          ? `${resume.personal.firstName} ${resume.personal.lastName}`.trim()
                          : 'Untitled Resume'}
                      </p>
                      <p className="text-blue-200 text-xs truncate">
                        {resume.personal?.jobTitle || 'No title set'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  {/* Info rows */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {resume.education?.filter(e => e.degree)?.length || 0} education •{' '}
                        {resume.experience?.filter(e => e.title)?.length || 0} experience •{' '}
                        {resume.skills?.length || 0} skills
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Saved on {formatDate(resume.createdAt)}</span>
                    </div>
                  </div>

                  {/* Skills preview */}
                  {resume.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resume.skills.slice(0, 4).map((s, i) => (
                        <span key={i} className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900">
                          {s}
                        </span>
                      ))}
                      {resume.skills.length > 4 && (
                        <span className="text-[10px] text-gray-400 px-1 py-0.5">
                          +{resume.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoad(resume)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/60 border border-red-100 dark:border-red-900 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}