import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaHardHat, FaCode, FaClock, FaHome } from 'react-icons/fa';

const UnderConstruction = ({ pageName = "This Page" }) => {
  const handleGoHome = () => {
    // Replace with your actual home route
    window.location.href = '/';
    // Or if using anchor: window.location.href = '#home';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Construction Icons */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <FaTools className="text-5xl text-red-600" />
          </div>
          
          {/* Floating Icons */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4"
          >
            <FaHardHat className="text-2xl text-red-500" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-4 right-1/4"
          >
            <FaCode className="text-xl text-red-500" />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            <span className="text-red-600">Under</span> Construction
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-lg text-gray-600"
          >
            <FaClock className="text-red-500" />
            <span>We're working hard to bring you something amazing!</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-gray-700 max-w-md mx-auto leading-relaxed"
          >
            {pageName} is currently being built with care. Please check back soon for updates!
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1 }}
            className="max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full relative">
              <motion.div
                animate={{ x: [-100, 400] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-0 left-0 w-20 h-full bg-white opacity-30 skew-x-45"
              ></motion.div>
            </div>
          </motion.div>

          {/* Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoHome}
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors duration-300 flex items-center gap-3 mx-auto"
            >
              <FaHome className="text-lg" />
              Back to Homepage
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 text-red-300 text-4xl opacity-60"
        >
          {"</>"}
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-10 right-10 text-red-300 text-3xl opacity-60"
        >
          {"{}"}
        </motion.div>
      </div>
    </div>
  );
};

export default UnderConstruction;