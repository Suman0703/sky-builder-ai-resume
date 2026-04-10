function ResumePreview({ resumeData }) {
  return (
    <div className="w-full md:w-1/2 p-8 bg-gray-100 flex justify-center items-start overflow-y-auto h-screen">
      <div className="bg-white w-full max-w-2xl p-10 shadow-2xl min-h-[800px]">
        
        {/* Header */}
        <div className="border-b-4 border-brand-dark pb-4 mb-4">
          <h1 className="text-4xl font-bold uppercase text-brand-dark">{resumeData.fullName || 'YOUR NAME'}</h1>
          <p className="text-xl text-brand-blue mt-1">{resumeData.role || 'TARGET ROLE'}</p>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-brand-dark border-b border-gray-200 uppercase">Profile</h3>
          <p className="text-gray-700 text-sm mt-2">{resumeData.summary || 'Summary will appear here.'}</p>
        </div>

        {/* Experience */}
        {(resumeData.experience.title || resumeData.experience.company) && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-dark border-b border-gray-200 uppercase">Experience & Projects</h3>
            <div className="mt-2">
              <div className="flex justify-between font-bold text-brand-dark">
                <span>{resumeData.experience.title}</span>
              </div>
              <div className="text-brand-blue text-sm mb-1">{resumeData.experience.company}</div>
              <p className="text-gray-700 text-sm">{resumeData.experience.description}</p>
            </div>
          </div>
        )}

        {/* Education */}
        {(resumeData.education.degree || resumeData.education.university) && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-dark border-b border-gray-200 uppercase">Education</h3>
            <div className="mt-2">
              <div className="font-bold text-brand-dark">{resumeData.education.degree}</div>
              <div className="text-brand-blue text-sm">{resumeData.education.university}</div>
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-dark border-b border-gray-200 uppercase">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-brand-dark px-2 py-1 rounded text-sm border">{skill}</span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ResumePreview;