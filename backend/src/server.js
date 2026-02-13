require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const http = require("http");
const initializeSocket = require("../src/socket.io/index");

const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

const PORT = process.env.PORT || 5000;
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

module.exports = { io };
