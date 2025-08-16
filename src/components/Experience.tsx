import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Building, 
  ChevronDown, 
  Award, 
  GraduationCap,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import type { Experience as ExperienceType, Education } from '../types';

export interface ExperienceProps {
  experiences: ExperienceType[];
  education: Education[];
  className?: string;
}

export interface ExperienceItemProps {
  experience: ExperienceType;
  isLast: boolean;
  index: number;
}

export interface EducationItemProps {
  education: Education;
  isLast: boolean;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isLast, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getDuration = () => {
    const startDate = new Date(experience.startDate);
    const endDate = experience.endDate ? new Date(experience.endDate) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  const getMetricsFromAchievements = () => {
    return experience.achievements.filter(achievement => 
      achievement.includes('%') || 
      achievement.includes('$') || 
      achievement.includes('M+') ||
      achievement.includes('K+') ||
      /\d+/.test(achievement)
    );
  };

  const getQualitativeAchievements = () => {
    return experience.achievements.filter(achievement => 
      !achievement.includes('%') && 
      !achievement.includes('$') && 
      !achievement.includes('M+') &&
      !achievement.includes('K+') &&
      !/^\d/.test(achievement)
    );
  };

  return (
    <motion.div
      className="relative flex items-start space-x-4 pb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <Building size={12} className="text-white" />
        </motion.div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-300 mt-2" />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header - Always visible */}
        <button 
          className="p-6 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${experience.position} at ${experience.company}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {experience.position}
                </h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 font-semibold mt-1">
                <Building size={16} />
                <span>{experience.company}</span>
              </div>
            </div>
            
            {experience.companyLogo && (
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <img
                  src={experience.companyLogo}
                  alt={`${experience.company} logo`}
                  className="w-16 h-16 object-contain rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Date and location - Always visible */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar size={14} />
              <span className="font-medium">
                {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
              </span>
              <span className="text-blue-600 font-semibold">({getDuration()})</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Brief description - Always visible */}
          <p className="text-gray-700 mt-4 leading-relaxed">
            {experience.description}
          </p>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-gray-100">
                {/* Key Metrics */}
                {getMetricsFromAchievements().length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp size={18} className="text-green-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Key Metrics & Results</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {getMetricsFromAchievements().map((metric, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                        >
                          <div className="flex items-start space-x-2">
                            <Target size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm font-medium text-gray-800">{metric}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Achievements */}
                {getQualitativeAchievements().length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Award size={18} className="text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Key Achievements</h4>
                    </div>
                    <ul className="space-y-3">
                      {getQualitativeAchievements().map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Team Leadership Info */}
                {experience.achievements.some(a => a.toLowerCase().includes('team') || a.toLowerCase().includes('led')) && (
                  <div className="mt-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Users size={18} className="text-purple-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Leadership & Collaboration</h4>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      {experience.achievements
                        .filter(a => a.toLowerCase().includes('team') || a.toLowerCase().includes('led'))
                        .map((achievement, idx) => (
                          <p key={idx} className="text-sm text-purple-800 font-medium">
                            {achievement}
                          </p>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const EducationItem: React.FC<EducationItemProps> = ({ education, isLast, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <motion.div
      className="relative flex items-start space-x-4 pb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-5 h-5 bg-green-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <GraduationCap size={12} className="text-white" />
        </motion.div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-300 mt-2" />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <button 
          className="p-6 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${education.degree} at ${education.institution}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {education.degree}
              </h3>
              <div className="flex items-center space-x-2 text-green-600 font-semibold mt-1">
                <GraduationCap size={16} />
                <span>{education.institution}</span>
              </div>
              <p className="text-gray-600 mt-1">{education.field}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} className="text-gray-500" />
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar size={14} />
              <span className="font-medium">
                {formatDate(education.startDate)} - {formatDate(education.endDate)}
              </span>
            </div>
            {education.gpa && (
              <div className="text-blue-600 font-semibold">
                GPA: {education.gpa}
              </div>
            )}
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-gray-100">
                {education.honors && education.honors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Honors & Awards:</h4>
                    <div className="flex flex-wrap gap-2">
                      {education.honors.map((honor, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full"
                        >
                          {honor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {education.relevantCoursework && education.relevantCoursework.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {education.relevantCoursework.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Experience: React.FC<ExperienceProps> = ({ experiences, education, className = '' }) => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  // Sort education by start date (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className={`relative ${className}`}>
      {/* Professional Experience */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Experience</h3>
          <p className="text-gray-600">My career journey in product management</p>
        </motion.div>

        {sortedExperiences.map((experience, index) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isLast={index === sortedExperiences.length - 1 && sortedEducation.length === 0}
            index={index}
          />
        ))}
      </div>

      {/* Education */}
      {sortedEducation.length > 0 && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Education</h3>
            <p className="text-gray-600">Academic background and qualifications</p>
          </motion.div>

          {sortedEducation.map((edu, index) => (
            <EducationItem
              key={edu.id}
              education={edu}
              isLast={index === sortedEducation.length - 1}
              index={index + sortedExperiences.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;