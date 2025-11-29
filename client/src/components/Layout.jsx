import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar  toggleSidebar={toggleSidebar} />
      <div className="flex">
        <main className={`relative flex-1 px-2 transition-all duration-300 ease-in-out pt-18`}>
         <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
