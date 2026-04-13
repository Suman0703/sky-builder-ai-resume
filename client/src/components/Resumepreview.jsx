export default function ResumePreview({ data }) {
  const { personal, objective, summary, education, experience, skills, projects, achievements, certifications, languages, hobbies } = data

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-sans text-[11px] leading-relaxed min-h-[700px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-7 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          {(personal.firstName + ' ' + personal.lastName).trim() || 'Your Name'}
        </h1>
        {personal.jobTitle && <p className="text-blue-200 text-sm mt-0.5">{personal.jobTitle}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-blue-100">
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.city && <span>📍 {personal.city}</span>}
          {personal.linkedin && <span>🔗 {personal.linkedin}</span>}
          {personal.github && <span>💻 {personal.github}</span>}
        </div>
      </div>

      <div className="px-7 py-5 space-y-4">

        {/* Objective */}
        {objective && (
          <Section title="Career Objective">
            <p className="text-gray-600 leading-relaxed">{objective}</p>
          </Section>
        )}

        {/* Summary */}
        {summary && (
          <Section title="Profile Summary">
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </Section>
        )}

        {/* Education */}
        {education.some(e => e.degree || e.institution) && (
          <Section title="Education">
            {education.map((e, i) => e.degree || e.institution ? (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{e.degree}</span>
                  <span className="text-gray-400 text-[10px]">{e.year}</span>
                </div>
                <div className="text-gray-500">{e.institution}{e.grade ? ` · ${e.grade}` : ''}</div>
              </div>
            ) : null)}
          </Section>
        )}

        {/* Experience */}
        {experience.some(e => e.title || e.company) && (
          <Section title="Work Experience">
            {experience.map((e, i) => e.title || e.company ? (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{e.title}</span>
                  <span className="text-gray-400 text-[10px]">{e.duration}</span>
                </div>
                <div className="text-gray-500">{e.company}{e.location ? ` · ${e.location}` : ''}</div>
                {e.description && (
                  <ul className="mt-1 space-y-0.5 text-gray-600">
                    {e.description.split('\n').filter(Boolean).map((line, j) => (
                      <li key={j}>{line.startsWith('-') ? line : `- ${line}`}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null)}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className="bg-blue-50 text-blue-800 border border-blue-100 rounded-full px-3 py-0.5 text-[10px] font-semibold">{s}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects.some(p => p.name) && (
          <Section title="Projects">
            {projects.map((p, i) => p.name ? (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{p.name}</span>
                  <span className="text-gray-400 text-[10px]">{p.duration}</span>
                </div>
                {p.tech && <div className="text-gray-500">Tech: {p.tech}</div>}
                {p.description && (
                  <ul className="mt-1 space-y-0.5 text-gray-600">
                    {p.description.split('\n').filter(Boolean).map((line, j) => (
                      <li key={j}>{line.startsWith('-') ? line : `- ${line}`}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null)}
          </Section>
        )}

        {/* Achievements */}
        {achievements?.some(a => a.title) && (
          <Section title="Achievements">
            {achievements.map((a, i) => a.title ? (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{a.title}</span>
                  <span className="text-gray-400 text-[10px]">{a.year}</span>
                </div>
                {a.description && <div className="text-gray-600 mt-0.5">{a.description}</div>}
              </div>
            ) : null)}
          </Section>
        )}

        {/* Certifications */}
        {certifications?.some(c => c.name) && (
          <Section title="Certifications">
            {certifications.map((c, i) => c.name ? (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{c.name}</span>
                  <span className="text-gray-400 text-[10px]">{c.year}</span>
                </div>
                <div className="text-gray-500">{c.issuer}{c.url ? ` · ${c.url}` : ''}</div>
              </div>
            ) : null)}
          </Section>
        )}

        {/* Languages & Hobbies side by side */}
        <div className="grid grid-cols-2 gap-4">
          {languages?.some(l => l.language) && (
            <Section title="Languages">
              {languages.map((l, i) => l.language ? (
                <div key={i} className="flex justify-between mb-1">
                  <span className="text-gray-700 font-semibold">{l.language}</span>
                  <span className="text-gray-400 text-[10px]">{l.level}</span>
                </div>
              ) : null)}
            </Section>
          )}
          {hobbies?.length > 0 && (
            <Section title="Hobbies & Interests">
              <div className="flex flex-wrap gap-1">
                {hobbies.map((h, i) => (
                  <span key={i} className="bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-2 py-0.5 text-[10px] font-semibold">{h}</span>
                ))}
              </div>
            </Section>
          )}
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-[10px] font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-700 pb-1 mb-2">{title}</h2>
      {children}
    </div>
  )
}