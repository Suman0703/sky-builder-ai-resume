import { useState } from 'react';

function App() {
  // State to hold the resume data
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    summary: '',
    skills: [],
  });

  // Pre-defined rule-based "AI" suggestions
  const generateSummary = () => {
    if (!resumeData.role) {
      alert("Please enter a target role first so the AI can generate a summary!");
      return;
    }
    const suggestions = {
      default: `A highly motivated ${resumeData.role} with a strong foundation in modern web technologies. Passionate about building user-friendly applications and eager to contribute to innovative projects.`,
    };
    
    setResumeData({ ...resumeData, summary: suggestions.default });
  };

  const addSkill = (skill) => {
    if (!resumeData.skills.includes(skill)) {
      setResumeData({ ...resumeData, skills: [...resumeData.skills, skill] });
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDE: Input Form */}
      <div className="w-full md:w-1/2 p-8 bg-white border-r border-gray-200 overflow-y-auto h-screen shadow-lg">
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Resume Builder</h1>
        <p className="text-gray-500 mb-8">Fill in your details below to instantly generate your resume.</p>

        <div className="space-y-6">
          {/* Personal Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-brand-blue border-b pb-2">Personal Info</h2>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 mb-3 border rounded focus:outline-none focus:border-brand-blue" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 mb-3 border rounded focus:outline-none focus:border-brand-blue" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 mb-3 border rounded focus:outline-none focus:border-brand-blue" />
            <input type="text" name="role" placeholder="Target Role (e.g., Frontend Developer)" onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue" />
          </div>

          {/* AI Summary Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-brand-blue">Professional Summary</h2>
              <button onClick={generateSummary} className="bg-brand-dark text-white px-4 py-1 rounded text-sm hover:bg-black transition">
                ✨ AI Generate
              </button>
            </div>
            <textarea name="summary" value={resumeData.summary} onChange={handleChange} rows="4" placeholder="Write your summary here or use the AI generator..." className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue"></textarea>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-brand-blue border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {['React', 'Tailwind CSS', 'JavaScript', 'Node.js', 'HTML/CSS'].map(skill => (
                <button key={skill} onClick={() => addSkill(skill)} className="bg-white border border-brand-blue text-brand-blue px-3 py-1 rounded-full text-sm hover:bg-brand-blue hover:text-white transition">
                  + {skill}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="bg-brand-dark text-white px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Live Preview */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 flex justify-center items-start overflow-y-auto h-screen">
        <div className="bg-white w-full max-w-2xl p-10 shadow-2xl min-h-[800px]">
          
          {/* Resume Header */}
          <div className="border-b-4 border-brand-dark pb-6 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wider text-brand-dark">
              {resumeData.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xl text-brand-blue mt-2 font-medium">
              {resumeData.role || 'TARGET ROLE'}
            </p>
            <div className="flex gap-4 mt-4 text-sm text-gray-600">
              <span>{resumeData.email || 'email@example.com'}</span>
              <span>•</span>
              <span>{resumeData.phone || '(123) 456-7890'}</span>
            </div>
          </div>

          {/* Resume Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-dark mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">Profile</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {resumeData.summary || 'Your professional summary will appear here.'}
            </p>
          </div>

          {/* Resume Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-brand-dark mb-2 uppercase tracking-wide border-b border-gray-200 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-brand-dark px-3 py-1 rounded text-sm font-medium border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>

    </div>
  );
}

export default App;