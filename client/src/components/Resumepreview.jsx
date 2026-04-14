import React from 'react'

export default function ResumePreview({ data }) {
  if (!data) return null;

  const { personal, objective, summary, education, experience, projects, skills, achievements, certifications, languages, hobbies } = data;

  const hasData = (arr) => arr && arr.length > 0 && Object.values(arr[0]).some(val => val && val.toString().trim() !== '');

  const s = {
    page:         { background: '#fff', color: '#111', fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '11px', lineHeight: '1.6', padding: '28px 32px', maxWidth: '210mm', margin: '0 auto', minHeight: '297mm' },
    header:       { textAlign: 'center', borderBottom: '2px solid #1d4ed8', paddingBottom: '14px', marginBottom: '18px' },
    name:         { fontSize: '26px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#0f172a', margin: '0 0 3px', fontFamily: "'Arial', sans-serif" },
    nameBlue:     { color: '#1d4ed8' },
    jobTitle:     { fontSize: '13px', color: '#475569', margin: '0 0 8px', fontStyle: 'italic', fontWeight: '500' },
    contacts:     { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2px 0', fontSize: '10px', color: '#64748b' },
    contactItem:  { padding: '0 8px', borderRight: '1px solid #cbd5e1' },
    section:      { marginBottom: '14px' },
    sectionTitle: { fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1d4ed8', borderBottom: '1.5px solid #1d4ed8', paddingBottom: '3px', marginBottom: '8px', fontFamily: "'Arial', sans-serif" },
    row:          { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
    bold:         { fontWeight: '700', fontSize: '11.5px', color: '#0f172a' },
    sub:          { fontSize: '10.5px', color: '#475569', fontStyle: 'italic' },
    date:         { fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '8px', flexShrink: '0' },
    blue:         { fontSize: '10.5px', color: '#1d4ed8', fontWeight: '600' },
    ul:           { margin: '4px 0 0 0', paddingLeft: '16px', color: '#374151', lineHeight: '1.65' },
    li:           { marginBottom: '2px', fontSize: '10.5px' },
    chip:         { display: 'inline-block', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', borderRadius: '4px', padding: '2px 9px', fontSize: '10px', fontWeight: '600', margin: '2px 3px 2px 0' },
    grid2:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' },
    achRow:       { display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'flex-start' },
    star:         { color: '#1d4ed8', fontSize: '14px', lineHeight: '1', flexShrink: '0', marginTop: '1px' },
    langRow:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' },
    langBar:      { height: '4px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden', marginTop: '2px' },
    profileText:  { fontSize: '11px', color: '#374151', lineHeight: '1.75', textAlign: 'justify', margin: 0 },
  }

  const contacts = [
    personal.email, personal.phone, personal.city,
    personal.linkedin?.replace('https://', ''),
    personal.github?.replace('https://', '')
  ].filter(Boolean)

  return (
    <div id="resume-preview" style={s.page}>

      {/* HEADER */}
      <div style={s.header}>
        <h1 style={s.name}>
          {personal.firstName} <span style={s.nameBlue}>{personal.lastName}</span>
        </h1>
        {personal.jobTitle && <p style={s.jobTitle}>{personal.jobTitle}</p>}
        <div style={s.contacts}>
          {contacts.map((c, i) => (
            <span key={i} style={{ ...s.contactItem, borderRight: i === contacts.length - 1 ? 'none' : '1px solid #cbd5e1' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* PROFILE */}
      {(summary || objective) && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Profile</div>
          <p style={s.profileText}>{summary || objective}</p>
        </div>
      )}

      {/* EDUCATION */}
      {hasData(education) && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Education</div>
          {education.map((e, i) => e.degree || e.institution ? (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={s.row}>
                <span style={s.bold}>{e.degree}</span>
                <span style={s.date}>{e.year}</span>
              </div>
              <div style={s.row}>
                <span style={s.sub}>{e.institution}</span>
                {e.grade && <span style={s.blue}>{e.grade}</span>}
              </div>
            </div>
          ) : null)}
        </div>
      )}

      {/* EXPERIENCE */}
      {hasData(experience) && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Experience</div>
          {experience.map((e, i) => e.title || e.company ? (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={s.row}>
                <span style={s.bold}>{e.title}</span>
                <span style={s.date}>{e.duration}</span>
              </div>
              <div style={s.row}>
                <span style={s.sub}>{e.company}{e.location ? ` · ${e.location}` : ''}</span>
              </div>
              {e.description && (
                <ul style={s.ul}>
                  {e.description.split('\n').filter(Boolean).map((line, j) => (
                    <li key={j} style={s.li}>{line.replace(/^-\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : null)}
        </div>
      )}

      {/* PROJECTS */}
      {hasData(projects) && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Projects</div>
          {projects.map((p, i) => p.name ? (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={s.row}>
                <span style={s.bold}>
                  {p.name}
                  {p.tech && <span style={{ ...s.blue, fontWeight: '400', marginLeft: '6px' }}>| {p.tech}</span>}
                </span>
                <span style={s.date}>{p.duration}</span>
              </div>
              {p.description && (
                <ul style={s.ul}>
                  {p.description.split('\n').filter(Boolean).map((line, j) => (
                    <li key={j} style={s.li}>{line.replace(/^-\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ) : null)}
        </div>
      )}

      {/* SKILLS */}
      {skills && skills.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Technical Skills</div>
          <div>{skills.map((sk, i) => <span key={i} style={s.chip}>{sk}</span>)}</div>
        </div>
      )}

      {/* ACHIEVEMENTS */}
      {hasData(achievements) && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Achievements</div>
          {achievements.map((a, i) => a.title ? (
            <div key={i} style={s.achRow}>
              <span style={s.star}>★</span>
              <div>
                <div style={s.row}>
                  <span style={{ ...s.bold, fontSize: '11px' }}>{a.title}</span>
                  {a.year && <span style={s.date}>{a.year}</span>}
                </div>
                {a.description && <div style={{ fontSize: '10.5px', color: '#374151', marginTop: '1px' }}>{a.description}</div>}
              </div>
            </div>
          ) : null)}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {hasData(certifications) && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Certifications</div>
          {certifications.map((c, i) => c.name ? (
            <div key={i} style={{ ...s.row, marginBottom: '5px' }}>
              <span style={{ fontSize: '11px', color: '#0f172a' }}>
                <span style={{ fontWeight: '600' }}>{c.name}</span>
                {c.issuer && <span style={{ color: '#64748b', fontWeight: '400' }}> — {c.issuer}</span>}
              </span>
              <span style={s.date}>{c.year}</span>
            </div>
          ) : null)}
        </div>
      )}

      {/* LANGUAGES + HOBBIES */}
      {(hasData(languages) || (hobbies && hobbies.length > 0)) && (
        <div style={s.grid2}>
          {hasData(languages) && (
            <div style={s.section}>
              <div style={s.sectionTitle}>Languages</div>
              {languages.map((l, i) => l.language ? (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div style={s.langRow}>
                    <span style={{ fontWeight: '600', fontSize: '11px', color: '#0f172a' }}>{l.language}</span>
                    <span style={{ fontSize: '9.5px', color: '#64748b' }}>{l.level}</span>
                  </div>
                  <div style={s.langBar}>
                    <div style={{
                      height: '100%', borderRadius: '99px', background: '#1d4ed8',
                      width: l.level === 'Native' ? '100%' : l.level === 'Fluent' ? '82%' : l.level === 'Intermediate' ? '58%' : '32%'
                    }} />
                  </div>
                </div>
              ) : null)}
            </div>
          )}
          {hobbies && hobbies.length > 0 && (
            <div style={s.section}>
              <div style={s.sectionTitle}>Interests</div>
              <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.8', margin: 0 }}>
                {hobbies.join(' • ')}
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}