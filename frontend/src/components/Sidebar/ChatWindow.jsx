import React, { useState, useEffect, useRef } from "react";
import {
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Mic,
  Send,
} from "lucide-react";
import socket from "../../services/socket";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const senderId = 1;   // TODO: replace with logged-in user id
  const receiverId = 2; // TODO: replace with selected chat user id

  const roomId = [senderId, receiverId].sort().join("_"); // unique room id

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages?senderId=${senderId}&receiverId=${receiverId}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setMessages(data);
        scrollToBottom();
      } else {
        console.error("Expected array from API, got:", data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("join_room", { roomId }); // Join the personal chat room
    });

    socket.on("new_message", (msg) => {
      if (
        (msg.senderId === senderId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === senderId)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("new_message");
      socket.disconnect();
    };
  }, [receiverId]); // refetch & reconnect if chat partner changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId,
          receiverId,
          message: newMessage,
        }),
      });

      const savedMessage = await response.json();

      socket.emit("new_message", { ...savedMessage, roomId });

      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <aside className="top-6 left-6 w-[940px] h-full bg-gray-50 rounded-3xl shadow-xl flex flex-col overflow-hidden">
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="User"
                className="w-12 h-12 rounded-2xl object-cover shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">Darrell Mckinney</h2>
              <p className="text-sm text-emerald-600">Online • Last seen recently</p>
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

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-gray-50">
          {Array.isArray(messages) &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === senderId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl px-6 py-4 rounded-2xl shadow-sm ${
                    msg.senderId === senderId
                      ? "bg-indigo-50 text-gray-900 rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-base leading-relaxed">{msg.message}</p>

                  <div className="mt-2 flex items-center gap-3 justify-end">
                    <span className="text-sm text-gray-500">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
                    </span>
                    {msg.senderId === senderId && (
                      <div className="text-indigo-500">
                        <CheckCheck className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-8 py-5 bg-white border-t border-gray-200">
          <div className="flex items-center gap-4 bg-gray-100 rounded-2xl px-6 py-4">
            <button className="text-gray-500 hover:text-indigo-600">
              <Smile className="w-7 h-7" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
            />
            <button className="text-gray-500 hover:text-indigo-600">
              <Mic className="w-7 h-7" />
            </button>
            <button onClick={handleSend} className="text-indigo-600 hover:text-indigo-700">
              <Send className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ChatWindow;
