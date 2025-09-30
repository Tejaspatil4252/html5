import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure footer only animates after component is fully loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-red-500 text-2xl font-bold">RapportSoft</h2>
            <p className="text-red-100 leading-relaxed">
              Software solutions for a small planet. We provide innovative hosting 
              and development services to help your business thrive.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter className="text-lg" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook className="text-lg" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="text-lg" />
              </motion.a>
            </div>
          </motion.div>

          {/* Useful Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold">Useful Links</h3>
            <ul className="space-y-2">
              {['Servers', 'Windows Hosting', 'Cloud Hosting', 'OS Servers', 'Linux Servers', 'Policy'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-red-100 hover:text-white transition-colors duration-300 block py-1"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigational */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold">Navigational</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Domain', path: '/domain' },
                { name: 'Hosting', path: '/hosting' },
                { name: 'About', path: '/about' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <motion.div
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      className="text-red-100 hover:text-white transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold">Office</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-white text-lg mt-1" />
                <p className="text-red-100">123 Tech Street, Digital City, CA 94000</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-white text-lg" />
                <a href="tel:+15551234567" className="text-red-100 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-white text-lg" />
                <a href="mailto:hello@rapportsoft.com" className="text-red-100 hover:text-white transition-colors">
                  hello@rapportsoft.com
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-red-500 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-red-100">
            Copyright &copy; {new Date().getFullYear()} All rights reserved | 
            <span className="text-red-600 font-semibold"> RapportSoft</span> - Software Solution for Small Planet
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;