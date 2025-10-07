// src/components/hero/HomeSection1.jsx - SMOOTH BOTH WAYS
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images
import bg1 from '../../assets/images/bg_1.jpg';
import dashboard1 from '../../assets/images/homeSection1.jpg';
import dashboard3 from '../../assets/images/homeSection2.jpg';

const HomeSection1 = () => {
  const [currentDashboard, setCurrentDashboard] = useState(0);

  const dashboardImages = [dashboard1, dashboard3];

  // Auto-swap every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDashboard((prev) => (prev + 1) % dashboardImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [dashboardImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* RED THEME BACKGROUND */}
      <div 
        className="absolute inset-0 min-h-screen z-0"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-red-900/90"></div>
      </div>
      
      {/* MODERN SPLIT LAYOUT */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* LEFT SIDE - TEXT CONTENT */}
        <motion.div 
          className="w-full lg:w-1/2 flex items-center justify-center p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl space-y-8">
            {/* MAIN HEADLINE */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-red-200">Customized Solutions</span>
              <br />
              <span className="text-red-200">For </span>
              <motion.span 
                className="bg-gradient-to-r from-red-500 via-red-500 to-red-700 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Business Development
              </motion.span>
            </motion.h1>
            
            {/* DESCRIPTION */}
            <motion.p 
              className="text-xl text-red-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rapportsoft Consulting & Technology is one of India's largest Shipping software 
              products company providing innovative and integrated enterprise solutions.
            </motion.p>

            {/* SINGLE CLEAN BUTTON */}
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-gray-900 transition-all duration-300 shadow-2xl hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - SMOOTH BOTH APPEAR AND DISAPPEAR */}
        <motion.div 
          className="hidden lg:block w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDashboard}
              className="absolute inset-0"
              // 🎯 SMOOTH APPEARANCE
              initial={{ 
                opacity: 0,
                scale: 1.05,
                filter: "blur(8px)"
              }}
              // 🎯 SMOOTH VISIBLE STATE
              animate={{ 
                opacity: 1,
                scale: 1,
                filter: "blur(0px)"
              }}
              // 🎯 SMOOTH DISAPPEARANCE
              exit={{ 
                opacity: 0,
                scale: 0.95,
                filter: "blur(8px)"
              }}
              // 🎯 SMOOTH TRANSITION FOR ALL
              transition={{ 
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1] // Smoother cubic-bezier
              }}
            >
              <img 
                src={dashboardImages[currentDashboard]} 
                className="w-full h-full object-cover"
                alt="Dashboard Interface"
              />
              
              {/* RED GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-l from-red-900/40 to-transparent"></div>
            </motion.div>
          </AnimatePresence>

          {/* ENHANCED INDICATORS */}
          <motion.div 
            className="absolute bottom-8 left-8 flex space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {dashboardImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentDashboard(index)}
                className={`relative w-12 h-1 rounded-full overflow-hidden ${
                  currentDashboard === index 
                    ? 'bg-red-600' 
                    : 'bg-red-900/60 hover:bg-red-800'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentDashboard === index && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-black"
                    layoutId="activeIndicator" // Smooth layout transition
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      duration: 4.8,
                      ease: "linear"
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection1;