import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogSingle from './pages/BlogSingle'
import Domain from './pages/Domain'
import Hosting from './pages/Hosting'
import './App.css'
import './index.css'; 

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<BlogSingle />} />
        <Route path="/domain" element={<Domain />} />
        <Route path="/hosting" element={<Hosting />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
