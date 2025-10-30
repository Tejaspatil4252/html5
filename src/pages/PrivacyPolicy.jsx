import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaFileContract, 
  FaCookie, 
  FaUserLock, 
  FaArrowLeft, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaHandshake,
  FaCreditCard,
  FaLock,
  FaGlobe,
  FaUserCheck,
  FaSync
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const policySections = [
    {
      id: 1,
      icon: FaUserLock,
      title: "WHAT DO WE DO WITH YOUR INFORMATION?",
      content: `When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address, and email address.

When you browse our store, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.

Email marketing (if applicable): With your permission, we may send you emails about our store, new products, and other updates.`
    },
    {
      id: 2,
      icon: FaHandshake,
      title: "CONSENT",
      content: `How do you get my consent?

When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.

If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.

How do I withdraw my consent?

If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at corp@rapportsoft.co.in or mailing us at:

[Re: Privacy Compliance Officer]
[Rapportsoft Consulting & Technology Pvt Ltd, Office No-321, XION, Hinjawadi, Pune, Maharashtra-411057]`
    },
    {
      id: 3,
      icon: FaFileContract,
      title: "DISCLOSURE",
      content: `We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.`
    },
    {
      id: 4,
      icon: FaCreditCard,
      title: "PAYMENT",
      content: `We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.

Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.

PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.

For more insight, you may also want to read terms and conditions of razorpay on https://razorpay.com`
    },
    {
      id: 5,
      icon: FaGlobe,
      title: "THIRD-PARTY SERVICES",
      content: `In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.

However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.

For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.

In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.

Once you leave our store's website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.

Links

When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.`
    },
    {
      id: 6,
      icon: FaLock,
      title: "SECURITY",
      content: `To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.`
    },
    {
      id: 7,
      icon: FaCookie,
      title: "COOKIES",
      content: `We use cookies to maintain session of your user. It is not used to personally identify you on other websites.`
    },
    {
      id: 8,
      icon: FaUserCheck,
      title: "AGE OF CONSENT",
      content: `By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.`
    },
    {
      id: 9,
      icon: FaSync,
      title: "CHANGES TO THIS PRIVACY POLICY",
      content: `We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.

If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.`
    }
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
    
      
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-red-600 to-red-700 py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <FaShieldAlt className="text-3xl text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed"
            >
              Your privacy is our priority. Learn how we protect and handle your personal information with the utmost care and security.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-red-600 hover:text-red-700 font-semibold mb-8 group"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Previous Page
          </motion.button>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaFileContract className="text-xl text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
                <p className="text-gray-600">This privacy policy was last updated on January 15, 2024</p>
              </div>
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {policySections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <motion.button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-8 text-left flex items-center justify-between group"
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      <section.icon className={`text-2xl ${activeSection === section.id ? 'text-white' : 'text-red-600'} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h3>
                      <div className="flex items-center gap-2 text-gray-500">
                        <span>Section {section.id}</span>
                        <span>•</span>
                        <span>Click to {activeSection === section.id ? 'collapse' : 'expand'}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaArrowLeft className="text-red-600 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-8 bg-gray-50">
                        <div className="prose prose-lg max-w-none">
                          {section.content.split('\n\n').map((paragraph, idx) => (
                            <motion.p
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                              className="text-gray-700 leading-relaxed mb-4"
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 mt-12 text-white"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Questions and Contact Information</h3>
              <p className="text-red-100 text-lg mb-6">
                If you would like to: access, correct, amend or delete any personal information we have about you, 
                register a complaint, or simply want more information contact our Privacy Compliance Officer
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <motion.a
                  href="mailto:corp@rapportsoft.co.in"
                  className="flex items-center gap-3 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="text-lg" />
                  corp@rapportsoft.co.in
                </motion.a>
                <div className="flex items-center gap-3 text-red-100">
                  <FaMapMarkerAlt className="text-lg" />
                  <span className="text-sm">
                    Rapportsoft Consulting & Technology Pvt Ltd,<br />
                    Office No-321, XION, Hinjawadi, Pune, Maharashtra-411057
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;