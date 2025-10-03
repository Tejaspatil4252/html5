// src/components/hero/HomeSection1.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images directly in component
import bg1 from '../../assets/images/bg_1.jpg'; // Static background
import dashboard1 from '../../assets/images/dashboard_full_1.png';
import dashboard3 from '../../assets/images/dashboard_full_3.png';

const HomeSection1 = () => {
  const [currentDashboard, setCurrentDashboard] = useState(0);

  // Static text content that remains the same
  const staticContent = {
    title: "Customized Solutions For Business Development",
    description: "Rapportsoft Consulting & Technology is one of the India's largest Shipping software products company providing innovative and integrated enterprise solutions ensuring customer satisfaction.",
  };

  // Only dashboard images change
  const dashboardImages = [dashboard1, dashboard3];

  // Auto-swap dashboard images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDashboard((prev) => (prev + 1) % dashboardImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [dashboardImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* STATIC BACKGROUND IMAGE - No animation */}
      <div 
        className="absolute inset-0 min-h-screen z-0"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* STATIC RED OVERLAY */}
        <div className="absolute inset-0 bg-red-600/70"></div>
      </div>
      
      {/* STATIC CONTENT - No animations */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Text Content - Completely Static */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {staticContent.title}
            </h1>
            <p className="text-xl text-red-100 max-w-2xl">
              {staticContent.description}
            </p>
            
            {/* Buttons - Static */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
                Get In Touch
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-300">
                Read more
              </button>
            </div>
          </div>

          {/* ONLY DASHBOARD IMAGE ANIMATES - Auto-swaps between 2 images */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentDashboard}
                src={dashboardImages[currentDashboard]} 
                className="w-full max-w-2xl"
                alt="Dashboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection1;