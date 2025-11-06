import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaIdCard,
  FaReceipt,
  FaHashtag,
  FaExclamationTriangle,
} from "react-icons/fa";

const EditBranchModal = ({ isOpen, onClose, branch, onBranchUpdated }) => {
  const [formData, setFormData] = useState({
    branchName: "",
    address: "",
    stateId: "",
    districtId: "",
    pin: "",
    panNo: "",
    gstNo: "",
    tanNo: "",
    contactPerson: "",
    designation: "",
    contactPhoneNo: "",
    contactEmail: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Load states and pre-fill form when modal opens
  useEffect(() => {
    if (isOpen && branch) {
      loadStates();
      prefillForm();
      setFormErrors({});
    }
  }, [isOpen, branch]);

  // Load districts when state changes
  useEffect(() => {
    if (formData.stateId) {
      loadDistricts(formData.stateId);
    } else {
      setDistricts([]);
    }
  }, [formData.stateId]);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const prefillForm = () => {
    if (branch) {
      setFormData({
        branchName: branch.branchName || "",
        address: branch.address || "",
        stateId: branch.stateId || "",
        districtId: branch.districtId || "",
        pin: branch.pin || "",
        panNo: branch.panNo || "",
        gstNo: branch.gstNo || "",
        tanNo: branch.tanNo || "",
        contactPerson: branch.contactPerson || "",
        designation: branch.designation || "",
        contactPhoneNo: branch.contactPhoneNo || "",
        contactEmail: branch.contactEmail || "",
      });
    }
  };

  const loadStates = async () => {
    try {
      setLoadingStates(true);
      const response = await fetch("http://localhost:8080/api/locations/states");
      if (response.ok) {
        const statesData = await response.json();
        setStates(statesData);
      }
    } catch (error) {
      console.error("Failed to load states:", error);
      showToast("Failed to load states", "error");
    } finally {
      setLoadingStates(false);
    }
  };

  const loadDistricts = async (stateId) => {
    try {
      setLoadingDistricts(true);
      const response = await fetch(`http://localhost:8080/api/locations/districts/${stateId}`);
      if (response.ok) {
        const districtsData = await response.json();
        setDistricts(districtsData);
      }
    } catch (error) {
      console.error("Failed to load districts:", error);
      setDistricts([]);
      showToast("Failed to load districts", "error");
    } finally {
      setLoadingDistricts(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case "branchName":
        if (!value.trim()) errors.branchName = "Branch name is required";
        else if (value.length > 35) errors.branchName = "Branch name too long (max 35 characters)";
        else delete errors.branchName;
        break;

      case "address":
        if (!value.trim()) errors.address = "Address is required";
        else if (value.length > 255) errors.address = "Address too long (max 255 characters)";
        else delete errors.address;
        break;

      case "stateId":
        if (!value) errors.stateId = "State is required";
        else delete errors.stateId;
        break;

      case "districtId":
        if (!value) errors.districtId = "District is required";
        else delete errors.districtId;
        break;

      case "pin":
        if (!value) errors.pin = "PIN code is required";
        else if (!/^\d{6}$/.test(value)) errors.pin = "PIN must be exactly 6 digits";
        else delete errors.pin;
        break;

      case "panNo":
        if (!value) errors.panNo = "PAN number is required";
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()))
          errors.panNo = "Invalid PAN format. Example: ABCDE1234F";
        else delete errors.panNo;
        break;

      case "gstNo":
        if (!value) errors.gstNo = "GST number is required";
        else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(value.toUpperCase()))
          errors.gstNo = "Invalid GST format. Example: 27ABCDE1234F1Z5";
        else delete errors.gstNo;
        break;

      case "tanNo":
        if (value && !/^[A-Z]{4}\d{5}[A-Z]{1}$/.test(value.toUpperCase()))
          errors.tanNo = "Invalid TAN format. Example: DELA12345E";
        else delete errors.tanNo;
        break;

      case "contactPerson":
        if (!value.trim()) errors.contactPerson = "Contact person name is required";
        else if (value.length > 35) errors.contactPerson = "Name too long (max 35 characters)";
        else delete errors.contactPerson;
        break;

      case "designation":
        if (!value.trim()) errors.designation = "Designation is required";
        else if (value.length > 35) errors.designation = "Designation too long (max 35 characters)";
        else delete errors.designation;
        break;

      case "contactPhoneNo":
        if (!value) errors.contactPhoneNo = "Contact number is required";
        else if (!/^[6-9]\d{9}$/.test(value))
          errors.contactPhoneNo = "Invalid phone number. Must start with 6-9 and be 10 digits";
        else delete errors.contactPhoneNo;
        break;

      case "contactEmail":
        if (!value) errors.contactEmail = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errors.contactEmail = "Invalid email format. Example: name@company.com";
        else if (value.length > 50) errors.contactEmail = "Email too long (max 50 characters)";
        else delete errors.contactEmail;
        break;

      default:
        delete errors[name];
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateForm = () => {
    const errors = {};

    // Required field validations
    if (!formData.branchName.trim()) errors.branchName = "Branch name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.stateId) errors.stateId = "State is required";
    if (!formData.districtId) errors.districtId = "District is required";
    if (!formData.pin) errors.pin = "PIN code is required";
    if (!formData.panNo) errors.panNo = "PAN number is required";
    if (!formData.gstNo) errors.gstNo = "GST number is required";
    if (!formData.contactPerson.trim()) errors.contactPerson = "Contact person name is required";
    if (!formData.designation.trim()) errors.designation = "Designation is required";
    if (!formData.contactPhoneNo) errors.contactPhoneNo = "Contact number is required";
    if (!formData.contactEmail) errors.contactEmail = "Email is required";

    // Format validations
    if (formData.pin && !/^\d{6}$/.test(formData.pin))
      errors.pin = "PIN must be exactly 6 digits (e.g., 400001)";

    if (formData.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase()))
      errors.panNo = "Invalid PAN format. Example: ABCDE1234F";

    if (formData.gstNo && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gstNo.toUpperCase()))
      errors.gstNo = "Invalid GST format. Example: 27ABCDE1234F1Z5";

    if (formData.tanNo && !/^[A-Z]{4}\d{5}[A-Z]{1}$/.test(formData.tanNo.toUpperCase()))
      errors.tanNo = "Invalid TAN format. Example: DELA12345E";

    if (formData.contactPhoneNo && !/^[6-9]\d{9}$/.test(formData.contactPhoneNo))
      errors.contactPhoneNo = "Invalid phone number. Must start with 6-9 and be 10 digits";

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
      errors.contactEmail = "Invalid email format. Example: name@company.com";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const safeValue = value || "";

    setFormData(prev => ({
      ...prev,
      [name]: safeValue,
    }));

    validateField(name, safeValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/branches/${branch.branchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showToast("Branch updated successfully!", "success");
        if (onBranchUpdated) {
          onBranchUpdated();
        }
        onClose();
      } else {
        showToast(result.message || "Failed to update branch", "error");
      }
    } catch (error) {
      console.error("Branch update error:", error);
      showToast("Failed to update branch. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = "w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors";
    if (formErrors[fieldName]) {
      return `${baseClass} border-red-300 bg-red-50`;
    }
    return `${baseClass} border-gray-300`;
  };

  // Toast Component (same as AddBranchModal)
  const Toast = ({ message, type = "success", onClose }) => {
    const icons = {
      success: <FaExclamationTriangle className="text-green-500" />,
      error: <FaExclamationTriangle className="text-red-500" />,
      info: <FaExclamationTriangle className="text-blue-500" />,
    };

    const backgrounds = {
      success: "bg-green-50 border-green-200",
      error: "bg-red-50 border-red-200",
      info: "bg-blue-50 border-blue-200",
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-400 bg-opacity-20 rounded-xl flex items-center justify-center">
                      <FaBuilding className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Edit Branch</h2>
                      <p className="text-red-100">Update branch details below</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Branch Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Branch Name *
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={handleChange}
                        className={getInputClass("branchName")}
                        placeholder="Enter branch name"
                      />
                    </div>
                    {formErrors.branchName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.branchName}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        rows="3"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={getInputClass("address")}
                        placeholder="Enter complete address"
                      />
                    </div>
                    {formErrors.address && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="stateId"
                      value={formData.stateId}
                      onChange={handleChange}
                      disabled={loadingStates}
                      className={getInputClass("stateId").replace("pl-10", "px-4")}
                    >
                      <option value="">{loadingStates ? "Loading states..." : "Select State"}</option>
                      {states.map((state) => (
                        <option key={state.jarId} value={state.jarId}>
                          {state.jarName}
                        </option>
                      ))}
                    </select>
                    {formErrors.stateId && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.stateId}
                      </p>
                    )}
                  </div>

                  {/* District Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      name="districtId"
                      value={formData.districtId}
                      onChange={handleChange}
                      disabled={!formData.stateId || loadingDistricts}
                      className={getInputClass("districtId").replace("pl-10", "px-4")}
                    >
                      <option value="">
                        {!formData.stateId
                          ? "Select state first"
                          : loadingDistricts
                          ? "Loading districts..."
                          : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option key={district.jarId} value={district.jarId}>
                          {district.jarName}
                        </option>
                      ))}
                    </select>
                    {formErrors.districtId && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.districtId}
                      </p>
                    )}
                  </div>

                  {/* Pin Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pin Code *
                    </label>
                    <div className="relative">
                      <FaHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        className={getInputClass("pin")}
                        placeholder="Enter pin code"
                        maxLength="6"
                      />
                    </div>
                    {formErrors.pin && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.pin}
                      </p>
                    )}
                  </div>

                  {/* PAN No */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      PAN No *
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="panNo"
                        value={formData.panNo}
                        onChange={handleChange}
                        className={getInputClass("panNo")}
                        placeholder="Enter PAN number"
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                    {formErrors.panNo && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.panNo}
                      </p>
                    )}
                  </div>

                  {/* GST No */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      GST No *
                    </label>
                    <div className="relative">
                      <FaReceipt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="gstNo"
                        value={formData.gstNo}
                        onChange={handleChange}
                        className={getInputClass("gstNo")}
                        placeholder="Enter GST number"
                        style={{ textTransform: "uppercase" }}
                      />
                    </div>
                    {formErrors.gstNo && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.gstNo}
                      </p>
                    )}
                  </div>

                  {/* TAN No */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      TAN No
                    </label>
                    <div className="relative">
                      <FaHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="tanNo"
                        value={formData.tanNo}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter TAN number"
                      />
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className={getInputClass("contactPerson")}
                        placeholder="Enter contact person name"
                      />
                    </div>
                    {formErrors.contactPerson && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.contactPerson}
                      </p>
                    )}
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Designation *
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className={getInputClass("designation").replace("pl-10", "px-4")}
                      placeholder="Enter designation"
                    />
                    {formErrors.designation && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.designation}
                      </p>
                    )}
                  </div>

                  {/* Contact No */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact No *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="contactPhoneNo"
                        value={formData.contactPhoneNo}
                        onChange={handleChange}
                        className={getInputClass("contactPhoneNo")}
                        placeholder="Enter contact number"
                        maxLength="10"
                      />
                    </div>
                    {formErrors.contactPhoneNo && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.contactPhoneNo}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className={getInputClass("contactEmail")}
                        placeholder="Enter email address"
                      />
                    </div>
                    {formErrors.contactEmail && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {formErrors.contactEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaBuilding className="text-sm" />
                        Update Branch
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditBranchModal;