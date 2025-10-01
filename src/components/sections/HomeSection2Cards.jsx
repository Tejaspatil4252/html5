// src/components/home/HomeSection2Cards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaCogs, FaUsers } from 'react-icons/fa';

const HomeSection2Cards = () => {
  const cards = [
    {
      icon: FaBox,
      title: "Our Products",
      description: "Rapportsoft Consulting and Technology is one of the India's largest Shipping software products company providing innovative...",
      link: "/products",
      color: "from-red-500 to-red-600"
    },
    {
      icon: FaCogs,
      title: "Our Services",
      description: "The right choice is the one that not only makes the design, development and deployment in the most effective way but ...",
      link: "/services",
      color: "from-red-600 to-red-700"
    },
    {
      icon: FaUsers,
      title: "Consulting",
      description: "Our consulting will equip you with a fresh outlook to approach ideas. If you already have an idea, we will help you polish and ...",
      link: "/consulting",
      color: "from-red-700 to-red-800"
    }
  ];

  return (
    <section className="bg-white py-16 -mt-4 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${card.color} h-2 w-full`}></div>
              
              <div className="p-8 text-center">
                {/* Icon */}
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <card.icon className="text-3xl text-red-600" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-left mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                {/* Button */}
                <motion.a
                  href={card.link}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection2Cards;