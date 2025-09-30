// src/App.jsx - UPDATED WITH LOADING
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogSingle from './pages/BlogSingle'
import Domain from './pages/Domain'
import Hosting from './pages/Hosting'
import PageLoader from './components/PageLoader'
import './index.css'

// Navigation-aware component
function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Show loader when route changes
  useEffect(() => {
    setLoading(true);
    
    // Hide loader after a short delay (simulate loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 0.8 seconds - adjust as needed

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger when path changes

  return (
    <>
      {/* Show loader when loading */}
      {loading && <PageLoader />}
      
      {/* Page content */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/hosting" element={<Hosting />} />
      </Routes>
    </>
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