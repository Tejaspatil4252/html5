import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ADD THIS IMPORT
import productsData from '../../data/ProductsData';

const Footer = ({ onProductSelect }) => {
  const navigate = useNavigate(); // ADD THIS HOOK
  console.log('🔵 Footer.jsx - Imported products:', productsData);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const visibleProducts = isProductsExpanded ? productsData : productsData.slice(0, 9);

  const handleProductClick = (product) => {
    // NAVIGATE TO PRODUCTS PAGE WITH THE SELECTED PRODUCT
    navigate('/products', { state: { selectedProduct: product } });
    
    // Also call onProductSelect if we're already on products page
    if (onProductSelect) {
      onProductSelect(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


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
            <h2 className="text-red-600 text-2xl font-bold">RapptorSoft</h2>
            <p className="text-red-100 leading-relaxed">
              Rapportsoft Consulting & Technology is one of the India's largest Shipping software products company providing innovative and integrated enterprise solutions ensuring customer satisfaction.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-500 transition-colors duration-300 group"
              whileHover={{ x: 5 }}
            >
              Read More
              <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <div className="flex space-x-4 pt-2">
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

          {/* Services */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              {[
                "Software Development",
                "Testing & QA",
                "Application Services",
                "IT Consulting",
                "Data Analytics",
                "Infrastructure Services (Hardware)",
                "Help Desk Services",
                "Privacy Policy",
                "Terms & Conditions"
              ].map((service) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    className="text-red-100 hover:text-white transition-colors duration-300 block py-1"
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Products */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Our Products</h3>
              <motion.button
                onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                className="text-red-500 hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronDown className={`transform transition-transform duration-300 ${isProductsExpanded ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
            
            <ul className="space-y-2">
              <AnimatePresence>
                {visibleProducts.map((product) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => handleProductClick(product)}
                      className="text-red-100 hover:text-white transition-colors duration-300 block py-1 text-left w-full"
                      whileHover={{ x: 5 }}
                    >
                      {product.name}
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

{productsData.length > 9 && (
  <motion.button
    onClick={() => setIsProductsExpanded(!isProductsExpanded)}
    className="text-red-500 hover:text-red-400 text-sm font-semibold flex items-center gap-1 mt-2"
    whileHover={{ x: 5 }}
  >
    {isProductsExpanded ? 'Show Less' : `+${productsData.length - 9} More`}
    <FaChevronDown className={`text-xs transform transition-transform duration-300 ${isProductsExpanded ? 'rotate-180' : ''}`} />
  </motion.button>
)}
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white">Contacts</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg mt-1 flex-shrink-0" />
                  <div className="text-red-100 text-sm">
                    <p className="font-semibold text-white mb-1">Office Address:</p>
                    <p>Rapportsoft Consulting & Technology Pvt Ltd,</p>
                    <p>Office No-321, XION, Hinjawadi, Pune,</p>
                    <p>Maharashtra-411057</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg mt-1 flex-shrink-0" />
                  <p className="text-red-100 text-sm">Akansha Plaza, Talegaon Pune, India - 410 507</p>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg mt-1 flex-shrink-0" />
                  <p className="text-red-100 text-sm">Shree Heritage A 501, Sangam Nagar, Sangavi, Pune, India - 411 027</p>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-red-500 text-lg flex-shrink-0" />
                  <a href="mailto:corp@rapportsoft.co.in" className="text-red-100 hover:text-white transition-colors text-sm">
                    corp@rapportsoft.co.in
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-red-500 text-lg flex-shrink-0" />
                  <div className="text-red-100 text-sm">
                    <a href="tel:8329469330" className="hover:text-white transition-colors block">8329469330</a>
                    <a href="tel:9011075932" className="hover:text-white transition-colors block">9011075932</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-red-600 pt-8 text-center"
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