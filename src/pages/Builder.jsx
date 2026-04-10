import { useState } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

function Builder() {
  const [resumeData, setResumeData] = useState({
    fullName: '', email: '', phone: '', role: '', summary: '',
    skills: [],
    education: { degree: '', university: '', year: '' },
    experience: { title: '', company: '', description: '' }
  });

  return (
    <div className="min-h-screen bg-brand-light flex flex-col md:flex-row font-sans">
      <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}

export default Builder;