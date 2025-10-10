import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollDetection } from '../hooks/useScrollDetection';
import HeroNav from '../nav/HeroNav';
import RegularNav from '../nav/RegularNav';

;

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const hasScrolled = useScrollDetection();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', active: location.pathname === '/' },
    { name: 'About Us', path: '/about', active: location.pathname === '/about' },
    { name: 'Products', path: '/products', active: location.pathname === '/products' },
    { name: 'Services', path: '/services', active: location.pathname === '/services' },
    { name: 'Clients', path: '/clients', active: location.pathname === '/clients' },
    { name: 'Career', path: '/career', active: location.pathname === '/career' },
    { name: 'News', path: '/news', active: location.pathname === '/news' },
    { name: 'Blogs', path: '/blogs', active: location.pathname === '/blogs' },
    { name: 'Contact Us', path: '/contact', active: location.pathname === '/contact' }
  ];

  return (
    <>
      {/* HeroNav - Always takes 30vh space */}
      <div style={{ height: '30vh' }}>
        <HeroNav 
          navItems={navItems}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          currentPage={location.pathname}
        />
      </div>

      {/* RegularNav - Appears as sticky when scrolled past 15vh */}
      {hasScrolled && (
        <RegularNav 
          navItems={navItems}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default Navigation;