import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import type { Experience } from '../types';

export interface TimelineProps {
  experiences: Experience[];
  className?: string;
}

export interface TimelineItemProps {
  experience: Experience;
  isLast: boolean;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, isLast, index }) => {
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
          className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        />
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-300 mt-2" />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {experience.position}
            </h3>
            <div className="flex items-center space-x-2 text-blue-600 font-medium">
              <Building size={16} />
              <span>{experience.company}</span>
            </div>
          </div>
          
          {experience.companyLogo && (
            <div className="mt-2 sm:mt-0">
              <img
                src={experience.companyLogo}
                alt={`${experience.company} logo`}
                className="w-12 h-12 object-contain rounded"
              />
            </div>
          )}
        </div>

        {/* Date and location */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>
              {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
            </span>
            <span className="text-gray-400">({getDuration()})</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, idx) => (
                <motion.li
                  key={idx}
                  className="text-sm text-gray-700 flex items-start space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.3 }}
                >
                  <span className="text-blue-600 mt-1.5 w-1 h-1 bg-blue-600 rounded-full flex-shrink-0" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ experiences, className = '' }) => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className={`relative ${className}`}>
      {sortedExperiences.map((experience, index) => (
        <TimelineItem
          key={experience.id}
          experience={experience}
          isLast={index === sortedExperiences.length - 1}
          index={index}
        />
      ))}
    </div>
  );
};

export default Timeline;