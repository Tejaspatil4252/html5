// src/components/home/HomeSection9Clients.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';


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
    <section className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6 rounded-full"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="text-red-600">Global Leaders</span>
          </h2>
          
          <motion.p 
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Partnered with industry pioneers and innovative companies worldwide
          </motion.p>
        </motion.div>

        {/* Professional Logo Grid */}
        <div className="flex justify-center">
          <motion.div 
            className={`w-full max-w-6xl grid gap-8 ${
              showAll 
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {visibleClients.map((client, index) => (
              <motion.div
                key={client.id}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Professional Logo Image Only */}
                <div className="relative group">
                  <img 
                    src={client.logo} 
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 filter hover:brightness-110"
                    alt={`${client.name || 'Client'} Logo`}
                    loading="lazy"
                    style={{
                      maxWidth: '140px',
                      minHeight: '48px'
                    }}
                  />
                  
                  {/* Subtle hover effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-30 rounded-lg blur-sm transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Button Section with Red Color Scheme */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {/* Decorative elements */}
          <div className="relative flex items-center justify-center mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32"></div>
          </div>

          {/* Red Colored Button */}
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
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
                    transition={{ duration: 0.3 }}
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
                    animate={{ y: [0, 5, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </>
              )}
            </span>
            
            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </motion.button>

          {/* Client count badge with red accent */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
              <span className="text-red-600 font-bold">{clients.length}+</span> Trusted Partnerships
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection9Clients;