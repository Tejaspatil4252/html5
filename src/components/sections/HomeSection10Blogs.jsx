// src/components/home/HomeSection10Blog.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaComment } from 'react-icons/fa';

// Import blog images
import image1 from '../../assets/images/image_1.jpg';
import image2 from '../../assets/images/image_2.jpg';
import image3 from '../../assets/images/image_3.jpg';

const HomeSection10Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      image: image1,
      date: "Sep. 20, 2018",
      author: "Admin",
      comments: 3,
      title: "Even the all-powerful Pointing has no control about the blind texts",
      delay: 0
    },
    {
      id: 2,
      image: image2,
      date: "Sep. 20, 2018",
      author: "Admin",
      comments: 3,
      title: "Even the all-powerful Pointing has no control about the blind texts",
      delay: 100
    },
    {
      id: 3,
      image: image3,
      date: "Sep. 20, 2018",
      author: "Admin",
      comments: 3,
      title: "Even the all-powerful Pointing has no control about the blind texts",
      delay: 200
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-red-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Recent Blog
          </motion.h2>
          <motion.p 
            className="text-black text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in
          </motion.p>
        </motion.div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="blog-entry group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: post.delay / 1000 }}
              whileHover={{ y: -5 }}
            >
              {/* Blog Image */}
              <motion.a 
                href="blog-single.html" 
                className="block-20 block h-64 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundImage: `url(${post.image})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Blog Content */}
              <div className="text d-flex py-6">
                <div className="meta mb-4 flex items-center space-x-4 text-sm text-gray-600">
                  <div>
                    <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                      {post.date}
                    </a>
                  </div>
                  <div>
                    <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                      {post.author}
                    </a>
                  </div>
                  <div className="flex items-center space-x-1">
                    <a href="#" className="text-red-600 hover:text-red-700 transition-colors flex items-center">
                      <FaComment className="mr-1" />
                      <span>{post.comments}</span>
                    </a>
                  </div>
                </div>
                <div className="desc">
                  <h3 className="heading text-lg font-bold text-black hover:text-red-600 transition-colors">
                    <a href="#">
                      {post.title}
                    </a>
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection10Blogs;