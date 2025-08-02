import React from 'react'

const Contact = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-full lg:max-w-[1440px] mx-auto shadow-xl overflow-hidden flex-1">
        {/* Left Section */}
        <div className="bg-white flex flex-col items-center justify-start pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-10 relative w-full md:w-1/2">
          <img
            src="/assets/TerraTech Logo Final White background_Transaperent 1.svg"
            alt="TerraTech Aerospace Logo"
            className="w-24 sm:w-28 md:w-40 lg:w-52 mb-3"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 tracking-wide text-center">
            CONNECT WITH US
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg text-center">
            Explore how Our Drone can
          </p>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg text-center mb-2">
            Benefit you!
          </p>
          {/* Faded Background Logo */}
          <img
            src="/assets/TerraTech Logo Final White background_Transaperent 2.png"
            alt="Faded Logo"
            className="hidden md:block absolute bottom-2 right-4 w-64 md:w-80 lg:w-96 xl:w-[28rem] pointer-events-none select-none"
            style={{ objectFit: 'contain', zIndex: 0 }}
          />

        </div>

        {/* Right Section: Form */}
        <div className="bg-[#8F5D46] py-8 px-4 sm:px-6 md:py-10 md:px-10 lg:px-12 flex flex-col gap-2 w-full md:w-1/2 max-w-full ml-auto mx-4 md:mx-0 rounded-t-[15px] md:rounded-none">
          <h3 className="text-white text-xl sm:text-2xl lg:text-3xl mb-2 md:mb-3 lg:mb-4 tracking-wide">
            DROP US A LINE
          </h3>
          <form className="space-y-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1 font-bold">First name</label>
                <input type="text" placeholder="abc" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
              </div>
              <div>
                <label className="block text-white text-sm mb-1 font-bold">Last name</label>
                <input type="text" placeholder="xyz" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1 font-bold">Email</label>
                <input type="email" placeholder="abc@gmail.com" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
              </div>
              <div>
                <label className="block text-white text-sm mb-1 font-bold">Mobile Number</label>
                <input type="text" placeholder="+91 1234567890" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1 font-bold">City</label>
                <input type="text" placeholder="abc" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
              </div>
              <div>
                <label className="block text-white text-sm mb-1 font-bold">Pincode</label>
                <input type="text" placeholder="560058" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
              </div>
            </div>
            <div>
              <label className="block text-white text-sm mb-1 font-bold">Message Us</label>
              <input type="text" placeholder="Drop your message here" className="w-full bg-transparent border-b-2 border-white text-white/70 placeholder-white/50 focus:outline-none py-2 text-sm md:text-base" />
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-[#23272A] text-white font-semibold px-6 md:px-10 py-2 md:py-3 text-base md:text-lg tracking-wide shadow">
                SEND
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>

  )
}

export default Contact
