import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ContactMap = () => {
  const officeLocations = [
    {
      id: 1,
      name: "XION Mall Office",
      address: "Rapportsoft Consulting & Technology, XION, Hinjawadi, Pune, Maharashtra-411057",
      mapUrl: "https://maps.app.goo.gl/PuYsj7eUXQfjgt9XA",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58142.02755570767!2d73.74493!3d18.592276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbdefd1552e7%3A0xa3c0fbc9570da5ae!2sXion%20Mall!5e1!3m2!1sen!2sin!4v1759925098210!5m2!1sen!2sin",
      coordinates: "Hinjawadi, Pune"
    },
    {
      id: 2,
      name: "Talegaon Office", 
      address: "Rapportsoft Consulting & Technology, Akansha Plaza, Talegaon Pune, India - 410 507",
      mapUrl: "https://maps.app.goo.gl/EfaBtoxsfmm86JWR8",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14523.096364554776!2d73.671422!3d18.737158!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b1f3e237718d%3A0x35cae0bf6516babd!2sRapportsoft%20Consulting%20%26%20Technology!5e1!3m2!1sen!2sin!4v1759925185054!5m2!1sen!2sin",
      coordinates: "Talegaon, Pune"
    }
  ];

  const handleMapClick = (mapUrl) => {
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Office <span className="text-red-600">Locations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visit us at any of our locations across Pune
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {officeLocations.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden"
            >
              {/* Google Maps Embed */}
              <div className="relative bg-white h-64 overflow-hidden">
                <motion.iframe
                  src={office.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => handleMapClick(office.mapUrl)}
                  title={`Google Maps - ${office.name}`}
                />
              </div>

              {/* Office Details */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-red-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{office.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {office.address}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMapClick(office.mapUrl)}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FaExternalLinkAlt className="text-sm" />
                  Open in Google Maps
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMap;