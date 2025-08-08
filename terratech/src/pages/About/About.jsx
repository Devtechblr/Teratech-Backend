import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms     // only animate once
    });
  }, []);
  return (
    <>
      {/* Top image with CONTACT button */}
      <div className="relative w-full">
        <img src='/assets/Contact.png' alt="TerraTech Aerospace Logo" className="h-full w-full max-w-full object-cover mx-auto" />
      </div>

      {/* OVERVIEW box */}
      <div className="flex justify-center w-full mt-0 px-2 md:px-0">
        <div className="bg-[#1C98ED80] bg-opacity-50 px-4 md:px-16 py-2 md:py-4 w-full max-w-[10rem] md:max-w-sm flex justify-center">
          <span className="text-black text-lg md:text-4xl tracking-wide text-center w-full">OVERVIEW</span>
        </div>
      </div>

      {/* Overview description */}
      <div className="flex flex-col items-center w-full mt-6 px-4">
        <p className="text-center text-base md:text-lg font-semibold max-w-4xl mb-4">
          We cater to the unique needs of various sectors, leveraging the latest aerospace technology and UAV (Unmanned Aerial Vehicle) systems to optimize project outcomes for our clients.
        </p>
        <p className="text-center text-sm md:text-base max-w-4xl mb-8">
          <span className="font-bold">Founded in 2018,</span> Aryan Group is a pioneer in drone technology solutions, providing advanced engineering services across a wide range of sectors. We are committed to transforming industries through drone-powered innovation, delivering precision, efficiency and sustainability. Our core capabilities include Drone-Based Surveys, GIS Modelling & Analysis, Aerial Mapping, Drone Consulting, Drone Engineering and Drone Manufacturing.
        </p>
      </div>

      {/* FLYBOT-X section */}
      <div className="w-full py-10 px-4 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start relative">

          {/* Drone Image: Left Aligned, Not in Container */}
          <div className="w-full md:w-1/2 flex justify-start mb-6 md:mb-0">
            <img
              src="/assets/image 20.png"
              alt="FLYBOT-X"
              className="w-full max-w-xs md:max-w-md object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Faded Logo Behind Text */}

          {/* Text Content in Container */}
          <div className="w-full md:w-1/2 px-4 py-10 md:px-10 z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#000] mb-4 tracking-tight" data-aos="fade-up">
              FLYBOT-X
            </h2>
            <p className="text-gray-800 text-base md:text-lg font-medium leading-relaxed mb-4" data-aos="fade-up">
              FLYBOT-X is an advanced UAV developed by TerraTech Aerospace, engineered for precision and endurance in mission-critical operations.
            </p>
            <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm md:text-base font-semibold" data-aos="fade-up">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#000] rounded-full"></span> Coast Guard Monitoring
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#000] rounded-full"></span> Disaster Monitoring
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#000] rounded-full"></span> Search and Rescue
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#000] rounded-full"></span> Border Control
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Meet Our Team Section */}
      <div className="w-full flex flex-col items-center mt-8 px-2 sm:px-4" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <img src='/assets/Frame 15.png' alt="Team Member" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover mb-4" />
              <div className="text-lg font-bold text-center">Your Name</div>
              <div className="text-base text-center mb-2">subtitle</div>
              <div className="text-sm text-center text-gray-700 max-w-[220px]">
                Our UAVs have been designed to be able to handle all terrains and temperature conditions.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recognitions Section */}
      <div className="w-full flex flex-col items-center mt-12 px-8 py-12 sm:px-4" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Recognitions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-y-8 gap-x-6 w-full max-w-5xl mx-auto items-center justify-center">
          <img src="/assets/adani.png" alt="Adani" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/NHAI.png" alt="NHAI" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/UP-removebg-preview.png" alt="UP Gov" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/lingayat.png" alt="Police" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/4b65d1139efdffaf9fc23d2c1b60890c68e3c9e9.jpg" alt="IIT" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/tngis.png" alt="TNGIS" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/Krishna+Bhagya+Jala+Nigam+Limited+Tenders.png" alt="Water" className="w-20 sm:w-24 lg:w-28 mx-auto" />
          <img src="/assets/661b68dcc19c06526fc2c8524964974b830fa870.png" alt="Karnataka" className="col-span-1 sm:col-span-2 lg:col-span-2 w-18 sm:w-26 lg:w-28 xl:w-30 mx-auto" />
          <img src="/assets/namma-metro-seeklogo 1.png" alt="Metro" className="col-span-1 sm:col-span-2 lg:col-span-2 w-36 sm:w-48 lg:w-64 xl:w-72 mx-auto" />
          <img src="/assets/logo (1).png" alt="Survey of India" className="col-span-3 sm:col-span-1 lg:col-span-3 w-40 sm:w-56 lg:w-72 xl:w-80 mx-auto" />
        </div>
      </div>

    </>
  )
}

export default About
