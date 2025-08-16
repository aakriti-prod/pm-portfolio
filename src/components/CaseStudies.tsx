import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, User, Building, Tag, TrendingUp, BarChart3, Target, CheckCircle } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import Modal from './Modal';
import { scrollFadeIn, staggerContainer, staggerItem, hoverLift } from '../utils/animations';
import type { CaseStudy } from '../types';

export interface CaseStudiesProps {
  caseStudies: CaseStudy[];
  className?: string;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudies, className = '' }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    caseStudies.forEach(caseStudy => {
      caseStudy.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [caseStudies]);

  // Filter case studies based on selected filter
  const filteredCaseStudies = useMemo(() => {
    if (selectedFilter === 'all') {
      return caseStudies.sort((a, b) => a.order - b.order);
    }
    return caseStudies
      .filter(caseStudy => caseStudy.tags.includes(selectedFilter))
      .sort((a, b) => a.order - b.order);
  }, [caseStudies, selectedFilter]);

  const openCaseStudyModal = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const closeCaseStudyModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'currency':
        return <BarChart3 className="w-5 h-5 text-blue-600" />;
      case 'number':
        return <Target className="w-5 h-5 text-purple-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-600" />;
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'currency':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'number':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <section id="case-studies" className={`py-12 sm:py-16 md:py-20 ${className}`} aria-labelledby="case-studies-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...scrollFadeIn}
          className="text-center sm:text-left mb-12 sm:mb-16"
        >
          <h2 id="case-studies-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Case Studies</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my product management journey through detailed case studies showcasing 
            real-world challenges, solutions, and measurable results.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
          role="group"
          aria-label="Filter case studies by category"
        >
          <Button
            variant={selectedFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className="mb-2"
          >
            All Projects
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedFilter === tag ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(tag)}
              className="mb-2"
            >
              <Tag className="w-4 h-4 mr-1" />
              {tag}
            </Button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredCaseStudies.map((caseStudy) => (
              <motion.div
                key={caseStudy.id}
                variants={staggerItem}
                layout
                {...hoverLift}
              >
                <Card 
                  hover 
                  className="h-full overflow-hidden rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 touch-optimized"
                  onClick={() => openCaseStudyModal(caseStudy)}
                  aria-label={`View details for ${caseStudy.title} case study`}
                >
                  {/* Case Study Image */}
                  {caseStudy.images && caseStudy.images[0] && (
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                      <div className="absolute inset-0 bg-black bg-opacity-20" />
                      <div className="absolute bottom-4 left-4 right-4">
                        {caseStudy.featured && (
                          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                            Featured
                          </span>
                        )}
                        <h3 className="text-white text-xl font-bold leading-tight">
                          {caseStudy.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Title and Subtitle (if no image) */}
                    {(!caseStudy.images || !caseStudy.images[0]) && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{caseStudy.title}</h3>
                          {caseStudy.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        {caseStudy.subtitle && (
                          <p className="text-blue-600 font-medium">{caseStudy.subtitle}</p>
                        )}
                      </div>
                    )}

                    {/* Subtitle for cards with images */}
                    {caseStudy.images && caseStudy.images[0] && caseStudy.subtitle && (
                      <p className="text-blue-600 font-medium mb-3">{caseStudy.subtitle}</p>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {caseStudy.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {caseStudy.duration}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {caseStudy.role}
                      </div>
                      {caseStudy.company && (
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {caseStudy.company}
                        </div>
                      )}
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {caseStudy.metrics.slice(0, 2).map((metric) => (
                        <div 
                          key={metric.label} 
                          className={`p-3 rounded-lg border ${getMetricColor(metric.type)} text-center`}
                        >
                          <div className="flex items-center justify-center mb-1">
                            {getMetricIcon(metric.type)}
                          </div>
                          <div className="font-bold text-lg">{metric.value}</div>
                          <div className="text-xs opacity-80">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {caseStudy.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{caseStudy.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Button 
                      variant="outline" 
                      className="w-full group"
                      onClick={() => openCaseStudyModal(caseStudy)}
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredCaseStudies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No case studies found for the selected filter.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedFilter('all')}
              className="mt-4"
            >
              Show All Projects
            </Button>
          </motion.div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeCaseStudyModal}
        size="xl"
        className="max-h-[90vh]"
      >
        {selectedCaseStudy && (
          <div className="overflow-y-auto max-h-[80vh]">
            {/* Modal Header with Image */}
            {selectedCaseStudy.images && selectedCaseStudy.images[0] && (
              <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-white text-3xl font-bold">
                      {selectedCaseStudy.title}
                    </h1>
                    {selectedCaseStudy.featured && (
                      <span className="bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full">
                        Featured Project
                      </span>
                    )}
                  </div>
                  {selectedCaseStudy.subtitle && (
                    <p className="text-blue-100 text-lg font-medium">
                      {selectedCaseStudy.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Title for modals without images */}
              {(!selectedCaseStudy.images || !selectedCaseStudy.images[0]) && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {selectedCaseStudy.title}
                    </h1>
                    {selectedCaseStudy.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Featured Project
                      </span>
                    )}
                  </div>
                  {selectedCaseStudy.subtitle && (
                    <p className="text-blue-600 text-lg font-medium">
                      {selectedCaseStudy.subtitle}
                    </p>
                  )}
                </div>
              )}

              {/* Project Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">Duration</div>
                  <div className="text-gray-600">{selectedCaseStudy.duration}</div>
                </div>
                <div className="text-center">
                  <User className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold">Role</div>
                  <div className="text-gray-600">{selectedCaseStudy.role}</div>
                </div>
                {selectedCaseStudy.company && (
                  <div className="text-center">
                    <Building className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">Company</div>
                    <div className="text-gray-600">{selectedCaseStudy.company}</div>
                  </div>
                )}
              </div>

              {/* Project Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedCaseStudy.description}
                </p>
              </div>

              {/* Challenge */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCaseStudy.solution}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Results & Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCaseStudy.metrics.map((metric) => (
                    <div 
                      key={metric.label}
                      className={`p-6 rounded-lg border-2 ${getMetricColor(metric.type)}`}
                    >
                      <div className="flex items-center mb-3">
                        {getMetricIcon(metric.type)}
                        <h3 className="font-semibold ml-2">{metric.label}</h3>
                      </div>
                      <div className="text-3xl font-bold mb-2">{metric.value}</div>
                      {metric.description && (
                        <p className="text-sm opacity-80">{metric.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Results List */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Results</h2>
                <div className="space-y-3">
                  {selectedCaseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{result}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies & Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {selectedCaseStudy.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={closeCaseStudyModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default CaseStudies;