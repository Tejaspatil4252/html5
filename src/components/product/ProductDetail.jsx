// src/components/product/ProductDetail.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = ({ product }) => {
  if (!product) return null;

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-lg border border-red-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🖼️ ENHANCED PRODUCT IMAGE SECTION */}

{product.image && (
  <div className="relative bg-white flex items-center justify-center p-8">
    <motion.img
      src={product.image}
      alt={product.name}
      className="max-w-full object-contain rounded-xl shadow-lg"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ 
        scale: 1.08,
        transition: { duration: 0.3 }
      }}
    />
    {/* Subtle hover glow effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 rounded-xl opacity-0"
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  </div>
)}

      {/* 📝 ENHANCED PRODUCT HEADER */}
<div className="p-8 bg-white">
  <motion.h1 
    className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-8 pb-2 border-b border-red-100"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    {product.name}
  </motion.h1>
  
  {product.description && (
    <motion.p 
      className="text-gray-700 leading-relaxed text-lg mt-6 pl-6 py-4 rounded-r-lg bg-gradient-to-r from-red-50/30 to-transparent border-l-4 border-red-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {product.description}
    </motion.p>
  )}
</div>

      {/* 🎯 ENHANCED HIGHLIGHTS GRID */}
{product.highlights && product.highlights.length > 0 && (
  <div className="px-6 pb-6">
    <motion.h2 
      className="text-xl font-bold text-gray-800 mb-4 flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
      Key Highlights
    </motion.h2>
    
    <div className="flex flex-wrap gap-3">
      {product.highlights.map((highlight, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl px-4 py-3 border border-red-100 hover:border-red-300 hover:shadow-md transition-all duration-300 group inline-flex items-center gap-3 min-w-0 flex-shrink-0"
          whileHover={{ scale: 1.02, y: -1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {/* Red Theme Icon */}
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Text */}
          <p className="text-sm font-medium text-gray-700 group-hover:text-red-700 transition-colors duration-300 whitespace-nowrap truncate">
            {highlight}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
)}

 {/* ⚡ ENHANCED EXPANDABLE SECTIONS */}
      <div className="bg-white border-t border-red-100">
        {product.features && product.features.items && product.features.items.length > 0 && (
          <EnhancedExpandableSection
            title="🚀 Product Features"
            description={product.features.description}
            items={product.features.items}
            color="red"
          />
        )}

        {product.benefits && product.benefits.items && product.benefits.items.length > 0 && (
          <EnhancedExpandableSection
            title="💼 Benefits"
            items={product.benefits.items}
            color="green"
          />
        )}

        {product.support && product.support.items && product.support.items.length > 0 && (
          <EnhancedExpandableSection
            title="🛠️ Support"
            items={product.support.items}
            color="blue"
          />
        )}
      </div>

      {/* 📱 ENHANCED EMPTY STATE */}
      {!product.description && 
       !product.highlights?.length && 
       !product.features?.items?.length && 
       !product.benefits?.items?.length && 
       !product.support?.items?.length && (
        <motion.div 
          className="p-16 text-center bg-gradient-to-br from-red-50 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Content Coming Soon
          </h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            We're working on detailed information for <span className="text-red-600 font-semibold">{product.name}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// 🎪 ENHANCED EXPANDABLE SECTION COMPONENT
const EnhancedExpandableSection = ({ title, description, items, color = "red" }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const colorClasses = {
    red: 'from-red-500 to-red-700',
    green: 'from-green-500 to-green-700',
    blue: 'from-blue-500 to-blue-700'
  };

  return (
    <div className="border-b border-red-100 last:border-b-0">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 text-left flex items-center justify-between bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-red-100 transition-all duration-300 group"
        whileHover={{ x: 5 }}
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 bg-gradient-to-r ${colorClasses[color]} rounded-full mr-4 group-hover:scale-125 transition-transform duration-300`}></div>
          <span className="text-xl font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
            {title}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-2xl bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}
        >
          ▼
        </motion.span>
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-gradient-to-b from-white to-red-50/30"
          >
            <div className="px-8 pb-8 pt-4">
              {description && (
                <motion.p 
                  className="text-gray-700 mb-6 text-lg leading-relaxed bg-white p-4 rounded-lg border border-red-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {description}
                </motion.p>
              )}
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-gray-800 bg-white p-4 rounded-lg border border-red-100 hover:border-red-300 hover:bg-red-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className={`text-lg mr-4 bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent font-bold`}>
                      •
                    </span>
                    <span className="text-gray-800">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;