import React from 'react'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Getitnow from './pages/Getitnow/Getitnow'
import Contact from './pages/Contact/Contact'
import Security from './pages/Security/Security'
import Support from './pages/Support/Support'
import Civilian from './pages/Civilian/Civilian'
import AdminLogin from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ProductListing from './pages/ProductListing/ProductListing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Topnav from './components/Topnav/Topnav'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const AppContent = () => {
  return (
    <>
      <Topnav />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/getitnow" element={<Getitnow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/security" element={<Security />} />
        <Route path="/support" element={<Support />} />
        <Route path="/civilian" element={<Civilian />} />

        {/* New Auth Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductListing />} />
      </Routes>
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
