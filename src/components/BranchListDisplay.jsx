  import { useState, useEffect,useRef } from 'react';
  import { motion } from 'framer-motion';
  import { AnimatePresence } from 'framer-motion';
  import { 
    FaEdit, 
    FaTrash, 
    FaBuilding, 
    FaMapMarkerAlt, 
    FaPhone, 
    FaEnvelope, 
    FaUser, 
    FaIdCard,
    FaGlobe,
    FaCity,
    FaTag,
    FaChevronDown,
    FaChevronUp,
    FaSearch
  } from 'react-icons/fa';

  const BranchListDisplay = ({ refreshTrigger, onEdit, onDelete }) => {
 const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBranch, setExpandedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef(null);

    // Fetch branches when component mounts or refreshTrigger changes
    useEffect(() => {
      fetchBranches();
    }, [refreshTrigger]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const isAtTop = scrollTop < 50; // Show when within 50px of top
      
      setIsSearchVisible(isAtTop);
      setHasScrolled(scrollTop > 100);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

 useEffect(() => {
    if (expandedBranch) {
      setIsSearchVisible(false);
    }
  }, [expandedBranch]);

    const fetchBranches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:8080/api/branches', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch branches: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setBranches(result.branches || []);
        } else {
          throw new Error(result.message || 'Failed to load branches');
        }
      } catch (err) {
        console.error('Branch fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Filter branches based on search term
    const filteredBranches = branches.filter(branch =>
      branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExpand = (branchId) => {
      setExpandedBranch(expandedBranch === branchId ? null : branchId);
    };

      const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsSearchVisible(true); // Always show when focused
  };

    // Loading state - Mobile Optimized
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-red-100 border-t-red-600 mb-4"></div>
            <FaBuilding className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-base" />
          </div>
          <p className="text-gray-600 font-medium text-center">Loading your branches...</p>
          <p className="text-gray-400 text-sm mt-2 text-center">Please wait a moment</p>
        </div>
      );
    }

    // Error state - Mobile Optimized
    if (error) {
      return (
        <div className="text-center py-8 px-4">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mx-auto shadow-sm">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBuilding className="text-red-600 text-lg" />
            </div>
            <h3 className="text-red-800 font-bold text-lg mb-2">Unable to Load Branches</h3>
            <p className="text-red-600 text-sm mb-6">{error}</p>
            <button
              onClick={fetchBranches}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    // Empty state - Mobile Optimized
    if (branches.length === 0) {
      return (
        <div className="text-center py-12 px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FaBuilding className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-3">No Branches Yet</h3>
          <p className="text-gray-500 mx-auto text-base mb-8 px-4">
            Start building your business network by adding your first branch location.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto"></div>
        </div>
      );
    }

    return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto relative"
    >
      {/* Floating Search Bar - Appears/Disappears on Scroll */}
      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="sticky top-0 z-20 px-4 pt-4 pb-2 bg-gradient-to-b from-white via-white to-transparent"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold text-gray-900">Branch Network</h2>
                <div className="flex justify-center items-center gap-4 text-sm mt-1">
                  <span className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {branches.filter(b => b.status === 'A').length} Active
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {filteredBranches.length} Showing
                  </span>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 text-base"
                />
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isSearchFocused ? 'text-red-500' : 'text-gray-400'
                }`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show search prompt when hidden and user might want to search */}
      <AnimatePresence>
        {!isSearchVisible && hasScrolled && filteredBranches.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sticky top-2 z-10 mx-4 mb-2"
          >
            <div 
              className="bg-gray-100 border border-gray-300 rounded-xl py-2 px-4 text-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setIsSearchVisible(true)}
            >
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <FaSearch className="text-gray-400" />
                Search branches...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Branches List - Mobile Optimized */}
        <div className="space-y-3">
          {filteredBranches.map((branch, index) => (
            <motion.div
              key={branch.branchId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Branch Header - Mobile Optimized */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(branch.branchId)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <FaBuilding className="text-white text-base" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 truncate">{branch.branchName}</h3>
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          ACTIVE
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2 truncate">
                          <FaCity className="text-gray-400 text-xs flex-shrink-0" />
                          <span className="truncate">{branch.districtName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaTag className="text-gray-400 text-xs flex-shrink-0" />
                          <span className="text-xs">ID: {branch.branchId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions - Mobile Optimized */}
                  <div className="flex flex-col items-end gap-2 ml-2 flex-shrink-0">
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(branch);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 group border border-blue-200"
                        title="Edit Branch"
                      >
                        <FaEdit className="text-xs group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(branch);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 group border border-red-200"
                        title="Delete Branch"
                      >
                        <FaTrash className="text-xs group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {expandedBranch === branch.branchId ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Details - Mobile Optimized */}
              <motion.div
                initial={false}
                animate={{ height: expandedBranch === branch.branchId ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <div className="space-y-4">
                    {/* Location Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                        <FaMapMarkerAlt className="text-red-500 text-xs" />
                        Location
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Address</p>
                          <p className="text-gray-800">{branch.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">PIN Code</p>
                            <p className="text-gray-800 font-medium">{branch.pin}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">State</p>
                            <p className="text-gray-800 font-medium">{branch.stateName}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                        <FaUser className="text-blue-500 text-xs" />
                        Contact
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Name</p>
                            <p className="text-gray-800 font-medium">{branch.contactPerson}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Role</p>
                            <p className="text-gray-800 font-medium">{branch.designation}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-green-500 text-xs" />
                            <span className="text-gray-800">{branch.contactPhoneNo}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-purple-500 text-xs" />
                            <span className="text-gray-800 text-sm">{branch.contactEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tax Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                        <FaIdCard className="text-green-500 text-xs" />
                        Tax Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">PAN Number</p>
                          <p className="text-gray-800 font-medium">{branch.panNo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">GST Number</p>
                          <p className="text-gray-800 font-medium">{branch.gstNo}</p>
                        </div>
                        {branch.tanNo && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">TAN Number</p>
                            <p className="text-gray-800 font-medium">{branch.tanNo}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* No Results State - Mobile Optimized */}
        {filteredBranches.length === 0 && branches.length > 0 && (
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaBuilding className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No matches found</h3>
            <p className="text-gray-500 text-sm">Try different search terms</p>
          </div>
        )}

        {/* Bottom Padding for Mobile */}
        <div className="h-4"></div>
      </div>
    );
  };

  export default BranchListDisplay;