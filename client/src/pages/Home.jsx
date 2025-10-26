import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Navbar now receives the 'toggleSidebar' prop */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex">
        {/* Sidebar now only receives 'isExpanded' */}
        <Sidebar isExpanded={isSidebarExpanded} />

        {/* Main content area adjusts based on the 'isSidebarExpanded' state */}
        <main
          className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'ml-64' : 'ml-20'
          } pt-24`}
        >
          {/* Your Page Content Goes Here */}
          <h1 className="text-2xl font-bold">Welcome to SkillSwap</h1>
          <p className="mt-4">
            This is your main content area. It will automatically adjust
            when you click the hamburger menu icon.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;