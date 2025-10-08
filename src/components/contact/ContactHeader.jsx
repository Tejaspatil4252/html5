import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaHeadset, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const ContactHeader = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              <FaHeadset className="text-red-600" />
              Get in Touch
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Message{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Us
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-700 font-semibold"
            >
              Drop us a Message for any Query
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              We would love to hear from you. Contact us directly or visit the details below, or fill out the form and we'll get back to you soon.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-6"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-gray-500 mt-1">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">2h</div>
                <div className="text-sm text-gray-500 mt-1">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">100%</div>
                <div className="text-sm text-gray-500 mt-1">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Graphic Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-red-100 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="text-3xl text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Connect</h3>
                <p className="text-gray-600">Multiple ways to reach us</p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">
                    <FaHeadset className="text-lg" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Live Chat</div>
                    <div className="text-sm text-gray-600">Instant support</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quick Response</div>
                    <div className="text-sm text-gray-600">Within 2 hours</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Visit Office</div>
                    <div className="text-sm text-gray-600">3 locations</div>
                  </div>
                </motion.div>
              </div>

              {/* Emergency Contact */}
              <div className="text-center p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white">
                <div className="text-sm font-semibold">Urgent Support?</div>
                <div className="text-lg font-bold mt-1">+91 8329469330</div>
                <div className="text-red-100 text-xs mt-1">Available 24/7</div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -left-6 w-12 h-12 bg-red-400 rounded-full shadow-lg"
            />
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -right-4 w-8 h-8 bg-red-300 rounded-full shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;