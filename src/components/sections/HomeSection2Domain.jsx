import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HomeSection2Domain = () => {
  const [domainName, setDomainName] = useState('');
  const [domainExtension, setDomainExtension] = useState('.com');

  const domainPrices = [
    { extension: '.com', price: '$9.75' },
    { extension: '.net', price: '$9.50' },
    { extension: '.biz', price: '$8.95' },
    { extension: '.co', price: '$7.80' },
    { extension: '.me', price: '$7.95' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${domainName}${domainExtension}`);
    // Add your domain search logic here
  };

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Content - Text */}
          <motion.div 
            className="lg:w-5/12 mb-10 lg:mb-0 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Search Your Domain Name
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A small river named Duden flows by their place
            </motion.p>
          </motion.div>

          {/* Right Content - Search Form */}
          <motion.div 
            className="lg:w-7/12 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Search Form */}
            <motion.form 
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {/* Domain Input */}
              <div className="flex-grow">
                <input
                  type="text"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  placeholder="Enter your domain name..."
                  className="w-full px-6 py-4 bg-white rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Domain Extension & Search Button */}
              <div className="flex gap-4">
                {/* Extension Select */}
                <div className="relative">
                  <select
                    value={domainExtension}
                    onChange={(e) => setDomainExtension(e.target.value)}
                    className="appearance-none px-6 py-4 bg-white rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none transition-colors duration-300 pr-12"
                  >
                    {domainPrices.map((domain) => (
                      <option key={domain.extension} value={domain.extension}>
                        {domain.extension}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-gray-500">▼</span>
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  type="submit"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search Domain
                </motion.button>
              </div>
            </motion.form>

            {/* Domain Prices */}
            <motion.div 
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {domainPrices.map((domain, index) => (
                <motion.div
                  key={domain.extension}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-gray-300 text-sm">{domain.extension}</span>
                  <span className="text-white font-bold">{domain.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection2Domain;