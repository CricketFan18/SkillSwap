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
      className={`fixed bottom-0  bg-white shadow-lg justify-between z-10 py-6 px-4`} >
      <div className="flex justify-center gap-3 w-full">
        {navItems.map((item) => (
          <button key={item.name}
            className="flex flex-col items-stretch w-full p-3 rounded-lg text-[24px] hover:bg-gray-100 text-gray-700 overflow-hidden whitespace-nowrap">
              <span className="material-symbols-outlined">{item.icon}</span>
            <p className={`ml-4 font-semibold text-sm`}>
              {item.name}
            </p>
          </button>
        ))}
      </div>
      <div className="hidden lg:visible" >
        <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700 overflow-hidden whitespace-nowrap">
          <span className="material-symbols-outlined text-2xl">
            {logoutItem.icon}
          </span>
          <p className={`ml-4 font-semibold text-md ${!isExpanded && "hidden"}`} >
            {logoutItem.name}
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
