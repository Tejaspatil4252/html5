import { motion } from 'framer-motion';

const InteractiveAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Balanced Ultra Thin Grid */}
      <div className="absolute inset-0">
        {/* Horizontal Lines - Reduced to match vertical spacing */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 bg-white/40"
            style={{ 
              top: `${(i * 20)}%`, // Increased from 14% to 20% for better spacing
              height: '0.5px'
            }}
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Vertical Lines - Keep the same good spacing */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 bg-white/40"
            style={{ 
              left: `${(i * 20)}%`, // Match horizontal spacing (20%)
              width: '0.5px'
            }}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2 + 1.5,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveAnimation;