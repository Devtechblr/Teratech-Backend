import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#1F2832] text-white py-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 px-4 md:px-8 text-center md:text-left">
        <div className="min-w-[180px] -mb-4 py-10 flex flex-col items-center md:items-start">
          <img src={('/favicon-removebg-preview.png')} alt="TerraTech Logo" className="w-34 h-30 mb-2" />
          <div className="flex gap-4 mt-2 mb-4 justify-center md:mt-4 md:mb-8 md:justify-start">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/facebook-removebg-preview.png" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/link.png" alt="LinkedIn" className="w-8 h-8" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/youtube.png" alt="YouTube" className="w-8 h-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/insta.png" alt="Instagram" className="w-10 h-10 -mt-1" />
            </a>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 py-4 sm:gap-x-4 sm:gap-y-8 sm:py-8 text-left md:text-left">
          <div className="-mt-14 sm:mt-0">
            <h4 className="mb-3 font-semibold pb-1 inline-block border-b-1 border-white-600 w-1/3">Application</h4>
            <ul className="space-y-8 text-sm mt-2">
              <li>Precision Mapping</li>
              <li>Surveying & GIS</li>
              <li>Survey And Mapping</li>
              <li>LIDAR Survey</li>
            </ul>
          </div>
          <div className="-mt-14 sm:mt-0">
            <h4 className="mb-3 font-semibold pb-1 inline-block border-b-1 border-white-600 w-1/2 whitespace-nowrap">Support &amp; Service</h4>
            <ul className="space-y-8 text-sm mt-2">
              <li>Targeted Solution</li>
              <li>Full Operational Services</li>
              <li>Fleet management</li>
              <li>Backend Solution</li>
            </ul>
          </div>
          <div className="mt-8 sm:mt-0">
            <h4 className="mb-3 font-semibold pb-1 inline-block border-b-1 border-white-600 w-1/5">About</h4>
            <ul className="space-y-8 text-sm mt-2">
              <li>Overview</li>
              <li>Meet Our Team</li>
              <li>Our Recognitions</li>
              <li>Gallery</li>
            </ul>
          </div>
          <div className="mt-6 sm:mt-0">
            <h4 className="mb-3 font-semibold pb-1 inline-block border-b-1 border-white-600 w-1/4">Contact</h4>
            <ul className="space-y-10 text-sm mt-2">
              <li className="font-semibold text-xs sm:text-sm break-all whitespace-nowrap">info@terratechaerospace.com</li>
              <li>+91 80500 4531</li>
              <li>24/1, 5th Main Rd, Peenya III Phase, Peenya, Bengaluru, Karnataka 560058</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright text */}
      <div className="text-center text-sm text-gray-400 border-t border-gray-600 mt-2 py-4 px-4">
        <div className="block md:inline">
          © 2025 <span className="text-white">Terratech Aerospace </span> All Rights Reserved.
        </div>
        <div className="mt-2">
          Powered by
          <a
            href="https://devcreationsblr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white cursor-pointer"
          >
            {" "}Dev Creations and Solutions
          </a>.
        </div>
      </div>
    </footer>

  )
}

export default Footer
