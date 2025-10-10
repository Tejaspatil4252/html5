import React from 'react';
import { motion } from 'framer-motion';
import { Package, Gear, UsersThree } from 'phosphor-react';
import { Link } from 'react-router-dom';

const HomeSection2Cards = () => {
  const cards = [
    {
      icon: Package,
      title: "Our Products",
      description: "Rapportsoft Consulting and Technology is one of the India's largest Shipping software products company providing innovative...",
      link: "/products",
    },
    {
      icon: Gear,
      title: "Our Services",
      description: "The right choice is the one that not only makes the design, development and deployment in the most effective way but ...",
      link: "/services",
    },
    {
      icon: UsersThree,
      title: "Consulting",
      description: "Our consulting will equip you with a fresh outlook to approach ideas. If you already have an idea, we will help you polish and ...",
      link: "/services",
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="bg-white py-16 -mt-4 relative z-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group relative"
              variants={cardVariants}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = '1';
              }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl p-6 h-full overflow-hidden border border-red-700/50"
                whileHover={{ 
                  y: -12,
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
              >
                  
                {/* Animated Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-600/20 opacity-0"
                  whileHover={{
                    opacity: 1,
                    x: ['-100%', '100%'],
                    transition: {
                      x: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 0.3 }
                    }
                  }}
                />

                <div className="relative z-10 text-center space-y-5">
                  {/* Icon with Pop Animation */}
                  <motion.div 
                    className="relative mx-auto mb-3"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <motion.div
                      className="w-14 h-14 mx-auto rounded-2xl bg-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.3
                      }}
                    >
                      <card.icon className="text-2xl text-white" weight="fill" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Content with Staggered Animation */}
                  <div className="space-y-3">
                    <motion.h3 
                      className="text-xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.3 + 0.2 }}
                    >
                      {card.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-200 text-sm leading-relaxed text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.3 + 0.4 }}
                    >
                      {card.description}
                    </motion.p>
                  </div>
                  
                  {/* Button with Pop Animation */}
<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 15,
    delay: index * 0.3 + 0.6
  }}
  whileHover={{ 
    scale: 1.1,
    x: 5,
    transition: { type: "spring", stiffness: 400 }
  }}
>
  <Link 
    to={card.link}
    className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white text-red-600 font-semibold hover:bg-gray-100 transition-all duration-300"
  >
    <span>Learn More</span>
    
    <motion.svg 
      className="w-4 h-4 ml-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.3 + 0.8 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </motion.svg>
  </Link>
</motion.div>
                </div>

                {/* Corner Accents on Hover */}
                <motion.div
                  className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 opacity-0"
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500 opacity-0"
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection2Cards;