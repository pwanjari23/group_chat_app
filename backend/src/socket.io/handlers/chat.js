module.exports = (io, socket) => {
  // Join user’s personal room
  socket.join(socket.user.id);

  // Handle sending message
  socket.on("sendMessage", (msg) => {
    const receiverId = msg.receiverId;
    io.to(receiverId).emit("receiveMessage", {
      ...msg,
      senderId: socket.user.id,
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.id);
  });
};
