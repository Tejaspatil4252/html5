// src/pages/Home.jsx - PURPLE BACKGROUND, NORMAL DASHBOARD IMAGES
import React from 'react';
import Navigation from '../components/header/Navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Import images
import bg1 from '../assets/images/bg_1.jpg';
import bg2 from '../assets/images/bg_2.jpg';
import dashboard1 from '../assets/images/dashboard_full_1.png';
import dashboard3 from '../assets/images/dashboard_full_3.png';
import Footer from '../components/footer/Footer';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true
  };

  return (
    <div>
      <Navigation />
      {/* SECTION 1: Hero Slider with Purple Background */}
      <section className="home-slider">
  <Slider {...sliderSettings}>
    {/* Slide 1 */}
    <div className="slider-item">
      <div style={{ 
        backgroundColor: '#dc2626', // Solid red background
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        minHeight: '700px',
        position: 'relative'
      }}>
        <div className="overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(220, 38, 38, 0.7)' // Strong red overlay
        }}></div>
        <div className="container-fluid" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row slider-text align-items-center" style={{ minHeight: '700px' }}>
            <div className="col-md-5 wrap col-sm-12">
              <h1 className="mb-4 mt-5 text-white">
                Everything you get what you need to Host your website
              </h1>
              <p className="mb-4 mb-md-5 sub-p text-white">
                Up to 90% Discount with Free Domain Name Registration
              </p>
<p>
  {/* Get Started Button */}
  <a href="#" className="btn p-3 px-xl-5 py-xl-3" style={{
    backgroundColor: '#dc2626',
    border: '2px solid white',
    color: 'white',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 'bold'
  }} onMouseOver={(e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = '#dc2626';
    e.target.style.color = 'white';
    e.target.style.borderColor = 'white';
  }}>Get started</a>
  
  {/* Read More Button */}
  <a href="#" className="btn p-3 px-xl-5 py-xl-3 ml-3" style={{
    backgroundColor: '#dc2626',
    border: '2px solid white',
    color: 'white',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 'bold'
  }} onMouseOver={(e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = '#dc2626';
    e.target.style.color = 'white';
    e.target.style.borderColor = 'white';
  }}>Read more</a>
</p>

            </div>
            <div className="col-md-7">
              <img 
                src={dashboard1} 
                className="img-fluid" 
                alt="Dashboard" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="slider-item">
      <div style={{ 
        backgroundColor: '#dc2626', // Solid red background
        backgroundImage: `url(${bg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        minHeight: '700px',
        position: 'relative'
      }}>
        <div className="overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(220, 38, 38, 0.7)' // Strong red overlay
        }}></div>
        <div className="container-fluid" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row slider-text align-items-center" style={{ minHeight: '700px' }}>
            <div className="col-md-5 wrap col-sm-12">
              <h1 className="mb-4 mt-5 text-white">
                The Web Hosting Platform Made for You
              </h1>
              <p className="mb-4 mb-md-5 text-white">
                A small river named Duden flows by their place and supplies it with the necessary regelialia.
              </p>
           <p>
  {/* Get Started Button */}
  <a href="#" className="btn p-3 px-xl-5 py-xl-3" style={{
    backgroundColor: '#dc2626',
    border: '2px solid white',
    color: 'white',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 'bold'
  }} onMouseOver={(e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = '#dc2626';
    e.target.style.color = 'white';
    e.target.style.borderColor = 'white';
  }}>Get started</a>
  
  {/* Read More Button */}
  <a href="#" className="btn p-3 px-xl-5 py-xl-3 ml-3" style={{
    backgroundColor: '#dc2626',
    border: '2px solid white',
    color: 'white',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 'bold'
  }} onMouseOver={(e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
    
  }} onMouseOut={(e) => {
    e.target.style.backgroundColor = '#dc2626';
    e.target.style.color = 'white';
    e.target.style.borderColor = 'white';
  }}>Read more</a>
</p>
            </div>
            <div className="col-md-7">
              <img 
                src={dashboard3} 
                className="img-fluid" 
                alt="Dashboard" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slider>
</section>

 {/* Footer*/}
 <Footer />
    </div>
  );
};

export default Home;