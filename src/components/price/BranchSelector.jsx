// src/components/branch/BranchSelector.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaChevronDown, FaCheck, FaSearch, FaTimes } from 'react-icons/fa';

const BranchSelector = ({ user, onBranchSelect }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch user's branches from your API
  useEffect(() => {
    const fetchBranches = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8080/api/branches', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch branches');
        
        const data = await response.json();
        
        if (data.success) {
          setBranches(data.branches || []);
        } else {
          throw new Error(data.message || 'Failed to load branches');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching branches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🎯 FIXED: Keep dropdown open after selection
  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    onBranchSelect(branch);
    setSearchTerm(''); // Clear search
    setIsOpen(false);
  };

  const handleUnselectBranch = () => {
    setSelectedBranch(null);
    onBranchSelect(null);
    setIsOpen(true); // Open dropdown after unselecting
  };

  const filteredBranches = branches.filter(branch =>
    branch.branchName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto mb-8"
      >
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl animate-pulse" />
              <div>
                <div className="h-4 bg-gray-100 rounded w-32 animate-pulse mb-2" />
                <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
              </div>
            </div>
            <div className="w-5 h-5 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </motion.div>
    );
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto mb-8"
      >
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <FaBuilding className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load branches</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

return (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-2xl mx-auto mb-8"
    ref={dropdownRef}
  >
    {/* Branch Selector Dropdown */}
    <div className="relative">
      {/* Trigger Button */}
      <motion.button
  onClick={() => setIsOpen(!isOpen)}
  className={`w-full bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-200 text-left ${
    isOpen ? 'border-red-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
  } ${selectedBranch ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : ''}`}
  whileTap={{ scale: 0.995 }}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        selectedBranch ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
      }`}>
        <FaBuilding className="w-5 h-5" />
      </div>
      <div>
        {selectedBranch ? (
          <>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              {selectedBranch.branchName}
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✓ Selected
              </span>
            </h3>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <FaMapMarkerAlt className="w-3 h-3 mr-1" />
              {selectedBranch.address}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900">Select Branch</h3>
            <p className="text-gray-500 text-sm">Choose a branch to continue</p>
          </>
        )}
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
      {/* Dropdown Chevron */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className={`w-5 h-5 ${selectedBranch ? 'text-green-600' : 'text-gray-400'}`}
      >
        <FaChevronDown />
      </motion.div>

      {/* Cross Button */}
      {selectedBranch && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleUnselectBranch();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
          title="Unselect branch"
          type="button"
        >
          <FaTimes className="w-3 h-3" />
        </motion.div>
      )}
    </div>
  </div>
</motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {selectedBranch ? 'Switch Branch' : 'Select Branch'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                Close
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Branches List */}
            <div className="overflow-y-auto max-h-64">
              {filteredBranches.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FaBuilding className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium">No branches found</p>
                  <p className="text-sm mt-1">Try adjusting your search</p>
                </div>
              ) : (
                filteredBranches.map((branch, index) => (
                  <motion.div
                    key={branch.branchId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-50 last:border-b-0 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedBranch?.branchId === branch.branchId
                        ? 'bg-green-50 border-l-4 border-l-green-500'
                        : ''
                    }`}
                    onClick={() => handleSelectBranch(branch)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          selectedBranch?.branchId === branch.branchId
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <FaBuilding className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-semibold truncate ${
                              selectedBranch?.branchId === branch.branchId
                                ? 'text-green-700'
                                : 'text-gray-900'
                            }`}>
                              {branch.branchName}
                            </h4>
                            {selectedBranch?.branchId === branch.branchId && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <FaMapMarkerAlt className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {branch.address}
                              {branch.city && `, ${branch.city}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedBranch?.branchId === branch.branchId && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <FaCheck className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                {filteredBranches.length} branch{filteredBranches.length !== 1 ? 'es' : ''} available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);
};

export default BranchSelector;