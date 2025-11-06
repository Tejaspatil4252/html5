import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaCheck, FaKey, FaRedo, FaClock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Timer useEffect
  useEffect(() => {
    let timer;
    if (isEmailSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsExpired(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isEmailSent, timeLeft]);

  // Reset timer when OTP is resent
  const resetTimer = () => {
    setTimeLeft(300); // Reset to 5 minutes
    setIsExpired(false);
  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  // OTP Handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      inputRefs.current[Math.min(pasteData.length, 5)].focus();
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showToast('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (result.success) {
        setIsEmailSent(true);
        resetTimer(); // Reset timer when OTP is sent
        showToast('OTP sent to your email! Check your inbox.', 'success');
        // Focus first OTP input
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
      } else {
        throw new Error(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      showToast(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (isExpired) {
      showToast('OTP has expired. Please request a new one.');
      return;
    }
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      showToast('Please enter the 6-digit OTP');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString })
      });

      const result = await response.json();

      if (result.success) {
        showToast('OTP verified successfully!', 'success');
        // Redirect to reset password
        setTimeout(() => {
          navigate('/reset-password', { 
            state: { 
              email,
              otp: otpString
            } 
          });
        }, 1000);
      } else {
        throw new Error(result.message || 'Invalid OTP');
      }
    } catch (error) {
      showToast(error.message || 'Failed to verify OTP. Please try again.');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 240) { // Prevent resending within 1 minute
      showToast('Please wait before requesting a new OTP');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (result.success) {
        resetTimer(); // Reset timer when OTP is resent
        showToast('New OTP sent to your email!', 'success');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        throw new Error(result.message || 'Failed to resend OTP');
      }
    } catch (error) {
      showToast(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              <span className="text-sm font-bold">
                {isEmailSent ? 'VERIFY OTP' : 'RESET PASSWORD'}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
            >
              {isEmailSent ? 'Enter OTP' : 'Forgot Password?'}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-red-100 text-lg"
            >
              {isEmailSent ? 'Check your email for the 6-digit code' : 'Enter your email to receive OTP'}
            </motion.p>
            {isEmailSent && (
              <motion.p
                variants={itemVariants}
                className="text-red-200 text-sm mt-2"
              >
                {email}
              </motion.p>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="p-8"
          >
            {!isEmailSent ? (
              // Step 1: Email Input
              <form onSubmit={handleSendOTP} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                      placeholder="Enter your registered email"
                    />
                  </div>
                </motion.div>

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
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              // Step 2: OTP Verification
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                    6-Digit Verification Code
                  </label>
                  
                  {/* Timer Display */}
                  <motion.div 
                    variants={itemVariants}
                    className={`flex items-center justify-center gap-2 mb-4 ${
                      isExpired ? 'text-red-600' : timeLeft < 60 ? 'text-orange-500' : 'text-gray-600'
                    }`}
                  >
                    <FaClock className="text-sm" />
                    <span className={`text-sm font-medium ${
                      isExpired ? 'animate-pulse' : ''
                    }`}>
                      {isExpired ? 'OTP Expired' : `Expires in: ${formatTime(timeLeft)}`}
                    </span>
                  </motion.div>

                  <div className="flex justify-center gap-2 mb-2">
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        whileFocus={{ scale: 1.1 }}
                        disabled={isExpired}
                        className={`w-12 h-12 text-center text-xl font-bold bg-white border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          isExpired 
                            ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm text-center">
                    Enter the code sent to your email
                  </p>
                </motion.div>

                {/* Verify Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={isVerifying || isExpired}
                  whileHover={!isExpired ? { scale: 1.02 } : {}}
                  whileTap={!isExpired ? { scale: 0.98 } : {}}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg ${
                    isExpired
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Verifying...
                    </>
                  ) : isExpired ? (
                    'OTP Expired'
                  ) : (
                    <>
                      Verify OTP
                      <FaKey className="text-sm" />
                    </>
                  )}
                </motion.button>

                {/* Resend OTP */}
                <motion.div variants={itemVariants} className="text-center">
                  <motion.button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading || timeLeft > 240} // Prevent resend within 1 minute
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors ${
                      (isLoading || timeLeft > 240) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FaRedo className="text-xs" />
                    {timeLeft > 240 ? `Resend available in ${formatTime(timeLeft - 240)}` : 'Resend OTP'}
                  </motion.button>
                </motion.div>

                {/* Back to Email Input */}
                <motion.div variants={itemVariants} className="text-center">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setIsEmailSent(false);
                      setIsExpired(false);
                      setTimeLeft(300);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                  >
                    <FaArrowLeft className="text-xs" />
                    Change Email
                  </motion.button>
                </motion.div>
              </form>
            )}

            {/* Common Footer Links */}
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
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;