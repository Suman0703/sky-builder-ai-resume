import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ChevronRight, ChevronLeft, Plus, Trash2, Sparkles, Download, Save } from 'lucide-react'
import Navbar from '../components/Navbar'
import ResumePreview from '../components/Resumepreview'
import { resumeAPI, aiAPI } from '../api'
import { useAuth } from '../context/AuthContext'

const STEPS = ['Personal', 'Objective', 'Education', 'Experience', 'Skills', 'Projects', 'Achievements', 'Certifications', 'Languages', 'Hobbies', 'Summary']

const SKILL_SUGGESTIONS = [
  'JavaScript', 'React.js', 'Node.js', 'Python', 'Java', 'C++', 'HTML/CSS', 'MySQL',
  'MongoDB', 'Git', 'REST APIs', 'Figma', 'Machine Learning', 'Docker', 'TypeScript',
  'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management',
]

const emptyEdu = () => ({ degree: '', institution: '', year: '', grade: '' })
const emptyExp = () => ({ title: '', company: '', duration: '', location: '', description: '' })
const emptyProj = () => ({ name: '', tech: '', duration: '', description: '' })
const emptyAchievement = () => ({ title: '', description: '' })
const emptyCert = () => ({ name: '', issuer: '', year: '' })
const emptyLang = () => ({ language: '', level: 'Beginner' })

const defaultData = {
  personal: { firstName: '', lastName: '', jobTitle: '', phone: '', email: '', linkedin: '', city: '', github: '' },
  objective: '',
  summary: '',
  education: [emptyEdu()],
  experience: [emptyExp()],
  skills: [],
  projects: [emptyProj()],
  achievements: [emptyAchievement()],
  certifications: [emptyCert()],
  languages: [emptyLang()],
  hobbies: [],
}

export default function BuilderPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('loadResume')
      if (saved) {
        localStorage.removeItem('loadResume')
        const parsed = JSON.parse(saved)
        return {
          personal: parsed.personal || defaultData.personal,
          summary: parsed.summary || '',
          objective: parsed.objective || '',
          education: parsed.education?.length ? parsed.education : [emptyEdu()],
          experience: parsed.experience?.length ? parsed.experience : [emptyExp()],
          skills: parsed.skills || [],
          projects: parsed.projects?.length ? parsed.projects : [emptyProj()],
          achievements: parsed.achievements?.length ? parsed.achievements : [emptyAchievement()],
          certifications: parsed.certifications?.length ? parsed.certifications : [emptyCert()],
          languages: parsed.languages?.length ? parsed.languages : [emptyLang()],
          hobbies: parsed.hobbies || [],
        }
      }
    } catch { }
    return defaultData
  })

  const [skillInput, setSkillInput] = useState('')
  const [hobbyInput, setHobbyInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  // NEW: States for AI Objective
  const [objAiLoading, setObjAiLoading] = useState(false)
  const [objSuggestions, setObjSuggestions] = useState([])

  const [saving, setSaving] = useState(false)
  const [showPreviewMobile, setShowPreviewMobile] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  /* ── helpers ── */
  const setPersonal = (key, val) =>
    setData(d => ({ ...d, personal: { ...d.personal, [key]: val } }))

  const setArr = (key, idx, field, val) =>
    setData(d => ({ ...d, [key]: d[key].map((item, i) => i === idx ? { ...item, [field]: val } : item) }))

  const addRow = key => setData(d => ({
    ...d,
    [key]: [...d[key],
    key === 'education' ? emptyEdu() :
      key === 'experience' ? emptyExp() :
        key === 'achievements' ? emptyAchievement() :
          key === 'certifications' ? emptyCert() :
            key === 'languages' ? emptyLang() :
              emptyProj()
    ]
  }))

  const removeRow = (key, idx) => setData(d => ({ ...d, [key]: d[key].filter((_, i) => i !== idx) }))

  const addSkill = s => {
    const clean = s.trim()
    if (!clean) return
    if (data.skills.includes(clean)) return toast('Already added!', { icon: '👀' })
    setData(d => ({ ...d, skills: [...d.skills, clean] }))
    setSkillInput('')
  }
  const removeSkill = s => setData(d => ({ ...d, skills: d.skills.filter(sk => sk !== s) }))

  const addHobby = s => {
    const clean = s.trim()
    if (!clean) return
    if (data.hobbies.includes(clean)) return toast('Already added!', { icon: '👀' })
    setData(d => ({ ...d, hobbies: [...d.hobbies, clean] }))
    setHobbyInput('')
  }
  const removeHobby = s => setData(d => ({ ...d, hobbies: d.hobbies.filter(h => h !== s) }))

  /* ── AI summary ── */
  const generateSummary = async () => {
    setAiLoading(true)
    setSuggestions([])
    try {
      const { firstName, jobTitle } = data.personal
      const skillStr = data.skills.join(', ') || 'various technical skills'
      const res = await aiAPI.generateSummary({
        firstName: firstName || 'a student',
        jobTitle: jobTitle || 'a tech role',
        skills: skillStr,
      })
      setSuggestions(res.data.suggestions || [])
      toast.success('AI suggestions ready!')
    } catch (err) {
      const msg = err.response?.data?.message || 'AI unavailable'
      toast.error(msg)
      console.error('AI error:', msg)
    } finally {
      setAiLoading(false)
    }
  }

  /* ── AI Objective ── */
  const generateObjective = async () => {
    setObjAiLoading(true)
    setObjSuggestions([])
    try {
      const { firstName, jobTitle } = data.personal
      const skillStr = data.skills.join(', ') || 'technical skills'
      const res = await aiAPI.generateObjective({
        firstName: firstName || 'a student',
        jobTitle: jobTitle || 'a professional role',
        skills: skillStr,
      })
      setObjSuggestions(res.data.suggestions || [])
      toast.success('AI Objectives ready!')
    } catch (err) {
      const msg = err.response?.data?.message || 'AI unavailable'
      toast.error(msg)
    } finally {
      setObjAiLoading(false)
    }
  }

  /* ── Save ── */
  const handleSave = async () => {
    setSaving(true)
    try {
      await resumeAPI.save(data)
      toast.success('Resume saved!')
    } catch {
      toast.error('Could not save. Is the server running?')
    } finally {
      setSaving(false)
    }
  }

  /* ── Print/PDF*/
  const handleDownload = () => {
    const content = document.getElementById('resume-preview').innerHTML
    const w = window.open('', '_blank')
    w.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Resume</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            /* Reset & Print Settings */
            @page { size: A4; margin: 0; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              font-family: 'Inter', -apple-system, sans-serif; 
              background: #fff; 
              color: #111;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* A4 Paper Simulation - Tighter Margins */
            .print-wrapper {
              width: 210mm;
              min-height: 297mm;
              padding: 10mm 12mm; /* Reduced padding for more content */
              margin: 0 auto;
              background: white;
            }

            /* Typography - Crisper, tighter line heights */
            h1, h2, h3 { color: #000; line-height: 1.1; }
            p, span, li { font-size: 9.5pt; line-height: 1.4; color: #222; }
            
            /* Layout & Spacing - Highly Condensed */
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-wrap { flex-wrap: wrap; }
            .items-center { align-items: center; }
            .items-baseline { align-items: baseline; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            
            /* Tighter Gaps */
            .gap-1 { gap: 0.15rem; } 
            .gap-2 { gap: 0.35rem; } 
            .gap-3 { gap: 0.5rem; } 
            .gap-x-4 { column-gap: 0.75rem; }
            
            /* Tighter Margins & Padding */
            .mt-1 { margin-top: 0.15rem; } 
            .mt-2 { margin-top: 0.25rem; } 
            .mt-4 { margin-top: 0.5rem; }
            .mb-1 { margin-bottom: 0.15rem; } 
            .mb-2 { margin-bottom: 0.25rem; } 
            .mb-3 { margin-bottom: 0.5rem; } 
            .mb-4 { margin-bottom: 0.75rem; } 
            .mb-6 { margin-bottom: 1rem; }
            
            .pb-1 { padding-bottom: 0.15rem; } 
            .pb-4 { padding-bottom: 0.75rem; }
            .pt-1 { padding-top: 0.15rem; }

            /* Text Styles */
            .text-xs { font-size: 8.5pt; }
            .text-sm { font-size: 9.5pt; }
            .text-base { font-size: 10.5pt; }
            .text-lg { font-size: 12pt; }
            .text-2xl { font-size: 16pt; }
            .text-3xl { font-size: 20pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; }
            
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            .uppercase { text-transform: uppercase; letter-spacing: 0.05em; }
            .tracking-widest { letter-spacing: 0.08em; }
            .text-center { text-align: center; }
            
            /* Professional Colors */
            .text-gray-500 { color: #555; }
            .text-gray-600 { color: #444; }
            .text-gray-700 { color: #333; }
            .text-gray-900 { color: #000; }
            .text-blue-700 { color: #004080; } /* Darker, more corporate blue */
            .text-blue-800 { color: #002b5e; }
            
            /* Borders & Elements */
            .border-b { border-bottom: 1px solid #ccc; }
            .border-b-2 { border-bottom: 2px solid #bbb; }
            .border-blue-200 { border-color: #a3c2e0; }
            
            /* Skills Tags - More subtle for print */
            .rounded-full { border-radius: 4px; } /* Square edges look more professional on paper */
            .bg-blue-50 { background-color: #f4f7fb !important; }
            .px-3 { padding-left: 0.4rem; padding-right: 0.4rem; }
            .py-1 { padding-top: 0.1rem; padding-bottom: 0.1rem; }

            /* Lists - Tighter */
            ul { list-style-type: square; margin-left: 1rem; }
            li { margin-bottom: 0.1rem; padding-left: 0.1rem; }

            /* Grid */
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-6 { gap: 1rem; }

            /* Sections */
            .space-y-5 > * + * { margin-top: 0.75rem; }
            .space-y-4 > * + * { margin-top: 0.5rem; }
            .space-y-3 > * + * { margin-top: 0.35rem; }
            .space-y-2 > * + * { margin-top: 0.25rem; }
            .space-y-1 > * + * { margin-top: 0.15rem; }

            /* Prevent Page Breaks inside sections */
            .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
            section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 6mm; } /* Tighter bottom margin */
          </style>
        </head>
        <body>
          <div class="print-wrapper">
            ${content}
          </div>
          <script>
            // Wait for font to load before printing
            window.onload = () => {
              setTimeout(() => { window.print(); window.close(); }, 400);
            }
          </script>
        </body>
      </html>
    `)
    w.document.close()
  }

  const progress = Math.round(((step + 1) / STEPS.length) * 100)

  /* ── shared input classes ── */
  const inp = 'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition text-sm'
  const lbl = 'block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>

        {/* ── Sidebar ── */}
        <aside className="hidden md:flex w-48 flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 py-6 flex-shrink-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-5 mb-3">Steps</p>
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => setStep(i)}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-semibold border-l-2 transition-all text-left
                ${i === step
                  ? 'border-blue-700 text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40'
                  : i < step
                    ? 'border-transparent text-black dark:text-gray-300'
                    : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${i === step ? 'bg-blue-800 text-white' : i < step ? 'bg-black text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {i < step ? '✓' : i + 1}
              </span>
              {s}
            </button>
          ))}

          <div className="mt-auto px-4 space-y-2">
            <button onClick={handleSave} disabled={saving}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-900 hover:bg-blue-100 transition disabled:opacity-60">
              <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={handleDownload}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-gray-800 transition">
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </aside>

        {/* ── Form Area ── */}
        <main className="flex-1 overflow-y-auto p-6 pb-28 md:p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>Step {step + 1} of {STEPS.length} — <span className="font-semibold text-gray-600 dark:text-gray-300">{STEPS[step]}</span></span>
              <span>{progress}% complete</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* ── STEP 0: Personal ── */}
          {step === 0 && (
            <FormSection title="Personal Information" desc="Your contact details appear at the top of the resume.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['firstName', 'First Name', 'Suman'], ['lastName', 'Last Name', 'Devi'],
                ['jobTitle', 'Job Title / Role', 'Software Engineer'], ['phone', 'Phone', '+91 98765 43210'],
                ['email', 'Email', 'suman@email.com'], ['city', 'City / Location', 'Jalandhar, Punjab'],
                ['linkedin', 'LinkedIn', 'linkedin.com/in/suman0307'], ['github', 'GitHub', 'github.com/suman0307']
                ].map(([key, label, ph]) => (
                  <div key={key}>
                    <label className={lbl}>{label}</label>
                    <input className={inp} placeholder={ph} value={data.personal[key]}
                      onChange={e => setPersonal(key, e.target.value)} />
                  </div>
                ))}
              </div>
            </FormSection>
          )}

          {/* ── STEP 1: Objective ── */}
          {step === 1 && (
            <FormSection title="Career Objective" desc="A short goal statement for your career.">
              <textarea className={inp + ' min-h-[110px] resize-y'}
                placeholder="e.g. Motivated student seeking..."
                value={data.objective} onChange={e => setData(d => ({ ...d, objective: e.target.value }))} />

              <div className="mt-4">
                <button onClick={generateObjective} disabled={objAiLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-bold hover:bg-blue-200 transition disabled:opacity-60">
                  <Sparkles className="w-4 h-4" />
                  {objAiLoading ? 'Generating...' : '✨ Generate Objective with AI'}
                </button>

                {objSuggestions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Click a suggestion to use it:</p>
                    {objSuggestions.map((sug, idx) => (
                      <div key={idx} onClick={() => setData(d => ({ ...d, objective: sug }))}
                        className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition text-sm text-gray-700 dark:text-gray-300 shadow-sm">
                        {sug}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormSection>
          )}

          {/* ── STEP 2: Education ── */}
          {step === 2 && (
            <FormSection title="Education" desc="Add your qualifications, starting with the most recent.">
              {data.education.map((edu, i) => (
                <BlockCard key={i} onRemove={() => removeRow('education', i)} canRemove={data.education.length > 1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[['degree', 'Degree / Course', 'B.Tech Computer Science'], ['institution', 'Institution', 'LPU / GNDU / IIT Delhi'],
                    ['year', 'Year (From – To)', '2022 – 2026'], ['grade', 'CGPA / Percentage', '8.5 CGPA / 85%']
                    ].map(([key, label, ph]) => (
                      <div key={key}>
                        <label className={lbl}>{label}</label>
                        <input className={inp} placeholder={ph} value={edu[key]}
                          onChange={e => setArr('education', i, key, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </BlockCard>
              ))}
              <AddBtn onClick={() => addRow('education')} label="Add Education" />
            </FormSection>
          )}

          {/* ── STEP 3: Experience ── */}
          {step === 3 && (
            <FormSection title="Work Experience" desc="Add internships, jobs, or freelance work. Freshers can skip.">
              {data.experience.map((exp, i) => (
                <BlockCard key={i} onRemove={() => removeRow('experience', i)} canRemove={data.experience.length > 1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[['title', 'Job Title', 'Software Intern'], ['company', 'Company', 'Tech Corp Pvt. Ltd.'],
                    ['duration', 'Duration', 'May 2024 – Jul 2024'], ['location', 'Location', 'Jalandhar / Remote']
                    ].map(([key, label, ph]) => (
                      <div key={key}>
                        <label className={lbl}>{label}</label>
                        <input className={inp} placeholder={ph} value={exp[key]}
                          onChange={e => setArr('experience', i, key, e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className={lbl}>Responsibilities (one per line)</label>
                    <textarea className={inp + ' min-h-[90px] resize-y'}
                      placeholder={"- Developed REST APIs using Node.js\n- Improved query performance by 40%\n- Collaborated in agile team of 5"}
                      value={exp.description} onChange={e => setArr('experience', i, 'description', e.target.value)} />
                  </div>
                </BlockCard>
              ))}
              <AddBtn onClick={() => addRow('experience')} label="Add Experience" />
            </FormSection>
          )}

          {/* ── STEP 4: Skills ── */}
          {step === 4 && (
            <FormSection title="Skills" desc="Add your technical and soft skills. Click suggestions or type your own.">
              <div className="flex gap-2">
                <input className={inp} placeholder="Type a skill and press Enter or Add"
                  value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))} />
                <button onClick={() => addSkill(skillInput)}
                  className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition flex-shrink-0">
                  Add
                </button>
              </div>

              {/* Added skills */}
              {data.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {data.skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-full px-3 py-1 text-xs font-bold">
                      {s}
                      <button onClick={() => removeSkill(s)} className="text-blue-500 hover:text-red-500 transition">×</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div className="mt-5">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {SKILL_SUGGESTIONS.filter(s => !data.skills.includes(s)).map(s => (
                    <button key={s} onClick={() => addSkill(s)}
                      className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition">
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </FormSection>
          )}

          {/* ── STEP 5: Projects ── */}
          {step === 5 && (
            <FormSection title="Projects" desc="Showcase your best college, personal, or open-source projects.">
              {data.projects.map((proj, i) => (
                <BlockCard key={i} onRemove={() => removeRow('projects', i)} canRemove={data.projects.length > 1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[['name', 'Project Name', 'Sky Builder AI'], ['tech', 'Technologies', 'React, Node.js, MongoDB'],
                    ['duration', 'Duration / Year', 'Feb 2026']
                    ].map(([key, label, ph]) => (
                      <div key={key}>
                        <label className={lbl}>{label}</label>
                        <input className={inp} placeholder={ph} value={proj[key]}
                          onChange={e => setArr('projects', i, key, e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className={lbl}>Description (one per line)</label>
                    <textarea className={inp + ' min-h-[90px] resize-y'}
                      placeholder={"- Built a web-based resume builder using React.js\n- Implemented AI suggestions using Claude API\n- Integrated PDF download feature"}
                      value={proj.description} onChange={e => setArr('projects', i, 'description', e.target.value)} />
                  </div>
                </BlockCard>
              ))}
              <AddBtn onClick={() => addRow('projects')} label="Add Project" />
            </FormSection>
          )}

          {/* ── STEP 6: Achievements ── */}
          {step === 6 && (
            <FormSection title="Achievements" desc="Awards, honours, hackathon wins, or any notable accomplishments.">
              {data.achievements.map((ach, i) => (
                <BlockCard key={i} onRemove={() => removeRow('achievements', i)} canRemove={data.achievements.length > 1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Achievement Title</label>
                      <input className={inp} placeholder="1st Place — College Hackathon 2024"
                        value={ach.title} onChange={e => setArr('achievements', i, 'title', e.target.value)} />
                    </div>
                    <div>
                      <label className={lbl}>Year / Date</label>
                      <input className={inp} placeholder="March 2024"
                        value={ach.year || ''} onChange={e => setArr('achievements', i, 'year', e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className={lbl}>Description (optional)</label>
                    <textarea className={inp + ' min-h-[70px] resize-y'}
                      placeholder="Built an AI-powered app in 24 hours and won among 50 teams..."
                      value={ach.description} onChange={e => setArr('achievements', i, 'description', e.target.value)} />
                  </div>
                </BlockCard>
              ))}
              <AddBtn onClick={() => addRow('achievements')} label="Add Achievement" />
            </FormSection>
          )}

          {/* ── STEP 7: Certifications ── */}
          {step === 7 && (
            <FormSection title="Certifications" desc="Online courses, training programs, or professional certificates.">
              {data.certifications.map((cert, i) => (
                <BlockCard key={i} onRemove={() => removeRow('certifications', i)} canRemove={data.certifications.length > 1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Certificate Name</label>
                      <input className={inp} placeholder="Full Stack Web Development"
                        value={cert.name} onChange={e => setArr('certifications', i, 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className={lbl}>Issued By</label>
                      <input className={inp} placeholder="Coursera / Udemy / NPTEL"
                        value={cert.issuer} onChange={e => setArr('certifications', i, 'issuer', e.target.value)} />
                    </div>
                    <div>
                      <label className={lbl}>Year</label>
                      <input className={inp} placeholder="2024"
                        value={cert.year} onChange={e => setArr('certifications', i, 'year', e.target.value)} />
                    </div>
                    <div>
                      <label className={lbl}>Credential URL (optional)</label>
                      <input className={inp} placeholder="coursera.org/verify/xxxxx"
                        value={cert.url || ''} onChange={e => setArr('certifications', i, 'url', e.target.value)} />
                    </div>
                  </div>
                </BlockCard>
              ))}
              <AddBtn onClick={() => addRow('certifications')} label="Add Certification" />
            </FormSection>
          )}

          {/* ── STEP 8: Languages ── */}
          {step === 8 && (
            <FormSection title="Languages" desc="Languages you can speak, read or write.">
              {data.languages.map((lang, i) => (
                <BlockCard key={i} onRemove={() => removeRow('languages', i)} canRemove={data.languages.length > 1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Language</label>
                      <input className={inp} placeholder="English / Hindi / Punjabi"
                        value={lang.language} onChange={e => setArr('languages', i, 'language', e.target.value)} />
                    </div>
                    <div>
                      <label className={lbl}>Proficiency Level</label>
                      <select className={inp} value={lang.level}
                        onChange={e => setArr('languages', i, 'level', e.target.value)}>
                        <option>Native</option>
                        <option>Fluent</option>
                        <option>Intermediate</option>
                        <option>Beginner</option>
                      </select>
                    </div>
                  </div>
                </BlockCard>
              ))}
              <AddBtn onClick={() => addRow('languages')} label="Add Language" />
            </FormSection>
          )}

          {/* ── STEP 9: Hobbies ── */}
          {step === 9 && (
            <FormSection title="Hobbies & Interests" desc="Show your personality — add hobbies and interests outside work.">
              <div className="flex gap-2">
                <input className={inp} placeholder="Type a hobby and press Enter or Add"
                  value={hobbyInput} onChange={e => setHobbyInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHobby(hobbyInput))} />
                <button onClick={() => addHobby(hobbyInput)}
                  className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition flex-shrink-0">
                  Add
                </button>
              </div>
              {data.hobbies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {data.hobbies.map(h => (
                    <span key={h} className="flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full px-3 py-1 text-xs font-bold">
                      {h}
                      <button onClick={() => removeHobby(h)} className="text-blue-400 hover:text-red-500 transition">×</button>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-5">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {['Reading', 'Coding', 'Gaming', 'Photography', 'Travelling', 'Music', 'Cricket', 'Football',
                    'Badminton', 'Painting', 'Cooking', 'Blogging', 'Yoga', 'Dancing', 'Volunteering'
                  ].filter(h => !data.hobbies.includes(h)).map(h => (
                    <button key={h} onClick={() => addHobby(h)}
                      className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition">
                      + {h}
                    </button>
                  ))}
                </div>
              </div>
            </FormSection>
          )}

          {/* ── STEP 10: Summary ── */}
          {step === 10 && (
            <FormSection title="Professional Summary" desc="A brief overview of your background and skills.">
              <textarea className={inp + ' min-h-[120px] resize-y'}
                placeholder="Write your professional summary here..."
                value={data.summary} onChange={e => setData(d => ({ ...d, summary: e.target.value }))} />

              <div className="mt-4">
                <button onClick={generateSummary} disabled={aiLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-bold hover:bg-blue-200 transition disabled:opacity-60">
                  <Sparkles className="w-4 h-4" />
                  {aiLoading ? 'Generating AI Suggestions...' : '✨ Generate with AI'}
                </button>

                {suggestions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase">Click a suggestion to use it:</p>
                    {suggestions.map((sug, idx) => (
                      <div key={idx} onClick={() => setData(d => ({ ...d, summary: sug }))}
                        className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 transition text-sm text-gray-700 dark:text-gray-300 shadow-sm">
                        {sug}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormSection>
          )}

          {/* Nav Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSave}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-sm transition shadow-md">
                <Save className="w-4 h-4" /> Save Resume
              </button>
            )}
          </div>
        </main>

        {/* ── Live Preview (desktop) ── */}
        <aside className="hidden lg:flex flex-col w-[420px] flex-shrink-0 bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
            <button onClick={handleDownload}
              className="flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
          <div className="p-4">
            <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
              <ResumePreview data={data} />
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile preview button*/}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button onClick={() => setShowPreviewMobile(true)}
          className="px-5 py-3 rounded-full bg-black text-white font-bold text-sm shadow-xl whitespace-nowrap">
          👁 Preview
        </button>
      </div>

      {/* Mobile preview modal */}
      {showPreviewMobile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end lg:hidden transition-opacity" onClick={() => setShowPreviewMobile(false)}>
          <div className="bg-gray-100 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white/90 backdrop-blur-md flex items-center justify-between p-4 border-b border-gray-200 z-10">
              <span className="font-bold text-gray-800">Resume Preview</span>

              {/* Added PDF Button here for mobile! */}
              <div className="flex items-center gap-3">
                <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold hover:bg-blue-200 transition">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button onClick={() => setShowPreviewMobile(false)} className="text-gray-500 hover:text-gray-800 text-2xl leading-none font-bold px-1">&times;</button>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                <ResumePreview data={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Sub-components ── */
function FormSection({ title, desc, children }) {
  return (
    <div>
      <h1 className="font-serif text-2xl text-gray-900 dark:text-white font-normal mb-1">{title}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{desc}</p>
      {children}
    </div>
  )
}

function BlockCard({ children, onRemove, canRemove }) {
  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-4 shadow-sm">
      {canRemove && (
        <button onClick={onRemove}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-500 hover:bg-red-100 transition flex items-center justify-center">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
      {children}
    </div>
  )
}

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 font-semibold text-sm hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition">
      <Plus className="w-4 h-4" /> {label}
    </button>
  )
}