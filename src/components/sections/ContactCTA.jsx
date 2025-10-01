// src/components/ContactCTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const ContactCTA = () => {
  return (
    <section className="relative min-h-[500px] overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900 to-black">
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(220, 38, 38, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
              'linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)',
              'linear-gradient(225deg, rgba(220, 38, 38, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
              'linear-gradient(315deg, rgba(220, 38, 38, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-[500px] flex items-center justify-center">
        <div className="text-center max-w-4xl py-16">
          {/* Heading with Better Spacing */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's make something{' '}
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
              amazing
            </motion.span>{' '}
            together
          </motion.h2>

          {/* CTA Button with More Padding */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="group bg-white text-red-600 px-16 py-5 rounded-full font-bold text-xl hover:bg-red-50 transition-all duration-300 shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center space-x-4">
                Contact Us <span> </span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight className="text-red-600 text-lg" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Subtext with Better Spacing */}
          <motion.p
            className="text-red-200 text-xl mt-12 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ready to transform your ideas into reality? Let's start the conversation.
          </motion.p>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default ContactCTA;