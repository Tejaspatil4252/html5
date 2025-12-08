import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUser,
  FaLock,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaUpload,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaRegFilePdf,
  FaHome,
  FaLandmark,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Validation utilities
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
const validateGST = (gst) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
const validatePinCode = (pincode) => /^[1-9][0-9]{5}$/.test(pincode);
const validateTAN = (tan) => /^[A-Z]{4}\d{5}[A-Z]{1}$/.test(tan);

const Registration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    pinCode: "",
    state: "",
    district: "",
    city: "",
    gstNo: "",
    panNo: "",
    tanNo: "",
    contactNo: "",
    personName: "",
    personDesignation: "",
    email: "",
    password: "",
    document: null,
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [fieldErrors, setFieldErrors] = useState({});
 const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredCompany, setRegisteredCompany] = useState("");

  // Search states and districts
  const [searchTerm, setSearchTerm] = useState({ state: "", district: "" });
  const [showDropdown, setShowDropdown] = useState({
    state: false,
    district: false,
  });

  // Field validation - MOVED UP
const validateField = useCallback((name, value) => {
  const errors = {};
  let isValid = true;

  switch (name) {
    case "email":
      if (!value) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!validateEmail(value)) {
        errors.email = "Invalid email format";
        isValid = false;
      }
      break;
    case "contactNo":
      if (!value) {
        errors.contactNo = "Contact number is required";
        isValid = false;
      } else if (!validatePhone(value)) {
        errors.contactNo =
          "Invalid phone number (10 digits starting with 6-9)";
        isValid = false;
      }
      break;
    case "gstNo":
      if (!value) {
        errors.gstNo = "GST number is required";
        isValid = false;
      } else if (!validateGST(value)) {
        errors.gstNo = "Invalid GST format";
        isValid = false;
      }
      break;
    case "panNo":
      if (!value) {
        errors.panNo = "PAN number is required";
        isValid = false;
      } else if (!validatePAN(value)) {
        errors.panNo = "Invalid PAN format";
        isValid = false;
      }
      break;
    case "tanNo":
      if (value && value.trim()) {
        if (!validateTAN(value)) {
          errors.tanNo = "Invalid TAN format (e.g., ABCD12345E)";
          isValid = false;
        }
      }
      break;
    case "pinCode":
      if (!value?.trim()) {
        errors.pinCode = "Pin code is required";
        isValid = false;
      } else if (!validatePinCode(value)) {
        errors.pinCode = "Invalid pin code (6 digits, cannot start with 0)";
        isValid = false;
      }
      break;
    case "password":
      if (!value) {
        errors.password = "Password is required";
        isValid = false;
      } else if (value.length < 6) {
        errors.password = "Password must be at least 6 characters";
        isValid = false;
      }
      break;
    case "companyName":
      if (!value?.trim()) {
        errors.companyName = "Company name is required";
        isValid = false;
      }
      break;
    case "address":
      if (!value?.trim()) {
        errors.address = "Address is required";
        isValid = false;
      }
      break;
    case "state":
      if (!value) {
        errors.state = "State is required";
        isValid = false;
      }
      break;
    case "district":
      if (!value) {
        errors.district = "District is required";
        isValid = false;
      }
      break;
        case "city":
      if (!value) {
        errors.city = "City name is required";
        isValid = false;
      }
      break;
    case "personName":
      if (!value?.trim()) {
        errors.personName = "Contact person name is required";
        isValid = false;
      }
      break;
    default:
      break;
  }

  if (isValid) {
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  } else {
    setFieldErrors((prev) => ({ ...prev, ...errors }));
  }

  return isValid;
}, []);


  // Handle input field changes
  const handleChange = useCallback(
    (e) => {
      const { name, value, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));

      if (value.trim()) {
        validateField(name, value);
      } else {
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [validateField]
  );

  const showToast = useCallback((message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  }, []);

  // Fetch states from backend
  const fetchStates = async () => {
    setLoadingStates(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/locations/states"
      );

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        const text = await response.text();

        throw new Error("Backend returned HTML error page");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const statesData = await response.json();
 
      setStates(statesData);
    } catch (error) {
   
      // Fallback to sample data
      setStates([
        { jarId: 1, jarName: "Maharashtra", jarCode: "MH" },
        { jarId: 2, jarName: "Karnataka", jarCode: "KA" },
      ]);
    } finally {
      setLoadingStates(false);
    }
  };

  // Fetch districts
  const fetchDistricts = async (stateId) => {


    if (!stateId) {
      setDistricts([]);
      return;
    }

    setLoadingDistricts(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/locations/districts/${stateId}`
      );
      if (response.ok) {
        const districtsData = await response.json();
    
        setDistricts(districtsData);
      } else {
        throw new Error("Failed to fetch districts");
      }
    } catch (error) {

      const sampleDistricts = {
        1: [
          { jarId: 101, jarName: "Pune", jarCode: "MH-PUN" },
          { jarId: 102, jarName: "Mumbai", jarCode: "MH-MUM" },
        ],
        2: [
          { jarId: 201, jarName: "Bangalore", jarCode: "KA-BLR" },
          { jarId: 202, jarName: "Mysore", jarCode: "KA-MYS" },
        ],
      };
      setDistricts(sampleDistricts[stateId] || []);
    } finally {
      setLoadingDistricts(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // FIXED: Added proper dependencies
  useEffect(() => {
    if (formData.state) {
      fetchDistricts(formData.state);
      setFormData((prev) => ({ ...prev, district: "" }));
      setSearchTerm(prev => ({ ...prev, district: "" }));
    } else {
      setDistricts([]);
      setFormData((prev) => ({ ...prev, district: "" }));
      setSearchTerm(prev => ({ ...prev, district: "" }));
    }
  }, [formData.state]); // Added dependency

  // Filter states based on search
  const filteredStates = useMemo(() => {
    if (!searchTerm.state) return states;
    return states.filter(
      (state) =>
        state.jarName.toLowerCase().includes(searchTerm.state.toLowerCase()) ||
        state.jarCode.toLowerCase().includes(searchTerm.state.toLowerCase())
    );
  }, [states, searchTerm.state]);

  // Filter districts based on search
  const filteredDistricts = useMemo(() => {
    if (!searchTerm.district) return districts;
    return districts.filter(
      (district) =>
        district.jarName
          .toLowerCase()
          .includes(searchTerm.district.toLowerCase()) ||
        district.jarCode
          .toLowerCase()
          .includes(searchTerm.district.toLowerCase())
    );
  }, [districts, searchTerm.district]);

  // Handle state selection
  const handleStateSelect = (stateId, stateName) => {

    setFormData((prev) => ({ 
      ...prev, 
      state: stateId,
      district: "" // Clear district when state changes
    }));
    setSearchTerm((prev) => ({ 
      ...prev, 
      state: stateName,
      district: "" // Clear district search
    }));
    setShowDropdown((prev) => ({ ...prev, state: false }));
  };

  // Handle district selection
  const handleDistrictSelect = (districtId, districtName) => {

    setFormData((prev) => ({ ...prev, district: districtId }));
    setSearchTerm((prev) => ({ ...prev, district: districtName }));
    setShowDropdown((prev) => ({ ...prev, district: false }));
  };

  // Custom search handler for state and district
  const handleSearchChange = (field, value) => {
    setSearchTerm((prev) => ({ ...prev, [field]: value }));
    setShowDropdown((prev) => ({ ...prev, [field]: true }));
    
    // Clear selection if search doesn't match
    if (field === "state") {
      const selectedState = states.find((s) => s.jarId === formData.state);
      if (selectedState && !selectedState.jarName.toLowerCase().includes(value.toLowerCase())) {
        setFormData(prev => ({ ...prev, state: "" }));
      }
    }
    if (field === "district") {
      const selectedDistrict = districts.find((d) => d.jarId === formData.district);
      if (selectedDistrict && !selectedDistrict.jarName.toLowerCase().includes(value.toLowerCase())) {
        setFormData(prev => ({ ...prev, district: "" }));
      }
    }
  };

  // Step validations
  const stepValidations = useMemo(
    () => ({
      1: () => {
        const errors = [];
        if (!formData.companyName?.trim())
          errors.push("Company name is required");
        if (!formData.address?.trim())
          errors.push("Company address is required");
        if (!formData.gstNo?.trim()) errors.push("GST number is required");
        else if (!validateGST(formData.gstNo))
          errors.push("Invalid GST number format");
        if (!formData.panNo?.trim()) errors.push("PAN number is required");
        else if (!validatePAN(formData.panNo))
          errors.push("Invalid PAN number format");
        return errors;
      },
      2: () => {
        const errors = [];
        if (!formData.pinCode?.trim()) errors.push("Pin code is required");
        if (!formData.state) errors.push("State is required");
        if (!formData.district) errors.push("District is required");
        if (!formData.city) errors.push("city is required");
        return errors;
      },
      3: () => {
        const errors = [];
        if (!formData.contactNo?.trim())
          errors.push("Contact number is required");
        else if (!validatePhone(formData.contactNo))
          errors.push("Invalid contact number");
        if (!formData.personName?.trim())
          errors.push("Contact person name is required");
        if (!formData.email?.trim()) errors.push("Email is required");
        else if (!validateEmail(formData.email))
          errors.push("Invalid email format");
        return errors;
      },
    }),
    [formData]
  );

  const nextStep = useCallback(() => {
    const errors = stepValidations[currentStep]?.();
    if (errors && errors.length > 0) {
      showToast(errors[0]);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, stepValidations, showToast]);

  const prevStep = () => setCurrentStep((prev) => prev - 1);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate all steps
  const allErrors = [1, 2, 3].flatMap(
    (step) => stepValidations[step]?.() || []
  );
  
  // Add password validation
  if (!formData.password || formData.password.length < 6) {
    allErrors.push("Password must be at least 6 characters");
  }

  if (allErrors.length > 0) {
    showToast(allErrors[0], "error");
    return;
  }

  setIsLoading(true);

  try {
    // Get state and district names for display
    const selectedState = states.find((s) => s.jarId == formData.state);
    const selectedDistrict = districts.find((d) => d.jarId == formData.district);

    // Create FormData for file upload
    const submitFormData = new FormData();
    
    const userData = {
      companyName: formData.companyName,
      address: formData.address,
      pinCode: formData.pinCode,
      state: Number(formData.state),
      district: Number(formData.district),
      stateName: selectedState?.jarName || "",
      districtName: selectedDistrict?.jarName || "",
      cityName: formData.city,
      gstNo: formData.gstNo,
      panNo: formData.panNo,
      tanNo: formData.tanNo || "",  
      contactNo: formData.contactNo,
      personName: formData.personName,
      personDesignation: formData.personDesignation || "",
      email: formData.email,
      password: formData.password
    };
    
    console.log("📤 Sending user data:", userData);
    
    submitFormData.append('userData', JSON.stringify(userData));
    
    if (formData.document) {
      submitFormData.append('document', formData.document);
    }

    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      body: submitFormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("📥 Backend response:", result);

    if (result.status === 'success') {
      // Store JWT token in localStorage
      localStorage.setItem('authToken', result.token);
      
      // 🎯 SHOW BEAUTIFUL SUCCESS POPUP
      setRegisteredCompany(formData.companyName);
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        companyName: "",
        address: "",
        pinCode: "",
        state: "",
        district: "",
        city: "",
        gstNo: "",
        panNo: "",
        tanNo: "",
        contactNo: "",
        personName: "",
        personDesignation: "",
        email: "",
        password: "",
        document: null,
      });
      setCurrentStep(1);
      
    } else {
      // 🎯 SHOW TOAST FOR BACKEND ERRORS
      showToast(result.message || "Registration failed. Please try again.", "error");
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    // 🎯 SHOW TOAST FOR NETWORK/VALIDATION ERRORS
    let errorMessage = "Registration failed. Please try again.";
    
    if (error.message.includes("Email already registered")) {
      errorMessage = "This email is already registered. Please use a different email or try logging in.";
    } else if (error.message.includes("GST number already registered")) {
      errorMessage = "This GST number is already registered. Please check your details.";
    } else if (error.message.includes("PAN number already registered")) {
      errorMessage = "This PAN number is already registered. Please check your details.";
    } else if (error.message.includes("network") || error.message.includes("Failed to fetch")) {
      errorMessage = "Network error. Please check your internet connection and try again.";
    }
    
    showToast(errorMessage, "error");
  } finally {
    setIsLoading(false);
  }
};


  // Custom render for searchable selects
  const renderSearchableSelect = (field) => {
    const isState = field.name === "state";
    const isDistrict = field.name === "district";
    const searchData = isState ? filteredStates : filteredDistricts;
    const searchValue = isState ? searchTerm.state : searchTerm.district;
    const showDrop = isState ? showDropdown.state : showDropdown.district;
    const loading = isState ? loadingStates : loadingDistricts;

    // Get selected item for display
    const selectedItem = isState
      ? states.find((s) => s.jarId == formData.state)
      : districts.find((d) => d.jarId == formData.district);

    // Determine display value
    const displayValue = showDrop ? searchValue : (selectedItem ? selectedItem.jarName : "");

    return (
      <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {field.label}
          {loading && (
            <span className="ml-2 text-xs text-gray-500">Loading...</span>
          )}
        </label>
        <div className="relative">
          <FaSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm z-10 ${
              field.disabled ? "text-gray-300" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            data-field={isState ? "state" : "district"}
            value={displayValue}
            onChange={(e) => {
              if (!field.disabled) {
                handleSearchChange(field.name, e.target.value);
              }
            }}
            onFocus={() => {
              if (!field.disabled) {
                setShowDropdown((prev) => ({ ...prev, [field.name]: true }));
                // Start with selected item name or empty
                const currentValue = selectedItem ? selectedItem.jarName : "";
                setSearchTerm(prev => ({ ...prev, [field.name]: currentValue }));
              }
            }}
            placeholder={
              field.disabled
                ? "Select a state first"
                : `Search ${isState ? "state" : "district"}...`
            }
            className={`w-full pl-10 pr-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              field.disabled
                ? "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-gray-200 text-gray-800 focus:border-red-400 focus:ring-red-100"
            }`}
            readOnly={false}
          />

          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Dropdown */}
          {showDrop && searchData.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
              {searchData.map((item) => (
                <div
                  key={item.jarId}
                  onClick={() =>
                    isState
                      ? handleStateSelect(item.jarId, item.jarName)
                      : handleDistrictSelect(item.jarId, item.jarName)
                  }
                  className="px-4 py-3 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-gray-800">
                    {item.jarName}
                  </div>
                  
                </div>
              ))}
            </div>
          )}

          {/* No results message */}
          {showDrop && searchValue && searchData.length === 0 && !loading && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 p-4 z-50">
              <div className="text-gray-500 text-center">
                No {isState ? "states" : "districts"} found
              </div>
            </div>
          )}
        </div>
        {fieldErrors[field.name] && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</p>
        )}
      </div>
    );
  };

  // Render regular fields
  const renderField = (field) => {
    if (field.type === "search-select") {
      return renderSearchableSelect(field);
    }

    const commonProps = {
      name: field.name,
      value: formData[field.name],
      onChange: handleChange,
      onBlur: (e) => validateField(field.name, e.target.value),
      required: field.label.includes("*"),
      className: `w-full ${
        field.icon ? "pl-10 pr-4" : "px-4"
      } py-3 bg-white border-2 ${
        fieldErrors[field.name] ? "border-red-300" : "border-gray-200"
      } rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all`,
      placeholder: field.placeholder,
      disabled: field.disabled,
    };

    return (
      <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {field.label}
        </label>
        <div className="relative">
          {field.icon && (
            <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          )}
          {field.type === "textarea" ? (
            <textarea {...commonProps} rows={field.rows} />
          ) : (
            <input type={field.type} {...commonProps} />
          )}
        </div>
        {fieldErrors[field.name] && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</p>
        )}
      </div>
    );
  };

  // Form steps configuration - FIXED dependencies
  const formSteps = useMemo(
    () => [
      {
        fields: [
          {
            name: "companyName",
            label: "Company Name *",
            icon: FaBuilding,
            type: "text",
            placeholder: "Enter company name",
            fullWidth: true,
          },
          {
            name: "address",
            label: "Address *",
            icon: FaHome,
            type: "textarea",
            placeholder: "Full company address",
            fullWidth: true,
            rows: 3,
          },
          {
            name: "gstNo",
            label: "GST No *",
            icon: FaIdCard,
            type: "text",
            placeholder: "GST number",
          },
          {
            name: "panNo",
            label: "PAN No *",
            icon: FaLandmark,
            type: "text",
            placeholder: "PAN number",
          },
        ],
      },
      {
        fields: [
          {
            name: "pinCode",
            label: "Pin Code *",
            type: "text",
            placeholder: "Enter pin code",
          },
          {
            name: "state",
            label: "Select State *",
            type: "search-select",
            disabled: loadingStates,
          },
          {
            name: "district",
            label: "Select District *",
            type: "search-select",
            disabled: !formData.state || loadingDistricts,
          },
              {
            name: "city",
            label: "City *",
            type: "text",
            placeholder: "City name",
          },
          {
            name: "tanNo",
            label: "TAN No",
            type: "text",
            placeholder: "TAN number (optional)",
            fullWidth: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "contactNo",
            label: "Contact No *",
            icon: FaPhone,
            type: "tel",
            placeholder: "Company contact number",
            fullWidth: true,
          },
          {
            name: "personName",
            label: "Person Name *",
            icon: FaUser,
            type: "text",
            placeholder: "Contact person name",
          },
          {
            name: "personDesignation",
            label: "Person Designation",
            type: "text",
            placeholder: "Designation (optional)",
          },
          {
            name: "email",
            label: "Email *",
            icon: FaEnvelope,
            type: "email",
            placeholder: "Company email address",
            fullWidth: true,
          },
        ],
      },
    ],
    [loadingStates, loadingDistricts, formData.state, districts] // Added districts
  );

  // Close dropdowns when clicking outside - FIXED
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isStateInput = event.target.closest('[data-field="state"]');
      const isDistrictInput = event.target.closest('[data-field="district"]');
      const isDropdown = event.target.closest('.absolute.top-full');
      
      if (!isStateInput && !isDistrictInput && !isDropdown) {
        setShowDropdown({ state: false, district: false });
      }
    };
    
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

      useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        window.location.href = '/login';
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg border-l-4 ${
              toast.type === "error"
                ? "bg-red-500 text-white border-red-600"
                : "bg-green-500 text-white border-green-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  toast.type === "error" ? "bg-red-200" : "bg-green-200"
                }`}
              />
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/5 bg-gradient-to-br from-red-600 to-red-700 p-8 text-white relative"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6"
                >
                  <div className="w-2 h-2 bg-red-200 rounded-full animate-pulse" />
                  <span className="text-sm font-bold">JOIN RAPPTORSOFT</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-3xl font-bold mb-4"
                >
                  Start Your <span className="text-red-100">AI Journey</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-red-100 text-lg"
                >
                  Register your company and unlock intelligent business
                  solutions
                </motion.p>
              </div>

              {/* Progress Steps */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="space-y-4"
              >
                {[
                  { step: 1, label: "Company Details", icon: FaBuilding },
                  { step: 2, label: "Location Info", icon: FaMapMarkerAlt },
                  { step: 3, label: "Contact & Personnel", icon: FaUser },
                  { step: 4, label: "Security & Docs", icon: FaLock },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= item.step
                          ? "bg-white text-red-600 border-white"
                          : "border-white/50 text-white/70"
                      }`}
                    >
                      {currentStep > item.step ? (
                        <FaCheck className="text-xs" />
                      ) : (
                        item.step
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        currentStep >= item.step
                          ? "text-white"
                          : "text-white/70"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Form Section */}
{/* Right Form Section */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="lg:w-3/5 p-8"
>
  {/* Remove the form tag completely and handle submission manually */}
  <div className="h-full flex flex-col">
    {/* Form Header */}
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Company Registration
      </h2>
      <p className="text-gray-600">Step {currentStep} of 4</p>
    </div>

    {/* Form Steps */}
    <div className="flex-1">
      <AnimatePresence mode="wait">
        {/* Steps 1-3 */}
        {[1, 2, 3].includes(currentStep) && (
          <motion.div
            key={`step${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formSteps[currentStep - 1].fields.map(renderField)}
            </div>
          </motion.div>
        )}

        {/* Step 4: Security & Documents */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Create secure password"
                />
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                <p className="text-gray-600 text-sm mb-2">
                  {formData.document
                    ? formData.document.name
                    : "No file chosen"}
                </p>
                <p className="text-gray-500 text-xs mb-3">
                  Please attach a company-related PDF document with a
                  maximum size of 10 MB.
                </p>
                <label className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <FaRegFilePdf />
                  Choose PDF File
                  <input
                    type="file"
                    name="document"
                    onChange={handleChange}
                    accept=".pdf"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-8 mt-6 border-t border-gray-200">
      {/* Left Side - Back Button & Login Link */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
        {/* Back Button */}
        {currentStep > 1 && (
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={prevStep}
            className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-all font-semibold text-base px-6 py-3 rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center border border-gray-300 sm:border-none"
          >
            <FaArrowLeft className="text-base" />
            Back
          </motion.button>
        )}
        
        {/* Login Link - Shows when no back button on step 1 */}
        {currentStep === 1 && (
          <div className="text-center sm:text-left">
            <span className="text-gray-600 text-sm sm:text-base">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 font-semibold underline text-sm sm:text-base ml-1 transition-colors"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* Right Side - Continue/Sign Up Button & Login Link (when back button exists) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
        {/* Login Link - Shows next to continue button when back button exists */}
        {currentStep > 1 && (
          <div className="text-center">
            <span className="text-gray-600 text-sm sm:text-base">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 font-semibold underline text-sm sm:text-base ml-1 transition-colors"
            >
              Log In
            </Link>
          </div>
        )}

        {/* Continue/Sign Up Button */}
        {currentStep < 4 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={nextStep}
            className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto justify-center min-h-[52px] order-first sm:order-last"
          >
            Continue
            <FaArrowRight className="text-sm shrink-0" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg whitespace-nowrap disabled:opacity-50 w-full sm:w-auto justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Sign Up
                <FaCheck className="text-sm" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  </div>
</motion.div>
        </div>
      </motion.div>
      {/* Success Modal Popup */}
<AnimatePresence>
  {showSuccessModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowSuccessModal(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl border border-gray-100"
      >
        {/* Success Icon - RED */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FaCheck className="text-3xl text-red-600" />
        </motion.div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Raptorsoft!
          </h3>
          <p className="text-gray-600 mb-2">
            Your company <strong className="text-red-600">{registeredCompany}</strong> has been successfully registered.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login in 5 seconds...
          </p>
        </div>

        {/* Progress Bar - RED */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="bg-red-500 h-2 rounded-full"
          />
        </div>

        {/* Action Buttons - RED */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowSuccessModal(false)}
            className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Stay Here
          </button>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              setTimeout(() => window.location.href = '/login', 300);
            }}
            className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 shadow-lg"
          >
            Sign In Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default React.memo(Registration);