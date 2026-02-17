const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // React frontend
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ----------------------
    // Personal Chat
    // ----------------------
    socket.on("join_room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined personal room ${roomId}`);
    });

    socket.on(
      "new_message",
      ({ roomId, senderId, receiverId, message, id, createdAt }) => {
        const msg = {
          roomId,
          senderId,
          receiverId,
          message,
          id,
          createdAt: createdAt || new Date(),
        };
        io.to(roomId).emit("new_message", msg);
        console.log("Message sent in personal room:", msg);
      },
    );

    // ----------------------
    // Group Chat
    // ----------------------
    socket.on("join_group", ({ groupId }) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on(
      "group_message",
      ({ groupId, senderId, message, mediaUrl, mediaType }) => {
        const msg = {
          groupId,
          senderId,
          message: message || null,
          mediaUrl: mediaUrl || null,
          mediaType: mediaType || null,
          createdAt: new Date(),
        };

        io.to(groupId).emit("new_group_message", msg);
      },
    );

    // ----------------------
    // Disconnect
    // ----------------------
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initializeSocket;
