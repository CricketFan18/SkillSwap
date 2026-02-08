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
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isExpanded={isSidebarExpanded} />
        <main
          className={`relative flex-1 p-5 border-2 transition-all duration-300 ease-in-out pt-24`}>
          <h1 className="text-2xl font-bold">Welcome to SkillSwap</h1>
          <p className="mt-4">
            This is your main content area.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;