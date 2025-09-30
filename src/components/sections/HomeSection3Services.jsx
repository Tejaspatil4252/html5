// src/components/home/HomeSection3Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaHeadset, 
  FaCloudUploadAlt, 
  FaCogs, 
  FaRocket,
  FaSyncAlt
} from 'react-icons/fa';

const HomeSection3Services = () => {
  const services = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "100% Uptime Guarantee",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      color: "bg-red-500"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Safe and Secured",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      color: "bg-red-600"
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "Our Dedicated Support",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      color: "bg-red-500"
    },
    {
      icon: <FaCloudUploadAlt className="text-4xl" />,
      title: "Domain Transfer",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      color: "bg-red-600"
    },
    {
      icon: <FaCogs className="text-4xl" />,
      title: "DNS Control",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      color: "bg-red-500"
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: "Fast Loaded",
      description: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      color: "bg-red-600"
    }
  ];

  // Animation variants
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
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
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
            The RapportSoft Guarantee
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-100 h-full flex flex-col"
                whileHover={{ 
                  y: -10,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon Container */}
                <motion.div 
                  className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl font-bold text-red-600 mb-4 group-hover:text-red-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button 
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeSection3Services;