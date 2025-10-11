// src/components/pricing/PricingHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PriceHeader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="text-center mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Badge/Sticker Element */}
   

      {/* Main Heading */}
      <motion.h1 
        variants={itemVariants}
        className="text-5xl pt-4 md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
      >
        Check Our
        <motion.span 
          className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"
          whileInView={{ backgroundPosition: ['0%', '100%'] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            backgroundSize: '200% 100%',
            backgroundPosition: '0% 0%'
          }}
        >
          Pricing
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p 
        variants={itemVariants}
        className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
      >
        Discover our <span className="font-semibold text-gray-900">competitive and flexible</span> pricing plans designed to meet the needs of businesses of all sizes.
      </motion.p>

      {/* Highlighted Sub-description */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-gray-50 to-red-50 border border-gray-200 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto"
      >
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Choose from our <span className="text-red-600 font-semibold">affordable options</span> and unlock the full potential of our software, ensuring you get the <span className="text-gray-900 font-semibold">best value for your investment</span>. Whether you're just starting or scaling up, we have the perfect plan for you.
        </p>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="flex justify-center items-center gap-4 mt-8"
        variants={itemVariants}
      >
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="w-2 h-2 bg-red-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: item * 0.3 
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PriceHeader;