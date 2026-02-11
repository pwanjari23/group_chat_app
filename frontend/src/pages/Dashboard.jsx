import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatSidebar from "../components/Sidebar/ChatSidebar";
import ChatWindow from "../components/Sidebar/ChatWindow";

function Dashboard() {
  return (
    <div className="flex h-screen p-6 gap-4">
      <div className="w-48 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="w-80 flex-shrink-0 h-full">
        <ChatSidebar />
      </div>

      <div className="w-90 flex-shrink-0 h-full">
        <ChatWindow />
      </div>
    </div>
  );
}

export default Dashboard;
