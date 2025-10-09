import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaGraduationCap, FaBriefcase, FaFileUpload } from 'react-icons/fa';

const CareerForm = ({ job, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    education: '',
    otherEducation: '',
    specifyOtherEducation: '',
    position: job.title,
  });

  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherEducation, setShowOtherEducation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'education' && value === 'Other') {
      setShowOtherEducation(true);
    } else if (name === 'education') {
      setShowOtherEducation(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setResume(file);
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const applicationData = {
      ...formData,
      jobTitle: job.title,
      jobId: job.id,
      resume: resume?.name || '',
      appliedAt: new Date().toISOString()
    };

    try {
      await onSubmit(applicationData);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const educationOptions = [
    "Bachelor's in Computer Engineering",
    "Master's in Computer Engineering", 
    "Bachelor's in IT Engineering",
    "Master's in IT Engineering",
    "Bachelor's in Other Stream",
    "Master's in Other Stream",
    "Other"
  ];

  return (
    <AnimatePresence>
      {/* CHANGED: Transparent backdrop with blur effect on the entire page */}
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl border border-red-200 max-w-md w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-red-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Apply Here</h2>
                <p className="text-red-100 mt-1">{job.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-red-200 transition-colors duration-200 p-2 text-xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form Content - Same as before */}
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaUser className="text-red-500" />
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaPhone className="text-red-500" />
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="+91 1234567890"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaEnvelope className="text-red-500" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Education / Qualification */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaGraduationCap className="text-red-500" />
                  Education / Qualification *
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select your education</option>
                  {educationOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Other Education Specification */}
              <AnimatePresence>
                {showOtherEducation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-sm font-semibold text-gray-700">
                      Please Specify Other Education
                    </label>
                    <input
                      type="text"
                      name="specifyOtherEducation"
                      value={formData.specifyOtherEducation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Specify your education"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* For The Position (Read-only) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaBriefcase className="text-red-500" />
                  For The Position *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl text-gray-600"
                />
              </div>

              {/* Upload Resume */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaFileUpload className="text-red-500" />
                  Upload Resume *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                {resume && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span>✓</span> {resume.name}
                  </p>
                )}
                <p className="text-xs text-gray-500">PDF or Word documents only</p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CareerForm;