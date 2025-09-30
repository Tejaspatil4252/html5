// src/components/home/HomeSection6Features.jsx - FIXED ALIGNMENT
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCloudUploadAlt, 
  FaTachometerAlt, 
  FaShieldAlt, 
  FaClock, 
  FaCogs, 
  FaHeadset
} from 'react-icons/fa';
import bg1 from '../../assets/images/bg_1.jpg';

const HomeSection6Features = () => {
  const features = [
    {
      icon: <FaCloudUploadAlt className="text-2xl" />,
      title: "Free Domain Transfer",
      description: "Far far away, behind the word mountains, far from the countries Vokalia",
    },
    {
      icon: <FaTachometerAlt className="text-2xl" />,
      title: "Unlimited BandWidth",
      description: "Far far away, behind the word mountains, far from the countries Vokalia",
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Security",
      description: "Far far away, behind the word mountains, far from the countries Vokalia",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "99% Uptime",
      description: "Far far away, behind the word mountains, far from the countries Vokalia",
    },
    {
      icon: <FaCogs className="text-2xl" />,
      title: "Free Website Optimization",
      description: "Far far away, behind the word mountains, far from the countries Vokalia",
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "24/7 Tech Support",
      description: "Far far away, behind the word mountains, far from the countries Vokalia",
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
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side - Clean Background Image */}
        <motion.div 
          className="lg:w-5/12 relative min-h-[500px] lg:min-h-[600px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg1})` }}
          >
            <div className="absolute inset-0 bg-red-600/70"></div>
          </div>
          
          {/* Simple Text Overlay */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-center px-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-white">
              <motion.h3 
                className="text-3xl lg:text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Trusted by Thousands
              </motion.h3>
              <motion.p 
                className="text-xl text-red-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Join our growing community of satisfied customers
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Features Content */}
        <motion.div 
          className="lg:w-7/12 bg-white py-16 lg:py-20 px-6 lg:px-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-red-600 text-lg font-semibold">
              Peoples Choice WebHost The Best Web Hosting
            </p>
          </motion.div>

          {/* Features Grid - SIMPLIFIED ALIGNMENT */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 group"
              >
                {/* Icon - ALWAYS ON LEFT */}
                <motion.div 
                  className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Text Content - ALWAYS ON RIGHT */}
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="mt-12 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection6Features;