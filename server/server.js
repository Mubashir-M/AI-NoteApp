// 1. Core Node.js Modules
const http = require("http");
require("dotenv").config(); // Loading environment variables early

// 2. Third-party Modules
const express = require("express");
const { Server } = require("socket.io"); // Socket.IO
const cors = require("cors");

// 3. Custom Modules (if any)
//const routes = require("./routes"); // Example: requiring your custom routes

const PORT = process.env.PORT || 3001;
//const CLIENT_PORT = process.env.CLIENT_PORT;
const app = express();

// Create the HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware setup (if any)
// app.use(someMiddleware);

// Set up Socket.io connectioon handling;

io.on("connection", (socket) => {
  socket.on("send-changes", (changes) => {
    console.log(changes);
    socket.broadcast.emit("receive-changes", changes);
  });
  console.log("connected");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on the port: ${PORT}`);
});
