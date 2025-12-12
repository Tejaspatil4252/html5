import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Zap, 
  CheckCircle, 
  Users, 
  Cpu, 
  Globe, 
  Cloud, 
  Lock, 
  Shield,
  Database,
  BarChart,
  Smartphone,
  FileText,
  MessageSquare,
  Settings,
  Code,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

const CFSProductDetail = ({ product }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) return null;

  // Icon mapping for highlights
  const highlightIcons = [
    <Cpu className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
    <Cloud className="w-5 h-5" />,
    <Lock className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Database className="w-5 h-5" />,
    <BarChart className="w-5 h-5" />,
    <Smartphone className="w-5 h-5" />,
    <FileText className="w-5 h-5" />,
    <MessageSquare className="w-5 h-5" />,
    <Settings className="w-5 h-5" />,
    <Code className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <Award className="w-5 h-5" />
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Rocket className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <Zap className="w-4 h-4" /> },
    { id: 'benefits', label: 'Benefits', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'support', label: 'Support', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/20 p-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating Glow Effect */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main Card */}
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-500/10 border border-red-100 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Header with Tabs */}
          <div className="border-b border-gray-100">
            <div className="p-8 pb-0">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-red-700 rounded-xl">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                    Enterprise Platform
                  </span>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-700 to-red-600 bg-clip-text text-transparent pb-2">
                  {product.name}
                </h1>
              </motion.div>
            </div>

            {/* Tab Navigation */}
<div className="px-4 md:px-6 lg:px-8 pt-6 lg:pt-8">
  <div className="flex flex-wrap gap-2 bg-gray-100/50 rounded-xl p-1 md:p-2">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center justify-center md:justify-start gap-1 md:gap-2 px-3 md:px-4 lg:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all flex-1 min-w-[calc(50%-0.25rem)] md:min-w-0 md:flex-none ${activeTab === tab.id
            ? 'bg-white shadow-md md:shadow-lg text-red-700'
            : 'text-gray-600 hover:text-gray-900'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm md:text-base">{tab.icon}</span>
        <span className="text-xs md:text-sm lg:text-base truncate">
          {tab.label}
        </span>
      </motion.button>
    ))}
  </div>
</div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Hero Section */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                          {product.subtitle || "Transform Your Operations"}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </motion.div>

                      {/* Stats */}
                      <motion.div
                        className="grid grid-cols-3 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {[
                          { label: 'Efficiency Gain', value: '65%', icon: '🚀' },
                          { label: 'Cost Reduction', value: '40%', icon: '💰' },
                          { label: 'Faster Processing', value: '3x', icon: '⚡' },
                        ].map((stat, idx) => (
                          <motion.div
                            key={stat.label}
                            className="bg-gradient-to-br from-white to-red-50 p-4 rounded-2xl border border-red-100"
                            whileHover={{ y: -5, scale: 1.05 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

  {/* Image/Visual with Animation Sequence */}
{product.image ? (
  <motion.div
    className="relative"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-xl" />
    
    <div className="relative bg-gradient-to-br from-gray-900 to-red-900 rounded-3xl p-8 h-full flex items-center justify-center overflow-hidden">
      
      {/* STEP 1: RED GRADIENT CARD WITH TEXT */}
      <AnimatePresence>
        <motion.div
          key="gradient-card"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="text-center">
            
            <h3 className="text-3xl font-bold text-white mb-3">
             
            </h3>
            <p className="text-xl text-red-200">
            
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* STEP 2: PLAIN IMAGE (NO TEXT) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute inset-0"
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, delay: 3 }}
        />
        {/* NO TEXT ELEMENTS HERE */}
      </motion.div>
    </div>
  </motion.div>
) : (
  <motion.div
    className="relative"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-xl" />
    <div className="relative bg-gradient-to-br from-gray-900 to-red-900 rounded-3xl p-8 h-full flex items-center justify-center">
      <div className="text-center">
        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          All-in-One Platform
        </h3>
        <p className="text-red-200">
          Web • Mobile • Cloud • API
        </p>
      </div>
    </div>
  </motion.div>
)}
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Core Capabilities
                      </h3>
                      <span className="text-sm text-red-600 font-semibold">
                        {product.highlights?.length || 0} Features
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.highlights?.map((highlight, index) => (
                        <motion.div
                          key={index}
                          className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-xl transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -8 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-gradient-to-br from-red-100 to-red-50 rounded-xl group-hover:from-red-200 group-hover:to-red-100 transition-all duration-300">
                              {highlightIcons[index % highlightIcons.length]}
                            </div>
                            <p className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                              {highlight}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-red-600" />
                        {product.features?.title || "Advanced Features"}
                      </h3>
                      <div className="space-y-4">
                        {product.features?.items?.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-red-50/50 hover:to-red-100/50 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        Technology Stack
                      </h4>
                      <div className="space-y-3">
                        {[
                          { tech: 'AI', color: 'bg-red-100 text-red-800' },
                          { tech: 'Spring Boot', color: 'bg-green-100 text-green-800' },
                          { tech: 'ReactJS', color: 'bg-blue-100 text-blue-800' },
                          { tech: 'Microservices', color: 'bg-purple-100 text-purple-800' },
                          { tech: 'Cloud Native', color: 'bg-cyan-100 text-cyan-800' },
                          
                          { tech: 'MySQL', color: 'bg-indigo-100 text-indigo-800' },
                        ].map((item) => (
                          <span
                            key={item.tech}
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${item.color} mr-2 mb-2`}
                          >
                            {item.tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'benefits' && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        {product.benefits?.title || "Business Benefits"}
                      </h3>
                      <div className="space-y-4">
                        {product.benefits?.items?.map((benefit, index) => (
                          <motion.div
                            key={index}
                            className="p-4 rounded-xl bg-gradient-to-r from-white to-green-50/50 border border-green-100 hover:border-green-300 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 10 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        ROI Calculator
                      </h4>
                      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100">
                        <div className="space-y-4">
                          {[
                            { metric: 'Annual Savings', value: '$250K+' },
                            { metric: 'Productivity Gain', value: '65%' },
                            { metric: 'ROI Period', value: '6 Months' },
                          ].map((item) => (
                            <div key={item.metric} className="flex justify-between items-center">
                              <span className="text-gray-600">{item.metric}</span>
                              <span className="text-2xl font-bold text-green-700">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'support' && (
                <motion.div
                  key="support"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    {product.support?.items?.map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {item.split(':')[0]}
                        </h4>
                        <p className="text-gray-600">
                          {item.split(':')[1] || item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CFSProductDetail;