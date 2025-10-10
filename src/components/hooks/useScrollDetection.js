import { useState, useEffect } from 'react';

export const useScrollDetection = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const triggerHeight = window.innerHeight * 0.15; // 15vh trigger
      
      // Simple threshold - no complex logic needed
      if (scrollY > triggerHeight && !hasScrolled) {
        setHasScrolled(true);
      } else if (scrollY <= triggerHeight && hasScrolled) {
        setHasScrolled(false);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return hasScrolled;
};