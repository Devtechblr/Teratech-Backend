import React from 'react'
import { Link } from "react-router-dom";
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms     // only animate once
    });
  }, []);
  return (
    <>
      {/* Logo + Text */}
      <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh] flex justify-end items-start bg-gradient-to-br from-[#fff] via-[#fff] to-[#fff] overflow-hidden">
        {/* LOGO + TEXT Section */}
        <div className="absolute top-0 left-1 sm:top-2 sm:left-4 md:top-4 md:left-12 lg:top-6 lg:left-16 xl:top-8 xl:left-20 2xl:top-10 2xl:left-28 py-4 px-2 z-20">
          {/* <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <img
              src={'/favicon-removebg-preview.png'}
              alt="Website Logo"
              className="w-14 sm:w-14 md:w-18 lg:w-22 xl:w-26 2xl:w-32 h-auto object-contain"
            />
          </div> */}
          <div className="mt-10 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-24 flex flex-col gap-2 sm:gap-3 md:gap-4">
            <div className="flex flex-col items-start gap-1 sm:gap-1" >
              <h1 className="text-[#1F2832] text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl uppercase tracking-widest font-bold">
                A High Performance
              </h1>
              <p className="text-[#1F2832] text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl uppercase tracking-widest font-bold">
                Commercial Drone
              </p>
            </div>

            <div className="bg-[#1F2832] mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-16 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 2xl:px-12 2xl:py-6 rounded-lg w-fit shadow-md">
              <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-wide">
                FLYBOT-<span className="text-cyan-400 font-light">X</span>
              </h2>
            </div>
          </div>



        </div>

        {/* Right Side: Drone Image + Button */}
        <div className="relative w-full h-full overflow-x-hidden z-10">
          <div className="absolute top-0 -right-1 w-[70%] h-[92%]">
            <img
              src='/assets/main.png'
              alt="Hero Background"
              className="w-full h-[100%] object-cover saturate-110 rounded-bl-[4rem]"
            />
          </div>

          <Link
            to="/getitnow"
            className="absolute py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 bottom-1 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10 2xl:bottom-12 right-0 bg-gradient-to-r from-[#1F2832] to-[#2e3e4f] text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl w-20 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64 font-medium shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out text-center flex items-center justify-center rounded"
          >
            Get It Now
          </Link>

        </div>
      </div>

      <div className="flex justify-center py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 px-4" >
        <div className="bg-gradient-to-r from-[#1C98ED]/80 to-[#1C98ED]/60 flex flex-row justify-center items-center text-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 w-fit rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg backdrop-blur-sm">
          {/* Left Block */}
          <div className="w-fit px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6">
            <h2 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#1F2832] mb-0.5 sm:mb-1 md:mb-2">
              +<CountUp start={1} end={40} duration={4} />
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#1F2832] font-medium">
              Estimated Range
            </p>
          </div>

          {/* Divider */}
          <div className="block w-0.5 h-6 sm:h-8 md:h-12 lg:h-14 xl:h-16 2xl:h-20 bg-white/60 mx-1 sm:mx-2 md:mx-3 lg:mx-4 xl:mx-5 2xl:mx-6"></div>

          {/* Right Block */}

          <div className="w-fit px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6">
            <h2 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#1F2832] mb-0.5 sm:mb-1 md:mb-2">
              Upto +<CountUp start={1} end={7} duration={6} />kgs
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#1F2832] font-medium">
              of Maximum takeoff weight
            </p>
          </div>

        </div>
      </div>


      <div className="w-full min-h-screen bg-white p-0 m-0">
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 bg-white text-center">
          {/* Heading */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-center" data-aos="fade-up">
            A High Performance Commercial
            <br />
            <span className="block mt-2 sm:mt-3 md:mt-4">Drone from Teratech</span>
          </h2>


          {/* Description */}
          <p className="text-gray-700 max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16" data-aos="fade-up">
            A High Performance Commercial Drone and UAV with the airframe Minimum takeoff weight 4 kg and
            Maximum takeoff weight of 7kg ,and is capable of executing rapid aerial surveys across vast
            and difficult terrain whilst maintaining high accuracy and even higher confidence. The
            FLYBOT-X comes equipped with a choice of payload sensors such as photogrammetry, ISR and
            multi-spectral or can be customized to suit your requirements or integrated with your existing
            payloads
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 max-w-5xl mx-auto" data-aos="fade-up">
            {/* First Card */}
            <div className="relative overflow-hidden rounded-md shadow-md">
              <img src='/assets/drone.png' alt="Drone Security" className="w-full h-auto object-cover" />

              {/* Bottom black gradient shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40 bg-gradient-to-t from-black to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end text-left p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8">
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">FLYBOT-X FOR</p>
                <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold">SECURITY AND DEFENCE USAGE</h3>
              </div>
            </div>

            {/* Second Card */}
            <div className="relative overflow-hidden rounded-md shadow-md">
              <img src='/assets/drone.png' alt="Drone Civilian" className="w-full h-auto object-cover" />

              {/* Bottom black gradient shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40 bg-gradient-to-t from-black to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end text-left p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8">
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4">FLYBOT-X FOR</p>
                <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold">CIVILIAN APPLICATIONS</h3>
              </div>
            </div>
          </div>

        </section>

        {/* Application Section */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16 bg-white" data-aos="fade-up">
          <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 sm:mb-6 md:mb-8 border-b-2 border-black w-fit mx-auto pb-2">
            APPLICATION
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-800 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16">
            {/* Left Column */}
            <div>
              <h3 className="font-bold mb-2">PRECISION MAPPING</h3>
              <p>
                The Flybot-X enables the user to execute Precision-driven solutions that simplifies
                surveying and mapping processes with Dual GPS, mapping missions, capture high
                resolution images, and create 2D and 3D maps
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">SURVEYING & GIS</h3>
              <p>
                Surveying with FLYBOT-X offers enormous potential to GIS professionals. With a
                superior grade topographic survey quality with highly accurate measurements, but in a
                fraction of time. In addition to the and reduced cost and man-hours.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">SURVEY AND MAPPING</h3>
              <p>
                The modularity of the FLYBOT-X gives the flexibility to do it all with one integrated
                solution. With both heavy lift capabilities and long endurance, FLYBOT-X is tailored
                for anything from a simple lightweight package to heavy multi-sensor setups.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">LIDAR SURVEYS</h3>
              <p>
                Surveys for applications like electric utility lines, mining, topographic maps,
                vegetation management, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Service and Support Section */}
        <div className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 bg-white overflow-hidden" data-aos="fade-up">
          <img
            src='/Frame 64 (3).png'
            alt="Banner visual"
            className="w-full h-auto"
          />
        </div>

      </div >
    </>
  )
}

export default Home