import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // ADD THIS IMPORT
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import ServicesDisplay from '../components/service/ServicesDisplay';
import servicesData from '../data/ServicesData';
import ServicesHeader from '../components/service/ServicesHeader';

const Services = () => {
  const location = useLocation(); // ADD THIS HOOK
  const [selectedService, setSelectedService] = useState(null); // ADD STATE

  // ADD THIS useEffect TO HANDLE SERVICE SELECTION FROM FOOTER
  useEffect(() => {
    if (location.state?.selectedService) {
      console.log('🟢 Services.js - Received selected service:', location.state.selectedService);
      setSelectedService(location.state.selectedService);
    }
  }, [location.state]);

  // ADD THIS FUNCTION TO HANDLE SERVICE SELECTION WHEN ALREADY ON PAGE
  const handleServiceSelect = (service) => {
    console.log('🟢 Services.js - Service selected via callback:', service);
    setSelectedService(service);
  };

  return (
    <>
      <Navigation/>
      <ServicesHeader services={servicesData}/>
      {/* PASS SELECTED SERVICE AND CALLBACK TO SERVICESDISPLAY */}
      <ServicesDisplay 
        services={servicesData} 
        selectedService={selectedService}
        onServiceSelect={handleServiceSelect}
      />
      {/* PASS CALLBACK TO FOOTER */}
      <Footer onServiceSelect={handleServiceSelect}/>
    </>
  );
}

export default Services;