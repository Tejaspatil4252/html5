import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { FaBox, FaUsers, FaCogs, FaArrowRight } from 'react-icons/fa';

const HomeSectionWhatWeDo = () => {
  const cards = [
    {
      icon: FaBox,
      title: "Our Products",
      color: "from-red-500 to-red-600",
      items: [
        "CFS NAV Management System",
        "ICD Management System", 
        "Bonded Warehouse System",
        "General Warehouse System",
        "Empty Yard Depot System",
        "E-Custodian Air Cargo System",
        "MOOWR Bonded Software",
        "Domestic Import Export Software",
        "Transportation Management System",
        "Bulk Digi-Sign Software",
        "Shipping Line EGM Merge",
        "Shipping Line Import/Export Manifest",
        "Stone Crusher Software", 
        "Third Party API Integration",
        "Tally, RFID, SAP System Integration",
        "Store and Maintenance System"
      ],
      link: "/products"
    },
    {
      icon: FaUsers,
      title: "Consulting",
      color: "from-red-600 to-red-700", 
      description: "Our consulting will equip you with a fresh outlook to approach ideas. If you already have an idea, we will help you polish and implement it. Leverage the power of technology & take your business to the greatest heights.",
      link: "/contact"
    },
    {
      icon: FaCogs,
      title: "Our Services",
      color: "from-red-700 to-red-800",
      items: [
        "Software Development",
        "Testing & QA", 
        "Application Services",
        "Software Consulting",
      "AI & Machine Learning",
      "Cloud & DevOps Automation",
         "AI Automation ",
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
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${card.color} h-2 w-full`}></div>
              
              <div className="p-6 flex-grow">
                {/* Icon & Title */}
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                  >
                    <card.icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="text-gray-600">
                  {card.description ? (
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {card.description}
                    </p>
                  ) : (
                    <div className="relative">
                      {/* Ultra Slim Scrollbars */}
                      <div 
                        className="space-y-2 max-h-64 overflow-y-auto pr-1
                          [&::-webkit-scrollbar]:w-1
                          [&::-webkit-scrollbar]:h-1
                          [&::-webkit-scrollbar-track]:bg-red-50
                          [&::-webkit-scrollbar-thumb]:bg-red-300
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:hover:bg-red-400
                          [scrollbar-width]:thin
                          [scrollbar-color]:red-300_red-50"
                      >
                        {card.items.map((item, itemIndex) => (
                          <div 
                            key={item}
                            className="text-gray-700 hover:text-red-600 transition-all duration-300 cursor-pointer flex items-start space-x-2 group/item hover:scale-105 hover:translate-x-1"
                          >
                            <div 
                              className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 group-hover/item:bg-red-600 transition-all duration-200"
                            />
                            <span className="text-sm leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Read More Button - FIXED WITH REACT ROUTER LINK */}
              <div className="px-6 pb-6 mt-auto">
                <Link
                  to={card.link}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-all duration-300 group/btn hover:scale-105"
                >
                  Read More
                  <FaArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSectionWhatWeDo;