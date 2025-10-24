import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaQuoteLeft, FaPlay, FaImages } from 'react-icons/fa';

const BlogContent = ({ content = [] }) => {
  
  // Enhanced content blocks for blog
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
            id={`heading-${index}`}
            className="text-3xl font-bold text-gray-900 mt-12 mb-6 pb-2 border-b-2 border-red-100"
          >
            {block.text}
          </motion.h2>
        );

      case 'image':
        if (!block.url) return null;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-12"
          >
            <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-lg border border-red-100">
              <div className="flex justify-center">
                <img
                  src={block.url}
                  alt={block.alt || "Blog image"}
                  className="rounded-xl shadow-md max-w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {block.caption && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-600 text-sm mt-4 text-center font-medium bg-white py-2 px-4 rounded-lg border border-red-100"
                >
                  {block.caption}
                </motion.p>
              )}
            </div>
          </motion.div>
        );

      case 'code':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-8 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center bg-gray-800 px-4 py-3">
                <div className="flex items-center gap-2">
                  <FaCode className="text-red-400" />
                  <span className="text-gray-300 text-sm font-medium">{block.language || 'code'}</span>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(block.code)}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
              <pre className="p-6 overflow-x-auto text-gray-100 text-sm leading-relaxed">
                <code>{block.code}</code>
              </pre>
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
            className="my-12"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl shadow-lg relative">
              <FaQuoteLeft className="text-red-200 text-3xl mb-4" />
              <blockquote className="text-xl italic leading-relaxed">
                "{block.text}"
              </blockquote>
              {block.author && (
                <div className="mt-4 text-red-200 font-medium">
                  — {block.author}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'video':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-12"
          >
            <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-lg border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <FaPlay className="text-red-500 text-xl" />
                <h3 className="text-lg font-bold text-gray-900">Video Tutorial</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <iframe
                  src={block.url}
                  className="w-full h-64 md:h-96"
                  allowFullScreen
                  title="Blog video"
                />
              </div>
              {block.caption && (
                <p className="text-gray-600 text-sm mt-4 text-center">
                  {block.caption}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 'gallery':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-12"
          >
            <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-lg border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <FaImages className="text-red-500 text-xl" />
                <h3 className="text-lg font-bold text-gray-900">Image Gallery</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {block.images?.map((image, imgIndex) => (
                  <div key={imgIndex} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image.url}
                      alt={image.alt || "Gallery image"}
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
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
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="prose prose-lg max-w-none">
        {Array.isArray(content) && content.length > 0 ? (
          content.map((block, index) => renderContentBlock(block, index))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Content coming soon...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogContent;