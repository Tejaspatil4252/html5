import React from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaBlog, FaSearch, FaInbox, FaPlus, FaSync } from 'react-icons/fa';

const EmptyState = ({
  type = 'general',
  title = "Nothing to display",
  description = "Check back later for updates",
  showActionButton = false,
  actionText = "Refresh",
  onActionClick,
  isAdmin = false
}) => {
  // Icon configuration based on type
  const iconConfig = {
    news: { icon: FaNewspaper, color: "text-red-600", label: "News" },
    blog: { icon: FaBlog, color: "text-red-600", label: "Blog" },
    search: { icon: FaSearch, color: "text-red-600", label: "Search" },
    general: { icon: FaInbox, color: "text-red-600", label: "General" }
  };

  const { icon: IconComponent, color, label } = iconConfig[type];

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Main Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <IconComponent className={`text-4xl ${color}`} />
          </div>
          
          {/* Floating Background Elements */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -left-2 text-red-300 text-2xl opacity-60"
          >
            {"</>"}
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-2 -right-2 text-red-300 text-2xl opacity-60"
          >
            {"{}"}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-red-600">{title}</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Progress Bar for "Coming Soon" Vibe */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.8 }}
            className="max-w-xs mx-auto bg-gray-200 rounded-full h-2 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full relative">
              <motion.div
                animate={{ x: [-50, 200] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
                className="absolute top-0 left-0 w-10 h-full bg-white opacity-30 skew-x-45"
              ></motion.div>
            </div>
          </motion.div>

          {/* Action Button */}
          {showActionButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onActionClick}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
              >
                {actionText.toLowerCase().includes('add') ? <FaPlus /> : <FaSync />}
                {actionText}
              </motion.button>
            </motion.div>
          )}

          {/* Admin Hint */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-4"
            >
              <p className="text-sm text-gray-600 italic">
                💡 As an admin, you can add new {type} content from the dashboard.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyState;