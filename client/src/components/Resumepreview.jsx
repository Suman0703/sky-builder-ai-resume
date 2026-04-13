import React from 'react'

export default function ResumePreview({ data }) {
  if (!data) return null;

  const { personal, objective, summary, education, experience, projects, skills, achievements, certifications, languages, hobbies } = data;

  // Helper to check if an array section actually has data entered
  const hasData = (arr) => arr && arr.length > 0 && Object.values(arr[0]).some(val => val && val.trim() !== '');

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-sans p-6 md:p-8 max-w-[210mm] mx-auto shadow-sm">
      
      {/* ── HEADER ── */}
      <header className="text-center border-b-2 border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1 uppercase">
          {personal.firstName} <span className="text-blue-700">{personal.lastName}</span>
        </h1>
        {personal.jobTitle && <p className="text-lg font-medium text-gray-600 mb-3">{personal.jobTitle}</p>}
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.city && <span>• {personal.city}</span>}
          {personal.linkedin && <span>• {personal.linkedin.replace('https://', '')}</span>}
          {personal.github && <span>• {personal.github.replace('https://', '')}</span>}
        </div>
      </header>

      <div className="space-y-5">
        
        {/* ── SUMMARY / OBJECTIVE ── */}
        {(summary || objective) && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">Profile</h2>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">{summary || objective}</p>
          </section>
        )}

        {/* ── EDUCATION ── */}
        {hasData(education) && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-gray-500">{edu.year}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-gray-700">{edu.institution}</span>
                    <span className="text-xs font-medium text-blue-700">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── EXPERIENCE ── */}
        {hasData(experience) && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-xs font-semibold text-gray-500">{exp.duration}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-gray-700">{exp.company}</span>
                    <span className="text-xs text-gray-500">{exp.location}</span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 text-xs text-gray-700 space-y-1 leading-relaxed">
                      {exp.description.split('\n').filter(line => line.trim()).map((line, j) => (
                        <li key={j}>{line.replace(/^- /, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PROJECTS ── */}
        {hasData(projects) && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      {proj.name} <span className="text-xs font-medium text-blue-700 font-normal ml-1">| {proj.tech}</span>
                    </h3>
                    <span className="text-xs font-semibold text-gray-500">{proj.duration}</span>
                  </div>
                  {proj.description && (
                    <ul className="list-disc list-outside ml-4 text-xs text-gray-700 space-y-1 leading-relaxed">
                      {proj.description.split('\n').filter(line => line.trim()).map((line, j) => (
                        <li key={j}>{line.replace(/^- /, '').trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SKILLS ── */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {hasData(achievements) && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Achievements</h2>
            <ul className="space-y-2">
              {achievements.map((ach, i) => (
                <li key={i} className="text-sm text-gray-700 flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-gray-900">{ach.title}</span>
                    <span className="text-xs text-gray-500">{ach.year}</span>
                  </div>
                  {ach.description && <span className="text-xs mt-0.5">{ach.description}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── CERTIFICATIONS ── */}
        {hasData(certifications) && (
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <div key={i} className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-gray-900">{cert.name} <span className="text-gray-500 font-normal">— {cert.issuer}</span></span>
                  <span className="text-xs text-gray-500">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── BOTTOM GRID (Languages & Hobbies) ── */}
        <div className="grid grid-cols-2 gap-6 break-inside-avoid">
          {hasData(languages) && (
            <section>
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">Languages</h2>
              <ul className="space-y-1">
                {languages.map((lang, i) => (
                  <li key={i} className="text-sm text-gray-700 flex justify-between">
                    <span className="font-medium text-gray-900">{lang.language}</span>
                    <span className="text-xs text-gray-500">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hobbies && hobbies.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">Interests</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {hobbies.join(' • ')}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}