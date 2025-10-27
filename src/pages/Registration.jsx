import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBuilding, FaMapMarkerAlt, FaUser, FaLock, FaIdCard, 
  FaPhone, FaEnvelope, FaUpload, FaArrowRight, FaArrowLeft,
  FaCheck, FaRegFilePdf, FaHome, FaLandmark
} from 'react-icons/fa';
import { Link } from 'react-router-dom';  

// Validation utilities
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
const validateGST = (gst) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

const Registration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    pinCode: '',
    state: '',
    city: '',
    gstNo: '',
    panNo: '',
    tanNo: '',
    contactNo: '',
    personName: '',
    personDesignation: '',
    email: '',
    password: '',
    document: null
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [fieldErrors, setFieldErrors] = useState({});
    useEffect(() => {
    fetchStates();
  }, []);

    useEffect(() => {
    if (formData.state) {
      fetchDistricts(formData.state);
      // Clear district when state changes
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  }, []);

    // Fetch states from backend
const fetchStates = async () => {
  setLoadingStates(true);
  try {
    const response = await fetch('/api/locations/states');
    if (response.ok) {
      const statesData = await response.json();
      setStates(statesData);
    }
  } catch (error) {
    console.log('Using sample data');
    setStates([
      { jarId: 1, jarName: 'Maharashtra', jarCode: 'MH' },
      { jarId: 2, jarName: 'Karnataka', jarCode: 'KA' }
    ]);
  } finally {
    setLoadingStates(false);
  }
};

const fetchDistricts = async (stateId) => {
  if (!stateId) {
    setDistricts([]);
    return;
  }
  
  setLoadingDistricts(true);
  try {
    const response = await fetch(`/api/locations/districts/${stateId}`);
    if (response.ok) {
      const districtsData = await response.json();
      setDistricts(districtsData);
    }
  } catch (error) {
    console.log('Using sample districts');
    // Sample fallback
    const sampleDistricts = {
      1: [ 
        { jarId: 101, jarName: 'Pune', jarCode: 'PUN' },
        { jarId: 102, jarName: 'Mumbai', jarCode: 'MUM' }
      ]
    };
    setDistricts(sampleDistricts[stateId] || []);
  } finally {
    setLoadingDistricts(false);
  }
};

const validateField = useCallback((name, value) => {
  const errors = {};
  let isValid = true;
  
  switch (name) {
    case 'email':
      if (!value) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!validateEmail(value)) {
        errors.email = 'Invalid email format';
        isValid = false;
      }
      break;
    case 'contactNo':
      if (!value) {
        errors.contactNo = 'Contact number is required';
        isValid = false;
      } else if (!validatePhone(value)) {
        errors.contactNo = 'Invalid phone number (10 digits starting with 6-9)';
        isValid = false;
      }
      break;
    case 'gstNo':
      if (!value) {
        errors.gstNo = 'GST number is required';
        isValid = false;
      } else if (!validateGST(value)) {
        errors.gstNo = 'Invalid GST format';
        isValid = false;
      }
      break;
    case 'panNo':
      if (!value) {
        errors.panNo = 'PAN number is required';
        isValid = false;
      } else if (!validatePAN(value)) {
        errors.panNo = 'Invalid PAN format';
        isValid = false;
      }
      break;
    case 'password':
      if (!value) {
        errors.password = 'Password is required';
        isValid = false;
      } else if (value.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
      break;
    case 'companyName':
      if (!value?.trim()) {
        errors.companyName = 'Company name is required';
        isValid = false;
      }
      break;
    case 'address':
      if (!value?.trim()) {
        errors.address = 'Address is required';
        isValid = false;
      }
      break;
    case 'pinCode':
      if (!value?.trim()) {
        errors.pinCode = 'Pin code is required';
        isValid = false;
      }
      break;
    case 'state':
      if (!value) {
        errors.state = 'State is required';
        isValid = false;
      }
      break;
    case 'city':
      if (!value) {
        errors.city = 'City is required';
        isValid = false;
      }
      break;
    case 'personName':
      if (!value?.trim()) {
        errors.personName = 'Contact person name is required';
        isValid = false;
      }
      break;
    default:
      break;
  }
  
  // Clear the error if the field becomes valid
  if (isValid) {
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  } else {
    setFieldErrors(prev => ({ ...prev, ...errors }));
  }
  
  return isValid;
}, []);

const handleChange = useCallback((e) => {
  const { name, value, files } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: files ? files[0] : value
  }));
  
  // Real-time validation - this will clear errors when input becomes valid
  if (value.trim()) {
    validateField(name, value);
  } else {
    // Clear error if field is empty
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }
}, [validateField]);

  const stepValidations = useMemo(() => ({
    1: () => {
      const errors = [];
      if (!formData.companyName?.trim()) errors.push('Company name is required');
      if (!formData.address?.trim()) errors.push('Company address is required');
      if (!formData.gstNo?.trim()) errors.push('GST number is required');
      else if (!validateGST(formData.gstNo)) errors.push('Invalid GST number format');
      if (!formData.panNo?.trim()) errors.push('PAN number is required');
      else if (!validatePAN(formData.panNo)) errors.push('Invalid PAN number format');
      return errors;
    },
    2: () => {
      const errors = [];
      if (!formData.pinCode?.trim()) errors.push('Pin code is required');
      if (!formData.state) errors.push('State is required');
      if (!formData.city) errors.push('City is required');
      return errors;
    },
    3: () => {
      const errors = [];
      if (!formData.contactNo?.trim()) errors.push('Contact number is required');
      else if (!validatePhone(formData.contactNo)) errors.push('Invalid contact number');
      if (!formData.personName?.trim()) errors.push('Contact person name is required');
      if (!formData.email?.trim()) errors.push('Email is required');
      else if (!validateEmail(formData.email)) errors.push('Invalid email format');
      return errors;
    }
  }), [formData]);

  const nextStep = useCallback(() => {
    const errors = stepValidations[currentStep]?.();
    if (errors && errors.length > 0) {
      showToast(errors[0]);
      return;
    }
    setCurrentStep(prev => prev + 1);
  }, [currentStep, stepValidations, showToast]);

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allErrors = [1, 2, 3].flatMap(step => stepValidations[step]?.() || []);
    if (allErrors.length > 0) {
      showToast('Please fix all validation errors before submitting');
      return;
    }

    if (!formData.password) {
      showToast('Password is required');
      return;
    }

    setIsLoading(true);
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', Object.fromEntries(submitData));
      showToast('Registration successful! Redirecting...', 'success');
    } catch (error) {
      showToast('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formSteps = useMemo(() => [
    {
      fields: [
        {
          name: 'companyName',
          label: 'Company Name *',
          icon: FaBuilding,
          type: 'text',
          placeholder: 'Enter company name',
          fullWidth: true
        },
        {
          name: 'address',
          label: 'Address *',
          icon: FaHome,
          type: 'textarea',
          placeholder: 'Full company address',
          fullWidth: true,
          rows: 3
        },
        {
          name: 'gstNo',
          label: 'GST No *',
          icon: FaIdCard,
          type: 'text',
          placeholder: 'GST number'
        },
        {
          name: 'panNo',
          label: 'PAN No *',
          icon: FaLandmark,
          type: 'text',
          placeholder: 'PAN number'
        }
      ]
    },
    {
      fields: [
        {
          name: 'pinCode',
          label: 'Pin Code *',
          type: 'text',
          placeholder: 'Enter pin code'
        },
        {
          name: 'state',
          label: 'Select State *',
          type: 'select',
          options: ['', ...states.map(state => state.jarId)],
          optionLabels: ['Choose state', ...states.map(state => state.jarName)],
          loading: loadingStates
        },
        {
          name: 'city',
          label: 'Select District *',
          type: 'select',
          options: ['', ...districts.map(district => district.jarId)],
          optionLabels: ['Choose district', ...districts.map(district => district.jarName)],
          fullWidth: true,
          loading: loadingDistricts,
          disabled: !formData.state || loadingDistricts
        },
        {
          name: 'tanNo',
          label: 'TAN No',
          type: 'text',
          placeholder: 'TAN number (optional)',
          fullWidth: true
        }
      ]
    },
    {
      fields: [
        {
          name: 'contactNo',
          label: 'Contact No *',
          icon: FaPhone,
          type: 'tel',
          placeholder: 'Company contact number',
          fullWidth: true
        },
        {
          name: 'personName',
          label: 'Person Name *',
          icon: FaUser,
          type: 'text',
          placeholder: 'Contact person name'
        },
        {
          name: 'personDesignation',
          label: 'Person Designation',
          type: 'text',
          placeholder: 'Designation (optional)'
        },
        {
          name: 'email',
          label: 'Email *',
          icon: FaEnvelope,
          type: 'email',
          placeholder: 'Company email address',
          fullWidth: true
        }
      ]
    }
  ], [states, districts, loadingStates, loadingDistricts, formData.state]);

