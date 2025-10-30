import React from 'react';
import Navigation from '../components/header/Navigation';
import Footer from '../components/footer/Footer';
import ContactHeader from '../components/contact/ContactHeader';
import ContactDetails from '../components/contact/ContactDetails';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';

const Contact = () => {
  return (
    <>
     
      <ContactHeader/>
      
      {/* Reduced padding and tighter grid */}
      <div className="bg-white py-12"> {/* Reduced from py-16 */}
        <div className="container mx-auto px-4 max-w-6xl"> {/* Reduced from px-6 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Reduced from gap-12 */}
            <ContactDetails/>  {/* Left Side */}
            <ContactForm/>     {/* Right Side */}
          </div>
        </div>
      </div>

      <ContactMap/>
      
      <Footer/>
    </>
  );
}

export default Contact;