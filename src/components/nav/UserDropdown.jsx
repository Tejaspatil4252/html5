// components/UserDropdown.js
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaChevronDown, FaBuilding, FaPlus } from 'react-icons/fa';
import AddBranchModal from '../AddBranch';

const UserDropdown = ({ user, onSignOut, navbarType = 'regular', onAddBranch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (!buttonRef.current) return {};
    
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'fixed',
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    };
  };

  if (!user || !user.person_name) return null;

  const userName = user.person_name || 'User';
  const companyName = user.company_name || '';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Glass User Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${
          navbarType === 'hero' 
            ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white' 
            : 'bg-black border border-red-700 text-white'
        } px-3 py-2 rounded-xl transition-all duration-300 group hover:scale-105`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg ${
          navbarType === 'hero' 
            ? 'bg-gradient-to-br from-red-500 to-red-600' 
            : 'bg-red-600'
        }`}>
          {getInitials(userName)}
        </div>

        {/* Animated Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="transition-colors duration-300"
        >
          <FaChevronDown className="w-3 h-3" />
        </motion.div>
      </motion.button>

      {/* Dropdown - DIFFERENT STYLES BASED ON navbarType */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring" }}
            className={`fixed rounded-xl shadow-2xl border z-[9999] overflow-hidden min-w-64 ${
              navbarType === 'hero' 
                ? 'bg-white/10 backdrop-blur-xl border-white/20' // Glass for hero
                : 'bg-black border-red-500' // Black for regular
            }`}
            style={getDropdownPosition()}
          >
            {/* Header */}
            <div className={`p-4 border-b ${
              navbarType === 'hero' 
                ? 'border-white/20 bg-white/5' 
                : 'border-gray-700 bg-black'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                  navbarType === 'hero' 
                    ? 'bg-gradient-to-br from-red-500 to-red-600' 
                    : 'bg-red-600'
                }`}>
                  {getInitials(userName)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm truncate ${
                    navbarType === 'hero' ? 'text-white' : 'text-white'
                  }`}>
                    {userName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <FaBuilding className={`w-3 h-3 ${
                      navbarType === 'hero' ? 'text-white/70' : 'text-gray-400'
                    }`} />
                    <p className={`text-xs truncate ${
                      navbarType === 'hero' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {companyName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Branch Menu Item */}
            <motion.button
              onClick={() => {
                onAddBranch();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group border-b ${
                navbarType === 'hero' 
                  ? 'text-white hover:bg-white/10 border-white/20' 
                  : 'text-white hover:bg-gray-800 border-gray-700'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                navbarType === 'hero' 
                  ? 'bg-white/10 group-hover:bg-white/15' 
                  : 'bg-gray-800 group-hover:bg-gray-700'
              }`}>
                <FaPlus className={`w-3 h-3 ${
                  navbarType === 'hero' 
                    ? 'text-white/80 group-hover:text-white' 
                    : 'text-gray-300 group-hover:text-white'
                }`} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${
                  navbarType === 'hero' ? 'text-white' : 'text-white'
                }`}>
                  Add Branch
                </p>
                <p className={`text-xs ${
                  navbarType === 'hero' ? 'text-white/60' : 'text-gray-400'
                }`}>
                  Create new branch
                </p>
              </div>
            </motion.button>
            
            {/* Sign Out Button */}
            <motion.button
              onClick={() => {
                onSignOut();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group ${
                navbarType === 'hero' 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-white hover:bg-gray-800'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                navbarType === 'hero' 
                  ? 'bg-white/10 group-hover:bg-white/15' 
                  : 'bg-gray-800 group-hover:bg-gray-700'
              }`}>
                <FaSignOutAlt className={`w-3 h-3 ${
                  navbarType === 'hero' 
                    ? 'text-white/80 group-hover:text-white' 
                    : 'text-gray-300 group-hover:text-white'
                }`} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${
                  navbarType === 'hero' ? 'text-white' : 'text-white'
                }`}>
                  Sign Out
                </p>
                <p className={`text-xs ${
                  navbarType === 'hero' ? 'text-white/60' : 'text-gray-400'
                }`}>
                  End your session
                </p>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;