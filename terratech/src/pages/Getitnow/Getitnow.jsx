import React from 'react'
import banner from '/src/assets/image 21 (1).png'

const Getitnow = () => {
  return (
    <>
      <div className="relative w-full">
        <img src={banner} alt="TerraTech Aerospace Logo" className="h-full w-full max-w-full object-cover mx-auto" />
      </div>

      {/* OVERVIEW box */}
      <div className="flex justify-center w-full mt-0 px-2 md:px-0">
        <div className="bg-[#1C98ED80] bg-opacity-50 px-4 md:px-16 py-2 md:py-4 w-full max-w-[10rem] md:max-w-sm flex justify-center">
          <span className="text-black text-lg md:text-4xl tracking-wide text-center w-full">FLYBOT-X</span>
        </div>
      </div>
    </>
  )
}

export default Getitnow
