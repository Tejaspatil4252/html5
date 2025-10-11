// src/components/pricing/PricingCards.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PricingCards = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeProduct, setActiveProduct] = useState('EYMS');

  const pricingData = {
    EYMS: {
      monthly: [
        {
          plan: 'Silver',
          originalPrice: 5000,
          discountedPrice: 5000,
          savings: 0,
          features: ['2 Users', 'Email Support', 'Manual Backup', '5 EDI Lines']
        },
        {
          plan: 'Gold', 
          originalPrice: 7000,
          discountedPrice: 7000,
          savings: 0,
          features: ['5 Users', 'WhatsApp Support', 'Auto Backup', '10 EDI Lines']
        },
        {
          plan: 'Diamond',
          originalPrice: 10000,
          discountedPrice: 10000,
          savings: 0,
          features: ['10 Users', 'Phone Support', 'Auto Backup', 'Unlimited EDI']
        }
      ],
      quarterly: [
        {
          plan: 'Silver',
          originalPrice: 21000,
          discountedPrice: 12750,
          savings: 10,
          features: ['2 Users', 'Email Support', 'Manual Backup', '5 EDI Lines']
        },
        {
          plan: 'Gold',
          originalPrice: 37500,
          discountedPrice: 17850,
          savings: 15,
          features: ['5 Users', 'WhatsApp Support', 'Auto Backup', '10 EDI Lines']
        },
        {
          plan: 'Diamond',
          originalPrice: 90000,
          discountedPrice: 24000,
          savings: 20,
          features: ['10 Users', 'Phone Support', 'Auto Backup', 'Unlimited EDI']
        }
      ],
      yearly: [
        {
          plan: 'Silver',
          originalPrice: 84000,
          discountedPrice: 51000,
          savings: 15,
          features: ['2 Users', 'Email Support', 'Manual Backup', '5 EDI Lines']
        },
        {
          plan: 'Gold',
          originalPrice: 150000,
          discountedPrice: 67200,
          savings: 20,
          features: ['5 Users', 'WhatsApp Support', 'Auto Backup', '10 EDI Lines']
        },
        {
          plan: 'Diamond',
          originalPrice: 360000,
          discountedPrice: 90000,
          savings: 25,
          features: ['10 Users', 'Phone Support', 'Auto Backup', 'Unlimited EDI']
        }
      ]
    },
    BWMS: {
      monthly: [
        {
          plan: 'Silver',
          originalPrice: 5000,
          discountedPrice: 5000,
          savings: 0,
          features: ['2 Users', 'Email Support', 'Manual Backup', '5 EDI Lines']
        },
        {
          plan: 'Gold', 
          originalPrice: 7000,
          discountedPrice: 7000,
          savings: 0,
          features: ['5 Users', 'WhatsApp Support', 'Auto Backup', '10 EDI Lines']
        },
        {
          plan: 'Diamond',
          originalPrice: 10000,
          discountedPrice: 10000,
          savings: 0,
          features: ['10 Users', 'Phone Support', 'Auto Backup', 'Unlimited EDI']
        }
      ],
      quarterly: [
        {
          plan: 'Silver',
          originalPrice: 21000,
          discountedPrice: 12750,
          savings: 10,
          features: ['2 Users', 'Email Support', 'Manual Backup', '5 EDI Lines']
        },
        {
          plan: 'Gold',
          originalPrice: 37500,
          discountedPrice: 17850,
          savings: 15,
          features: ['5 Users', 'WhatsApp Support', 'Auto Backup', '10 EDI Lines']
        },
        {
          plan: 'Diamond',
          originalPrice: 90000,
          discountedPrice: 24000,
          savings: 20,
          features: ['10 Users', 'Phone Support', 'Auto Backup', 'Unlimited EDI']
        }
      ],
      yearly: [
        {
          plan: 'Silver',
          originalPrice: 84000,
          discountedPrice: 51000,
          savings: 15,
          features: ['2 Users', 'Email Support', 'Manual Backup', '5 EDI Lines']
        },
        {
          plan: 'Gold',
          originalPrice: 150000,
          discountedPrice: 67200,
          savings: 20,
          features: ['5 Users', 'WhatsApp Support', 'Auto Backup', '10 EDI Lines']
        },
        {
          plan: 'Diamond',
          originalPrice: 360000,
          discountedPrice: 90000,
          savings: 25,
          features: ['10 Users', 'Phone Support', 'Auto Backup', 'Unlimited EDI']
        }
      ]
    }
  };

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

  const currentPricing = pricingData[activeProduct][billingCycle];

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
              {['EYMS', 'BWMS'].map((product) => (
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
                    {product} Pricing
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
                          {activeProduct} {plan.plan}
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