import React from 'react'
import { Phone, Mail, MapPin, Linkedin, Github } from 'lucide-react'

export default function ResumePreview({ data }) {
  if (!data) return null;

  const { personal, objective, summary, education, experience, projects, skills, achievements, certifications, languages, hobbies } = data;

  // Helper to check if an array section actually has data entered
  const hasData = (arr) => arr && arr.length > 0 && Object.values(arr[0]).some(val => val && val.trim() !== '');

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-sans mx-auto w-full max-w-[210mm] min-h-[297mm]">
      
      {/* ── HEADER (Solid Blue) ── */}
      <header className="bg-brand text-white pt-10 pb-8 px-10">
        <h1 className="text-4xl font-bold tracking-wide mb-1">
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.jobTitle && <p className="text-blue-100 text-lg mb-5">{personal.jobTitle}</p>}
        
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-blue-100">
          {personal.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-red-400" fill="currentColor" /> {personal.phone}</span>}
          {personal.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-white" /> {personal.email}</span>}
          {personal.city && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-red-400" fill="currentColor" /> {personal.city}</span>}
          {personal.linkedin && <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-white" /> {personal.linkedin.replace('https://', '').replace('www.', '')}</span>}
          {personal.github && <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-blue-300" fill="currentColor" /> {personal.github.replace('https://', '').replace('www.', '')}</span>}
        </div>
      </header>

      {/* ── BODY CONTENT ── */}
      <div className="p-10 space-y-6">
        
        {/* ── CAREER OBJECTIVE / SUMMARY ── */}
        {objective && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-2">Career Objective</h2>
            <p className="text-xs text-gray-600 leading-relaxed">{objective}</p>
          </section>
        )}
        
        {summary && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-2">Profile Summary</h2>
            <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* ── EDUCATION ── */}
        {hasData(education) && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[13px] font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {edu.institution} {edu.grade && <span className="text-gray-400">· {edu.grade}</span>}
                    </p>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-4 mt-0.5">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SKILLS ── */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <span key={i} className="bg-blue-50 text-brand px-3 py-1 rounded-full text-[11px] font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── PROJECTS ── */}
        {hasData(projects) && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Projects</h2>
            <div className="space-y-5">
              {projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[13px] font-bold text-gray-900">
                      {proj.name}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-4">{proj.duration}</span>
                  </div>
                  {proj.tech && <p className="text-[11px] text-gray-500 mb-1.5">Tech: {proj.tech}</p>}
                  {proj.description && (
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 leading-relaxed">
                      {proj.description.split('\n').filter(line => line.trim()).map((line, j) => (
                        <li key={j}>{line.replace(/^[-•]\s*/, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EXPERIENCE ── */}
        {hasData(experience) && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Experience</h2>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[13px] font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-4">{exp.duration}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mb-1.5">{exp.company} <span className="font-normal text-gray-400">· {exp.location}</span></div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 leading-relaxed">
                      {exp.description.split('\n').filter(line => line.trim()).map((line, j) => (
                        <li key={j}>{line.replace(/^[-•]\s*/, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {hasData(achievements) && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Achievements</h2>
            <div className="space-y-2.5">
              {achievements.map((ach, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{ach.title}</h3>
                    {ach.description && <p className="text-[11px] text-gray-500 mt-0.5">{ach.description}</p>}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-4 mt-0.5">{ach.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CERTIFICATIONS ── */}
        {hasData(certifications) && (
          <section className="break-inside-avoid">
            <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Certifications</h2>
            <div className="space-y-2.5">
              {certifications.map((cert, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{cert.issuer} {cert.url && <span className="text-gray-400">· {cert.url}</span>}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-4 mt-0.5">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── LANGUAGES & HOBBIES ── */}
        <div className="grid grid-cols-2 gap-8 break-inside-avoid">
          {hasData(languages) && (
            <section>
              <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Languages</h2>
              <div className="space-y-1.5">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-900">{lang.language}</span>
                    <span className="text-gray-400 font-medium">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hobbies && hobbies.length > 0 && (
            <section>
              <h2 className="text-[14px] font-bold text-brand uppercase tracking-widest mb-4">Hobbies</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600">
                  {hobbies.map((hobby, i) => (
                    <span key={i} className="font-medium">{hobby}</span>
                  ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  )
}