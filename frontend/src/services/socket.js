import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();
  socket.on("connect_error", (err) => {
    console.log("Socket auth error:", err.message);
  });
};

export default socket;


