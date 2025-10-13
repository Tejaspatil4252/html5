import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureComparisonTable = () => {
  const [activeProduct, setActiveProduct] = useState('EYMS');
  const [activePlan, setActivePlan] = useState('Silver'); // For mobile plan selection

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
        bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
        border: 'border-gray-300',
        text: 'text-gray-800',
        accent: 'bg-gray-400'
      },
      Gold: { 
        bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
        border: 'border-yellow-400',
        text: 'text-yellow-800',
        accent: 'bg-yellow-500'
      },
      Diamond: { 
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        border: 'border-blue-300',
        text: 'text-blue-800',
        accent: 'bg-blue-400'
      }
    };
    return colors[plan] || colors.Silver;
  };

  // Mobile Feature Cell Component
  const MobileFeatureCell = ({ feature, plan }) => {
    const value = feature[plan.toLowerCase()];
    const colors = getPlanColor(plan);

    return (
      <div className={`p-4 border-b border-gray-200 ${colors.bg}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-900 text-sm">{feature.name}</span>
          <div className="flex items-center">
            {value === "✓" && (
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {value === "✗" && (
              <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            {value !== "✓" && value !== "✗" && (
              <span className="text-gray-700 text-sm font-medium text-right">
                {value.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-white py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Enhanced Header - Mobile Optimized */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
            Compare Our Solutions
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-4">
            Choose the perfect plan for your business
          </p>
        </motion.div>

        {/* Mobile Optimized Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-6 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-1 md:p-2 border border-red-100 shadow-sm md:shadow-lg w-full max-w-md">
            <div className="flex gap-1 md:gap-2">
              {Object.keys(pricingData).map((product) => (
                <motion.button
                  key={product}
                  onClick={() => setActiveProduct(product)}
                  className={`relative flex-1 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg transition-all ${
                    activeProduct === product 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeProduct === product && (
                    <motion.div
                      layoutId="activeProduct"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-lg md:rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
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
            
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden md:block bg-white rounded-3xl border border-red-100 shadow-2xl overflow-hidden">
              {/* ... Keep your existing desktop table code here ... */}
              {/* Table Header */}
              <motion.div 
                className="grid grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 bg-gradient-to-r from-white to-red-50 border-b border-red-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg">
                    Features
                  </h3>
                </div>
                {pricingData[activeProduct].plans.map((plan) => {
                  const colors = getPlanColor(plan);
                  return (
                    <motion.div
                      key={plan}
                      className={`text-center p-4 md:p-6 rounded-xl md:rounded-2xl border-2 shadow-lg ${colors.bg} ${colors.border}`}
                      whileHover={{ 
                        y: -4,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <div className={`w-12 h-1 mx-auto mb-3 md:mb-4 rounded-full ${colors.accent}`} />
                      <h4 className={`text-xl md:text-2xl font-bold mb-2 ${colors.text}`}>
                        {plan}
                      </h4>
                      <div className={`text-xs md:text-sm font-semibold opacity-80 ${colors.text}`}>
                        Plan
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Features */}
              <motion.div 
                className="max-h-[400px] overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {pricingData[activeProduct].features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className={`grid grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-red-50/30'
                    } hover:bg-red-50/50 transition-colors duration-200 border-b border-red-50 last:border-b-0`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <span className="text-gray-800 font-semibold text-sm md:text-base">
                        {feature.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <EnhancedFeatureCell value={feature.silver} />
                    </div>
                    <div className="flex items-center justify-center">
                      <EnhancedFeatureCell value={feature.gold} />
                    </div>
                    <div className="flex items-center justify-center">
                      <EnhancedFeatureCell value={feature.diamond} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Cards (hidden on desktop) */}
            <div className="md:hidden space-y-6">
              {/* Plan Selection for Mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {pricingData[activeProduct].plans.map((plan) => {
                  const colors = getPlanColor(plan);
                  return (
                    <motion.button
                      key={plan}
                      onClick={() => setActivePlan(plan)}
                      className={`flex-1 min-w-[100px] py-3 rounded-lg border-2 text-center font-semibold transition-all ${
                        activePlan === plan 
                          ? `${colors.border} ${colors.bg} ${colors.text} shadow-md`
                          : 'border-gray-200 bg-white text-gray-600'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {plan}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Feature List */}
              <motion.div 
                key={activePlan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-red-100 shadow-lg overflow-hidden"
              >
                {/* Plan Header */}
                <div className={`p-6 text-center border-b ${getPlanColor(activePlan).bg} ${getPlanColor(activePlan).border}`}>
                  <h3 className={`text-xl font-bold mb-2 ${getPlanColor(activePlan).text}`}>
                    {activeProduct} {activePlan}
                  </h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {activePlan === 'Silver' && '₹5,000'}
                    {activePlan === 'Gold' && '₹7,000'}
                    {activePlan === 'Diamond' && '₹10,000'}
                    <span className="text-gray-600 text-lg ml-1">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {pricingData[activeProduct].features.map((feature, index) => (
                    <MobileFeatureCell 
                      key={feature.name} 
                      feature={feature} 
                      plan={activePlan.toLowerCase()} 
                    />
                  ))}
                </div>

                {/* CTA Button */}
                <div className="p-4 border-t border-gray-200">
                  <motion.button
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Enhanced Feature Cells (for desktop)
const EnhancedFeatureCell = ({ value }) => {
  if (value === "✓") {
    return (
      <motion.div
        className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center border-2 border-green-200"
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
        }}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    );
  }
  
  if (value === "✗") {
    return (
      <motion.div
        className="w-8 h-8 md:w-10 md:h-10 bg-red-50 rounded-lg md:rounded-xl flex items-center justify-center border-2 border-red-100"
        whileHover={{ 
          scale: 1.1,
          rotate: -5,
        }}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.div>
    );
  }
  
  return (
    <div className="text-gray-700 text-xs md:text-sm text-center leading-tight p-2">
      {value.split('\n').map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};

export default FeatureComparisonTable;