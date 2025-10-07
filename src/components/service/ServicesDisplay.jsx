// components/ServiceDisplayMinimal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';

const ServicesDisplay = ({ services }) => {
  const [expandedService, setExpandedService] = useState(null);

  // Add this useEffect for hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#service-', '');
      console.log('Hash changed to:', hash);
      
      if (hash) {
        // Convert hash to number to match service.id
        const serviceId = parseInt(hash, 10);
        console.log('Converted to number:', serviceId);
        
        // Force the card to expand
        setExpandedService(serviceId);
        
        // Scroll after expand animation starts
        setTimeout(() => {
          const element = document.getElementById(`service-${hash}`);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 300);
      } else {
        // If no hash, collapse all
        setExpandedService(null);
      }
    };

    // Check URL on component load
    handleHashChange();
    
    // Listen for URL changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const truncateDescription = (description, wordLimit = 25) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleCardClick = (serviceId) => {
    const newState = expandedService === serviceId ? null : serviceId;
    setExpandedService(newState);
    
    if (newState) {
      // Smooth scroll to the expanded card after animation starts
      setTimeout(() => {
        const element = document.getElementById(`service-${serviceId}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 150); // Small delay to let expand animation start
    }
  };

  return (
    <div className="bg-white">
      {/* Services */}
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-red-200 transition-all duration-300 overflow-hidden"
            >
              <div className="w-full">
                {/* Collapsed Card */}
                <div 
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    expandedService === service.id ? 'bg-red-50 border-b border-gray-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleCardClick(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-xl text-white">
                        {service.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        
                        {expandedService !== service.id && (
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {truncateDescription(service.description)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedService === service.id ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 ml-4 hover:bg-red-200 transition-colors"
                    >
                      <FaChevronRight size={14} />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 min-h-[80vh] flex items-center relative bg-gradient-to-br from-white via-red-50/20 to-white">
                        {/* Subtle Dot Pattern */}
                        <div 
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, #ef4444 1px, transparent 0)`,
                            backgroundSize: '20px 20px',
                          }}
                        />
                        
                        <div className="relative z-10 w-full">
                          {/* Dynamic Layout */}
                          {service.services && service.services.length > 0 ? (
                            /* Original split layout when sub-services exist */
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                              {/* Big Image Section - Takes 2 columns */}
                              <div className="lg:col-span-2 space-y-6">
                                <div className="rounded-2xl overflow-hidden">
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-80 object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                    Service Overview
                                  </h4>
                                  <p className="text-gray-700 leading-relaxed text-lg">
                                    {service.description}
                                  </p>
                                </div>
                              </div>

                              {/* Sub-services Section - Takes 1 column */}
                              <div className="space-y-6">
                                <div className="bg-gray-50 rounded-2xl p-6">
                                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                                    Our Offerings
                                  </h4>
                                  <div className="space-y-3">
                                    {service.services.map((item, idx) => (
                                      <div key={idx} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                                        <span className="text-gray-700">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Full width layout when no sub-services - Image left, Content right */
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                              {/* Image on Left - Bigger and better fitting */}
                              <div className="space-y-6">
                                <div className="rounded-2xl overflow-hidden">
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-96 object-cover"
                                  />
                                </div>
                              </div>
                              
                              {/* Content on Right */}
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                    Service Overview
                                  </h4>
                                  <p className="text-gray-700 leading-relaxed text-lg">
                                    {service.description}
                                  </p>
                                </div>
                                
                                {/* Optional: Add a small feature highlight */}
                                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                                  <h5 className="font-semibold text-gray-900 mb-3">Why Choose This Service?</h5>
                                  <div className="space-y-2 text-sm text-gray-700">
                                    <p>• Expert team with 18+ years experience</p>
                                    <p>• Customized solutions for your business</p>
                                    <p>• Ongoing support and maintenance</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA - Reduced Space */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center pb-20"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 max-w-xl mx-auto text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Need Guidance?
          </h3>
          <p className="text-gray-300 mb-6">
            Let our experts help you choose the perfect solution
          </p>
          <motion.button
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Free Consultation
            <FaArrowRight />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesDisplay;