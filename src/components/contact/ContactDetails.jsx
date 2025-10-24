import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding, FaUserTie } from 'react-icons/fa';

const ContactDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Address Section */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
            <FaMapMarkerAlt className="text-lg" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Our Offices</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FaBuilding className="text-red-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Head Office</p>
              <p className="text-gray-700 text-xs leading-relaxed">
                Rapportsoft Consulting & Technology Pvt Ltd,<br />
                Office No-321, XION, Hinjawadi, Pune,<br />
                Maharashtra-411057
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FaBuilding className="text-red-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Branch Office</p>
              <p className="text-gray-700 text-xs leading-relaxed">
                Akansha Plaza, Talegaon Pune,<br />
                India - 410 507
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FaBuilding className="text-red-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Development Center</p>
              <p className="text-gray-700 text-xs leading-relaxed">
                Shree Heritage A 501, Sangam Nagar,<br />
                Sangavi, Pune, India - 411 027
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
            <FaEnvelope className="text-lg" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-900 text-sm mb-2">General Inquiries</p>
            <div className="space-y-1">
              <motion.a
                href="mailto:corp@rapportsoft.co.in"
                whileHover={{ x: 5 }}
                className="text-red-600 hover:text-red-700 transition-colors duration-300 block text-sm"
              >
                corp@rapportsoft.co.in
              </motion.a>

            </div>
          </div>
          
          <div className="pt-3 border-t border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <FaUserTie className="text-red-600 text-sm" />
              <p className="font-semibold text-gray-900 text-sm">Careers</p>
            </div>
            <motion.a
              href="mailto:hr@rapportsoft.co.in"
              whileHover={{ x: 5 }}
              className="text-red-600 hover:text-red-700 transition-colors duration-300 block text-sm font-medium"
            >
              hr@rapportsoft.co.in
            </motion.a>
            <p className="text-gray-600 text-xs mt-1">For Resume submissions</p>
          </div>
        </div>
      </div>

      {/* Phone Section */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
            <FaPhone className="text-lg" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-900 text-sm mb-2">Mobile Numbers</p>
            <div className="space-y-1">
              <motion.a
                href="tel:8329469330"
                whileHover={{ x: 5 }}
                className="text-red-600 hover:text-red-700 transition-colors duration-300 block text-sm font-semibold"
              >
                +91 8329469330
              </motion.a>
              <motion.a
                href="tel:9011075932"
                whileHover={{ x: 5 }}
                className="text-red-600 hover:text-red-700 transition-colors duration-300 block text-sm font-semibold"
              >
                +91 9011075932
              </motion.a>
            </div>
          </div>
          
          <div className="pt-3 border-t border-red-200">
            <p className="font-semibold text-gray-900 text-sm mb-2">Landline</p>
            <motion.a
              href="tel:+02027286070"
              whileHover={{ x: 5 }}
              className="text-red-600 hover:text-red-700 transition-colors duration-300 block text-sm font-semibold"
            >
              +020-27286070
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetails;