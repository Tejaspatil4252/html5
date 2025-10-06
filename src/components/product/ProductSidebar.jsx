
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductTitle from './ProductTitle';
import productsData from '../../data/ProductsData';

const ProductSidebar = ({ 
  selectedProduct, 
  onProductSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // SEARCH FUNCTIONALITY
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return productsData;
    
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.highlights?.some(highlight => 
        highlight.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="w-full lg:w-88 bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-lg border border-red-100 flex flex-col h-fit max-h-[85vh] sticky top-4"> {/* Changed to h-fit and sticky */}
      
      {/* HEADER -  Search */}
      <motion.div
        className="p-6 pb-4 border-b border-red-200/60 flex-shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">📦</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Our Products
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Comprehensive solutions
            </p>
          </div>
        </div>
        
        {/* WORKING SEARCH BAR */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2 }}
  className="relative mb-8" // Added margin-bottom to create space
>
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search products..."
    className="w-full px-4 py-2.5 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-300 text-gray-700 placeholder-gray-400 text-sm"
  />
  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
    {searchTerm ? '🔍' : '✨'}
  </div>
  
  {/* FIXED: Search Results Count - Better positioning */}
  {searchTerm && (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center" // Added text-center and full width
    >
      {filteredProducts.length} of {productsData.length} products
    </motion.div>
  )}
</motion.div>
      </motion.div>

      {/* PRODUCTS LIST - With Search Results */}
      <div className="flex-1 overflow-y-auto px-6 py-4 min-h-[400px]">
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductTitle
                key={product.id}
                product={product}
                isActive={selectedProduct?.id === product.id}
                onClick={onProductSelect}
                index={index}
              />
            ))
          ) : (
            // NO RESULTS STATE
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-gray-600 font-medium">No products found</p>
              <p className="text-gray-500 text-sm mt-1">Try different keywords</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* FOOTER - Dynamic Count */}
 
    </div>
  );
};

export default ProductSidebar;