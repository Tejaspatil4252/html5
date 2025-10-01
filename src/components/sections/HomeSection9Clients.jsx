// src/components/home/HomeSection9Clients.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import all 41 company logos
import c1 from '../../assets/companies/c1.png';
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

  // All 41 clients array
  const clients = [
    { id: 1, logo: c1 }, { id: 2, logo: c2 }, { id: 3, logo: c3 }, 
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

  <section className="bg-white py-16 lg:py-20">
    <div className="container mx-auto px-4">
      
      {/* Enhanced Header Section */}
      <motion.div 
        className="text-center mb-14 lg:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="w-16 h-1 bg-red-600 mx-auto mb-4 rounded-full"></div>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          Trusted by <span className="text-red-600">Global Leaders</span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Partnered with industry pioneers and innovative companies worldwide
        </motion.p>
      </motion.div>

      {/* Enhanced Client Logos Grid */}
      <div className="flex justify-center mb-10">
        <motion.div 
          className={`grid gap-4 sm:gap-6 ${
            showAll 
              ? 'max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7' 
              : 'max-w-5xl grid-cols-5'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {visibleClients.map((client, index) => (
            <motion.div
              key={client.id}
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3,
                delay: showAll ? index * 0.03 : index * 0.05
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15 }
              }}
            >
              {/* Enhanced Logo Card - Bigger & Modern */}
              <div className="group bg-white rounded-2xl p-4 sm:p-5 hover:shadow-2xl transition-all duration-200 border border-gray-100 hover:border-red-200 w-full max-w-[140px] sm:max-w-[150px] relative overflow-hidden">
                
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
                
                {/* Enhanced Logo Image - Much Bigger */}
                <motion.img 
                  src={client.logo} 
                  className="relative z-10 w-full h-18 sm:h-22 md:h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110"
                  alt={`Client ${client.id}`}
                  whileHover={{ scale: 1.15, transition: { duration: 0.15 } }}
                />
                
                {/* Modern Hover Outline Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-300 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-200"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Creative Button Section */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {/* Decorative elements */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32"></div>
          <div className="mx-4 w-2 h-2 bg-red-600 rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32"></div>
        </div>

        {/* Enhanced Animated Button  */}
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-200 overflow-hidden group"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { duration: 0.15 }
          }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          
          {/* Button text and icon */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {showAll ? (
              <>
                Show Less
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </motion.svg>
              </>
            ) : (
              <>
                View All {clients.length}+ Clients
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </>
            )}
          </span>
          
          {/* Shine effect on hover */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
        </motion.button>

        {/* Client count badge */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
            {clients.length}+ Trusted Partnerships
          </span>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
}

export default HomeSection9Clients;