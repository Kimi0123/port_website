const ExperienceList = ({ experiences, onEdit, onDelete }) => {
  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">💼</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No experience yet</h3>
        <p className="text-gray-500">Get started by adding your first work experience or education.</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Present'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const getTypeIcon = (type) => {
    return type === 'work' ? '💼' : '🎓'
  }

  const getTypeColor = (type) => {
    return type === 'work' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800'
  }

  // Group experiences by type
  const workExperiences = experiences.filter(exp => exp.type === 'work')
  const educationExperiences = experiences.filter(exp => exp.type === 'education')

  const ExperienceSection = ({ title, items, emptyMessage }) => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          {title} ({items.length})
        </h3>
      </div>
      
      {items.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {items.map((experience) => (
            <div key={experience.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl mt-1">
                    {getTypeIcon(experience.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-lg font-medium text-gray-900">
                        {experience.title}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(experience.type)}`}>
                        {experience.type}
                      </span>
                      {experience.current && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <p className="text-md font-medium text-gray-700 mb-1">
                      {experience.company}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <span>
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                      {experience.location && (
                        <>
                          <span>•</span>
                          <span>{experience.location}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>Order: {experience.order}</span>
                    </div>
                    
                    {experience.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {experience.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onEdit(experience)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Edit Experience"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => onDelete(experience.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Experience"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-gray-500">
                Created: {new Date(experience.createdAt).toLocaleDateString()}
                {experience.updatedAt !== experience.createdAt && (
                  <span className="ml-2">
                    • Updated: {new Date(experience.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      <ExperienceSection
        title="Work Experience"
        items={workExperiences}
        emptyMessage="No work experience added yet."
      />
      
      <ExperienceSection
        title="Education"
        items={educationExperiences}
        emptyMessage="No education records added yet."
      />
    </div>
  )
}

export default ExperienceList
