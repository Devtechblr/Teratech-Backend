import React from 'react'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Getitnow from './pages/Getitnow/Getitnow'
import Contact from './pages/Contact/Contact'
import Security from './pages/Security/Security'
import Support from './pages/Support/Support'
import Civilian from './pages/Civilian/Civilian'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Topnav from './components/Topnav/Topnav'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Nav from './components/Topnav/Nav'

const AppContent = () => {
  const location = useLocation()
  const isGetItNowPage = location.pathname === '/getitnow'

  return (
    <>
      <Topnav />
      <Navbar />
      {isGetItNowPage && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/getitnow" element={<Getitnow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/security" element={<Security />} />
        <Route path="/support" element={<Support />} />
        <Route path="/civilian" element={<Civilian />} />
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
