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

  // Static text content that remains the same
  const staticContent = {
    title: "Customized Solutions For Business Development",
    description: "Rapportsoft Consulting & Technology is one of the India's largest Shipping software products company providing innovative and integrated enterprise solutions ensuring customer satisfaction.",
  };

  // Only images change in slides
  const slides = [
    {
      bgImage: bg1,
      dashboard: dashboard1,
    },
    {
      bgImage: bg2,
      dashboard: dashboard3, 
    }
  ];

  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 8 seconds
  useEffect(() => {
    if(isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images with Smooth Crossfade */}
      <div className="absolute inset-0 min-h-screen">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 min-h-screen"
            style={{
              backgroundImage: `url(${slides[currentSlide].bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.2, // Slower for smoother transition
              ease: "easeInOut"
            }}
          >
            {/* Red Overlay */}
            <div className="absolute inset-0 bg-red-600/70"></div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Static Content - Always visible */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Text Content - Static */}
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {staticContent.title}
            </h1>
            <p className="text-xl text-red-100 max-w-2xl">
              {staticContent.description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button 
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read more
              </motion.button>
            </div>
          </motion.div>

          {/* Dashboard Image - Smooth Slide */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img 
                key={currentSlide}
                src={slides[currentSlide].dashboard} 
                className="w-full max-w-2xl scale-110"
                alt="Dashboard"
                initial={{ 
                  opacity: 0, 
                  scale: 0.95,
                  filter: "blur(4px)"
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1.1,
                  filter: "blur(0px)"
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.05,
                  filter: "blur(4px)"
                }}
                transition={{ 
                  duration: 1.2, // Slower transition
                  ease: [0.25, 0.46, 0.45, 0.94] // Custom ease curve for smoothness
                }}
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.3 }
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSection1;