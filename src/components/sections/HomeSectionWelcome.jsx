import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRocket, FaUsers, FaGlobe, FaBrain, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AI from '../../assets/homeIMG/AI.jpg';

const HomeSection3Welcome = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dominant AI Background */}
      <div className="absolute inset-0">
        {/* AI Image - Full Dominance */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={AI}
            alt="AI Technology"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dynamic Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-900/85 via-red-800/75 to-red-900/80"
          animate={{
            opacity: [0.8, 0.9, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated Light Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-red-800/30"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Tech Elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-red-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Enhanced Glow Effects */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500 rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-400 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex items-center py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content - Modern Text Block */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Badge */}
              <motion.div
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/40 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div
                  className="w-3 h-3 bg-red-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-sm font-bold text-white tracking-wide">AI-POWERED INNOVATION</span>
              </motion.div>

              {/* Main Heading with Impact */}
              <div className="space-y-4">
                <motion.h1
                  className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Welcome to
                </motion.h1>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.span
                    className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-200 via-red-300 to-red-400 bg-clip-text text-transparent drop-shadow-2xl"
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Rapportsoft
                  </motion.span>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-200 via-red-300 to-red-400 bg-clip-text text-transparent blur-xl opacity-50 -z-10" />
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p
                className="text-2xl md:text-3xl text-red-100 font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="font-bold text-white">Transforming Shipping</span> with 
                Intelligent Technology Solutions
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-lg text-red-50 leading-relaxed font-light max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                As India's premier shipping software innovator, we leverage cutting-edge AI and machine learning to revolutionize supply chain management. Our intelligent platforms drive efficiency, reduce costs, and propel businesses into the future.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/products">
                  <motion.button
                    className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-red-400 hover:to-red-500 transition-all duration-300 shadow-2xl overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(239, 68, 68, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <span className="relative flex items-center text-lg">
                      <FaRocket className="mr-3 text-xl" />
                      Discover AI Solutions
                      <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </motion.button>
                </Link>
                
                <Link to="/contact">
                  <motion.button
                    className="group relative bg-white/15 backdrop-blur-lg text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/25 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative flex items-center text-lg">
                      <FaUsers className="mr-3 text-xl" />
                      Get Expert Consultation
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Premium Stats & Features */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Achievement Cards */}
              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[
                  { number: "18+", label: "Years of Excellence", icon: FaAward, color: "from-red-400 to-red-500" },
                  { number: "500+", label: "Global Clients", icon: FaGlobe, color: "from-red-500 to-red-600" },
                  { number: "2", label: "Tech Centers", icon: FaBrain, color: "from-red-600 to-red-700" },
                  { number: "24/7", label: "AI Support", icon: FaRocket, color: "from-red-700 to-red-800" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.6)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <stat.icon className="relative z-10 w-8 h-8 text-red-300 mb-4 group-hover:text-white transition-colors duration-300" />
                    <div className="relative z-10 text-3xl font-black text-white mb-2 group-hover:text-red-100 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="relative z-10 text-sm font-semibold text-red-100 group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 p-8 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ 
                  y: -5,
                  borderColor: 'rgba(248, 113, 113, 0.6)',
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Industry Leaders Choose Us</h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      title: "AI-Driven Automation", 
                      desc: "Smart algorithms that optimize your entire supply chain",
                      icon: FaBrain
                    },
                    { 
                      title: "Global Scalability", 
                      desc: "Solutions that grow with your international operations",
                      icon: FaGlobe
                    },
                    { 
                      title: "Real-Time Analytics", 
                      desc: "Data-driven insights for informed decision making",
                      icon: FaRocket
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(255,255,255,0.1)"
                      }}
                    >
                      <feature.icon className="w-6 h-6 text-red-300 mt-1 group-hover:text-red-200 transition-colors duration-300 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-red-100 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-950/90 via-red-900/50 to-transparent" />
    </section>
  );
};

export default HomeSection3Welcome;