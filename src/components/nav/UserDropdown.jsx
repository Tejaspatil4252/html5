// components/UserDropdown.js
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaChevronDown, FaBuilding } from 'react-icons/fa';

const UserDropdown = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user || !user.person_name) return null;

  const userName = user.person_name || 'User';
  const companyName = user.company_name || '';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Glass User Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-xl transition-all duration-300 group hover:bg-white/15 hover:border-white/30"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar with glass effect */}
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg backdrop-blur-sm">
          {getInitials(userName)}
        </div>

        {/* Animated Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-white/80 group-hover:text-white transition-colors duration-300"
        >
          <FaChevronDown className="w-3 h-3" />
        </motion.div>
      </motion.button>

      {/* Glass Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring" }}
            className="absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 z-50 overflow-hidden"
          >
            {/* Header with glass effect */}
            <div className="p-4 border-b border-white/20 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg backdrop-blur-sm">
                  {getInitials(userName)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm truncate">{userName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FaBuilding className="w-3 h-3 text-white/70" />
                    <p className="text-white/70 text-xs truncate">{companyName}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sign Out Button with glass hover */}
            <motion.button
              onClick={() => {
                onSignOut();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all duration-200 group border-t border-white/20"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/15 transition-colors backdrop-blur-sm">
                <FaSignOutAlt className="text-white/80 group-hover:text-white w-3 h-3" />
              </div>
              <div>
                <p className="font-semibold text-sm">Sign Out</p>
                <p className="text-white/60 text-xs">End your session</p>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;