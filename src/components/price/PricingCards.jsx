// src/components/pricing/PricingCards.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PricingCards = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeProduct, setActiveProduct] = useState('EYMS');
  const [pricingData, setPricingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pricing data from backend
  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/pricing/all');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pricing data');
        }
        
        const data = await response.json();
        setPricingData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching pricing data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  const getPlanColor = (plan) => {
    switch(plan) {
      case 'Silver': return {
        bg: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        border: '#c0c0c0',
        text: '#374151'
      };
      case 'Gold': return {
        bg: 'linear-gradient(135deg, #fff9db, #ffec99)',
        border: '#ffd700', 
        text: '#854d0e'
      };
      case 'Diamond': return {
        bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        border: '#b9f2ff',
        text: '#1e40af'
      };
      default: return {
        bg: '#f8f9fa',
        border: '#c0c0c0',
        text: '#374151'
      };
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-white flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading pricing plans...</p>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-white flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load pricing</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // Get current pricing data or fallback to empty
  const currentProductData = pricingData[activeProduct] || {
    monthly: [],
    quarterly: [],
    yearly: []
  };

  const currentPricing = currentProductData[billingCycle] || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Product Switcher */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeProduct === product && (
                    <motion.div
                      layoutId="productTab"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow-lg"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">
                    {pricingData[product]?.product || product} Pricing
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Billing Cycle Toggle */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-2xl p-2 border border-red-100 shadow-lg">
            <div className="flex gap-2">
              {['monthly', 'quarterly', 'yearly'].map((cycle) => (
                <motion.button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`relative px-6 py-3 rounded-xl font-bold transition-all ${
                    billingCycle === cycle 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {billingCycle === cycle && (
                    <motion.div
                      layoutId="billingTab"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">
                    {cycle}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeProduct}-${billingCycle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pricing Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {currentPricing.map((plan, index) => {
                const colors = getPlanColor(plan.plan);
                
                return (
                  <motion.div
                    key={plan.plan}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <motion.div
                      className="rounded-3xl border-2 p-8 h-full flex flex-col"
                      style={{
                        background: colors.bg,
                        borderColor: colors.border
                      }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      
                      {/* Plan Header */}
                      <div className="text-center mb-6">
                        <h3 
                          className="text-2xl font-bold mb-2"
                          style={{ color: colors.text }}
                        >
                          {currentProductData.product || activeProduct} {plan.plan}
                        </h3>
                        
                        {/* Original Price */}
                        {plan.savings > 0 && (
                          <p className="text-gray-500 line-through text-sm mb-1">
                            Original Price: Rs. {plan.originalPrice.toLocaleString()} / 
                            {billingCycle === 'monthly' ? ' Month' : 
                             billingCycle === 'quarterly' ? ' 3 Months' : ' Year'}
                          </p>
                        )}
                        
                        {/* Discounted Price */}
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-gray-900">
                            Rs. {plan.discountedPrice.toLocaleString()}
                          </span>
                          <span className="text-gray-600 ml-2">
                            / {billingCycle === 'monthly' ? 'Month' : 
                                billingCycle === 'quarterly' ? '3 Months' : 'Year'}
                          </span>
                        </div>
                        
                        {/* Savings Badge */}
                        {plan.savings > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                          >
                            You save {plan.savings}%
                          </motion.div>
                        )}
                      </div>

                      {/* Features List */}
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <motion.li 
                              key={featureIndex}
                              className="flex items-center text-gray-700"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + featureIndex * 0.1 }}
                            >
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Started
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingCards;