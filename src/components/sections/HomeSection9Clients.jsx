// src/components/home/HomeSection9Clients.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import c2 from '../../assets/companies/c2.png';
import c3 from '../../assets/companies/c3.png';
import c4 from '../../assets/companies/c4.png';
import c5 from '../../assets/companies/c5.png';
import c6 from '../../assets/companies/c6.png';
import c7 from '../../assets/companies/c7.png';
import c8 from '../../assets/companies/c8.png';
import c9 from '../../assets/companies/c9.png';
import c10 from '../../assets/companies/c10.png';
import c11 from '../../assets/companies/c11.png';
import c12 from '../../assets/companies/c12.png';
import c13 from '../../assets/companies/c13.png';
import c14 from '../../assets/companies/c14.png';
import c15 from '../../assets/companies/c15.png';
import c16 from '../../assets/companies/c16.png';
import c17 from '../../assets/companies/c17.png';
import c18 from '../../assets/companies/c18.png';
import c19 from '../../assets/companies/c19.png';
import c20 from '../../assets/companies/c20.png';
import c21 from '../../assets/companies/c21.png';
import c22 from '../../assets/companies/c22.png';
import c23 from '../../assets/companies/c23.png';
import c24 from '../../assets/companies/c24.png';
import c25 from '../../assets/companies/c25.png';
import c26 from '../../assets/companies/c26.png';
import c27 from '../../assets/companies/c27.png';
import c28 from '../../assets/companies/c28.png';
import c29 from '../../assets/companies/c29.png';
import c30 from '../../assets/companies/c30.png';
import c31 from '../../assets/companies/c31.png';
import c32 from '../../assets/companies/c32.png';
import c33 from '../../assets/companies/c33.png';
import c34 from '../../assets/companies/c34.png';
import c35 from '../../assets/companies/c35.png';
import c36 from '../../assets/companies/c36.png';
import c37 from '../../assets/companies/c37.png';
import c38 from '../../assets/companies/c38.png';
import c39 from '../../assets/companies/c39.png';
import c40 from '../../assets/companies/c40.png';
import c41 from '../../assets/companies/c41.png';

const HomeSection9Clients = () => {
  const [showAll, setShowAll] = useState(false);

  // All 41 clients array - ADDED c1
  const clients = [
     { id: 2, logo: c2 }, { id: 3, logo: c3 }, 
    { id: 4, logo: c4 }, { id: 5, logo: c5 }, { id: 6, logo: c6 },
    { id: 7, logo: c7 }, { id: 8, logo: c8 }, { id: 9, logo: c9 },
    { id: 10, logo: c10 }, { id: 11, logo: c11 }, { id: 12, logo: c12 },
    { id: 13, logo: c13 }, { id: 14, logo: c14 }, { id: 15, logo: c15 },
    { id: 16, logo: c16 }, { id: 17, logo: c17 }, { id: 18, logo: c18 },
    { id: 19, logo: c19 }, { id: 20, logo: c20 }, { id: 21, logo: c21 },
    { id: 22, logo: c22 }, { id: 23, logo: c23 }, { id: 24, logo: c24 },
    { id: 25, logo: c25 }, { id: 26, logo: c26 }, { id: 27, logo: c27 },
    { id: 28, logo: c28 }, { id: 29, logo: c29 }, { id: 30, logo: c30 },
    { id: 31, logo: c31 }, { id: 32, logo: c32 }, { id: 33, logo: c33 },
    { id: 34, logo: c34 }, { id: 35, logo: c35 }, { id: 36, logo: c36 },
    { id: 37, logo: c37 }, { id: 38, logo: c38 }, { id: 39, logo: c39 },
    { id: 40, logo: c40 }, { id: 41, logo: c41 }
  ];

  const visibleClients = showAll ? clients : clients.slice(0, 10);

return (
    <section className="bg-white py-24 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle background gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/10 -translate-y-32 translate-x-32 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50/5 -translate-y-32 -translate-x-32 rounded-full blur-3xl"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-small-red-500/20"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Dynamic Header with Floating Elements */}
 <motion.div 
  className="text-center mb-16"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  <div className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-4">
    Strategic Partnerships
  </div>
  
  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
    Powering Innovation with <br />
    <span className="text-red-600">Global Partners</span>
  </h2>
  
  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
    Collaborating with forward-thinking companies to drive digital transformation
  </p>
</motion.div>

        {/* Fixed Grid - No layout jumping */}
{/* Fixed Grid with Working Expand/Collapse */}
<div className="relative max-w-7xl mx-auto">
  <AnimatePresence mode="wait">
    <motion.div 
      key={showAll ? "expanded" : "collapsed"}
      className={`relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 
                 transition-all duration-300`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {visibleClients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            rotateY: 90
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateY: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            rotateY: -90,
            transition: { duration: 0.3 }
          }}
          transition={{ 
            duration: 0.4,
            delay: index * 0.02,
            rotateY: { duration: 0.3 },
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.1,
            rotateY: 5,
            transition: { duration: 0.2 }
          }}
          className="relative origin-center"
        >
          {/* Card with 3D Effect */}
          <div className="relative group">
            {/* Shadow Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/30 to-transparent 
                          rounded-2xl transform translate-y-3 blur-md opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Main Card */}
            <div className="relative bg-white rounded-xl p-6 border border-gray-200 
                          group-hover:border-red-300 shadow-lg group-hover:shadow-2xl 
                          group-hover:shadow-red-100/50 transition-all duration-500 
                          overflow-hidden transform-gpu">
              
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-xl 
                            group-hover:border-red-200/30 transition-all duration-500"></div>
              
              {/* Floating Logo Container */}
              <div className="relative h-16 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-50/0 via-red-50/0 to-red-50/0 
                            rounded-lg group-hover:from-red-50/40 group-hover:via-red-50/20 group-hover:to-red-50/40 
                            transition-all duration-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <img 
                  src={client.logo} 
                  className="relative z-10 h-full w-auto object-contain group-hover:scale-110 
                           transition-transform duration-500 filter group-hover:brightness-110"
                  alt=""
                  loading="lazy"
                />
              </div>
              
              {/* Subtle border corners */}
              <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-gray-300/50 
                            group-hover:border-red-400 transition-all duration-300"></div>
              <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-gray-300/50 
                            group-hover:border-red-400 transition-all duration-300 delay-100"></div>
            </div>
            
            {/* Connection Lines (Visible on hover) */}
            <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent 
                            -translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-red-200 to-transparent 
                            -translate-y-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
</div>

        {/* Fixed Button Section - Proper spacing */}
        <motion.div 
          className="text-center mt-2" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Simplified Divider */}
          <div className="mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent 
                          w-full max-w-md mx-auto"></div>
          </div>
          
          {/* Clean Button */}
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center justify-center overflow-hidden 
                     rounded-xl px-12 py-4 text-lg font-semibold shadow-lg bg-gradient-to-r from-red-600 to-red-700 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3">
              {showAll ? (
                <>
                  Show Less
                  <motion.svg 
                    className="w-5 h-5"
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </motion.svg>
                </>
              ) : (
                <>
                  View All {clients.length}+ Partners
                  <motion.svg 
                    className="w-5 h-5"
                    animate={{ 
                      y: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </>
              )}
            </span>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent 
                          via-white/30 to-transparent group-hover:translate-x-full 
                          transition-transform duration-700"></div>
          </motion.button>
          
          {/* Simple Stats */}
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 
                          px-4 py-2 rounded-full text-sm border border-gray-200">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span>
                <span className="font-semibold text-red-600">{clients.length}+</span> Trusted Partners
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection9Clients;