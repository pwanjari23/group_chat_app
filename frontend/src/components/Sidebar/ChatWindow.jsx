// components/Chat/ChatWindow.jsx
import React from "react";
import {
  Check,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Mic,
  Send,
} from "lucide-react";

function ChatWindow() {
  const messages = [
    {
      text: "It's a friend's bday this weekend, do you want to come?",
      time: "Wednesday 7:30 pm",
      isSentByMe: false,
    },
    {
      text: "Sorry, but this weekend is a girls night with Dianne and Bessie 🥰",
      time: "Wednesday 7:36 pm",
      isSentByMe: true,
      status: "read",
    },
    {
      text: "But we can go out tomorrow night if you want!",
      time: "Wednesday 7:36 pm",
      isSentByMe: true,
      status: "read",
    },
    {
      text: "Ok, perfect! I'll text you tomorrow!",
      time: "Wednesday 8:21 pm",
      isSentByMe: false,
    },
    {
      text: "See you tonight? I've heard of a great restaurant near Philip's house 😊",
      time: "Today 3:15 pm",
      isSentByMe: false,
    },
  ];

  return (
    <aside
      className="
        top-6 left-6
        w-3xl
        h-full                    
        bg-gray-50  
        rounded-3xl
        shadow-xl
        flex flex-col
        overflow-hidden
      "
    >
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-xl rounded-3xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="Darrell Mckinney"
                className="w-12 h-12 rounded-2xl object-cover shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-white" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 text-lg">
                Darrell Mckinney
              </h2>
              <p className="text-sm text-emerald-600">
                Online • Last seen 3:12 pm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <button className="hover:text-indigo-600 transition-colors">
              <Phone className="w-6 h-6" />
            </button>
            <button className="hover:text-indigo-600 transition-colors">
              <Video className="w-6 h-6" />
            </button>
            <button className="hover:text-indigo-600 transition-colors">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages - now has more horizontal space */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isSentByMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                max-w-2xl        /* ← increased max width so bubbles can be much wider */
                px-6 py-4 rounded-2xl 
                shadow-sm
                ${
                  msg.isSentByMe
                    ? "bg-indigo-50 text-gray-900 rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                }
              `}
              >
                <p className="text-base leading-relaxed">{msg.text}</p>

                <div className="mt-2 flex items-center gap-3 justify-end">
                  <span className="text-sm text-gray-500">{msg.time}</span>
                  {msg.isSentByMe && (
                    <div className="text-indigo-500">
                      {msg.status === "read" ? (
                        <CheckCheck className="w-5 h-5" />
                      ) : (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area - wider feel */}
        <div className="px-8 py-5 bg-white border-t border-gray-200">
          <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-6 py-4">
            <button className="text-gray-500 hover:text-indigo-600">
              <Smile className="w-7 h-7" />
            </button>

            <input
              type="text"
              placeholder="Type your message here..."
              className="
              flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base
            "
            />

            <button className="text-gray-500 hover:text-indigo-600">
              <Mic className="w-7 h-7" />
            </button>

            <button className="text-indigo-600 hover:text-indigo-700">
              <Send className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ChatWindow;
