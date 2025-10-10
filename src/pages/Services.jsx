import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import ServicesDisplay from '../components/service/ServicesDisplay';
import servicesData from '../data/ServicesData';
import ServicesHeader from '../components/service/ServicesHeader';

const Services = () => {
  const location = useLocation(); 
  const [selectedService, setSelectedService] = useState(null);

  //  TO HANDLE SERVICE SELECTION FROM FOOTER
  useEffect(() => {
    if (location.state?.selectedService) {
     
      setSelectedService(location.state.selectedService);
    }
  }, [location.state]);

  // TO HANDLE SERVICE SELECTION WHEN ALREADY ON PAGE
  const handleServiceSelect = (service) => {
    
    setSelectedService(service);
  };

  return (
    <>
      <Navigation/>
      <ServicesHeader 
      services={servicesData}
      onServiceSelect={handleServiceSelect}/>
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