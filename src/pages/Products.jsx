// src/pages/Products.jsx
import React from 'react'
import { useState, useEffect } from 'react';
import Navigation from '../components/header/Navigation'
import Footer from '../components/footer/Footer'
import ProductSidebar from '../components/product/ProductSidebar'
import ProductDetail from '../components/product/ProductDetail';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Custom handler with scroll functionality
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Scroll when product is selected via direct access
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [selectedProduct]);
  
  return (
    <>
      <Navigation/>
      
      {/* Main Content Area */}
      <main className="bg-gradient-to-br from-gray-50 to-red-50/20">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar */}
            <div className="w-full lg:w-88 flex-shrink-0">
              <div className="sticky top-8">
                <ProductSidebar 
                  selectedProduct={selectedProduct}
                  onProductSelect={handleProductSelect}
                />
              </div>
            </div>
            
            {/* Product Details - RESTORED BEAUTIFUL DESIGN */}
            <div className="flex-1 w-full min-w-0">
              {selectedProduct ? (
                <ProductDetail product={selectedProduct} />
              ) : ( 
                <div className="bg-gradient-to-r from-red-600 via-red-800 to-black rounded-2xl shadow-2xl border border-red-900 p-16">
                  <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                      <div className="w-28 h-28 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
                        <span className="text-4xl text-white">🌟</span>
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-6">
                        One Platform, <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Infinite Possibilities</span>
                      </h2>
                      <p className="text-red-100 text-xl leading-relaxed max-w-2xl mx-auto">
                        Transform your operations with solutions that adapt to your unique needs 
                      </p>
                    </div>
                    
                    {/* Universal Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          icon: '🚀',
                          title: 'Lightning Fast Deployment',
                          description: 'Get up and running in hours, not weeks',
                          gradient: 'from-red-500 to-orange-500'
                        },
                        {
                          icon: '🔒',
                          title: 'Enterprise-Grade Security',
                          description: 'Your data is protected with top-tier encryption',
                          gradient: 'from-red-600 to-purple-600'
                        },
                        {
                          icon: '📊',
                          title: 'Smart Analytics',
                          description: 'Make data-driven decisions with real-time insights',
                          gradient: 'from-orange-500 to-red-700'
                        },
                        {
                          icon: '🌐',
                          title: 'Seamless Integration',
                          description: 'Works perfectly with your existing systems',
                          gradient: 'from-red-700 to-black'
                        },
                        {
                          icon: '💡',
                          title: 'Intuitive Design',
                          description: 'So simple, anyone can use it effectively',
                          gradient: 'from-red-800 to-gray-900'
                        },
                        {
                          icon: '⚡',
                          title: 'Always Evolving',
                          description: 'Regular updates with cutting-edge features',
                          gradient: 'from-yellow-500 to-red-600'
                        }
                      ].map((feature, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105 backdrop-blur-sm"
                        >
                          <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-2xl">{feature.icon}</span>
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-200 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-red-100 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Universal Appeal Section */}
                    <div className="text-center mt-12 pt-8 border-t border-white/10">
                      <h3 className="text-white text-2xl font-bold mb-4">
                        Trusted By Organizations Worldwide
                      </h3>
                    
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer/>
    </>
  )
}

export default Products;;