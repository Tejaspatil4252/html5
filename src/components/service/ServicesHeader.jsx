// components/ServicesHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ServicesHeader = ({ services }) => { // ← Accept services prop
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Trusted by Industry Leaders
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Our{' '}
                <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  Services
                </span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Rapportsoft Consulting and Technology is one of India's largest Shipping software products company providing innovative and integrated enterprise solutions ensuring customer satisfaction.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Any organization needs a strong solid foundation of their business process implementations for it to sustain in the industry and increase ROI. With the ever-growing technologies and available design, architectural and implementation solutions, businesses are finding it difficult to evaluate the right choice for their business needs.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The right choice is the one that not only makes the design, development and deployment in the most effective way but also ensures application enhancements and maintenance that could be done with minimum effort.
                </p>
              </motion.div>

              {/* Technology Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <p className="text-gray-700 font-semibold">
                  <span className="text-red-600">Rapportsoft Suite of Products</span> are built on{' '}
                  <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-bold">
                    JAVA / J2EE
                  </span>{' '}
                  platform
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - Services Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {services.map((service, index) => ( 
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => window.location.hash = `service-${service.id}`}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-xl text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon} {/* ← Use service.icon from data */}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {service.title} {/* ← Use service.title from data */}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHeader;