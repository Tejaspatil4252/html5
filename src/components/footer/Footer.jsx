import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/ProductsData';
import servicesData from '../../data/ServicesData'; 
import logo from '../../assets/rapptorsoftLOGO/rapportlogo1.png';
import bg from '../../assets/footerIMG/footerBG.jpg';
import  {Link}  from 'react-router-dom';

const Footer = ({ onProductSelect, onServiceSelect }) => { 
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show only 5 items when collapsed, all when expanded
  const visibleProducts = isProductsExpanded ? productsData : productsData.slice(0, 5);
  const visibleServices = isServicesExpanded ? servicesData : servicesData.slice(0, 5);

  const handleProductClick = (product) => {
    navigate('/products', { state: { selectedProduct: product } });
    if (onProductSelect) {
      onProductSelect(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleServiceClick = (service) => {
    navigate('/services', { state: { selectedService: service } });
    if (onServiceSelect) {
      onServiceSelect(service);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-[1px]" />
      
      {/* Animated Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-60 h-60 bg-red-600/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Content - FIXED CONTAINER PADDING */}
      <div className="relative z-10 py-12">
        {/* Changed from container mx-auto to explicit padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Enhanced container padding */}
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            
            {/* Company Info */}
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-4 mb-5"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={logo} 
                  alt="RapptorSoft" 
                  className="h-16 w-auto"
                />
              </motion.div>
              
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                Pioneering shipping software solutions that transform businesses and drive digital innovation across India's logistics landscape.
              </p>

              <div className="flex space-x-3 pt-4">
                {[
                  { icon: FaFacebook, href: "#" },
                  { icon: FaInstagram, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 text-white hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services - Limited to 5 */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">
                  Our Services
                </h3>
                <motion.button
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className="text-red-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronDown className={`text-base transform transition-transform duration-300 ${isServicesExpanded ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
              <div className="space-y-2">
                <AnimatePresence>
                  {visibleServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <motion.button
                        onClick={() => handleServiceClick(service)}
                        onMouseEnter={() => setHoveredItem(`service-${service.id}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="text-gray-300 hover:text-white transition-all duration-300 text-left p-2 rounded-xl hover:bg-white/5 w-full group border border-transparent hover:border-white/10"
                        whileHover={{ x: 6 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ 
                              scale: hoveredItem === `service-${service.id}` ? 1.4 : 1,
                              color: hoveredItem === `service-${service.id}` ? '#ef4444' : '#6b7280'
                            }}
                            className="text-base font-bold transition-colors duration-300"
                          >
                            →
                          </motion.div>
                          <span className="text-base group-hover:font-semibold transition-all duration-300">
                            {service.title}
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {servicesData.length > 5 && (
                <motion.button
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className="text-red-400 hover:text-white text-base font-semibold flex items-center gap-2 mt-3 p-2 rounded-xl hover:bg-white/5 w-full border border-transparent hover:border-white/10"
                  whileHover={{ x: 4 }}
                >
                  <FaChevronDown className={`text-xs transform transition-transform duration-300 ${isServicesExpanded ? 'rotate-180' : ''}`} />
                  {isServicesExpanded ? 'Show Less' : `Explore All ${servicesData.length} Services`}
                </motion.button>
              )}
            </motion.div>

            {/* Our Products - Limited to 5 */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">
                  Our Products
                </h3>
                <motion.button
                  onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                  className="text-red-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronDown className={`text-base transform transition-transform duration-300 ${isProductsExpanded ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
              
              <div className="space-y-1">
                <AnimatePresence>
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <motion.button
                        onClick={() => handleProductClick(product)}
                        onMouseEnter={() => setHoveredItem(`product-${product.id}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="text-gray-300 hover:text-white transition-all duration-300 text-left p-2 rounded-xl hover:bg-white/5 w-full group border border-transparent hover:border-white/10"
                        whileHover={{ x: 6 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ 
                              scale: hoveredItem === `product-${product.id}` ? 1.4 : 1,
                              color: hoveredItem === `product-${product.id}` ? '#ef4444' : '#6b7280'
                            }}
                            className="text-base font-bold transition-colors duration-300"
                          >
                            •
                          </motion.div>
                          <span className="text-base group-hover:font-semibold transition-all duration-300 truncate">
                            {product.name}
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {productsData.length > 5 && (
                <motion.button
                  onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                  className="text-red-400 hover:text-white text-base font-semibold flex items-center gap-2 mt-3 p-2 rounded-xl hover:bg-white/5 w-full border border-transparent hover:border-white/10"
                  whileHover={{ x: 4 }}
                >
                  <FaChevronDown className={`text-xs transform transition-transform duration-300 ${isProductsExpanded ? 'rotate-180' : ''}`} />
                  {isProductsExpanded ? 'Show Less' : `Explore All ${productsData.length} Products`}
                </motion.button>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-4">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      title: "Corporate Headquarters",
                      address: "Office No-321, XION, Hinjawadi, Pune, Maharashtra-411057",
                      icon: FaMapMarkerAlt
                    },
                    {
                      title: "Branch Office", 
                      address: "Akansha Plaza, Talegaon Pune, India - 410 507",
                      icon: FaMapMarkerAlt
                    },
                    {
                      title: "Innovation Center",
                      address: "Shree Heritage A 501, Sangam Nagar, Sangavi, Pune, India - 411 027",
                      icon: FaMapMarkerAlt
                    }
                  ].map((office, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-9 h-9 bg-red-600/20 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300 mt-0.5">
                        <office.icon className="text-red-400 text-sm group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold mb-1">{office.title}</p>
                        <p className="text-gray-300 text-xs leading-relaxed">{office.address}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-1">
                  <motion.a 
                    href="mailto:corp@rapportsoft.co.in"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-9 h-9 bg-red-600/20 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      <FaEnvelope className="text-red-400 text-sm group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium">corp@rapportsoft.co.in</span>
                  </motion.a>
                  
                  <div className="flex items-center gap-3 text-gray-300 p-2 rounded-xl border border-white/5">
                    <div className="w-9 h-9 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-red-400 text-sm" />
                    </div>
                    <div className="text-sm">
                      <a href="tel:8329469330" className="hover:text-white transition-colors block font-medium">+91 8329469330</a>
                      <a href="tel:9011075932" className="hover:text-white transition-colors block font-medium">+91 9011075932</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="border-t border-white/20 pt-6 pb-4"
            initial={{ opacity: 0 }}npm 
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-base text-center lg:text-left font-light">
                © {new Date().getFullYear()} <span className="text-white font-semibold">Rapportsoft Technologies</span>. 
                All rights reserved. Crafting the future of shipping technology.
              </p>
              
<div className="flex items-center gap-6 text-base text-gray-400">
  {[
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms-and-conditions' }
    
  ].map((item, index) => (
    <motion.div key={index} whileHover={{ y: -1 }}>
      <Link 
        to={item.path}
        className="hover:text-white transition-colors font-light"
      >
        {item.label}
      </Link>
    </motion.div>
  ))}
</div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;