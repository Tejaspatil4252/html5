import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  // Container animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Stagger children animation
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const showToast = useCallback((message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  }, []);

  const validateField = useCallback((name, value) => {
    const errors = {};
    
    switch (name) {
      case 'email':
        if (!value) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Invalid email format';
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [fieldErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    
    if (!emailValid || !passwordValid) {
      showToast('Please fix validation errors');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login data:', formData);
      showToast('Login successful! Redirecting...', 'success');
    } catch (error) {
      showToast('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showToast('Password reset feature coming soon!', 'success');
  };

  const handleBackToHome = () => {
    showToast('Returning to home page...', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center p-4">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg border-l-4 ${
              toast.type === 'error' 
                ? 'bg-red-500 text-white border-red-600' 
                : 'bg-green-500 text-white border-green-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-200' : 'bg-green-200'}`} />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Login Card with VISIBLE animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Header with animation */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-white text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-2 h-2 bg-red-200 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-sm font-bold">WELCOME BACK</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
            >
              Sign In to <span className="text-red-100">Rapportsoft</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-red-100 text-lg"
            >
              Access your AI business solutions
            </motion.p>
          </motion.div>

          {/* Form with staggered animations */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={(e) => validateField('email', e.target.value)}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                {fieldErrors.email && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {fieldErrors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <motion.input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={(e) => validateField('password', e.target.value)}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="Enter your password"
                  />
                </div>
                {fieldErrors.password && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {fieldErrors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Forgot Password */}
              <motion.div variants={itemVariants} className="text-right">
                <motion.button
                  type="button"
                  onClick={handleForgotPassword}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </motion.button>
              </motion.div>

              {/* Login Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaEnvelope className="text-sm" />
                  </>
                )}
              </motion.button>

              {/* Back to Home */}
<motion.div variants={itemVariants} className="text-center pt-4">
  <Link to="/">
    <motion.button
      type="button"
      onClick={handleBackToHome}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm mx-auto"
    >
      <FaArrowLeft className="text-xs" />
      Back To Home
    </motion.button>
  </Link>
</motion.div>

              {/* Divider */}
              <motion.div 
                variants={itemVariants}
                className="relative flex items-center py-1"
              >
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </motion.div>

              {/* Create Account */}
              <motion.div variants={itemVariants} className="text-center">
                <span className="text-gray-600 text-sm">
                  Don't have an account?
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/registration"
                    className="text-red-600 hover:text-red-700 font-semibold text-sm ml-1 transition-colors flex items-center justify-center gap-1 mx-auto mt-2"
                  >
                    <FaUserPlus className="text-xs" />
                    Create Account
                  </Link>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;