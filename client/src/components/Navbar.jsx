import React, { useState } from 'react';
import profilePic from '/profile.png';
const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') return;
    console.log('Submitting search for:', searchQuery);
    // --- BACKEND INTEGRATION POINT ---
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 h-16 flex justify-between items-center p-3 shadow-md bg-white">
      {/* Left Side: Logo & Hamburger Button */}
      <div className="flex pl-4 gap-4 items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 text-2xl"
          title="Toggle menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex gap-3 items-center">
          <button className="text-3xl">
            <span className="material-symbols-outlined">person_play</span>
          </button>
          <h1 className="font-bold text-3xl">SkillSwap</h1>
        </div>
      </div>

      {/* Middle: Search Bar */}
      {/* <div className="relative">
        <span
          className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleSearchSubmit}
        >
          search
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 bg-gray-100 rounded-full py-2 pl-10 pr-4 w-96 focus:outline-none focus:border-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div> */}

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4 pr-10">
        {/* <button className="flex items-center justify-center gap-1 font-semibold bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 rounded-full">
          <span className="material-symbols-outlined">add</span>
          Create
        </button> */}
        <img
          src={profilePic}
          alt="profile pic"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;