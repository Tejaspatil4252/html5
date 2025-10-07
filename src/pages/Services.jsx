import React from 'react'
import Navigation from '../components/header/Navigation'
import Footer from '../components/footer/Footer'
import ServicesDisplay from '../components/service/ServicesDisplay'
import servicesData from '../data/ServicesData';

const Services = () => {
  return (
      <>
    <Navigation/>
    <ServicesDisplay services={servicesData} />
    <Footer/>
  </>
  )
}

export default Services