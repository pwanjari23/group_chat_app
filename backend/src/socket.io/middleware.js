const jwt = require("jsonwebtoken");
const User = require("../models/user");

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error: No token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return next(new Error("Authentication error: User not found"));

    socket.user = user; // attach user to socket
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
 
};

module.exports = socketAuth;
