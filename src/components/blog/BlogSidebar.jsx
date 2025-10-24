import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaTags, FaFire, FaBookmark, FaShare, FaEnvelope } from 'react-icons/fa';

const BlogSidebar = ({ 
  author = "Author Name",
  authorBio = "Short bio about the author...",
  authorImage = null,
  categories = ["Technology", "Web Dev", "React"],
  popularPosts = [],
  tags = ["react", "javascript", "webdev"],
  onCategorySelect,
  currentPostId 
}) => {
  const [email, setEmail] = useState('');
  
  // Extract headings from content for TOC (you'll pass this from parent)
  const [headings, setHeadings] = useState([]);
  
  // Simulate popular posts - replace with real data
  const defaultPopularPosts = [
    { id: 1, title: "React Performance Tips", reads: 1243 },
    { id: 2, title: "CSS Grid Mastery", reads: 987 },
    { id: 3, title: "TypeScript Best Practices", reads: 756 }
  ];

  const popularPostsData = popularPosts.length > 0 ? popularPosts : defaultPopularPosts;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = document.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Author Bio Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            {authorImage ? (
              <img src={authorImage} alt={author} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <FaUser className="text-2xl text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{author}</h3>
            <p className="text-red-600 text-sm">Senior Developer</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {authorBio || "Passionate about web development and creating amazing user experiences."}
        </p>
      </motion.div>

      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaBookmark className="text-red-500" />
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {/* This would be dynamically generated from headings */}
          <a href="#understanding-useEffect" className="block py-2 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-sm">
            Understanding useEffect
          </a>
          <a href="#custom-hooks" className="block py-2 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-sm">
            Custom Hooks Pattern
          </a>
          <a href="#best-practices" className="block py-2 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-sm">
            Best Practices
          </a>
          <a href="#performance" className="block py-2 px-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-sm">
            Performance Tips
          </a>
        </nav>
      </motion.div>

      {/* Popular Posts */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaFire className="text-red-500" />
          Popular Posts
        </h3>
        <div className="space-y-3">
          {popularPostsData.map((post, index) => (
            <motion.a
              key={post.id}
              href={`/blog/${post.id}`}
              whileHover={{ x: 5 }}
              className="block p-3 rounded-lg border border-red-100 hover:border-red-300 hover:bg-red-50 transition-all group"
            >
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-gray-700 group-hover:text-red-600 font-medium leading-tight">
                  {post.title}
                </span>
                <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full flex-shrink-0">
                  {post.reads}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaTags className="text-red-500" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategorySelect?.(category)}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white"
      >
        <div className="text-center">
          <FaEnvelope className="text-2xl mx-auto mb-3 text-red-200" />
          <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
          <p className="text-red-100 text-sm mb-4">
            Get the latest articles directly in your inbox
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-red-600 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Social Sharing */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaShare className="text-red-500" />
          Share This Article
        </h3>
        <div className="flex gap-3">
          {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
            <motion.button
              key={platform}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare(platform.toLowerCase())}
              className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-medium text-sm hover:bg-red-200 transition-colors"
            >
              {platform}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogSidebar;