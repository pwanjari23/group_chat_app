// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   autoConnect: false,
// });

// export const connectSocket = (token) => {
//   if (!token) {
//     console.log("No token provided for socket");
//     return;
//   }

//   socket.auth = { token };

//   socket.connect();

//   socket.on("connect_error", (err) => {
//     console.log("Socket auth error:", err.message);
//   });
// };


// export default socket;


import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false, 
});

export const connectSocket = (token) => {
  if (!token) {
    console.log("No token provided for socket");
    return;
  }

  socket.auth = { token }; // attach token
  socket.connect();

  socket.on("connect_error", (err) => {
    console.log("Socket auth error:", err.message);
  });

  socket.on("disconnect", () => console.log("Socket disconnected"));
  socket.on("reconnect", () => console.log("Socket reconnected"));
};

export default socket;
