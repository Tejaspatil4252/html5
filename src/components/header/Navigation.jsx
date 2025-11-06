import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HeroNav from '../nav/HeroNav';
import RegularNav from '../nav/RegularNav';

const Navigation = ({ user, onSignOut, onAddBranch }) => { // 🆕 Receive user and onSignOut as props
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showRegularNav, setShowRegularNav] = useState(false);
  const heroNavRef = useRef(null);
  const location = useLocation();

  // Track when HeroNav navigation goes out of view
  useEffect(() => {
    const checkNavVisibility = () => {
      if (!heroNavRef.current || isMobile) {
        setShowRegularNav(true);
        return;
      }

      const heroNavRect = heroNavRef.current.getBoundingClientRect();
      // Show RegularNav when HeroNav's bottom (where nav links are) goes above viewport top
      const shouldShowRegularNav = heroNavRect.bottom <= 0;
      
      setShowRegularNav(shouldShowRegularNav);
    };

    const throttledScroll = () => {
      requestAnimationFrame(checkNavVisibility);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    checkNavVisibility(); // Initial check
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isMobile]);

  // Initialize
  useEffect(() => {
    // 🆕 REMOVED: User auth check - now handled in App.js
    // Check mobile only
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, always show RegularNav
      if (mobile) setShowRegularNav(true);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🆕 REMOVED: Local handleSignOut function - using prop from App.js

  const navItems = [
    { name: 'Home', path: '/', active: location.pathname === '/' },
    { name: 'About Us', path: '/about', active: location.pathname === '/about' },
    { name: 'Products', path: '/products', active: location.pathname === '/products' },
    { name: 'Services', path: '/services', active: location.pathname === '/services' },
    { name: 'Clients', path: '/clients', active: location.pathname === '/clients' },
    { name: 'Career', path: '/career', active: location.pathname === '/career' },
    { name: 'News', path: '/news', active: location.pathname === '/news' },
    { name: 'Blogs', path: '/blogs', active: location.pathname === '/blogs' },
    { name: 'Contact Us', path: '/contact', active: location.pathname === '/contact' },
    { name: 'Pricing', path: '/pricing', active: location.pathname === '/pricing' }
  ];

  return (
    <>
      {/* HeroNav - Always render but track its position */}
      <div 
        ref={heroNavRef}
        style={{ height: '30vh' }} 
        className={isMobile ? 'hidden' : ''}
      >
        <HeroNav 
          navItems={navItems}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          currentPage={location.pathname}
          user={user} // 🆕 Use prop from App.js
          onSignOut={onSignOut}
            onAddBranch={onAddBranch} // 🆕 Use prop from App.js
        />
      </div>

      {/* RegularNav - Show when HeroNav nav is out of view OR on mobile */}
      {showRegularNav && (
        <>
          <RegularNav 
            navItems={navItems}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user} // 🆕 Use prop from App.js
            onSignOut={onSignOut} // 🆕 Use prop from App.js
              onAddBranch={onAddBranch}
          />
          {isMobile && <div className="h-16"></div>}
        </>
      )}
    </>
  );
};

export default Navigation;