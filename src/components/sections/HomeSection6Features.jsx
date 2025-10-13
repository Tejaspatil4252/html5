// src/components/home/HomeSection6Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import bg1 from '../../assets/images/bg_1.jpg';
import { Link } from 'react-router-dom';
import AIRobo from '../../assets/homeIMG/Ai-robo.jpg';

const HomeSection6Features = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side - AI Robot Image with Red Overlay */}
        <motion.div 
          className="lg:w-5/12 relative min-h-[500px] lg:min-h-[600px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${AIRobo})` }}
          >
            {/* Red Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-800/70 to-red-900/80"></div>
          </div>
          
          {/* AI-focused Text Overlay */}
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
                AI-Powered Innovation
              </motion.h3>
              <motion.p 
                className="text-xl text-red-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Where Machine Intelligence Meets Business Excellence
              </motion.p>
            </div>
          </motion.div>

          {/* Floating Tech Elements */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-red-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side - AI-Enhanced Content */}
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
              Intelligent Solutions Powered by AI
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
              We harness the power of artificial intelligence and machine learning to create self-optimizing software ecosystems. Our neural network architectures and predictive analytics transform complex business challenges into intelligent, automated solutions that learn and evolve with your enterprise.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              From cognitive automation to deep learning algorithms, we integrate cutting-edge AI technologies that drive digital transformation, enhance decision-making, and create competitive advantages in today's data-driven landscape.
            </motion.p>

            {/* AI Capabilities Highlights */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                "Machine Learning",
                "Neural Networks", 
                "Predictive Analytics",
                "Cognitive Automation"
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="flex items-center gap-2 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link to="/contact">
              <motion.button
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore AI Solutions
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection6Features;