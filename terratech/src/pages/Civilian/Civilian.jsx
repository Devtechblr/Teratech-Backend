import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export default function Civilian() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // animate only once
    });
  }, []);

  return (
    <div className="bg-white w-full min-h-screen py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Left Section: Text */}
        <div className="px-4 md:px-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-wide">
            <span className="text-[#1C98ED]">CIVILIAN</span> APPLICATION
          </h2>
          <p className="text-lg md:text-xl font-medium mb-6 py-5">
            FLYBOT-X, an UAV by TerraTech Aerospace can assist complex missions in civilian domains such as coast guard monitoring, disaster monitoring, search and rescue, and border control missions
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-base md:text-lg mb-1">
                CRITICAL INFRASTRUCTURE PROTECTION
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Efficient and reliable aerial imaging capabilities enable the FLYBOT-X to be deployed to safely identify critical infrastructure defects and methane gas leaks. Compared to fixed-wing manned alternatives, inspections completed using UAS can be carried out time and cost-efficiently without the need for additional supporting infrastructure such as a runway.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base md:text-lg mb-1">
                ENVIRONMENTAL DISASTER MONITORING
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                FLYBOT-X can support the efforts to contain and monitor the effects of natural and man-made with high accurate information. Land and sea-based emergency response services can benefit from the information provided by powerful EO/IR payload combinations capable of geo locating victims
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base md:text-lg mb-1">
                SEARCH AND RESCUE
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                TerraTech Aerospace’s UAV platforms are equipped to support higher severity level disaster recovery and rescue missions and in coordination of sea, land and air assets. Our multi platform portfolio, with Remote Pilot Station (RPS) support from air, sea or land assets (or a combination) and can provide highly optimized co-ordination to customers in civilian and security agencies tasked with implementation of Search & Rescue (SAR) missions.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base md:text-lg mb-1">
                POLLUTION MONITORING
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Controlling, containing and preventing pollution is key when protecting humans and wildlife across the world. TerraTech Aerospace provides a range of command and control/surveillance options through its multi-role Vertical Take Off and Landing (VTOL) platforms to help prevent or mitigate natural or man-made disasters including oil and harmful chemical spillages
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Button + Image */}
        <div className="w-full flex flex-col items-end pr-0 mr-0" data-aos="fade-left">
          {/* Button */}
          <div className="mb-4">
            <button
              className="px-16 py-3 bg-[#1C98ED] text-white font-semibold cursor-pointer hover:bg-[#1878b8] transition"
              onClick={() => navigate("/getitnow")}
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Image */}
          <img
            src="/image (2).png"
            alt="Flybot-X UAV"
            className="object-cover shadow-lg max-h-[400px] w-full md:w-[90%] lg:w-[100%]"
          />
        </div>
      </div>

      {/* Footer UAV Graphic */}
      <div className="w-full mt-8 px-4">
        <img
          src="/assets/FLYBOT-X.png"
          alt="Decorative Footer UAV"
          className="object-contain ml-0 w-[300px] md:w-[500px] lg:w-[600px]"
        />
      </div>
    </div>
  );
}
