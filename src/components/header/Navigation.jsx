// src/components/Header/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">WebHost</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="oi oi-menu"></span> Menu
        </button>

        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <li className={`nav-item ${isActive('/')}`}>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className={`nav-item ${isActive('/about')}`}>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className={`nav-item ${isActive('/domain')}`}>
              <Link to="/domain" className="nav-link">Domain</Link>
            </li>
            <li className={`nav-item ${isActive('/hosting')}`}>
              <Link to="/hosting" className="nav-link">Hosting</Link>
            </li>
            <li className={`nav-item ${isActive('/blog')}`}>
              <Link to="/blog" className="nav-link">Blog</Link>
            </li>
            <li className={`nav-item ${isActive('/contact')}`}>
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item cta">
              <Link to="/contact" className="nav-link"><span>Get started</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;