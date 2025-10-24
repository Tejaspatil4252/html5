import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaGraduationCap, FaBriefcase, FaFileUpload, FaCheck } from 'react-icons/fa';
import FormLoader from '../FormLoader';

const CareerForm = ({ job, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    applicantName: '',       
    applicantMobile: '',      
    applicantEmail: '',       
    education: '',
    otherEducationSpecification: '',  
    positionApplied: job.title,       
    jobId: job.id,                    
  });

  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherEducation, setShowOtherEducation] = useState(false);
  
  // Simple popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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
      setFormData(prev => ({ ...prev, otherEducationSpecification: '' }));
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

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('application', new Blob([JSON.stringify({
        jobId: job.id,
        applicantName: formData.applicantName,
        applicantMobile: formData.applicantMobile,
        applicantEmail: formData.applicantEmail,
        education: formData.education,
        otherEducationSpecification: formData.otherEducationSpecification,
        positionApplied: job.title
      })], { type: 'application/json' }));

      if (resume) {
        formDataToSend.append('resume', resume);
      }

      const response = await fetch('http://localhost:8080/api/careers/apply-with-resume', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      
      // Show success popup
      setPopupMessage('🎉 Application submitted successfully!\n\nWe have received your application for ' + job.title + '.\nOur team will review it and contact you soon.');
      setShowPopup(true);
      
      if (onSubmit) {
        onSubmit({
          success: true,
          message: result.message,
          applicationId: result.applicationId
        });
      }

    } catch (error) {
      console.error('Submission error:', error);
      setPopupMessage('❌ There was an error submitting your application. Please try again.');
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Close the form only if it was a success
    if (popupMessage.includes('🎉')) {
      onClose();
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
    <>
      {/* Main Form */}
      <AnimatePresence>
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
                  disabled={isSubmitting}
                  className="text-white hover:text-red-200 disabled:opacity-50 transition-colors duration-200 p-2 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form Content */}
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
                    name="applicantName"  
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
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
                    name="applicantMobile"  
                    maxLength={10}
                    value={formData.applicantMobile}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="1234567890"
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
                    name="applicantEmail"
                    value={formData.applicantEmail}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Education */}
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                  >
                    <option value="">Select your education</option>
                    {educationOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Other Education */}
                {showOtherEducation && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Please Specify Other Education
                    </label>
                    <input
                      type="text"
                      name="otherEducationSpecification"
                      value={formData.otherEducationSpecification}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                      placeholder="Specify your education"
                    />
                  </div>
                )}

                {/* Position */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaBriefcase className="text-red-500" />
                    For The Position *
                  </label>
                  <input
                    type="text"
                    value={formData.positionApplied}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl text-gray-600"
                  />
                </div>

                {/* Resume Upload */}
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 disabled:bg-gray-100"
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
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FormLoader size="sm" color="white" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Success/Error Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[60] p-4"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden"
            >
              {/* Red Header */}
              <div className="bg-red-600 p-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-4"
                >
                  <FaCheck className="text-4xl text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">
                  Success!
                </h3>
              </div>

              {/* Green Message Background */}
              <div className="p-6 text-center bg-green-50 border-b border-gray-200">
                <p className="text-lg font-medium text-green-800 whitespace-pre-line">
                  {popupMessage}
                </p>
                
                {/* Progress Bar */}
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  onAnimationComplete={() => {
                    if (popupMessage.includes('🎉')) {
                      setShowPopup(false);
                      onClose();
                    }
                  }}
                  className="mt-4 h-1 bg-green-300 rounded-full"
                />
              </div>

              {/* Close Button */}
              <div className="p-4">
                <button
                  onClick={handleClosePopup}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
                >
                  Got It!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CareerForm;