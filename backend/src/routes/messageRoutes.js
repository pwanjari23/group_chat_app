// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../controller/messageController");

// Get all messages between two users
router.get("/", getMessages);

// Send a new message
router.post("/", sendMessage);

module.exports = router;
