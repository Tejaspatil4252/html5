// src/components/PageLoader.jsx - PERFECTLY CENTERED
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-red-600 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* This container holds all rings  */}
      <div className="relative"> 
        
        {/* Outer Ring */}
        <motion.div
          className="w-24 h-24 border-2 border-white/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle Ring */}
        <motion.div
          className="w-20 h-20 border-2 border-white/60 rounded-full absolute top-2 left-2" // ← absolute positioning
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="w-16 h-16 border-3 border-white border-t-transparent rounded-full absolute top-4 left-4" // ← absolute positioning
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center R Logo */}
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center absolute top-6 left-6"> {/* ← absolute positioning */}
          <span className="text-red-600 font-bold text-xl">R</span>
        </div>

      </div>
    </motion.div>
  );
};

export default PageLoader;