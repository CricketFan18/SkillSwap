import { NavLink } from "react-router";

const navItems = [
  { name: "Home", icon: "home",path:"/" },
  { name: "Chats", icon: "chat", path:"/chats" },
  { name: "Activity", icon: "insights", path:"/activity" },
  { name: "Your Inputs", icon: "diversity_1", path:"/inputs" },
];

const Sidebar = () => {
  return (
    <nav className={`fixed bottom-0 bg-white justify-between z-10 w-full rounded-2xl`} >
      <div className="flex justify-center gap-1 w-full shadow-2xl pb-2">
        {navItems.map((item) => (
          <NavLink key={item.name} to={item.path} className="flex flex-col items-center w-full p-2 rounded-2xl hover:scale-110 hover:bg-gray-100 focus:scale-110 focus:bg-gray-100 cursor-pointer transition-all ease-in-out duration-100 overflow-hidden whitespace-nowrap">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <p className={`font-semibold text-sm`}>{item.name}</p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
