// const { Server } = require("socket.io");
// const socketAuth = require("./middleware");
// const chatHandler = require("./handlers/chat");
// const personalChatHandler = require("./handlers/personalChat");

// const initializeSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

//   io.use(socketAuth);

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.user.id);

//     // Load handlers
//     chatHandler(io, socket);
//   });

//   return io;
// };

// module.exports = initializeSocket;


const { Server } = require("socket.io");
const socketAuth = require("./middleware");
const chatHandler = require("./handlers/chat");
const personalChatHandler = require("./handlers/personalChat");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user?.id || socket.id);

    // 🔥 Load group chat handler (if you have it)
    chatHandler(io, socket);

    // 🔥 Load personal chat handler (THIS WAS MISSING)
    personalChatHandler(io, socket);
  });

  return io;
};

module.exports = initializeSocket;
