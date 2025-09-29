import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#02A657]">
      <nav className="flex items-center px-4 py-2">
        <button
          className="bg-white text-black text-lg px-8 py-1 rounded-[30px] cursor-pointer ml-2 md:ml-16"
          onClick={() => window.open("https://aryan-dcs.netlify.app", "_blank")}
        >
          Services
        </button>

        <div className="hidden md:flex space-x-8 ml-20">
          <Link to="/" className="text-white hover:text-gray-200 transition">Home</Link>
          <Link to="/security" className="text-white">Security and Defence</Link>
          <Link to="/products" className="text-white">Products</Link>
          <Link to="/civilian" className="text-white">Civilian Application</Link>
          <Link to="/support" className="text-white">Support</Link>
          <Link to="/about" className="text-white">About Us</Link>
          <Link to="/contact" className="text-white">Contact Us</Link>
        </div>
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <Link
            to="/"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/security"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Security and Defence
          </Link>
          <Link
            to="/products"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/civilian"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Civilian Application
          </Link>
          <Link
            to="/support"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Support
          </Link>
          <Link
            to="/about"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-white py-2"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

        </div>
      )}

    </div>
  );
}

export default Navbar
