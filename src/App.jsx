// src/App.jsx - FIXED VERSION (Proper content blocking)
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogSingle from './pages/BlogSingle'
import Products from './pages/Products'
import Services from './pages/Services'
import PageLoader from './components/PageLoader'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

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

  // 🎯 CRITICAL: Return ONLY loader during loading - NO CONTENT
  if (isLoading) {
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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
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