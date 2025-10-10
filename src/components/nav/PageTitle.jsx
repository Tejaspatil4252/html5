import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PageTitle = ({ title }) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < title.length) {
        setDisplayedTitle(title.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [title]);

  return (
    <motion.h1 
      className="text-5xl font-bold text-white text-center mt-8 drop-shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {displayedTitle}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.h1>
  );
};

export default PageTitle;