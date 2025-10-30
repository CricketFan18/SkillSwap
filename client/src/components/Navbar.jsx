import { NavLink } from "react-router";
import profilePic from "/profile.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-15 h-18 flex justify-between items-center p-3 shadow-md bg-white">
      {/* Left Side: Logo */}
      <div className="flex gap-1 items-center pl-4">
        <h1 className="font-bold text-2xl">SkillSwap</h1>
      </div>
      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-3 pr-2 text-gray-900">
        <button>
          <span className="material-symbols-outlined relative top-1 cursor-pointer text-3xl">
            search
          </span>
        </button>
        <NavLink to="/create" className="flex items-center gap-1 tracking-wider border-2 border-gray-900 text-gray-900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white p-1 rounded-xl">
          <span className="material-symbols-outlined text-2xl">add</span>
          <p className="hidden">Create</p>
        </NavLink>
        <NavLink to="/profile" className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 focus:bg-gray-100 cursor-pointer">
          <img src={profilePic} alt="profile pic" className="h-10 w-10 rounded-full"/>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
