import React from 'react'

const Getitnow = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative w-full">
        <img
          src='/assets/image 21 (1).png'
          alt="TerraTech Aerospace Logo"
          className="h-full w-full max-w-full object-cover mx-auto"
        />
      </div>

      {/* FLYBOT-X Title */}
      <div className="flex justify-center w-full mb-6 px-2 md:px-0">
        <div className="bg-[#1C98ED80] bg-opacity-50 px-4 md:px-16 py-2 md:py-4 w-full max-w-[10rem] md:max-w-sm flex justify-center">
          <span className="text-black text-lg md:text-4xl tracking-wide text-center w-full font-bold">FLYBOT-X</span>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">

        {/* Top Section - General Specifications */}
        <div className="bg-white rounded-lg p-6 md:p-8">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-sm md:text-base text-gray-600 font-medium mb-2">Payload Upto</div>
              <div className="text-2xl md:text-3xl font-bold text-[#1C98ED]">+2 Kg</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-sm md:text-base text-gray-600 font-medium mb-2">Range Upto</div>
              <div className="text-2xl md:text-3xl font-bold text-[#1C98ED]">+40 m</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-sm md:text-base text-gray-600 font-medium mb-2">Flight Time Upto</div>
              <div className="text-2xl md:text-3xl font-bold text-[#1C98ED]">+60 Mins</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-sm md:text-base text-gray-600 font-medium mb-2">Lithium-Ion Batteries</div>
              <div className="text-lg md:text-3xl font-bold text-[#1C98ED]">21,000 mAH</div>
            </div>
          </div>
        </div>

        {/* Middle Section - Payload Applications */}
        <div className="bg-[#8F5D46] rounded-lg shadow-lg p-6 md:p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* PHOTOGRAMMETRY */}
            <div className="bg-white rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#8F5D46] mb-3">PHOTOGRAMMETRY</h3>
              <div className="space-y-2">
                <div className="font-semibold text-gray-800">Camera: Sony Adti 24mp</div>
                <p className="text-sm md:text-base text-gray-600">
                  High resolution camera for precision agriculture and linear asset monitoring.
                </p>
              </div>
            </div>

            {/* MULTISPECTRAL */}
            <div className="bg-white rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#8F5D46] mb-3">MULTISPECTRAL</h3>
              <div className="space-y-2">
                <div className="font-semibold text-gray-800">Camera: Micasense</div>
                <p className="text-sm md:text-base text-gray-600">
                  Still camera for precision agriculture, mining, conservation and vegetation monitoring.
                </p>
              </div>
            </div>

            {/* SURVEY AND MAPPING */}
            <div className="bg-white rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#8F5D46] mb-3">SURVEY AND MAPPING</h3>
              <div className="space-y-2">
                <div className="font-semibold text-gray-800">Sensor: Yellowscan Mapper+</div>
                <p className="text-sm md:text-base text-gray-600">
                  Still camera or LiDAR sensor for 3-D mapping, surveying, vegetation and linear asset inspection.
                </p>
              </div>
            </div>

            {/* THERMAL */}
            <div className="bg-white rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-[#8F5D46] mb-3">THERMAL</h3>
              <div className="space-y-2">
                <div className="font-semibold text-gray-800">Camera: FLIR</div>
                <p className="text-sm md:text-base text-gray-600">
                  Gimbal camera with high bandwidth data link, visible and IR spectrum with object tracking AI and 360° live view.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Camera Specifications */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Optical Camera Specs */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-4xl font-bold text-[#000] mb-4">Optical Camera</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-700">Optical Zoom:</span>
                  <span className="font-bold text-[#1C98ED]">25x HD</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-700">Target Detection:</span>
                  <span className="font-bold text-[#1C98ED]">1000 m</span>
                </div>
              </div>
            </div>

            {/* Camera Gimbal Image */}
            <div className="flex justify-center">
              <img
                src='/assets/camera.png'
                alt="Camera Gimbal"
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain"
              />
            </div>

            {/* Thermal Camera Specs */}
            <div className="space-y-4">
              <h3 className="text-2x1 md:text-4xl font-bold text-[#000] mb-4">Thermal Camera</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-700">Resolution:</span>
                  <span className="font-bold text-[#1C98ED]">640x480</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-700">Digital Zoom:</span>
                  <span className="font-bold text-[#1C98ED]">4X</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-700">Target Detection:</span>
                  <span className="font-bold text-[#1C98ED]">500 m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Brochure Section */}
        <div className="bg-white p-4 md:p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Download Brochure</h2>
              <p className="text-sm md:text-xl text-gray-600">
                Conduct your projects with TerraTech state-of-the-art mapping drone, FLYBOT-X
              </p>
            </div>
            <button className="bg-gray-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-700 transition-colors">
              DOWNLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Getitnow
