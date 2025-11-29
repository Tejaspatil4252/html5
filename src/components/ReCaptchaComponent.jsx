import React, { useEffect, useRef } from 'react';

const RecaptchaComponent = ({ onVerify }) => {
  const recaptchaRef = useRef(null);
  const isRendered = useRef(false);
  
  // Get key from .env
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey || isRendered.current) return;

    // Add reCAPTCHA callback to window
    window.onRecaptchaLoad = () => {
      if (window.grecaptcha && recaptchaRef.current && !isRendered.current) {
        isRendered.current = true;
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          theme: 'light'
        });
      }
    };

    // Check if script already loaded
    if (window.grecaptcha) {
      window.onRecaptchaLoad();
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    return () => {
      // Cleanup
      window.onRecaptchaLoad = null;
    };
  }, [siteKey, onVerify]);

return (
  <div className="bg-white border border-gray-300 rounded p-4">
    <div className="flex justify-center">
      <div ref={recaptchaRef} />
    </div>
    <div className="mt-3 text-xs text-gray-500 text-center">
      Protected by reCAPTCHA
    </div>
  </div>
);
};

export default RecaptchaComponent;