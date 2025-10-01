// src/components/home/HomeSection6Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaClock, 
  FaUsers,
  FaAward,
  FaHandshake
} from 'react-icons/fa';

const HomeSection3Features = () => {
  const features = [
    {
      icon: <FaRocket className="text-xl" />,
      title: "Fast Delivery",
      description: "Timely project completion with top quality assurance.",
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      title: "Secure Solutions",
      description: "Enterprise-grade security for your data and applications.",
    },
    {
      icon: <FaClock className="text-xl" />,
      title: "24/7 Support",
      description: "Round-the-clock monitoring and expert support.",
    },
    {
      icon: <FaUsers className="text-xl" />,
      title: "Expert Team",
      description: "Seasoned professionals with decades of experience.",
    },
    {
      icon: <FaAward className="text-xl" />,
      title: "Quality First",
      description: "Rigorous testing for high-performance solutions.",
    },
    {
      icon: <FaHandshake className="text-xl" />,
      title: "Long Partnership",
      description: "Continuous support for your evolving needs.",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-red-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Guarantee
          </motion.h2>
          
          <motion.p 
            className="text-gray-700 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Building trust through reliable services and proven expertise
          </motion.p>
        </motion.div>

        {/* Compact Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ 
                y: -5,
                scale: 1.02,
              }}
            >
              {/* Icon */}
              <motion.div 
                className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-red-600 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-red-100 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge - Compact */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-3 bg-gray-900 rounded-full px-6 py-3">
            <FaAward className="text-xl text-white" />
            <span className="text-white font-semibold text-sm">
              Trusted by 500+ Businesses
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection3Features;