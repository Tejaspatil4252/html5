// src/components/productComponents/ProductTitle.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductTitle = ({ 
  product, 
  isActive = false, 
  onClick,
  index = 0 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <motion.div
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300 border-2
        ${isActive 
          ? 'bg-white border-red-500 shadow-lg shadow-red-500/20' 
          : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md'
        }
      `}
      onClick={handleClick}
      whileHover={{ 
        scale: isActive ? 1 : 1.02,
        y: isActive ? 0 : -2
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {/* Active Indicator Bar */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl"
          layoutId="activeIndicator"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Product Content */}
      <div className="relative z-10">
        <h3 className={`
          text-lg font-semibold leading-tight
          ${isActive ? 'text-gray-800' : 'text-gray-700'}
        `}>
          {product.name}
        </h3>
        
        {/* Subtle hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default ProductTitle;