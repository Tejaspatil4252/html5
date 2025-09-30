// src/components/home/HomeSection4Stats.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import bg1 from '../../assets/images/bg_1.jpg';

const HomeSection4Stats = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: 2000, label: "CMS Installation", suffix: "+" },
    { number: 100, label: "Awards Won", suffix: "+" },
    { number: 32000, label: "Registered Domains", suffix: "+" },
    { number: 31998, label: "Satisfied Customers", suffix: "+" }
  ];

  // Counter animation
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let currentStep = 0;
        const increment = stat.number / steps;

        const timer = setInterval(() => {
          currentStep++;
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.min(
              Math.floor(increment * currentStep), 
              stat.number
            );
            return newCounters;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Red Overlay */}
      <div className="absolute inset-0 bg-red-600/80"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-red-200 text-lg font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            More than 100,000 projects hosted
          </motion.span>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
                }}
              >
                {/* Animated Number */}
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    delay: 0.6 + index * 0.1
                  }}
                >
                  {counters[index].toLocaleString()}
                  <span className="text-red-300">{stat.suffix}</span>
                </motion.div>

                {/* Label */}
                <motion.p 
                  className="text-red-100 text-lg font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button 
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Success Story
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeSection4Stats;