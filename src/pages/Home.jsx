// src/pages/Home.jsx
import React from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import HomeSection1 from '../components/sections/HomeSection1';
import HomeSection2Cards from '../components/sections/HomeSection2Cards';
import HomeSectionWelcome from '../components/sections/HomeSectionWelcome';
import HomeSectionOurServices from '../components/sections/HomeSectionOurServices';
import HomeSection3Services from '../components/sections/HomeSection3Services';
import HomeSection4Stats from '../components/sections/HomeSection4Stats';
import HomeSection5Pricing from '../components/sections/HomeSection5Pricing';
import HomeSection6Features from '../components/sections/HomeSection6Features';
import HomeSection7Testimonials from '../components/sections/HomeSection7Testimonials';
import HomeSection8Services2 from '../components/sections/HomeSection8Services2';
import HomeSection9Clients from '../components/sections/HomeSection9Clients';
import HomeSection10Blogs from '../components/sections/HomeSection10Blogs';
import HomeSectionWhatWeDo from '../components/sections/HomeSectionWhatWeDo';
import ContactCTA from '../components/sections/ContactCTA';



const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeSectionWelcome />
      <HomeSection1 /> 
      
      <HomeSection2Cards />
    
    <HomeSectionOurServices />
      <HomeSection3Services />
     
      
      <HomeSection6Features />
      
      <HomeSectionWhatWeDo />
      <ContactCTA/>
     
      <HomeSection9Clients />
     
   

      <Footer />
    </div>
  );
};

export default Home;