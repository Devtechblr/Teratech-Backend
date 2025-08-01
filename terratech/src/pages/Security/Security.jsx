import React from 'react'
import flybotImage from '/src/assets/FLYBOT-X.png'

const Security = () => {
  return (
    <div className="bg-white w-full min-h-screen py-10 px-0">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Section: Text */}
        <div className="px-4 md:px-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-wide">
            <span className="text-[#1C98ED]">SECURITY</span> AND <span className="text-[#1C98ED]">DEFENCE</span> USAGE
          </h2>
          <p className="text-lg md:text-xl font-medium mb-8">
            Unmanned aerial Vehicle (UAV) strategies are becoming increasingly critical to successful maritime and overland missions.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">INTELLIGENCE, SURVEILLANCE & RECONNAISSANCE</h3>
              <p className="text-gray-700 text-base md:text-lg">
                FLYBOT-X is the perfect Unmanned Aircraft System (UAS) for Intelligence Surveillance & Reconnaissance (ISR) missions, giving coastal or land-based teams the tactical advantage needed to stay one step ahead of escalating threats. Equipped with an EO/IR, ISR and Thermal sensor combination, the FLYBOT X offers to monitor infinitely more area compared to ground-based alternatives.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">BORDER PROTECTION</h3>
              <p className="text-gray-700 text-base md:text-lg">
                Remote and difficult to access borders present authorities with challenging surveillance scenarios. 60+mins flight times and numerous payload combination options make the FLYBOT-X an invaluable asset for coastal and overland border monitoring operations.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">LAW ENFORCEMENT</h3>
              <p className="text-gray-700 text-base md:text-lg">
                The FLYBOT-X can respond to the enforcement needs of a wide range of land border protection, coastal security, fisheries control, anti-piracy, oil and air pollution and anti smuggling policies. An unmatched small logistical footprint provides easy maintenance, transport, and preparation for takeoff in under fifteen minutes from remote sites near nonpermissive environments.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Button + Image */}
        <div className="w-full flex flex-col items-end pr-0 mr-0">
          {/* Button */}
          <div className="mb-4">
            <button className="px-16 py-3 bg-[#1C98ED] text-white font-semibold cursor-pointer hover:bg-[#1878b8] transition">
              GET IN TOUCH
            </button>
          </div>

          {/* Image */}
          <img
            src="/image 22.png"
            alt="Flybot-X UAV"
            className="object-cover shadow-lg max-h-[400px] w-full md:w-[90%] lg:w-[100%]"
          />
        </div>
      </div>

      {/* Footer UAV Graphic - Bigger & Aligned Left */}
      <div className="w-full mt-6 px-4">
        <img
          src={flybotImage}
          alt="Decorative Footer UAV"
          className="object-contain ml-0 w-[300px] md:w-[500px] lg:w-[600px]"
        />
      </div>
    </div>
  )
}

export default Security
