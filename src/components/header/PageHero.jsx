// components/PageHero.js
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageHero = ({ pageType = 'home' }) => {
  // Background images for each page
  const backgroundImages = {
    home: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    products: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    services: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    career: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    about: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    clients: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    news: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    blogs: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center",
    contact: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&w=1920&h=600&fit=crop&crop=center"
  };

  // Page titles
  const pageTitles = {
    home: "Innovate with Us",
    products: "Our Products",
    services: "Expert Services",
    career: "Join Our Team",
    about: "About Us",
    clients: "Our Clients",
    news: "Latest News",
    blogs: "Insights & Blogs",
    contact: "Get In Touch"
  };

  const backgroundImage = backgroundImages[pageType] || backgroundImages.home;
  const title = pageTitles[pageType] || "RapportSoft";

  return (
    <div 
      className="h-[30vh] relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Sketch Animations */}
      <div className="absolute inset-0">
        {/* Animated Drawing Line */}

        
        {/* Floating Tech Elements */}
        <motion.div
          className="absolute top-8 left-8 text-white/40 text-3xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {"</>"}
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 right-8 text-white/40 text-3xl"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          {"{}"}
        </motion.div>
        
        {/* Pulsing Dots */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full"
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          

        </div>
      </div>
              <motion.div
          className="absolute top-2/2 left-1/4 right-1/4 h-0.5 bg-red-500/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
    </div>
  );
};

export default PageHero;