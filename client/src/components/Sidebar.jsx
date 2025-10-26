const navItems = [
  { name: "Chats", icon: "chat" },
  { name: "Activity", icon: "insights" },
  { name: "Your Offers", icon: "local_offer" },
  { name: "Notifications", icon: "notifications" },
];

const logoutItem = { name: "Logout", icon: "logout" };

const Sidebar = ({ isExpanded }) => {
  return (
    <nav
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out z-10 ${
        isExpanded ? "w-48" : "w-20"
      } py-6 px-4`}
    >
      {/* --- Top Nav Links --- */}
      <div className="flex flex-col justify-center gap-3">
        {navItems.map((item) => (
          <button
            key={item.name}
            className="flex items-stretch w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700 overflow-hidden whitespace-nowrap"
          >
            <button className="text-[24px]">
              <span className="material-symbols-outlined">{item.icon}</span>
            </button>
            <p className={`ml-4 font-semibold text-md ${!isExpanded && "hidden"}`} >
              {item.name}
            </p>
          </button>
        ))}
      </div>

      {/* --- Bottom Logout Button --- */}
      <div>
        <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700 overflow-hidden whitespace-nowrap">
          <span className="material-symbols-outlined text-2xl">
            {logoutItem.icon}
          </span>
          <span
            className={`ml-4 font-medium text-sm ${!isExpanded && "hidden"}`}
          >
            {logoutItem.name}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
