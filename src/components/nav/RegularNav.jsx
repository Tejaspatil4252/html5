import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import UserDropdown from './UserDropdown';

// 🆕 ADD onAddBranch to props
const RegularNav = ({ navItems, hoveredItem, setHoveredItem, isOpen, setIsOpen, user, onSignOut, onAddBranch }) => {
  return (
    <>
      {/* Sticky Navbar */}
      <nav className="bg-black/95 backdrop-blur-md shadow-xl border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo - Left - Always visible */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 lg:-ml-18"
            >
              <Link 
                to="/" 
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-red-400 hover:to-red-300 transition-all duration-300"
              >
                RapportSoft
              </Link>
            </motion.div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center flex-1 justify-end">
              <div className="flex items-center space-x-1 lg:space-x-2 xl:space-x-4 lg:mr-8 xl:mr-10">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-2 lg:px-3 xl:px-4 py-2 font-medium transition-all duration-300 group text-sm lg:text-base ${
                        item.active 
                          ? 'text-red-400' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                      
                      {(item.active || hoveredItem === item.name) && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                            item.active 
                              ? 'bg-red-500' 
                              : 'bg-red-400/60'
                          } rounded-full`}
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* User Area - Right */}
            <div className="flex items-center gap-2 lg:gap-4 lg:-mr-18">
              
              {/* Desktop User Area */}
              <div className="hidden lg:flex">
                {user ? (
                  <UserDropdown 
                    user={user} 
                    onSignOut={onSignOut}
                    onAddBranch={onAddBranch} // 🆕 ADD THIS
                    navbarType="regular"
                  />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/registration"  
                      className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 lg:px-6 py-2 lg:py-2.5 font-bold rounded-lg hover:shadow-lg transition-all duration-300 block text-sm lg:text-base"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile User Area */}
              <div className="flex lg:hidden items-center gap-2">
                {user ? (
                  <UserDropdown 
                    user={user} 
                    onSignOut={onSignOut}
                    onAddBranch={onAddBranch} // 🆕 ADD THIS
                    navbarType="regular"
                  />
                ) : (
                  !isOpen && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/registration"
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-2 font-bold rounded-lg hover:shadow-lg transition-all duration-300 block text-sm whitespace-nowrap"
                      >
                        Get Started
                      </Link>
                    </motion.div>
                  )
                )}

                {/* Mobile Menu Button */}
                <motion.button
                  className="relative w-8 h-8 lg:w-10 lg:h-10 flex flex-col items-center justify-center group"
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-white rounded-full w-5 lg:w-6 transition-all duration-300 group-hover:bg-red-400"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-0.5 bg-white rounded-full w-4 lg:w-5 mt-1 lg:mt-1.5 transition-all duration-300 group-hover:bg-red-400"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-white rounded-full w-5 lg:w-6 mt-1 lg:mt-1.5 transition-all duration-300 group-hover:bg-red-400"
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700 overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`block px-6 py-3 font-medium transition-all duration-300 mx-2 rounded-lg ${
                          item.active 
                            ? 'text-red-400 bg-red-500/10 border-l-4 border-red-500' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Menu Get Started Button */}
                  {!user && (
                    <div className="px-4 pt-2">
                      <Link
                        to="/registration"
                        className="block bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg font-bold text-center hover:shadow-lg transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default RegularNav;