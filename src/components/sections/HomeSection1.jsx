// src/components/hero/HomeSection1.jsx - DOMINANT BACKGROUND
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaBrain, FaChartLine } from 'react-icons/fa';

// Import images
import customUI from '../../assets/homeIMG/custom-header.jpg';
import dashboard1 from '../../assets/images/homeSection1.jpg';
import dashboard3 from '../../assets/images/homeSection2.jpg';

const HomeSection1 = () => {
  const [currentDashboard, setCurrentDashboard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const dashboardImages = [dashboard1, dashboard3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDashboard((prev) => (prev + 1) % dashboardImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [dashboardImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* DOMINANT BACKGROUND IMAGE */}
      <motion.div 
        className="absolute inset-0 min-h-screen z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* High Quality Background Image */}
        <img 
          src={customUI} 
          alt="AI Technology Background"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Minimal Gradient Overlay - Just enough for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 via-red-800/50 to-transparent"></div>
        
        {/* Subtle Vignette Effect */}
        <div className="absolute inset-0 bg-radial-gradient(at center, transparent 0%, rgba(220, 38, 38, 0.3) 100%)"></div>
      </motion.div>
      
      {/* FLOATING AI ELEMENTS */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/80 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.9, 0],
              scale: [0, 1.3, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* MODERN SPLIT LAYOUT */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* LEFT SIDE - CONTENT WITH GLASS MORPHISM */}
        <motion.div 
          className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-2xl space-y-8">
            {/* GLASS MORPHISM CONTAINER */}
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* AI BADGE */}
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/80 to-red-700/80 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-sm font-bold text-white tracking-wide">AI-POWERED SOLUTIONS</span>
              </motion.div>

              {/* MAIN HEADLINE */}
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <span className="text-white block drop-shadow-2xl">Intelligent</span>
                <motion.span 
                  className="bg-gradient-to-r from-white via-red-200 to-red-300 bg-clip-text text-transparent block drop-shadow-2xl"
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
                  AI Solutions
                </motion.span>
                <span className="text-red-100 block drop-shadow-2xl">For Modern Business</span>
              </motion.h1>
              
              {/* AI FEATURES GRID */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {[
                  { icon: FaBrain, label: "Machine Learning", color: "text-white" },
                  { icon: FaRocket, label: "AI Automation", color: "text-red-200" },
                  { icon: FaChartLine, label: "Smart Analytics", color: "text-red-300" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.15)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  >
                    <feature.icon className={`w-7 h-7 mx-auto mb-3 ${feature.color}`} />
                    <div className="text-sm text-white font-semibold leading-tight">{feature.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* DESCRIPTION */}
              <motion.p 
                className="text-lg text-red-100 leading-relaxed font-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Transform your business with cutting-edge <span className="text-white font-semibold">Artificial Intelligence</span>. 
                Our intelligent systems learn, adapt, and drive unprecedented efficiency across your operations.
              </motion.p>

              {/* ENHANCED CTA BUTTON */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <Link to='/contact'>
                  <motion.button 
                    className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-3xl border border-red-400/30 overflow-hidden w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform"
                      animate={{ 
                        x: isHovered ? ["-100%", "200%"] : "-100%"
                      }}
                      transition={{ duration: 1 }}
                    />
                    
                    <span className="relative flex items-center justify-center gap-3">
                      <FaRocket className="text-xl" />
                      Start AI Journey
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - DASHBOARD SHOWCASE */}
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
              initial={{ 
                opacity: 0,
                scale: 1.05,
                filter: "blur(10px)"
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                filter: "blur(0px)"
              }}
              exit={{ 
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)"
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <img 
                src={dashboardImages[currentDashboard]} 
                className="w-full h-full object-cover"
                alt="AI Dashboard Interface"
              />
              
              {/* Minimal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-red-900/30 to-transparent"></div>
            </motion.div>
          </AnimatePresence>

          {/* MINIMAL INDICATORS */}
          <motion.div 
            className="absolute bottom-8 left-8 flex space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            {dashboardImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentDashboard(index)}
                className={`relative w-16 h-1 rounded-full overflow-hidden backdrop-blur-sm ${
                  currentDashboard === index 
                    ? 'bg-white/80' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentDashboard === index && (
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    layoutId="activeIndicator"
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