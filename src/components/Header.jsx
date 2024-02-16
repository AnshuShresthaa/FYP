import React, { useState } from 'react';
import { images } from '../constants';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownChange = () => {
    // handle dropdown change logic here
  };

  return (
    <section>
      <header className="container max-auto px-5 py-4 md:px-10 relative">
        <div className="flex justify-between items-center">
          <div>
          <img src={images.Logo} alt="logo" style={{ width: '150px', height: 'auto' }} />
          </div>
          <div className="flex gap-x-3 items-center">
            <button
              type="button"
              className="focus:outline-none md:hidden"
              onClick={() => setShowDropdown(!showDropdown)}
            >
            </button>
            <ul
              className={`${
                showDropdown ? 'block' : 'hidden'
              } md:flex md:gap-x-5 font-semibold md:items-center`}
            >
              <li>
                <a href="/" className="px-4 transition duration-300 ease-in-out hover:text-blue-500">
                  Home
                </a>
              </li>
              <li className="relative flex items-center">
                <button
                  type="button"
                  className="transition duration-300 ease-in-out hover:text-blue-500 focus:outline-none flex items-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Blog
                </button>
                {showDropdown && (
                  <div className="absolute z-10 top-full left-0 w-40 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {/* Dropdown Blog Options */}
                    </div>
                  </div>
                )}
              </li>
              <li>
                <a href="/MoodTracker" className="px-4 transition duration-300 ease-in-out hover:text-blue-500">
                  Mood Tracker
                </a>
              </li>
              <li>
                <a href="/Journal" className="px-4 transition duration-300 ease-in-out hover:text-blue-500">
                  Journal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <a href="/register" className="border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-300 ease-in-out">
              Sign in
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
      </header>
    </section>
  );
};

export default Header;
