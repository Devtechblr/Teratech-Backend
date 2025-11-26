import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export default function Security() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
    });
  }, []);

  return (
    <div className="bg-white w-full min-h-screen py-10 overflow-x-hidden">
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
                FLYBOT-X is the perfect Unmanned Aircraft System (UAS) for Intelligence Surveillance & Reconnaissance (ISR) missions...
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">BORDER PROTECTION</h3>
              <p className="text-gray-700 text-base md:text-lg">
                Remote and difficult to access borders present authorities with challenging surveillance scenarios...
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">LAW ENFORCEMENT</h3>
              <p className="text-gray-700 text-base md:text-lg">
                The FLYBOT-X can respond to the enforcement needs of a wide range of land border protection...
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Button + Image */}
        <div className="w-full flex flex-col items-end pr-0 mr-0" data-aos="fade-left">
          {/* Button */}
          <div className="mb-4">
            <button
              className="px-16 py-3 bg-[#02A657] text-white font-semibold cursor-pointer hover:bg-[#0b894c] transition"
              onClick={() => navigate("/getitnow")}
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Image */}
          <img
            src="/Screenshot 2025-09-29 112840.png"
            alt="Flybot-X UAV"
            className="object-cover shadow-lg max-h-[400px] w-full md:w-[90%] lg:w-[100%]"
          />
        </div>
      </div>

      {/* Footer UAV Graphic */}
      <div className="w-full mt-6 px-4">
        <img
          src="/assets/FLYBOT-X.png"
          alt="Decorative Footer UAV"
          className="object-contain ml-0 w-[300px] md:w-[500px] lg:w-[600px]"
        />
      </div>
    </div>
  );
}
