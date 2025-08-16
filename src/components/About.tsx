import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Award, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, Button } from './';
import { scrollFadeIn, scrollSlideInLeft, scrollSlideInRight } from '../utils/animations';
import type { Profile, Skill } from '../types';

export interface AboutProps {
  profile: Profile;
  skills: Skill[];
}

const About: React.FC<AboutProps> = ({ profile, skills }) => {
  // Group skills by category for display
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Get proficiency level as percentage for progress bars
  const getProficiencyPercentage = (proficiency: string): number => {
    switch (proficiency) {
      case 'expert': return 100;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      case 'beginner': return 40;
      default: return 0;
    }
  };

  // Category display names and colors
  const categoryConfig = {
    leadership: { name: 'Leadership', color: 'bg-blue-600', lightColor: 'bg-blue-50' },
    analytics: { name: 'Analytics', color: 'bg-green-600', lightColor: 'bg-green-50' },
    technical: { name: 'Technical', color: 'bg-purple-600', lightColor: 'bg-purple-50' },
    tools: { name: 'Tools', color: 'bg-orange-600', lightColor: 'bg-orange-50' },
  };

  // Key achievements extracted from profile summary
  const keyAchievements = [
    {
      icon: TrendingUp,
      title: '40% User Engagement Increase',
      description: 'Improved user engagement through data-driven product strategies'
    },
    {
      icon: DollarSign,
      title: '$10M+ Revenue Growth',
      description: 'Generated significant revenue growth through strategic product decisions'
    },
    {
      icon: Users,
      title: '8+ Years Experience',
      description: 'Leading cross-functional teams in product management'
    },
    {
      icon: Award,
      title: 'Multiple Certifications',
      description: 'Certified in Scrum, Analytics, and Product Management'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...scrollFadeIn}
          className="text-center sm:text-left mb-12 sm:mb-16"
        >
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate about building products that make a difference
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Professional Summary & Contact */}
          <motion.div
            {...scrollSlideInLeft}
            className="space-y-8"
          >
            {/* Professional Summary */}
            <Card hover className="p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                Professional Summary
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {profile.summary}
              </p>
              
              {/* Contact Information */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-gray-700">{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="text-gray-700">{profile.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-gray-700">{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {profile.socialLinks && profile.socialLinks.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Connect With Me</h4>
                  <div className="flex space-x-4">
                    {profile.socialLinks.map((link) => (
                      <Button
                        key={link.platform}
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        {link.platform}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Key Achievements */}
          <motion.div
            {...scrollSlideInRight}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card hover className="p-6 sm:p-8 h-full rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Key Achievements</h3>
              <div className="space-y-4 sm:space-y-6">
                {keyAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 sm:space-x-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{achievement.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center sm:text-left">Skills Overview</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
                const config = categoryConfig[category as keyof typeof categoryConfig];
                if (!config) return null;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-4 sm:p-6 rounded-lg ${config.lightColor} border border-gray-200`}
                  >
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">{config.name}</h4>
                    <div className="space-y-3 sm:space-y-4">
                      {categorySkills.slice(0, 3).map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">{skill.name}</span>
                            <span className="text-xs text-gray-500 capitalize">{skill.proficiency}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <motion.div 
                              className={`h-1.5 sm:h-2 rounded-full ${config.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${getProficiencyPercentage(skill.proficiency)}%` }}
                              transition={{ duration: 1, delay: categoryIndex * 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          {skill.yearsOfExperience && (
                            <p className="text-xs text-gray-500 mt-1">
                              {skill.yearsOfExperience} years experience
                            </p>
                          )}
                        </div>
                      ))}
                      {categorySkills.length > 3 && (
                        <p className="text-xs text-gray-500 mt-2">
                          +{categorySkills.length - 3} more skills
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary"
              size="lg"
              onClick={() => window.open(`mailto:${profile.email}`, '_blank')}
            >
              Get In Touch
            </Button>
            {profile.resumeUrl && (
              <Button 
                variant="outline"
                size="lg"
                onClick={() => window.open(profile.resumeUrl, '_blank')}
              >
                Download Resume
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;