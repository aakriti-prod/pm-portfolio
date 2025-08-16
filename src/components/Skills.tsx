import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink } from 'lucide-react'
import Card from './Card'
import { scrollFadeIn, staggerContainer, staggerItem, hoverLift } from '../utils/animations'
import type { Skill, SkillCategory } from '../types'

export interface SkillsProps {
  skills: Skill[]
  className?: string
}

interface SkillCategoryConfig {
  title: string
  description: string
  icon: string
  color: string
}

const categoryConfig: Record<SkillCategory, SkillCategoryConfig> = {
  leadership: {
    title: 'Leadership & Strategy',
    description: 'Product strategy, team leadership, and business acumen',
    icon: '👥',
    color: 'bg-blue-500'
  },
  analytics: {
    title: 'Analytics & Research',
    description: 'Data analysis, user research, and experimentation',
    icon: '📊',
    color: 'bg-green-500'
  },
  technical: {
    title: 'Technical Skills',
    description: 'Programming languages and technical competencies',
    icon: '💻',
    color: 'bg-purple-500'
  },
  tools: {
    title: 'Tools & Platforms',
    description: 'Software tools and platforms for product management',
    icon: '🛠️',
    color: 'bg-orange-500'
  }
}

const getProficiencyWidth = (proficiency: string): string => {
  switch (proficiency) {
    case 'expert': return '100%'
    case 'advanced': return '80%'
    case 'intermediate': return '60%'
    case 'beginner': return '40%'
    default: return '50%'
  }
}

const getProficiencyColor = (proficiency: string): string => {
  switch (proficiency) {
    case 'expert': return 'bg-green-500'
    case 'advanced': return 'bg-blue-500'
    case 'intermediate': return 'bg-yellow-500'
    case 'beginner': return 'bg-gray-400'
    default: return 'bg-gray-400'
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

export function Skills({ skills, className = '' }: SkillsProps) {
  // Group skills by category and ensure we have all categories
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<SkillCategory, Skill[]>)

  // Sort categories in desired order
  const categoryOrder: SkillCategory[] = ['leadership', 'analytics', 'technical', 'tools']
  
  return (
    <section id="skills" className={`py-12 sm:py-16 md:py-20 ${className}`} aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...scrollFadeIn}
          className="text-center sm:text-left mb-12 sm:mb-16"
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Technical and leadership skills developed over years of experience in product management
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {categoryOrder.map((category) => {
            const categorySkills = skillsByCategory[category] || []
            const config = categoryConfig[category]
            
            if (categorySkills.length === 0) return null
            
            return (
              <motion.div
                key={category}
                variants={staggerItem}
                {...hoverLift}
              >
                <Card hover className="p-4 sm:p-6 h-full rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  {/* Category Header */}
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${config.color} rounded-lg flex items-center justify-center text-white text-lg sm:text-xl mr-3 sm:mr-4`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{config.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{config.description}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4 sm:space-y-6">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        {/* Skill Header */}
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {skill.name}
                            </h4>
                            {skill.description && (
                              <p className="text-xs sm:text-sm text-gray-600 mt-1">{skill.description}</p>
                            )}
                          </div>
                          <div className="text-right ml-3 sm:ml-4">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 capitalize">
                              {skill.proficiency}
                            </span>
                            {skill.yearsOfExperience && (
                              <p className="text-xs text-gray-500">
                                {skill.yearsOfExperience} years
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Proficiency Bar */}
                        <div 
                          className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-3 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={skill.proficiency === 'expert' ? 100 : skill.proficiency === 'advanced' ? 80 : skill.proficiency === 'intermediate' ? 60 : 40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency: ${skill.proficiency}`}
                        >
                          <motion.div 
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 ${getProficiencyColor(skill.proficiency)}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: getProficiencyWidth(skill.proficiency) }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>

                        {/* Certifications */}
                        {skill.certifications && skill.certifications.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {skill.certifications.map((cert, certIndex) => (
                              <div
                                key={certIndex}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center">
                                  <Award className="w-4 h-4 text-yellow-500 mr-2" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                                  </div>
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  <span>{formatDate(cert.dateObtained)}</span>
                                  {cert.credentialUrl && (
                                    <a
                                      href={cert.credentialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                                      aria-label={`View ${cert.name} credential from ${cert.issuer}`}
                                    >
                                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Hover Effect Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border-l-2 border-blue-500">
                            <strong>Proficiency Level:</strong> {skill.proficiency}
                            {skill.yearsOfExperience && (
                              <>
                                <br />
                                <strong>Experience:</strong> {skill.yearsOfExperience} years
                              </>
                            )}
                            {skill.description && (
                              <>
                                <br />
                                <strong>Details:</strong> {skill.description}
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {categoryOrder.map((category) => {
                const categorySkills = skillsByCategory[category] || []
                const expertSkills = categorySkills.filter(s => s.proficiency === 'expert').length
                const config = categoryConfig[category]
                
                if (categorySkills.length === 0) return null
                
                return (
                  <div key={category} className="p-3">
                    <div className="text-2xl mb-1">{config.icon}</div>
                    <div className="text-2xl font-bold text-gray-900">{categorySkills.length}</div>
                    <div className="text-sm text-gray-600">{config.title.split(' ')[0]} Skills</div>
                    {expertSkills > 0 && (
                      <div className="text-xs text-green-600 mt-1">
                        {expertSkills} Expert Level
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}