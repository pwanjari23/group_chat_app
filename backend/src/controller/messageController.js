const { Op } = require("sequelize");
const { Message } = require("../models");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      order: [["createdAt", "ASC"]], 
    });

    res.json(messages); 
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};