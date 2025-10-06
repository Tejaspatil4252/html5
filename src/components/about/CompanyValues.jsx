import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EyeIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const CompanyValuesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: EyeIcon,
      title: "Our Vision",
      content: "To be the best global Information Technology partner to customers providing innovative and integrated enterprise solutions in CFS (Container Freight Station), ICD, Logistics, Transportation, Empty Container Yard, Liner, Cold Storage Management, Freight Forwarding (Air Freight and Sea Freight), HR & Payroll, Digital Signature API, E-Invoice, SCMRT, Inventory Management System, Mobile application, WhatsApp, SMS Notification and Third-Party API communication ensuring customer satisfaction.",
      color: "red"
    },
    {
      icon: RocketLaunchIcon,
      title: "Our Mission",
      content: "To establish strategic partnerships with our clients, in the areas of Product development and provide competitive IT solutions while fulfilling our employee's aspirations. To create a business impact and become a competitive advantage for our clients, by virtue of our world-class and cost-effective service delivery.",
      color: "red"
    },
    {
      icon: ShieldCheckIcon,
      title: "Our Quality", 
      content: "We pay special attention to the quality assurance of the products and services we deliver. We believe that this is the best way to make products work as effectively as possible. Our clients can rely on our products working stably and as designed because we put an emphasis on quality assurance as a key factor in project success. By investing into quality assurance, we invest into our customers' business stability, and thus - value.",
      color: "red"
    },
    {
      icon: UserGroupIcon,
      title: "Our Customers",
      content: "Rapportsoft is dedicated to its customers and partners. We believe that the most important factor of our success is the success of our clients. Rapportsoft both in idea and realization, is a client-oriented company. By supplying our customers with top resources and skills, we fulfil our main goal - add value to their businesses through knowledgeable application of information technologies. Because we work closely with and for our customers, we are successful only when our clients succeed.",
      color: "red"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Component Title - Optimized spacing */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
          >
            Our <span className="bg-gradient-to-r from-red-600 to-rose-900 bg-clip-text text-transparent">Core Values</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Driving excellence through innovation, quality, and customer-centric solutions since 2005
          </motion.p>
        </div>

        {/* Tabs Header - Optimized spacing */}
        <div className="relative mb-10">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 pb-2 relative">
            {tabs.map((tab, index) => {
              const IconComponent = tab.icon;
              const isActive = index === activeTab;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    relative flex items-center gap-3 px-6 py-4 rounded-2xl 
                    transition-all duration-300 font-semibold group
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-700 hover:text-red-600 hover:bg-white/80'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background for active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl shadow-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <div className={`relative z-10 transition-all duration-300 ${
                    isActive ? 'text-white scale-110' : 'text-gray-500 group-hover:text-red-500 group-hover:scale-105'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <span className="relative z-10 text-lg">{tab.title}</span>
                  
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  {/* Individual underline for each tab */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-5 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content Area - Optimized spacing */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-red-100"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl">
                  {React.createElement(tabs[activeTab].icon, { 
                    className: "w-7 h-7 text-white" 
                  })}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {tabs[activeTab].title}
                </h3>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                {tabs[activeTab].content}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CompanyValuesTabs;