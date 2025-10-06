import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import old from '../../assets/aboutImg/old-port.jpg';
import newport from '../../assets/aboutImg/modern-port.jpg';

const AboutHero = () => {
  const [showModern, setShowModern] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Auto-start animation after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      setShowModern(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Toggle on hover
  const handleImageHover = () => {
    setShowModern(!showModern);
  };

  return (
    <div className="relative bg-gradient-to-br from-red-900 via-red-800 to-rose-900 text-white overflow-hidden min-h-[80vh]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-500 rounded-full -translate-y-36 translate-x-36 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full translate-y-48 -translate-x-48 opacity-20 blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Enhanced Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Authorized VGM Vendor • D.G. Shipping Approved</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              From <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">Traditional</span> to <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">Digital</span>
            </h1>

            {/* Enhanced Description */}
            <div className="space-y-4 mb-6">
              <p className="text-lg text-gray-200 leading-relaxed">
                <strong>Rapportsoft Consulting & Technology</strong> is India's premier shipping software solutions provider, transforming maritime logistics since 2005 through cutting-edge digital innovation.
              </p>
              
              <div className="space-y-2 text-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-base"><strong>Headquartered in Pune</strong> with 2 global development centers</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-base"><strong>Expertise in large-scale software projects</strong> across SCM marketplace</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-base"><strong>Authorized VGM vendor</strong> & <strong>D.G. Shipping Mumbai approved</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-base"><strong>End-to-end enterprise solutions</strong> with robust quality processes</span>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">18+</div>
                <div className="text-gray-300 text-xs font-medium">Years of Excellence</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">India's</div>
                <div className="text-gray-300 text-xs font-medium">Largest Shipping IT</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">2</div>
                <div className="text-gray-300 text-xs font-medium">Global Centers</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">2005</div>
                <div className="text-gray-300 text-xs font-medium">Established</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="font-bold text-white mb-2 text-base">Why Choose Rapportsoft?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Project Management Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Business Process Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Enterprise Class Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Global Client Management</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Better Balanced Image Section */}
          <div 
            className="relative cursor-pointer flex items-center justify-center h-full"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageHover}
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
              {/* Modern Port Image */}
              <AnimatePresence>
                {showModern && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={newport} 
                      alt="Modern automated port"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Modern Solutions Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-4 left-4 bg-green-600/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-400"
                    >
                      <div className="text-white font-bold text-sm">Modern Solutions</div>
                      <div className="text-green-200 text-xs">Automated • Digital • Efficient</div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Old Port Image */}
              <AnimatePresence>
                {!showModern && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ 
                      opacity: 0,
                      scale: 1.1,
                      filter: "blur(10px) grayscale(100%)"
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={old} 
                      alt="Traditional port operations"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Traditional Badge */}
                    <div className="absolute bottom-4 left-4 bg-yellow-600/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-400">
                      <div className="text-white font-bold text-sm">Traditional Methods To</div>
                      <div className="text-yellow-200 text-xs">Manual • Paper-Based • Legacy</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pixel Dust Overlay Effect */}
              {animationStarted && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, 
                      transparent 25%, 
                      rgba(255,255,255,0.1) 25%, 
                      rgba(255,255,255,0.1) 50%, 
                      transparent 50%, 
                      transparent 75%, 
                      rgba(255,255,255,0.1) 75%
                    )`,
                    backgroundSize: '20px 20px',
                  }}
                />
              )}
            </div>

            {/* Hover Instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center text-gray-300 text-xs bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 whitespace-nowrap"
            >
              Hover to see transformation
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutHero;