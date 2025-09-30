// src/components/hero/HomeSection1.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images directly in component
import bg1 from '../../assets/images/bg_1.jpg';
import bg2 from '../../assets/images/bg_2.jpg';
import dashboard1 from '../../assets/images/dashboard_full_1.png';
import dashboard3 from '../../assets/images/dashboard_full_3.png';

const HomeSection1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🎓 DATA MOVED INSIDE COMPONENT - Easy to reuse!
  const slides = [
    {
      bgImage: bg1,
      dashboard: dashboard1,
      title: "Everything you need to Host your website",
      description: "Up to 90% Discount with Free Domain Name Registration",
    },
    {
      bgImage: bg2,
      dashboard: dashboard3, 
      title: "The Web Hosting Platform Made for You",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    }
  ];
  const [isPausede, setIsPaused] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if(isPausede) return; // Pause auto-slide when paused
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0 min-h-screen"
          style={{
            backgroundImage: `url(${slides[currentSlide].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          {/* Red Overlay */}
          <div className="absolute inset-0 bg-red-600/70"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              
              {/* Text Content */}
              <motion.div 
                className="text-center lg:text-left space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl text-red-100 max-w-2xl">
                  {slides[currentSlide].description}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.button 
                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get started
                  </motion.button>
                  <motion.button 
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read more
                  </motion.button>
                </div>
              </motion.div>

              {/* Dashboard Image */}
              <motion.div 
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.img 
  src={slides[currentSlide].dashboard} 
  className="w-full max-w-2xl scale-110" // 10% bigger
  alt="Dashboard"
  whileHover={{ scale: 1.12 }}
/>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSection1;