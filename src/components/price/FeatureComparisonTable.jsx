import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureComparisonTable = () => {
  const [activeProduct, setActiveProduct] = useState('EYMS');

 const pricingData = {
    EYMS: {
      product: "EYMS",
      description: "Enterprise Yard Management System",
      plans: ["Silver", "Gold", "Diamond"],
      features: [
        { name: "Email Support", silver: "✓", gold: "✓", diamond: "✓" },
        { name: "WhatsApp Support", silver: "✗", gold: "✓", diamond: "✓" },
        { name: "Phone Support", silver: "✗", gold: "✗", diamond: "✓" },
        { name: "Number of Users", silver: "2", gold: "5", diamond: "10" },
        { name: "Role-based Access", silver: "✗", gold: "✓", diamond: "✓" },
        { name: "Database Backup", silver: "Manual", gold: "Auto", diamond: "Auto" },
        { 
          name: "EDI Reports", 
          silver: "5 shipping lines included\n₹4,000 per additional line", 
          gold: "10 shipping lines included\n₹3,500 per additional line", 
          diamond: "Unlimited shipping lines\nNo additional charges" 
        }
      ]
    },
    BWMS: {
      product: "BWMS",
      description: "Ballast Water Management System",
      plans: ["Silver", "Gold", "Diamond"],
      features: [
        { name: "Email Support", silver: "✓", gold: "✓", diamond: "✓" },
        { name: "WhatsApp Support", silver: "✗", gold: "✓", diamond: "✓" },
        { name: "Phone Support", silver: "✗", gold: "✗", diamond: "✓" },
        { name: "Number of Users", silver: "2", gold: "5", diamond: "10" },
        { name: "Role-based Access", silver: "✗", gold: "✓", diamond: "✓" },
        { name: "Database Backup", silver: "Manual", gold: "Auto", diamond: "Auto" },
        { 
          name: "EDI Reports", 
          silver: "5 shipping lines included\n₹4,000 per additional line", 
          gold: "10 shipping lines included\n₹3,500 per additional line", 
          diamond: "Unlimited shipping lines\nNo additional charges" 
        }
      ]
    }
  };

  const getPlanColor = (plan) => {
    const colors = {
      Silver: { 
        bg: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        border: '#c0c0c0', 
        text: '#374151',
        accent: '#c0c0c0'
      },
      Gold: { 
        bg: 'linear-gradient(135deg, #fff9db, #ffec99)',
        border: '#ffd700', 
        text: '#854d0e',
        accent: '#ffd700'
      },
      Diamond: { 
        bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        border: '#b9f2ff', 
        text: '#1e40af',
        accent: '#b9f2ff'
      }
    };
    return colors[plan] || colors.Silver;
  };

  return (
    <section className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Compare Our Solutions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan tailored for your business requirements
          </p>
        </motion.div>

        {/* Animated Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-2 border border-red-100 shadow-lg">
            <div className="flex gap-2">
              {Object.keys(pricingData).map((product) => (
                <motion.button
                  key={product}
                  onClick={() => setActiveProduct(product)}
                  className={`relative px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    activeProduct === product 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeProduct === product && (
                    <motion.div
                      layoutId="activeProduct"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {pricingData[product].product}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            
            {/* Enhanced Comparison Table */}
            <div className="bg-white rounded-3xl border border-red-100 shadow-2xl overflow-hidden">
              
              {/* Table Header with Animation */}
              <motion.div 
                className="grid grid-cols-4 gap-6 p-8 bg-gradient-to-r from-white to-red-50 border-b border-red-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Features & Specifications
                  </h3>
                </div>
                {pricingData[activeProduct].plans.map((plan) => {
                  const colors = getPlanColor(plan);
                  return (
                    <motion.div
                      key={plan}
                      className="text-center p-6 rounded-2xl border-2 shadow-lg"
                      style={{
                        background: colors.bg,
                        borderColor: colors.border
                      }}
                      whileHover={{ 
                        y: -8,
                        scale: 1.03,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <div 
                        className="w-16 h-1 mx-auto mb-4 rounded-full"
                        style={{ background: colors.accent }}
                      />
                      <h4 
                        className="text-2xl font-bold mb-2"
                        style={{ color: colors.text }}
                      >
                        {plan}
                      </h4>
                      <div 
                        className="text-sm font-semibold opacity-80"
                        style={{ color: colors.text }}
                      >
                        Plan
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Features with Staggered Animation */}
              <motion.div 
                className="max-h-[500px] overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {pricingData[activeProduct].features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className={`grid grid-cols-4 gap-6 p-6 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-red-50/30'
                    } hover:bg-red-50/50 transition-colors duration-200 border-b border-red-50 last:border-b-0`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <span className="text-gray-800 font-semibold">
                        {feature.name}
                      </span>
                    </div>
                    
                    {/* Animated Feature Values */}
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <EnhancedFeatureCell value={feature.silver} />
                    </motion.div>
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <EnhancedFeatureCell value={feature.gold} />
                    </motion.div>
                    <motion.div 
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <EnhancedFeatureCell value={feature.diamond} />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pricing Footer with Animation */}
              <motion.div 
                className="grid grid-cols-4 gap-6 p-8 bg-gradient-to-r from-red-50 to-white border-t border-red-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center">
                  <span className="font-bold text-gray-900 text-lg">
                    Starting Price
                  </span>
                </div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-gray-900">₹5,000</div>
                  <div className="text-gray-600 text-sm mt-1">per month</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-gray-900">₹7,000</div>
                  <div className="text-gray-600 text-sm mt-1">per month</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-gray-900">₹10,000</div>
                  <div className="text-gray-600 text-sm mt-1">per month</div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced CTA Section */}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Enhanced Feature Cells with better animations
const EnhancedFeatureCell = ({ value }) => {
  if (value === "✓") {
    return (
      <motion.div
        className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center border-2 border-green-200 shadow-sm"
        whileHover={{ 
          scale: 1.2,
          rotate: 5,
          backgroundColor: "#dcfce7"
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    );
  }
  
  if (value === "✗") {
    return (
      <motion.div
        className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-100 shadow-sm"
        whileHover={{ 
          scale: 1.2,
          rotate: -5,
          backgroundColor: "#fee2e2"
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.div>
    );
  }
  
  return (
    <motion.span 
      className="text-gray-800 font-semibold text-center px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
      whileHover={{ scale: 1.1, backgroundColor: "#fef2f2" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {value}
    </motion.span>
  );
};

export default FeatureComparisonTable;