import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="w-full bg-[#8F5D46] py-1 px-4 md:px-14 flex justify-end items-center">
            {/* Right Side - Navigation Links */}
            <div className="flex items-center gap-4 md:gap-6">
                <Link to="/specification" className="text-white text-xs md:text-sm font-medium hover:text-gray-200 transition-colors">
                    Specification
                </Link>
                <Link to="/faq" className="text-white text-xs md:text-sm font-medium hover:text-gray-200 transition-colors">
                    FAQ
                </Link>
                <Link to="/getitnow" className="bg-white text-[#8F5D46] px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors">
                    Order Now
                </Link>
            </div>
        </div>
    )
}

export default Nav
