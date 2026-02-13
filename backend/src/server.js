require("dotenv").config();
const cors = require("cors");
const app = require("./app");
const sequelize = require("./config/database");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const jwt = require("jsonwebtoken");
const User = require("./models/user");

io.on("connection", (socket) => {
  console.log("User connected:", socket.user.id);

  // 🔥 Join personal room
  socket.join(socket.user.id);

  socket.on("sendMessage", (msg) => {
    console.log("Message from:", socket.user.id);

    const receiverId = msg.receiverId;

    // Send only to receiver
    io.to(receiverId).emit("receiveMessage", {
      ...msg,
      senderId: socket.user.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.id);
  });
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error: No token"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user; // 🔥 attach user to socket

    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("✅ Database synced");
  } catch (err) {
    console.error("❌ DB sync failed:", err);
  }
}

syncDatabase();
module.exports = { io };
