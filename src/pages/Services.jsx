import React from 'react'
import Navigation from '../components/header/Navigation'
import Footer from '../components/footer/Footer'
import ServicesDisplay from '../components/service/ServicesDisplay'
import servicesData from '../data/ServicesData';
import ServicesHeader from '../components/service/ServicesHeader';

const Services = () => {
  return (
      <>
    <Navigation/>
    <ServicesHeader services={servicesData}/>
    <ServicesDisplay services={servicesData} />
    <Footer/>
  </>
  )
}

export default Services