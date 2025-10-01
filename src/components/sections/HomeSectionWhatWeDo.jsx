// src/components/home/HomeSection5WhatWeDo.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaUsers, FaCogs, FaArrowRight } from 'react-icons/fa';

const HomeSectionWhatWeDo = () => {
  const cards = [
    {
      icon: FaBox,
      title: "Our Products",
      color: "from-red-500 to-red-600",
      items: [
        "Vision CFS",
        "Vision ICD",
        "Empty Yard Management System",
        "WMS (Bonded Warehouse)",
        "Shipping Line: Import Export Manifest",
        "E-Invoice Provider",
        "Bulk Digisign Application"
      ],
      link: "/products"
    },
    {
      icon: FaUsers,
      title: "Consulting",
      color: "from-red-600 to-red-700",
      description: "Our consulting will equip you with a fresh outlook to approach ideas. If you already have an idea, we will help you polish and implement it. Leverage the power of technology & take your business to the greatest heights.",
      link: "/consulting"
    },
    {
      icon: FaCogs,
      title: "Our Services",
      color: "from-red-700 to-red-800",
      items: [
        "Software Development",
        "Testing & QA",
        "Application Services",
        "IT Consulting",
        "Data Analytics",
        "Infrastructure Services (Hardware)",
        "Help Desk Services"
      ],
      link: "/services"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        
        {/* Main Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-red-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What We Do ?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Rapportsoft Suite of Products are built on JAVA / J2EE platform. Rapportsoft services for the products built on advanced technologies include the following –
          </motion.p>

          {/* Animated Underline */}
          <motion.div
            className="w-24 h-1 bg-red-600 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${card.color} h-2 w-full`}></div>
              
              <div className="p-6 flex-grow">
                {/* Icon & Title */}
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <card.icon className="text-xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {card.title}
                  </h3>
                </div>

                {/* Content */}
                <motion.div 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  {card.description ? (
                    <p className="text-gray-700 leading-relaxed">
                      {card.description}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {card.items.map((item, itemIndex) => (
                        <motion.li 
                          key={item}
                          className="text-gray-700 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + itemIndex * 0.1 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </div>

              {/* Read More Button at Bottom */}
              <div className="px-6 pb-6 mt-auto">
                <motion.a
                  href={card.link}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group/btn"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <motion.svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSectionWhatWeDo;