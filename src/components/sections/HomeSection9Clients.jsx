// src/components/home/HomeSection9Clients.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import partner logos
import partner1 from '../../assets/images/partner-1.png';
import partner2 from '../../assets/images/partner-2.png';
import partner3 from '../../assets/images/partner-3.png';
import partner4 from '../../assets/images/partner-4.png';
import partner5 from '../../assets/images/partner-5.png';

const HomeSection9Clients = () => {
  const [showAll, setShowAll] = useState(false);

  const clients = [
    { id: 1, logo: partner1, name: "Microsoft", alt: "Microsoft" },
    { id: 2, logo: partner2, name: "Google", alt: "Google" },
    { id: 3, logo: partner3, name: "Amazon", alt: "Amazon" },
    { id: 4, logo: partner4, name: "IBM", alt: "IBM" },
    { id: 5, logo: partner5, name: "Oracle", alt: "Oracle" },
    { id: 6, logo: partner1, name: "Tesla", alt: "Tesla" },
    { id: 7, logo: partner2, name: "Netflix", alt: "Netflix" },
    { id: 8, logo: partner3, name: "Spotify", alt: "Spotify" },
    { id: 9, logo: partner4, name: "Adobe", alt: "Adobe" },
    { id: 10, logo: partner5, name: "Salesforce", alt: "Salesforce" }
  ];

  const visibleClients = showAll ? clients : clients.slice(0, 5);

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
            Our Clients
          </motion.h2>
          <motion.p 
            className="text-gray-700 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Any organization needs a strong solid foundation of their business process implementations for it to sustain in the industry and increase ROI.
          </motion.p>

          {/* Animated Underline */}
          <motion.div
            className="w-24 h-1 bg-red-600 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Client Logos Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {visibleClients.map((client, index) => (
            <motion.div
              key={client.id}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="partner block p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <motion.img 
                  src={client.logo} 
                  className="w-full h-auto max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  alt={client.alt}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.p 
                  className="text-center text-gray-600 text-sm mt-3 font-medium group-hover:text-red-600 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  {client.name}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 border-2 border-red-600 hover:border-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? 'View Less' : 'View All Clients'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection9Clients;