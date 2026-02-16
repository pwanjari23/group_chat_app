const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const usersRoute = require("./routes/usersRoute");
const groupsRoute = require("./routes/groupsRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", require("./routes/groupsRoute"));
app.use("/api/upload", require("./routes/uploadRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
