import React from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import AboutHero from '../components/about/AboutHero';
import CompanyValues from '../components/about/CompanyValues';
import HomeSectionOurServices from '../components/sections/HomeSectionOurServices';
import HomeSection9Clients from '../components/sections/HomeSection9Clients';

const About = () => {
  return (
  <>
    <Navigation/>

    <AboutHero/>
    <CompanyValues/>
    <HomeSectionOurServices />
    <HomeSection9Clients />


    <Footer/>
  </>
  )
}

export default About