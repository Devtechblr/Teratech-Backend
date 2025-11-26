import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-gray-200">
      <nav className="flex items-center px-4 py-2">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={'/favicon-removebg-preview.png'}
              alt="TerraTech Logo"
              className="w-12 sm:w-16 md:w-20 lg:w-24 h-auto object-contain mr-3 sm:mr-4 md:mr-6"
            />
          </Link>
        </div>

        {/* Center: Links (hidden on small screens) */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          <Link to="/" className="text-lg text-black hover:text-[#02A657] transition">Home</Link>
          <Link to="/products" className="text-lg text-black hover:text-[#02A657] transition">Products</Link>
          <Link to="/security" className="text-lg text-black hover:text-[#02A657] transition">Security and Defence</Link>
          <Link to="/civilian" className="text-lg text-black hover:text-[#02A657] transition">Civilian Application</Link>
          <Link to="/support" className="text-lg text-black hover:text-[#02A657] transition">Support</Link>
          <Link to="/about" className="text-lg text-black hover:text-[#02A657] transition">About Us</Link>
          <Link to="/contact" className="text-lg text-black hover:text-[#02A657] transition">Contact Us</Link>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <button
            className="bg-[#8F5D46] text-white font-bold px-6 py-2 rounded-[30px] cursor-pointer hidden sm:inline-flex"
            onClick={() => window.open("https://aryan-dcs.netlify.app", "_blank")}
          >
            Services
          </button>
          <div className="md:hidden flex items-center">
            <button
              className="bg-[#8F5D46] text-white font-bold px-6 py-2 rounded-[30px] cursor-pointer mr-4"
              onClick={() => window.open("https://aryan-dcs.netlify.app", "_blank")}
            >
              Services
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <Link
            to="/"
            className="block text-black py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            className="block text-black py-2"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/security"
            className="block text-black py-2"
            onClick={() => setMenuOpen(false)}
          >
            Security and Defence
          </Link>


          <Link
            to="/civilian"
            className="block text-black py-2"
            onClick={() => setMenuOpen(false)}
          >
            Civilian Application
          </Link>
          <Link
            to="/support"
            className="block text-black py-2"
            onClick={() => setMenuOpen(false)}
          >
            Support
          </Link>
          <Link
            to="/about"
            className="block text-black py-2"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>


        </div>
      )}

    </div>
  );
}

export default Navbar