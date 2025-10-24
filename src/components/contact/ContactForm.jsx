import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaTimes } from 'react-icons/fa';
import FormLoader from '../FormLoader';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: '',
    requirementDetail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Same popup state as CareerForm
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interestedIn: formData.interestedIn,
          requirementDetail: formData.requirementDetail
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.text();
      
      // Show success popup (same as CareerForm)
      setPopupMessage('🎉 Message sent successfully!\n\nThank you for contacting Rapptorsoft. We have received your message and will get back to you soon.');
      setShowPopup(true);
      
      // Auto close after 4 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 4000);

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestedIn: '',
        requirementDetail: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      setPopupMessage('❌ There was an error sending your message. Please try again.');
      setShowPopup(true);
      
      // Auto close error after 4 seconds too
      setTimeout(() => setShowPopup(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Main Form - Only show when popup is NOT visible */}
      <AnimatePresence>
        {!showPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaPaperPlane className="text-2xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-600">Fill out the form and we'll get back to you soon</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="+91 1234567890"
                />
              </div>

              {/* Interested In Field */}
              <div>
                <label htmlFor="interestedIn" className="block text-sm font-semibold text-gray-700 mb-2">
                  Interested In
                </label>
                <select
                  id="interestedIn"
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select an option</option>
                  <option value="shipping-software">Shipping Software</option>
                  <option value="logistics-solutions">Logistics Solutions</option>
                  <option value="scm-software">SCM Software</option>
                  <option value="vgm-solutions">VGM Solutions</option>
                  <option value="custom-development">Custom Development</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Requirement Details Field */}
              <div>
                <label htmlFor="requirementDetail" className="block text-sm font-semibold text-gray-700 mb-2">
                  Requirement Details *
                </label>
                <textarea
                  id="requirementDetail"
                  name="requirementDetail"
                  value={formData.requirementDetail}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-300 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Please describe your requirements in detail..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <FormLoader size="sm" color="white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success/Error Popup - EXACT SAME as CareerForm */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
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
                  onAnimationComplete={handleClosePopup}
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

export default ContactForm;