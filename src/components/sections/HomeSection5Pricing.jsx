// src/components/home/HomeSection5Pricing.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HomeSection5Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      description: '100% free. Forever',
      features: [
        { text: '150 GB Bandwidth', strong: true },
        { text: '100 GB Storage', strong: true },
        { text: '$1.00 / GB Overages', strong: true },
        { text: 'All features' }
      ],
      popular: false,
      color: 'bg-gray-100'
    },
    {
      name: 'Startup',
      price: 19,
      description: 'All features are included',
      features: [
        { text: '450 GB Bandwidth', strong: true },
        { text: '400 GB Storage', strong: true },
        { text: '$2.00 / GB Overages', strong: true },
        { text: 'All features' }
      ],
      popular: false,
      color: 'bg-white'
    },
    {
      name: 'Premium',
      price: 49,
      description: 'All features are included',
      features: [
        { text: '250 GB Bandwidth', strong: true },
        { text: '200 GB Storage', strong: true },
        { text: '$5.00 / GB Overages', strong: true },
        { text: 'All features' }
      ],
      popular: true, // This will be the highlighted plan
      color: 'bg-white'
    },
    {
      name: 'Pro',
      price: 99,
      description: 'All features are included',
      features: [
        { text: '450 GB Bandwidth', strong: true },
        { text: '400 GB Storage', strong: true },
        { text: '$20.00 / GB Overages', strong: true },
        { text: 'All features' }
      ],
      popular: false,
      color: 'bg-white'
    }
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-red-600 font-semibold tracking-wider uppercase text-sm mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pricing Plans
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Best Pricing
          </motion.h2>

          {/* Billing Toggle */}
          <motion.div 
            className="flex justify-center items-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-7 bg-red-600 rounded-full relative transition-colors duration-300"
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-1"
                animate={{ left: billingCycle === 'monthly' ? 4 : 34 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </button>
            <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly <span className="text-red-600 text-sm">(Save 20%)</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className="group"
            >
              <motion.div 
                className={`${plan.color} rounded-2xl shadow-lg p-8 relative overflow-hidden h-full flex flex-col ${
                  plan.popular 
                    ? 'ring-2 ring-red-500 transform scale-105' 
                    : 'hover:shadow-xl transition-all duration-300'
                }`}
                whileHover={{ 
                  y: plan.popular ? 0 : -10,
                  scale: plan.popular ? 1.05 : 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-red-600 text-white px-4 py-1 rounded-b-lg text-sm font-semibold"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <motion.h3 
                    className={`text-2xl font-bold mb-2 ${
                      plan.popular ? 'text-red-600' : 'text-gray-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {plan.name}
                  </motion.h3>
                  
                  {/* Price */}
                  <motion.div 
                    className="mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-4xl font-bold text-gray-900">
                      ${billingCycle === 'yearly' ? Math.floor(plan.price * 12 * 0.8) : plan.price}
                    </span>
                    <span className="text-gray-600 text-lg">
                      {billingCycle === 'yearly' ? '/year' : '/month'}
                    </span>
                  </motion.div>
                  
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Features List */}
                <div className="flex-1 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Enjoy All The Features
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        className="flex items-center text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 + featureIndex * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        {feature.strong ? (
                          <strong>{feature.text}</strong>
                        ) : (
                          feature.text
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Choose Plan Button */}
                <motion.button
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-colors duration-300 ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection5Pricing;