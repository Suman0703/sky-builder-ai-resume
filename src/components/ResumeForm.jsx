function ResumeForm({ resumeData, setResumeData }) {
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e, section) => {
    setResumeData({
      ...resumeData,
      [section]: { ...resumeData[section], [e.target.name]: e.target.value }
    });
  };

  const generateSummary = () => {
    if (!resumeData.role) return alert("Please enter a target role first!");
    let generatedText = `A highly motivated ${resumeData.role} eager to build modern solutions.`;
    if (resumeData.skills.length > 0) {
      generatedText = `A highly motivated ${resumeData.role} specializing in ${resumeData.skills.join(', ')}. Passionate about creating efficient and scalable web applications.`;
    }
    setResumeData({ ...resumeData, summary: generatedText });
  };

  const addSkill = (skill) => {
    if (!resumeData.skills.includes(skill)) {
      setResumeData({ ...resumeData, skills: [...resumeData.skills, skill] });
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 bg-white border-r border-gray-200 overflow-y-auto h-screen shadow-lg">
      <h2 className="text-2xl font-bold text-brand-dark mb-6">Edit Resume</h2>
      
      <div className="space-y-6">
        {/* Personal & Summary */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-brand-blue mb-3">Basics</h3>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <input type="text" name="role" placeholder="Target Role" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <button onClick={generateSummary} className="bg-brand-dark text-white px-3 py-1 rounded text-sm mb-2 hover:bg-black">✨ AI Summary</button>
          <textarea name="summary" value={resumeData.summary} onChange={handleChange} placeholder="Summary..." className="w-full p-2 border rounded" rows="3"></textarea>
        </div>

        {/* Education */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-brand-blue mb-3">Education</h3>
          <input type="text" name="degree" placeholder="Degree (e.g. B.Tech CSE)" onChange={(e) => handleNestedChange(e, 'education')} className="w-full p-2 mb-2 border rounded" />
          <input type="text" name="university" placeholder="University Name" onChange={(e) => handleNestedChange(e, 'education')} className="w-full p-2 mb-2 border rounded" />
        </div>

        {/* Experience / Projects */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-brand-blue mb-3">Experience / Projects</h3>
          <input type="text" name="title" placeholder="Project Name or Job Title" onChange={(e) => handleNestedChange(e, 'experience')} className="w-full p-2 mb-2 border rounded" />
          <input type="text" name="company" placeholder="Organization / Hackathon Name" onChange={(e) => handleNestedChange(e, 'experience')} className="w-full p-2 mb-2 border rounded" />
          <textarea name="description" placeholder="Describe what you built..." onChange={(e) => handleNestedChange(e, 'experience')} className="w-full p-2 border rounded" rows="2"></textarea>
        </div>

        {/* Skills */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-brand-blue mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {['React', 'Tailwind', 'Node.js', 'MongoDB'].map(skill => (
              <button key={skill} onClick={() => addSkill(skill)} className="border border-brand-blue text-brand-blue px-2 py-1 rounded-full text-xs">+ {skill}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;