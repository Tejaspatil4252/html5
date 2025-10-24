// components/Loader.jsx
import { motion } from 'framer-motion';

const FormLoader = ({ size = 'md', color = 'red' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };
  
  const colors = {
    red: 'border-red-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} ${colors[color]} border-2 border-t-transparent rounded-full`}
    />
  );
};

export default FormLoader;