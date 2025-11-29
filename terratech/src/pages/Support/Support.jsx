import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="bg-white w-full min-h-screen py-10 px-0 overflow-x-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start px-4 md:px-12">
        {/* Left Section: Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-wide">
            <span className="text-[#1C98ED]">SUPPORT</span> AND{' '}
            <span className="text-[#1C98ED]">SERVICES</span>
          </h2>
          <br />
          <div className="space-y-12">
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-2">
                TARGETED SOLUTION
              </h3>
              <p className="text-gray-700 text-lg md:text-xl">
                Our solutions package extends beyond the product and provides
                services of associated systems. These include ground control
                stations, communications links and data terminals together with
                managed services, enabling both military and civilian
                organisations to select the package that best meets their
                requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Button + Image */}
        <div
          className="w-full flex flex-col items-end"
          data-aos="fade-left"
        >
          {/* Button */}
          <div className="mb-4">
            <button
              className="px-16 py-3 bg-[#02A657] text-white font-semibold cursor-pointer hover:bg-[#0b894c] transition"
              onClick={() => navigate('/getitnow')}
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Image */}
          <img
            src="/Screenshot 2025-09-29 112840.png"
            alt="Flybot-X UAV"
            className="object-cover shadow-lg max-h-[400px] w-full md:w-[90%] lg:w-full"
          />
        </div>
      </div>

      {/* Footer UAV Graphic */}
      <div className="w-full -mt-12 px-4" data-aos="fade-right">
        <img
          src="/assets/FLYBOT-X.png"
          alt="Decorative Footer UAV"
          className="object-contain w-[300px] md:w-[500px] lg:w-[600px]"
        />
      </div>
    </div>
  );
}
