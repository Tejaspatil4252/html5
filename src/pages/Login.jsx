  import React, { useState, useCallback ,useEffect} from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
 import { 
  FaEnvelope, 
  FaLock, 
  FaArrowLeft, 
  FaUserPlus, 
  FaRocket,
  FaStar,
  FaCheck  
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

  import { Link } from 'react-router-dom';

  const Login = ({ setUser }) => { 
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
     const location = useLocation();  
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const result = await response.json();
    console.log("📥 Login response:", result);

    // In your login handleSubmit
if (result.success === true) {
  localStorage.setItem('authToken', result.token);
  
  const userData = {
    user_id: result.user.userId,
    company_id: result.user.companyId,
    email: result.user.email,
    person_name: result.user.personName || result.user.person_name, // ← ADD THIS
    company_name: result.user.companyName || result.user.company_name
  };
  
  localStorage.setItem('userData', JSON.stringify(userData));
  setUser(userData);
  setShowSuccessPopup(true);

    } else {
      throw new Error(result.message || 'Login failed');
    }
  } catch (error) {
        console.error('Login error:', error);
        
        let errorMessage = "Login failed. Please check your credentials.";
        if (error.message.includes("Invalid credentials")) {
          errorMessage = "Invalid email or password.";
        } else if (error.message.includes("Account is deactivated")) {
          errorMessage = "Your account has been deactivated.";
        } else if (error.message.includes("network") || error.message.includes("Failed to fetch")) {
          errorMessage = "Cannot connect to server. Please try again.";
        }
        
        showToast(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    // 🆕 Handle redirect after success popup
    const handleRedirect = () => {
      setShowSuccessPopup(false);
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    };

    const handleForgotPassword = () => {
      showToast('Password reset feature coming soon!', 'success');
    };

    const handleBackToHome = () => {
      showToast('Returning to home page...', 'success');
    };
  useEffect(() => {
    if (location.state?.message) {
      showToast(location.state.message, 'error');
    }
  }, [location.state]);
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

        {/* 🆕 Beautiful Success Popup */}
        <AnimatePresence>
          {showSuccessPopup && (
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
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white text-center relative overflow-hidden">
                  {/* Animated background elements */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/10 rounded-full"
                  />
                  
                  {/* Success Icon */}
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
                    Welcome Back! 🎉
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-red-100 text-lg"
                  >
                    Login Successful
                  </motion.p>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-3 mb-6"
                  >
                    <FaStar className="text-yellow-500 text-xl" />
                    <p className="text-gray-600 font-medium">
                      Ready to explore your AI business solutions
                    </p>
                    <FaStar className="text-yellow-500 text-xl" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 mb-6"
                  >
                    <p className="text-green-800 text-sm font-medium">
                      <FaRocket className="inline mr-2 text-green-600" />
                      Redirecting you to your dashboard...
                    </p>
                  </motion.div>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    onAnimationComplete={handleRedirect}
                    className="h-2 bg-gray-200 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-500 text-sm mt-4"
                  >
                    Taking you to your workspace...
                  </motion.p>
                </div>
              </motion.div>
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
                  <Link to ="/forgot-password">
                  <motion.button
                    type="button"
                    onClick={handleForgotPassword}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Forgot your password?
                  </motion.button>
                  </Link>
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