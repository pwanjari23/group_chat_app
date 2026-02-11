import React from "react";
import { Check, CheckCheck } from "lucide-react";

function ChatSidebar() {
  const conversations = [
    {
      name: "PatCooper",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "Could you send me the number of...",
      time: "2min ago",
      unread: 1,
      isRead: false,
    },
    {
      name: "Judith Tung",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      message: "Have u planned gift for mom's birthda...",
      time: "6h ago",
      unread: 3,
      isRead: false,
    },
    {
      name: "Darrell Mckinney",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      message: "See you tonight! heard of a great restaurant near Bill's ho...",
      time: "2h ago",
      unread: 2,
      isRead: false,
      isActive: true, 
    },
    {
      name: "Philip Mccoy",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      message: "Have you seen this video? 😄",
      time: "5h ago",
      unread: 0,
      isRead: true,
    },
  ];

  return (
    <aside
  className="
    w-full h-full
    bg-gray-50
    rounded-3xl
    shadow-xl
    flex flex-col
    overflow-hidden
  "
>
      <div className="px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl
              text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
              placeholder-gray-500
            "
          />
          <svg
            className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Latest first ▼</span>
          <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
            New conversation
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {conversations.map((conv) => {
          const isActive = conv.isActive;

          return (
            <button
              key={conv.name}
              className={`
                w-full flex items-start gap-4 p-4 rounded-2xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 border border-indigo-200 shadow-sm"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3
                    className={`font-medium text-base truncate ${
                      isActive ? "text-indigo-700" : "text-gray-900"
                    }`}
                  >
                    {conv.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {conv.time}
                  </span>
                </div>

                <p
                  className={`mt-0.5 text-sm truncate ${
                    conv.unread > 0
                      ? "text-gray-900 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {conv.message}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                {conv.unread > 0 ? (
                  <span
                    className="
                      bg-indigo-600 text-white text-xs font-medium
                      w-5 h-5 flex items-center justify-center rounded-full
                    "
                  >
                    {conv.unread}
                  </span>
                ) : conv.isRead ? (
                  <CheckCheck className="w-4 h-4 text-indigo-500" />
                ) : (
                  <Check className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ChatSidebar;
