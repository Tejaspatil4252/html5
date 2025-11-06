import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaArrowLeft, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  const email = location.state?.email;

  // Same animations as login
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const showToast = useCallback((message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  }, []);

  const validateField = useCallback((name, value) => {
    const errors = {};
    
    switch (name) {
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  }, [formData.password]);

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
    
    const passwordValid = validateField('password', formData.password);
    const confirmPasswordValid = validateField('confirmPassword', formData.confirmPassword);
    
    if (!passwordValid || !confirmPasswordValid) {
      showToast('Please fix validation errors');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        showToast('Password reset successfully!', 'success');
        
        // Redirect to login after delay
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Password reset successful! Please login with your new password.' }
          });
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to reset password');
      }
    } catch (error) {
      showToast(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    showToast('Returning to home page...', 'success');
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Access</h2>
          <p className="text-gray-600 mb-6">Please go through the OTP verification process first.</p>
          <Link to="/forgot-password">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold">
              Go to Forgot Password
            </button>
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center relative overflow-hidden">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="relative z-10"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <FaCheck className="text-white text-4xl" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold mb-2"
                >
                  Password Reset! 🎉
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-green-100 text-lg"
                >
                  Redirecting to login...
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
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
          {/* Header */}
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
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-sm font-bold">SET NEW PASSWORD</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
            >
              New Password
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-red-100 text-lg"
            >
              Create your new password
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={(e) => validateField('password', e.target.value)}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
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

              {/* Confirm Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <motion.input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={(e) => validateField('confirmPassword', e.target.value)}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {fieldErrors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>

              {/* Reset Password Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading || isSuccess}
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
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <FaLock className="text-sm" />
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

              {/* Back to Login */}
              <motion.div variants={itemVariants} className="text-center">
                <span className="text-gray-600 text-sm">
                  Remember your password?
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/login"
                    className="text-red-600 hover:text-red-700 font-semibold text-sm ml-1 transition-colors flex items-center justify-center gap-1 mx-auto mt-2"
                  >
                    <FaArrowLeft className="text-xs" />
                    Back to Login
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

export default ResetPassword;