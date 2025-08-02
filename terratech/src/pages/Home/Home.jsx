import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Logo + Text */}
      <div className="relative w-full h-[40vh] md:h-[80vh] lg:h-[90vh] flex justify-end items-start bg-gradient-to-br from-[#fff] via-[#fff] to-[#fff] overflow-hidden">
        {/* LOGO + TEXT Section */}
        <div className="absolute top-0 left-1 sm:top-14 sm:left-4 md:top-28 md:left-16 lg:top-12 lg:left-14 2xl:top-30 2xl:left-34 py-4 px-2 z-20">
          <div className="flex items-center space-x-4">
            <img
              src={'/favicon-removebg-preview.png'}
              alt="Website Logo"
              className="w-12 sm:w-16 md:w-20 lg:w-34 2xl:w-80 h-auto object-contain"
            />
          </div>
          <div className="mt-6 sm:mt-20 2xl:mt-62 flex flex-col sm:gap-4">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-[#1F2832] text-xs sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-7xl uppercase tracking-widest">
                A High Performance
              </h1>
              <p className="text-[#1F2832] text-xs sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-7xl 2xl:mt-10 uppercase tracking-widest">
                Commercial Drone
              </p>
            </div>

            <div className="bg-[#1F2832] mt-6 px-2 py-1 sm:mt-6 sm:px-6 sm:py-4 2xl:mt-30 2xl:px-34 2xl:py-8 rounded-lg w-fit shadow-md">
              <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-8xl font-bold tracking-wide">
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
              className="w-full h-[100%] object-cover saturate-150 contrast-125 rounded-bl-[4rem]"
            />
          </div>

          <Link
            to="/getitnow"
            className="absolute py-1 bottom-1 sm:bottom-8 2xl:bottom-20 right-0 bg-gradient-to-r from-[#1F2832] to-[#2e3e4f] text-white text-sm sm:text-xl w-30 sm:w-60 sm:py-3 2xl:w-80 2xl:py-8 2xl:text-4xl font-medium shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out text-center flex items-center justify-center rounded"
          >
            Get It Now
          </Link>

        </div>
      </div>

      <div className="flex justify-center py-4 md:py-8 px-4">
        <div className="bg-gradient-to-r from-[#1C98ED]/80 to-[#1C98ED]/60 flex flex-row justify-center items-center text-center px-3 md:px-8 py-4 md:py-8 gap-2 md:gap-16 w-fit rounded-lg md:rounded-2xl shadow-lg backdrop-blur-sm">
          {/* Left Block */}
          <div className="w-fit px-1 md:px-4">
            <h2 className="text-lg md:text-4xl font-bold text-[#1F2832] mb-0.5 md:mb-2">+ 40m</h2>
            <p className="text-xs md:text-lg text-[#1F2832] font-medium">Estimated Range</p>
          </div>

          {/* Divider */}
          <div className="block w-0.5 h-8 md:h-16 bg-white/60 mx-1 md:mx-4"></div>

          {/* Right Block */}
          <div className="w-fit px-1 md:px-4">
            <h2 className="text-lg md:text-4xl font-bold text-[#1F2832] mb-0.5 md:mb-2">Upto +7kgs</h2>
            <p className="text-xs md:text-lg text-[#1F2832] font-medium">of Maximum takeoff weight</p>
          </div>
        </div>
      </div>


      <div className="w-full min-h-screen bg-white p-0 m-0">
        <section className="px-4 md:px-12 lg:px-20 py-6 bg-white text-center">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
            A High Performance Commercial
            <br />
            <span className="block mt-4">Drone from Teratech</span>
          </h2>


          {/* Description */}
          <p className="text-gray-700 max-w-4xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            A High Performance Commercial Drone and UAV with the airframe Minimum takeoff weight 4 kg and
            Maximum takeoff weight of 7kg ,and is capable of executing rapid aerial surveys across vast
            and difficult terrain whilst maintaining high accuracy and even higher confidence. The
            FLYBOT-X comes equipped with a choice of payload sensors such as photogrammetry, ISR and
            multi-spectral or can be customized to suit your requirements or integrated with your existing
            payloads
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* First Card */}
            <div className="relative overflow-hidden rounded-md shadow-md">
              <img src='/assets/drone.png' alt="Drone Security" className="w-full h-auto object-cover" />

              {/* Bottom black gradient shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end text-left p-4">
                <p className="text-white text-lg font-semibold mb-4">FLYBOT-X FOR</p>
                <h3 className="text-white text-lg md:text-xl font-bold">SECURITY AND DEFENCE USAGE</h3>
              </div>
            </div>

            {/* Second Card */}
            <div className="relative overflow-hidden rounded-md shadow-md">
              <img src='/assets/drone.png' alt="Drone Civilian" className="w-full h-auto object-cover" />

              {/* Bottom black gradient shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end text-left p-4">
                <p className="text-white text-lg font-semibold mb-4">FLYBOT-X FOR</p>
                <h3 className="text-white text-lg md:text-xl font-bold">CIVILIAN APPLICATIONS</h3>
              </div>
            </div>
          </div>

        </section>

        {/* Application Section */}
        <section className="px-4 md:px-12 lg:px-20 py-12 bg-white">
          <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold mb-6 border-b-2 border-black w-fit mx-auto pb-2">
            APPLICATION
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 text-sm md:text-base text-gray-800 mt-8">
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
        <div className="py-8 bg-white overflow-hidden">
          <img
            src='/assets/Frame 64.png'
            alt="Banner visual"
            className="w-full h-auto"
          />
        </div>

      </div >
    </>
  )
}

export default Home
