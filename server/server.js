// 1. Core Node.js Modules
const http = require("http");
require("dotenv").config(); // Loading environment variables early

// 2. Third-party Modules
const express = require("express");
const { Server } = require("socket.io"); // Socket.IO
const cors = require("cors");
const mongoose = require("mongoose");

// 3. Custom Modules (if any)
const Document = require("./Document"); // Assuming you have a Document model

const PORT = process.env.PORT || 3001;
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

// Connect to MongoDB
const mongoDb_Uri = process.env.MONGODB_URL;
mongoose
  .connect(mongoDb_Uri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Memory object to temporarily store changes
let documentChanges = {};

// Set up Socket.io connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  // Join a room based on documentId
  socket.on("join-document", (documentId) => {
    socket.join(documentId);
  });

  // Load the document when the client connects
  socket.on("load-document", async (id) => {
    const document = await findOrCreateDocument(id);
    socket.emit("load-document", document);
  });

  // Handle receiving changes from the client
  socket.on("send-changes", async ({ id, changes }) => {
    documentChanges[id] = changes; // Store the changes for this document
    socket.broadcast.to(id).emit("receive-changes", changes);
  });
});

// Set up a 30-second interval to save document changes to MongoDB
setInterval(async () => {
  for (const [id, changes] of Object.entries(documentChanges)) {
    const document = await findOrCreateDocument(id);
    document.data = changes;
    await document.save();
  }
  documentChanges = {}; // Clear the memory after saving
}, 3000); // 3 seconds

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

async function findOrCreateDocument(id) {
  if (id === null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: "" });
}
