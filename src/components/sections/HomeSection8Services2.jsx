// src/components/home/HomeSection8Services.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import just one image
import dashboard1 from '../../assets/images/dashboard_full_1.jpg';

const HomeSection8Services = () => {
  const [activeTab, setActiveTab] = useState('nextgen');

  const tabs = [
    { id: 'nextgen', label: 'Next gen VPS' },
    { id: 'performance', label: 'Performance' },
    { id: 'effect', label: 'Effectiveness' }
  ];

  // Use the same image for all tabs
  const tabContent = {
    nextgen: {
      title: "Next gen VPS hosting",
      image: dashboard1,
      content: [
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur"
      ],
      imageFirst: true
    },
    performance: {
      title: "Performance VPS hosting",
      image: dashboard1,
      content: [
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur"
      ],
      imageFirst: false
    },
    effect: {
      title: "Effective VPS hosting",
      image: dashboard1,
      content: [
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur"
      ],
      imageFirst: true
    }
  };

  return (
    <section className="bg-white py-20">
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
            Services
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-red-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            How it works
          </motion.h2>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-12 pb-8">
          <div className="flex flex-wrap justify-center gap-4" role="tablist">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-red-600 text-white' 
                    : 'text-red-600 bg-white border border-red-600 hover:bg-red-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content with AnimatePresence */}
        <div className="align-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="tab-content"
            >
              {(() => {
                const content = tabContent[activeTab];
                return (
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    
                    {/* Image Container - Let it shift position naturally */}
                    <motion.div 
                      className={`w-full md:w-2/5 ${content.imageFirst ? 'order-first' : 'order-last'}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.img 
                        src={content.image} 
                        className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                        alt={content.title}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div 
                      className="w-full md:w-3/5"
                      initial={{ opacity: 0, x: content.imageFirst ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <motion.h2 
                        className="text-3xl font-bold text-red-600 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        {content.title}
                      </motion.h2>
                      {content.content.map((paragraph, index) => (
                        <motion.p 
                          key={index}
                          className="text-black text-lg leading-relaxed mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </motion.div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HomeSection8Services;