const renderField = (field) => {
  const commonProps = {
    name: field.name,
    value: formData[field.name],
    onChange: handleChange,
    onBlur: (e) => validateField(field.name, e.target.value),
    required: field.label.includes('*'),
    className: `w-full ${field.icon ? 'pl-10 pr-4' : 'px-4'} py-3 bg-white border-2 ${
      fieldErrors[field.name] ? 'border-red-300' : 'border-gray-200'
    } rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all`,
    placeholder: field.placeholder,
    disabled: field.disabled
  };

  return (
    <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {field.label}
        {field.loading && (
          <span className="ml-2 text-xs text-gray-500">Loading...</span>
        )}
      </label>
      <div className="relative">
        {field.icon && (
          <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        )}
        {field.type === 'textarea' ? (
          <textarea {...commonProps} rows={field.rows} />
        ) : field.type === 'select' ? (
          <select {...commonProps}>
            {field.options.map((option, index) => (
              <option key={option} value={option}>
                {field.optionLabels[index]}
              </option>
            ))}
          </select>
        ) : (
          <input type={field.type} {...commonProps} />
        )}
        
        {/* Loading spinner for select fields */}
        {(field.loading) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {fieldErrors[field.name] && (
        <p className="text-red-500 text-xs mt-1">{fieldErrors[field.name]}</p>
      )}
    </div>
  );
};

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
              toast.type === 'error' 
                ? 'bg-red-500 text-white border-red-600' 
                : 'bg-green-500 text-white border-green-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-200' : 'bg-green-200'}`} />
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
                  Register your company and unlock intelligent business solutions
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
                  { step: 1, label: 'Company Details', icon: FaBuilding },
                  { step: 2, label: 'Location Info', icon: FaMapMarkerAlt },
                  { step: 3, label: 'Contact & Personnel', icon: FaUser },
                  { step: 4, label: 'Security & Docs', icon: FaLock }
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= item.step 
                        ? 'bg-white text-red-600 border-white' 
                        : 'border-white/50 text-white/70'
                    }`}>
                      {currentStep > item.step ? <FaCheck className="text-xs" /> : item.step}
                    </div>
                    <span className={`font-medium ${
                      currentStep >= item.step ? 'text-white' : 'text-white/70'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-3/5 p-8"
          >
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              
              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Company Registration
                </h2>
                <p className="text-gray-600">
                  Step {currentStep} of 4
                </p>
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
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Document
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                          <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                          <p className="text-gray-600 text-sm mb-2">
                            {formData.document ? formData.document.name : 'No file chosen'}
                          </p>
                          <p className="text-gray-500 text-xs mb-3">
                            Please attach a company-related PDF document with a maximum size of 10 MB.
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
<div className="flex justify-between items-center pt-8 mt-6 border-t border-gray-200">
  <div>
    {currentStep > 1 && (
      <motion.button
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={prevStep}
        className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-all font-semibold text-base px-4 py-2 rounded-lg hover:bg-gray-50"
      >
        <FaArrowLeft className="text-base" />
        Back
      </motion.button>
    )}
  </div>

  <div className="flex items-center gap-6">
    <div className="text-center">
      <span className="text-gray-600 text-base">
        Already have an account?
      </span>
      <Link 
      to="/login"
        type="button" 
        className="text-red-600 hover:text-red-700 font-semibold underline text-base ml-1 transition-colors"
      >
        Log In
      </Link>
    </div>

    {currentStep < 4 ? (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={nextStep}
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all shadow-lg text-base min-w-[120px] justify-center"
      >
        Continue
        <FaArrowRight className="text-sm" />
      </motion.button>
    ) : (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all shadow-lg text-base min-w-[180px] justify-center disabled:opacity-50"
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
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(Registration);