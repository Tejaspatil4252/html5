import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendar, FaUser, FaShare } from 'react-icons/fa';

const NewsContent = ({ 
  title, 
  content, 
  author, 
  publishDate, 
  category = "News" 
}) => {
  const [copied, setCopied] = useState(false);

  // Share function
  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Check out: ${title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

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

  // 🎨 PERFECT CONTENT RENDERING WITH BEAUTIFUL IMAGES
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-gray-700 leading-relaxed mb-6 text-lg"
          >
            {block.text}
          </motion.p>
        );
      case 'heading':
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-red-500 pl-4"
          >
            {block.text}
          </motion.h2>
        );
      case 'image':
        // Only show image if URL exists
        if (!block.url) return null;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-8"
          >
            {/* 🖼️ PERFECT IMAGE CONTAINER */}
            <div className="bg-gradient-to-br from-red-50 to-white p-4 rounded-2xl shadow-lg border border-red-100">
              <div className="flex justify-center">
                <img
                  src={block.url}
                  alt={block.alt || "News image"}
                  className="rounded-xl shadow-md max-w-full h-auto max-h-80 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* 📝 CAPTION */}
              {block.caption && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-600 text-sm mt-3 text-center font-medium bg-white py-2 px-4 rounded-lg border border-red-100"
                >
                  {block.caption}
                </motion.p>
              )}
            </div>
          </motion.div>
        );
      case 'list':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-6"
          >
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <ul className="space-y-3 text-gray-700">
                {block.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      case 'quote':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-8"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-2xl">❝</div>
                <blockquote className="text-lg italic leading-relaxed">
                  "{block.text}"
                </blockquote>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-red-100 hover:shadow-2xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <FaNewspaper className="text-2xl text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">{title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            {author && (
              <span className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                <FaUser className="text-red-500" />
                <span className="font-medium">{author}</span>
              </span>
            )}
            {publishDate && (
              <span className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                <FaCalendar className="text-red-500" />
                <span className="font-medium">{formatDate(publishDate)}</span>
              </span>
            )}
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {Array.isArray(content) && content.length > 0 ? (
          content.map((block, index) => renderContentBlock(block, index))
        ) : (
          <p className="text-gray-500 italic text-center py-8">Content loading...</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-red-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md"
        >
          <FaShare />
          {copied ? 'Copied!' : 'Share this News'}
        </motion.button>
        <span className="text-gray-500 text-sm font-medium">
          Rapptorsoft News
        </span>
      </div>
    </motion.div>
  );
};

export default NewsContent;