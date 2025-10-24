import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaClock, FaBookmark } from 'react-icons/fa';

const BlogHero = ({ 
  title = "Blog Post Title",
  author = "Author Name", 
  publishDate = "2024-01-20",
  readTime = "5",
  category = "Technology",
  featuredImage = null,
  onStartReading, // Add click handlers
  onShareArticle
}) => {
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "";
    }
  };

  const handleStartReading = () => {
    // Scroll to content
    document.getElementById('blog-content')?.scrollIntoView({ behavior: 'smooth' });
    onStartReading?.();
  };

  const handleShare = () => {
    onShareArticle?.();
    // Default share behavior
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out: ${title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="relative min-h-[70vh] md:min-h-[60vh] bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white overflow-hidden">
      
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-3xl"
        >
          {"</>"}
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-10 text-2xl"
        >
          {"{}"}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 md:py-16 flex items-center min-h-[70vh] md:min-h-[60vh]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30"
          >
            <FaBookmark className="text-red-200" />
            <span className="font-semibold text-red-100">{category}</span>
          </motion.div>

          {/* Main Title - Better Sizing */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight px-4"
          >
            {title}
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-4 text-base md:text-lg text-red-100 mb-8"
          >
            {/* Author */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <FaUser className="text-red-200" />
              <span className="font-medium">{author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <FaCalendar className="text-red-200" />
              <span className="font-medium">{formatDate(publishDate)}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <FaClock className="text-red-200" />
              <span className="font-medium">{readTime} min read</span>
            </div>
          </motion.div>

          {/* CTA Buttons - Now Functional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartReading}
              className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Reading
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-base md:text-lg backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Share Article
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-800">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default BlogHero;