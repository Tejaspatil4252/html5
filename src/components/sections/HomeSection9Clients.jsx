// src/components/home/HomeSection9Clients.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Import partner logos
import partner1 from '../../assets/images/partner-1.png';
import partner2 from '../../assets/images/partner-2.png';
import partner3 from '../../assets/images/partner-3.png';
import partner4 from '../../assets/images/partner-4.png';
import partner5 from '../../assets/images/partner-5.png';

const HomeSection9Clients = () => {
  const partners = [
    { id: 1, logo: partner1, alt: "Partner 1" },
    { id: 2, logo: partner2, alt: "Partner 2" },
    { id: 3, logo: partner3, alt: "Partner 3" },
    { id: 4, logo: partner4, alt: "Partner 4" },
    { id: 5, logo: partner5, alt: "Partner 5" }
  ];

  return (
    <section className="bg-gray-600 py-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-red-500 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Clients
          </motion.h2>
          <motion.p 
            className="text-red-100 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in
          </motion.p>
        </motion.div>

        {/* Partner Logos */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
            >
              <a href="#" className="partner block p-4">
                <motion.img 
                  src={partner.logo} 
                  className="w-full h-auto max-h-16 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                  alt={partner.alt}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection9Clients;