import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TokenChecker = ({ user, onSignOut }) => {
  const navigate = useNavigate();

  // Check if token is expired
  const checkTokenExpiry = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiry;
    } catch (error) {
      return true; // If token is invalid, treat as expired
    }
  };

  // Check token on component mount and every 5 minutes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token && checkTokenExpiry(token)) {
        // Token expired - trigger logout
        toast.error('Session expired. Please login again.');
        onSignOut(); // Use your existing signOut function
      }
    };

    // Check immediately when component mounts
    checkAuth();

    // Set up interval to check every 5 minutes
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [user, onSignOut, navigate]);

  // This component doesn't render anything visible
  return null;
};

export default TokenChecker;