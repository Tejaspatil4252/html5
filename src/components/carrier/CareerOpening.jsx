import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp, FaUsers, FaClock } from 'react-icons/fa';

const CareerOpening = ({ job, isSelected, onApply, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Job Header - Always Visible */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
              <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                {job.positions} Position{job.positions > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-red-500" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-red-500" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-red-500" />
                <span>{job.department}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApply}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 whitespace-nowrap"
            >
              Apply Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpand}
              className="flex items-center gap-2 text-red-600 border border-red-200 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors duration-300 whitespace-nowrap"
            >
              {isExpanded ? (
                <>
                  <FaChevronUp className="text-sm" />
                  Show Less
                </>
              ) : (
                <>
                  <FaChevronDown className="text-sm" />
                  View Details
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-red-100 overflow-hidden"
          >
            <div className="p-6 bg-red-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Requirements */}
                  {job.requirements && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FaUsers className="text-red-500" />
                        Candidate Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {job.responsibilities && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Jobs & Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Experience Areas */}
                  {job.experienceAreas && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Required Experience
                      </h4>
                      <ul className="space-y-2">
                        {job.experienceAreas.map((exp, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Skills */}
                  {job.skills && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Skills & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-white border border-red-200 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Concepts */}
                  {job.concepts && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Concepts
                      </h4>
                      <ul className="space-y-2">
                        {job.concepts.map((concept, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-red-500 mt-1">•</span>
                            <span className="text-sm">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-900">Salary</h5>
                      <p className="text-gray-700">{job.salary}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900">Required Education</h5>
                      <p className="text-gray-700">{job.education}</p>
                    </div>

                    {job.languages && (
                      <div>
                        <h5 className="font-semibold text-gray-900">Languages</h5>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="bg-white border border-red-200 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Apply Button */}
              <div className="mt-6 pt-6 border-t border-red-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onApply}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Apply for {job.title}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CareerOpening;