import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', active: location.pathname === '/' },
    { name: 'About Us', path: '/about', active: location.pathname === '/about' },
    { name: 'Products', path: '/products', active: location.pathname === '/products' },
    { name: 'Hosting', path: '/hosting', active: location.pathname === '/hosting' },
    { name: 'Blog', path: '/blog', active: location.pathname === '/blog' },
    { name: 'Contact', path: '/contact', active: location.pathname === '/contact' }
  ];

  return (
    <nav className="bg-black shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo - FIXED */}
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-red-400 transition-colors"
            >
              RapportSoft
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`text-white hover:text-red-400 transition-colors font-medium ${
                    item.active ? 'text-red-400' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Get Started Button - FIXED */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button - No changes needed */}
          <motion.button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu - FIXED */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black border-t border-gray-800"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`block text-white hover:text-red-400 transition-colors font-medium px-4 py-2 ${
                        item.active ? 'text-red-400 bg-gray-900 rounded' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/contact"
                    className="block bg-red-600 text-white px-4 py-3 rounded-lg font-bold text-center mx-4 hover:bg-red-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;