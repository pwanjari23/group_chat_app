require("dotenv").config();
const cors = require("cors");
const app = require("./app");
const sequelize = require("./config/database");

// Instead of app.listen(), we create an HTTP server
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React frontend
    methods: ["GET", "POST"],
  },
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for messages from frontend
  socket.on("sendMessage", (msg) => {
    // Broadcast message to all connected clients
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Sync database
async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("✅ Database synced");
  } catch (err) {
    console.error("❌ DB sync failed:", err);
  }
}

syncDatabase();

// Export io if you want to emit from routes/controllers
module.exports = { io };
