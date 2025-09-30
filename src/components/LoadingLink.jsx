// src/components/LoadingLink.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';
// code not in use ----------------------------
const LoadingLink = ({ to, children, className, ...props }) => {
  const { startNavigation, endNavigation } = useNavigation();
  const location = useLocation();

  const handleClick = () => {
    // Only show loader if navigating to a different page
    if (location.pathname !== to) {
      startNavigation();
      
      // Auto-hide loader after 2 seconds (fallback)
      setTimeout(() => {
        endNavigation();
      }, 2000);
    }
  };

  return (
    <Link
      to={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LoadingLink;