import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatSidebar from "../components/Sidebar/ChatSidebar";
import ChatWindow from "../components/Sidebar/ChatWindow";
import { connectSocket } from "../services/socket";

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) connectSocket(token);
  }, []);

  return (
    <div className="flex bg-gradient-to-r from-sky-300 to-blue-100 h-screen p-6 gap-4">
      <div className="w-48 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="w-80 flex-shrink-0 h-full">
        <ChatSidebar
          onSelectChat={(user) => console.log("Start chat with:", user)}
          onJoinGroup={(groupId) => console.log("Join group:", groupId)}
        />
      </div>

      <div className="w-90 flex-shrink-0 h-full">
        <ChatWindow />
      </div>
    </div>
  );
}

export default Dashboard;
