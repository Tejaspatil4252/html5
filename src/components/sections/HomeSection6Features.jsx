// src/components/home/HomeSection6Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import bg1 from '../../assets/images/bg_1.jpg';

const HomeSection6Features = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side - Clean Background Image (Unchanged) */}
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

        {/* Right Side - Updated Content */}
        <motion.div 
          className="lg:w-7/12 bg-white py-16 lg:py-20 px-6 lg:px-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-red-600 mb-6">
              Create powerful websites & software solutions
            </h2>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Our experience and expertise in executing large software development projects is a complementary mix of project management, business process analysis and enterprise class technology.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              We combine strategic thinking with technical excellence to deliver solutions that drive business growth and digital transformation.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection6Features;