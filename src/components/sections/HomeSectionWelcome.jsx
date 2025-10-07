// src/components/home/HomeSection3Welcome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const HomeSection3Welcome = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Enhanced Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-900 to-red-950">
        {/* Smoother Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(220, 38, 38, 0.3) 0%, rgba(185, 28, 28, 0.4) 50%, rgba(153, 27, 27, 0.2) 100%)',
              'linear-gradient(135deg, rgba(153, 27, 27, 0.2) 0%, rgba(220, 38, 38, 0.3) 50%, rgba(185, 28, 28, 0.4) 100%)',
              'linear-gradient(225deg, rgba(185, 28, 28, 0.4) 0%, rgba(153, 27, 27, 0.2) 50%, rgba(220, 38, 38, 0.3) 100%)',
              'linear-gradient(315deg, rgba(220, 38, 38, 0.3) 0%, rgba(185, 28, 28, 0.4) 50%, rgba(153, 27, 27, 0.2) 100%)',
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Optimized Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Smoother Red Glow Effects */}
        <motion.div
          className="absolute top-1/4 -left-32 w-80 h-80 bg-red-600 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-32 w-96 h-96 bg-red-700 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center py-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header - Faster animations */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Welcome to{' '}
              <motion.span
                className="bg-gradient-to-r from-red-300 via-red-400 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Rapportsoft
              </motion.span>
            </motion.h2>
            
            <motion.p
              className="text-lg md:text-xl text-red-100 mb-6 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Consulting & Technology
            </motion.p>

            {/* Faster Animated Underline */}
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Content Box - Faster animations */}
          <motion.div
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl border border-red-300/30 p-6 md:p-10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              y: -3, 
              borderColor: 'rgba(248, 113, 113, 0.5)',
              boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
              transition: { duration: 0.2 } 
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Text Content */}
              <div className="lg:col-span-2">
                <motion.p 
                  className="text-base md:text-lg text-white leading-relaxed mb-6 font-light"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Rapportsoft Consulting & Technology is one of India's largest Shipping software products company providing innovative and integrated enterprise solutions ensuring customer satisfaction. Founded in 2005, our software engineers deliver solutions to enterprises across the SCM marketplace. Headquartered in Pune, India with 2 development centers globally, we cater to a large clientele with cutting-edge technology solutions.
                </motion.p>

                {/* Read More Button */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.a
                    href="/about"
                    className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:from-red-400 hover:to-red-500 transition-all duration-200 group shadow-lg hover:shadow-xl border border-red-400/30"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read More
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Stats Sidebar - Faster animations */}
              <motion.div
                className="bg-white rounded-2xl border border-red-200 shadow-2xl p-4 space-y-4"
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {[
                  { number: "18+", label: "Years Experience" },
                  { number: "2", label: "Development Centers" },
                  { number: "500+", label: "Global Clients" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl border-2 border-red-100 bg-white hover:border-red-300 hover:bg-red-50 transition-all duration-200 group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: '#fca5a5',
                      backgroundColor: '#fef2f2',
                      boxShadow: '0 8px 20px rgba(239, 68, 68, 0.15)'
                    }}
                  >
                    <div className="text-2xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors duration-200">
                      {stat.number}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {stat.label}
                    </div>
                    
                    {/* Red accent line */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full mt-2 mx-auto"
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-red-900/90 to-transparent"></div>
    </section>
  );
};

export default HomeSection3Welcome;