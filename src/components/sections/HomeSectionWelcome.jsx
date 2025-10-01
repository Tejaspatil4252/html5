// src/components/home/HomeSection3Welcome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const HomeSection3Welcome = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-black">
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(220, 38, 38, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(220, 38, 38, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
              'linear-gradient(225deg, rgba(220, 38, 38, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
              'linear-gradient(315deg, rgba(59, 130, 246, 0.15) 0%, rgba(220, 38, 38, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
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
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to{' '}
              <motion.span
                className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Rapportsoft
              </motion.span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-red-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Consulting & Technology
            </motion.p>

            {/* Animated Underline */}
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Content Box */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Text Content */}
              <div className="lg:col-span-2">
                <motion.p 
                  className="text-lg text-white leading-relaxed mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Rapportsoft Consulting & Technology is one of India's largest Shipping software products company providing innovative and integrated enterprise solutions ensuring customer satisfaction. Founded in 2005, our software engineers deliver solutions to enterprises across the SCM marketplace. Headquartered in Pune, India with 2 development centers globally, we cater to a large clientele with cutting-edge technology solutions.
                </motion.p>

                {/* Read More Button */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <motion.a
                    href="/about"
                    className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 group shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Stats Sidebar */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  { number: "18+", label: "Years Experience" },
                  { number: "2", label: "Development Centers" },
                  { number: "500+", label: "Global Clients" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-red-100 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default HomeSection3Welcome;