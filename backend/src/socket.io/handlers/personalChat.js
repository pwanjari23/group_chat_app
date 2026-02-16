module.exports = (io, socket) => {
  socket.on("join_room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("new_message", (message) => {
    const { roomId } = message;
    if (!roomId) return console.log("No roomId provided");

    io.to(roomId).emit("new_message", message); // broadcast to room
    console.log(`Message sent to room ${roomId}`);
  });

  socket.on("leave_room", ({ roomId }) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });
};
