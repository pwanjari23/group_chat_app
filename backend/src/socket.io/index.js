const { Server } = require("socket.io");
const socketAuth = require("./middleware");
const chatHandler = require("./handlers/chat");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    // Load handlers
    chatHandler(io, socket);
  });

  return io;
};

module.exports = initializeSocket;
