// src/main.jsx - CLEANED VERSION
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// KEEP ONLY TAILWIND - remove everything else
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
)