import React from 'react'

const Footer = () => {
  return (
    <footer className="ftco-footer ftco-section" style={{backgroundColor: '#dc2626'}}>
  <div className="container">
    <div className="row mb-5">
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2" style={{color: 'white'}}>RapportSoft</h2>
          <p style={{color: 'rgba(255,255,255,0.8)'}}>Software solutions for a small planet. We provide innovative hosting and development services to help your business thrive.</p>
          <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
            <li className="ftco-animate"><a href="#" style={{color: 'white'}}><span className="icon-twitter"></span></a></li>
            <li className="ftco-animate"><a href="#" style={{color: 'white'}}><span className="icon-facebook"></span></a></li>
            <li className="ftco-animate"><a href="#" style={{color: 'white'}}><span className="icon-instagram"></span></a></li>
          </ul>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4 ml-md-5">
          <h2 className="ftco-heading-2" style={{color: 'white'}}>Useful Links</h2>
          <ul className="list-unstyled">
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Servers</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Windows Hosting</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Cloud Hosting</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>OS Servers</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Linux Servers</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2" style={{color: 'white'}}>Navigational</h2>
          <ul className="list-unstyled">
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Home</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Domain</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Hosting</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>About</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Blog</a></li>
            <li><a href="#" className="py-2 d-block" style={{color: 'rgba(255,255,255,0.8)'}}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2" style={{color: 'white'}}>Office</h2>
          <div className="block-23 mb-3">
            <ul>
              <li style={{color: 'rgba(255,255,255,0.8)'}}>
                <span className="icon icon-map-marker" style={{color: 'white'}}></span>
                <span className="text">123 Tech Street, Digital City, CA 94000</span>
              </li>
              <li style={{color: 'rgba(255,255,255,0.8)'}}>
                <a href="#" style={{color: 'rgba(255,255,255,0.8)'}}>
                  <span className="icon icon-phone" style={{color: 'white'}}></span>
                  <span className="text">+1 (555) 123-4567</span>
                </a>
              </li>
              <li style={{color: 'rgba(255,255,255,0.8)'}}>
                <a href="#" style={{color: 'rgba(255,255,255,0.8)'}}>
                  <span className="icon icon-envelope" style={{color: 'white'}}></span>
                  <span className="text">hello@rapportsoft.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-center">
        <p style={{color: 'rgba(255,255,255,0.8)'}}>
          Copyright &copy;{new Date().getFullYear()} All rights reserved | RapportSoft - Software Solution for Small Planet
        </p>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer