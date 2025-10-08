import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRocket, FaChartLine, FaShip, FaBox, FaGlobeAmericas, FaAward } from 'react-icons/fa';
import {Link} from 'react-router-dom';

const ClientHeader = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"></div>
        
        {/* Shipping/Logistics Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge - Logistics Focused */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              <FaShip className="text-red-600" />
              Trusted Shipping Solutions Since 2005
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Our{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Logistics Partners
              </span>
            </motion.h1>

            {/* Description - Industry Specific */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              Any logistics organization needs a strong digital foundation for their shipping processes to sustain in the industry and{' '}
              <span className="font-semibold text-red-600">increase operational ROI</span>.
            </motion.p>

            {/* Stats - Clean & Professional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-6"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">40+</div>
                <div className="text-sm text-gray-500 mt-1">Logistics Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">18+</div>
                <div className="text-sm text-gray-500 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">95%</div>
                <div className="text-sm text-gray-500 mt-1">Client Retention</div>
              </div>
            </motion.div>

            {/* Single CTA Button */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.9 }}
  className="pt-6"
>
  <Link to="/contact"> {/* LINK WRAPS THE BUTTON */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center gap-3 text-lg"
    >
      <FaRocket />
      Optimize Your Logistics
    </motion.button>
  </Link>
</motion.div>
          </motion.div>

          {/* Right Side - Clean & Professional */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-red-100 p-8">
              {/* Header with Single Trust Badge */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaAward className="text-3xl text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Certified Solutions</h3>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <FaAward className="text-green-600 text-xs" />
                  D.G. Shipping Approved VGM Vendor
                </div>
              </div>

              {/* Features Grid - Logistics Benefits */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-50 rounded-xl p-4 text-center"
                >
                  <FaChartLine className="text-red-600 text-xl mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">Cost Reduction</div>
                  <div className="text-xs text-red-600">Up to 35%</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-50 rounded-xl p-4 text-center"
                >
                  <FaBox className="text-red-600 text-xl mx-auto mb-2" />
                  <div className="text-sm font-semibold text-gray-900">Process Speed</div>
                  <div className="text-xs text-red-600">60% Faster</div>
                </motion.div>
              </div>

              {/* Industry Specializations */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-center mb-3">Shipping Solutions</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['VGM Compliance', 'Cargo Management', 'SCM Software', 'Shipping ERP', 'Logistics Tech', 'Custom Solutions'].map((specialty, index) => (
                    <motion.span
                      key={specialty}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Trust Note - Single Mention */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Trusted by logistics companies across India since 2005
                </p>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full"
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-3 -right-3 w-6 h-6 bg-red-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;