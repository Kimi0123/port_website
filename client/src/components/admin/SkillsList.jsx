const SkillsList = ({ skills, onEdit, onDelete }) => {
  if (Object.keys(skills).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🛠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No skills yet</h3>
        <p className="text-gray-500">Get started by adding your first skill.</p>
      </div>
    )
  }

  const getLevelText = (level) => {
    const levels = {
      1: 'Beginner',
      2: 'Basic',
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Expert'
    }
    return levels[level] || 'Unknown'
  }

  const getLevelColor = (level) => {
    const colors = {
      1: 'bg-red-100 text-red-800',
      2: 'bg-orange-100 text-orange-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-blue-100 text-blue-800',
      5: 'bg-green-100 text-green-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {Object.entries(skills).map(([category, categorySkills]) => (
        <div key={category} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900 capitalize">
              {category} ({categorySkills.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {categorySkills.map((skill) => (
              <div key={skill.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {skill.icon && (
                      <div className="text-2xl">{skill.icon}</div>
                    )}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {getLevelText(skill.level)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Order: {skill.order}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(skill)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Edit Skill"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => onDelete(skill.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Skill"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-500">
                  Created: {new Date(skill.createdAt).toLocaleDateString()}
                  {skill.updatedAt !== skill.createdAt && (
                    <span className="ml-2">
                      • Updated: {new Date(skill.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsList
