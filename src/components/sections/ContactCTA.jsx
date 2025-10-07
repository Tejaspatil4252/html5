// src/components/ContactCTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const ContactCTA = () => {
  return (
    <section className="relative min-h-[500px] overflow-hidden">
      {/* Pure Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-900 to-red-950">
        {/* Animated Red Gradient Overlay */}
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
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Enhanced Floating Red Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Red Glow Orbs */}
        <motion.div
          className="absolute top-1/4 -left-24 w-72 h-72 bg-red-600 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-24 w-96 h-96 bg-red-700 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-[500px] flex items-center justify-center">
        <div className="text-center max-w-4xl py-16">
          {/* Heading */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's make something{' '}
            <motion.span
              className="bg-gradient-to-r from-red-300 via-red-400 to-red-500 bg-clip-text text-transparent"
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
              amazing
            </motion.span>{' '}
            together
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="group bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 px-16 py-5 rounded-full font-bold text-xl hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 shadow-2xl relative overflow-hidden border border-amber-300/50"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(251, 191, 36, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <span className="relative z-10 flex items-center justify-center space-x-4">
                Contact Us
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight className="text-red-900 text-lg" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="text-red-100 text-xl mt-12 max-w-lg mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ready to transform your ideas into reality? Let's start the conversation.
          </motion.p>
        </div>
      </div>

      {/* Bottom Gradient Fade - Red Theme */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/80 to-transparent"></div>
    </section>
  );
};

export default ContactCTA;