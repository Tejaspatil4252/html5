// src/pages/Home.jsx
import React from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import HomeSection1 from '../components/sections/HomeSection1';
import HomeSection2Domain from '../components/sections/HomeSection2Domain';
import HomeSection3Services from '../components/sections/HomeSection3Services';
import HomeSection4Stats from '../components/sections/HomeSection4Stats';
import HomeSection5Pricing from '../components/sections/HomeSection5Pricing';
import HomeSection6Features from '../components/sections/HomeSection6Features';
import HomeSection7Testimonials from '../components/sections/HomeSection7Testimonials';
import HomeSection8Services2 from '../components/sections/HomeSection8Services2';
import HomeSection9Clients from '../components/sections/HomeSection9Clients';
import HomeSection10Blogs from '../components/sections/HomeSection10Blogs';


const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeSection1 /> 
      <HomeSection2Domain />
      <HomeSection3Services />
      <HomeSection4Stats />
      <HomeSection5Pricing />
      <HomeSection6Features />
      <HomeSection7Testimonials />
      <HomeSection8Services2 />
      <HomeSection9Clients />
      <HomeSection10Blogs />
   

      <Footer />
    </div>
  );
};

export default Home;