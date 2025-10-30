// src/App.jsx - UPDATED: Added sign-out loader
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Clients from './pages/Clients'
import BlogSingle from './pages/News'
import Products from './pages/Products'
import Services from './pages/Services'
import Career from './pages/Career'
import PageLoader from './components/PageLoader'
import ScrollToTop from './components/ScrollToTop'
import News from './pages/News'
import Blogs from './pages/Blogs'
import Pricing from './pages/Pricing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Navigation from './components/header/Navigation'
import './index.css'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningOut, setIsSigningOut] = useState(false) // 🆕 Added sign-out state
  const [user, setUser] = useState(null)
  const location = useLocation()

  // 🎯 Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
    };

    checkAuthStatus();
  }, []);

  // 🎯 Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // 🎯 Show loader on route change
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // 🆕 Handle user sign out with loader
  const handleSignOut = () => {
    setIsSigningOut(true); // Show loader
    
    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
      setIsSigningOut(false); // Hide loader
      
      // If we're not on the home page, redirect to home
      if (location.pathname !== '/') {
        window.location.href = '/';
      }
    }, 1000); // Same duration as your page loader
  }

  // 🎯 Check if current route is auth page (login/register)
  const isAuthPage = () => {
    return location.pathname === '/login' || location.pathname === '/registration';
  }

  // 🎯 CRITICAL: Return ONLY loader during loading - NO CONTENT
  if (isLoading || isSigningOut) { // 🆕 Added isSigningOut condition
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <PageLoader />
      </motion.div>
    )
  }

  // 🎯 ONLY render content when NOT loading
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🚨 Conditionally render Navigation - EXCLUDE from auth pages */}
      {!isAuthPage() && <Navigation user={user} onSignOut={handleSignOut} />}
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/news" element={<News />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/registration" element={<Registration />} />
        {/* Pass setUser to Login */}
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
      <ScrollToTop />
    </motion.div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App