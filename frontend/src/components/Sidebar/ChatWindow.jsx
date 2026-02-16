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
import socket, { connectSocket } from "../../services/socket";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [receiverId, setReceiverId] = useState(null); // ✅ add this
  const [receiverEmail, setReceiverEmail] = useState(""); // you already have this
  const [roomId, setRoomId] = useState(""); // store current room
  const [currentGroup, setCurrentGroup] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  const senderId = loggedInUser.id;
  if (!senderId) {
    console.error("No logged-in user found. Make sure to login first.");
  }

  if (!loggedInUser?.id) {
    return (
      <div className="p-4 text-center text-red-500">Please login first.</div>
    );
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages?senderId=${senderId}&receiverId=${receiverId}`,
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
    socket.on("new_group_message", (msg) => {
      if (msg.groupId === currentGroup) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => socket.off("new_group_message");
  }, [currentGroup]);

  useEffect(() => {
    const currentChat = JSON.parse(localStorage.getItem("currentChat"));
    if (currentChat) {
      setReceiverId(currentChat.id);
      setReceiverEmail(currentChat.email);
      setRoomId(currentChat.roomId);

      socket.emit("join_room", { roomId: currentChat.roomId });
      console.log("Rejoined room after refresh:", currentChat.roomId);

      // Fetch messages automatically
      fetchMessages();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("new_message", (msg) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !receiverId) return;

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId, message: newMessage }),
      });

      const savedMessage = await response.json();

      // ✅ Only emit to Socket.IO, do NOT add to state here
      socket.emit("new_message", { ...savedMessage, roomId });

      setNewMessage(""); // clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleJoinGroup = async (groupId) => {
    setCurrentGroup(groupId);
    socket.emit("join_group", { groupId });
    fetchGroupMessages(groupId); // fetch messages from DB
  };

  const handleSendGroupMessage = () => {
    if (!newMessage.trim() || !currentGroup) return;
    socket.emit("group_message", {
      groupId: currentGroup,
      senderId: loggedInUser.id,
      message: newMessage,
    });
    setNewMessage("");
  };

  const fetchGroupMessages = async (groupId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/group-messages?groupId=${groupId}`,
      );
      const data = await res.json();
      setMessages(data);
      scrollToBottom();
    } catch (err) {
      console.error("Error fetching group messages:", err);
    }
  };

  const handleJoinRoom = async () => {
    if (!receiverEmail.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/users?email=${receiverEmail}`,
      );
      const data = await res.json();

      if (!data || !data.id) return alert("User not found");

      setReceiverId(data.id);

      // ✅ Compute room ID first
      const computedRoomId = [senderId, data.id]
        .sort((a, b) => a - b)
        .join("_");
      setRoomId(computedRoomId);

      localStorage.setItem(
        "currentChat",
        JSON.stringify({
          id: data.id,
          email: data.email,
          roomId: computedRoomId,
        }),
      );

      socket.emit("join_room", { roomId: computedRoomId });
      fetchMessages();

      console.log(
        "Joined room:",
        computedRoomId,
        "senderId:",
        senderId,
        "receiverId:",
        data.id,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="top-6 left-6 w-[940px] h-full bg-gray-50 rounded-3xl shadow-xl flex flex-col overflow-hidden">
      <div className="flex flex-col h-full bg-gray-50">
        <div className="p-4 bg-white border-b">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter user email..."
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="flex-1 border px-4 py-2 rounded-lg"
            />
            <button
              onClick={handleJoinRoom}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Start Chat
            </button>
          </div>
        </div>

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
              <h2 className="font-semibold text-gray-900 text-lg">
                Darrell Mckinney
              </h2>
              <p className="text-sm text-emerald-600">
                Online • Last seen recently
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

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-gray-50">
          {Array.isArray(messages) &&
            messages.map((msg, index) => (
              <div
                key={msg.id || `${msg.senderId}-${msg.createdAt}-${index}`}
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
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString()
                        : ""}
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
            <button
              onClick={handleSend}
              className="text-indigo-600 hover:text-indigo-700"
            >
              <Send className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ChatWindow;
