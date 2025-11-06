import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExclamationTriangle, FaTrash, FaBuilding } from "react-icons/fa";

const DeleteConfirmModal = ({ isOpen, onClose, branch, onBranchDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-hide toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

const handleDelete = async () => {
  if (!branch) return;

  setIsDeleting(true);

  try {
    const token = localStorage.getItem("authToken");
    console.log('Deleting branch with ID:', branch.branchId); // Debug log
    
    const response = await fetch(`http://localhost:8080/api/branches/${branch.branchId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log('Delete response status:', response.status); // Debug log

    // Check if response is OK before trying to parse JSON
    if (!response.ok) {
      // If response is not OK, try to get error message
      const errorText = await response.text();
      console.error('Delete failed with status:', response.status, 'Error:', errorText);
      
      let errorMessage = `Server error: ${response.status}`;
      try {
        // Try to parse error as JSON if possible
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // If not JSON, use the text directly
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    // If response is OK, try to parse as JSON
    const result = await response.json();
    console.log('Delete result:', result); // Debug log

    if (result.success) {
      showToast("Branch permanently deleted successfully!", "success");
      if (onBranchDeleted) {
        onBranchDeleted();
      }
      onClose();
    } else {
      showToast(result.message || "Failed to delete branch", "error");
    }
  } catch (error) {
    console.error("Branch deletion error:", error);
    showToast(error.message || "Failed to delete branch. Please try again.", "error");
  } finally {
    setIsDeleting(false);
  }
};

  // Toast Component
  const Toast = ({ message, type = "success", onClose }) => {
    const icons = {
      success: <FaExclamationTriangle className="text-green-500" />,
      error: <FaExclamationTriangle className="text-red-500" />,
    };

    const backgrounds = {
      success: "bg-green-50 border-green-200",
      error: "bg-red-50 border-red-200",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[10001] p-4 rounded-xl border shadow-lg ${backgrounds[type]} min-w-80 max-w-md`}
      >
        <div className="flex items-center gap-3">
          {icons[type]}
          <p className="text-sm font-medium text-gray-800 flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </motion.div>
    );
  };

  if (!isOpen || !branch) return null;

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Main Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[10000]"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-red-600 p-6 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Delete Branch</h2>
                <p className="text-red-100">This action cannot be undone</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaBuilding className="text-red-600 text-lg" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{branch.branchName}</h3>
                    <p className="text-sm text-gray-600">
                      {branch.districtName}, {branch.stateName}
                    </p>
                  </div>
                </div>

          
<p className="text-gray-600 mb-2">
  Are you sure you want to <strong>permanently delete</strong> <strong>{branch.branchName}</strong>?
</p>
<p className="text-sm text-gray-500 mb-6">
  This action cannot be undone. All branch data will be permanently removed from the system.
</p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FaTrash className="text-sm" />
                        Delete Branch
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteConfirmModal;