import React from "react";
import { MessageCircle, Bell, Settings, Users, LogOut } from "lucide-react";

function Sidebar() {
  const activeItem = "Chat";

  const menuItems = [
    {
      name: "Chat",
      icon: MessageCircle,
      dotColor: "bg-emerald-400",
    },
    { name: "Notifications", icon: Bell, dotColor: "bg-amber-400" },
    { name: "Settings", icon: Settings, dotColor: "bg-gray-300" },
    { name: "Friends", icon: Users, dotColor: "bg-sky-400" },
  ];

  return (
    <aside
      className="
    w-full h-full
    bg-gray-50
    rounded-3xl
    shadow-xl
    flex flex-col
    p-6
    overflow-hidden
  "
    >
      <div className="relative mb-12 flex flex-col items-center">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Melissa Tung"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-white" />
        </div>
        <h2 className="mt-4 font-semibold text-gray-900 text-center text-base">
          Melissa Tung
        </h2>
      </div>

      <nav className="flex flex-col gap-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              className={`
                    flex items-center gap-4 w-full
                    rounded-2xl
                    py-3 px-3
                    ${isActive ? "bg-white shadow-md" : "bg-white"}
                    hover:shadow-md
                    transition-shadow duration-200
                `}
            >
              <div
                className={`
                    relative
                    flex items-center justify-center
                    w-10 h-10 rounded-lg
                    ${isActive ? "bg-slate-900" : "bg-white"}
                    shadow-sm
                    `}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-700"}`}
                />
                {!isActive && (
                  <span
                    className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${item.dotColor}`}
                  />
                )}
              </div>

              <div className="flex flex-col text-left">
                <span
                  className={`font-semibold text-sm ${isActive ? "text-gray-900" : "text-gray-800"}`}
                >
                  {item.name}
                </span>
                {item.subtext && (
                  <span className="text-xs text-gray-500 leading-tight">
                    {item.subtext}
                  </span>
                )}
              </div>

              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`
                        ml-auto
                        bg-gray-200 text-gray-700
                        text-xs font-semibold
                        px-2 py-0.5
                        rounded-full
                        select-none
                    `}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          className="
                flex items-center gap-2 text-gray-600 hover:text-gray-900
                font-medium text-sm
                transition-colors duration-200
            "
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
