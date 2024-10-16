// 1. Core Node.js Modules
const http = require("http");
require("dotenv").config(); // Loading environment variables early

// 2. Third-party Modules
const express = require("express");
const { Server } = require("socket.io"); // Socket.IO
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Add this line at the top

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

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoDb_Uri = process.env.MONGODB_URL;
mongoose
  .connect(mongoDb_Uri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Add new GET route to retrieve all documents
app.get("/api/documents", async (req, res) => {
  try {
    const documents = await Document.find(); // Get all documents
    res.status(200).json(documents); // Send the documents as a JSON response
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Add new GET route to retrieve a document by ID
app.get("/api/documents/:id", async (req, res) => {
  const { id } = req.params; // Get the document ID from the request parameters

  try {
    const document = await Document.findById(id); // Find the document by ID

    if (!document) {
      return res.status(404).json({ message: "Document not found" }); // Handle document not found
    }

    res.status(200).json(document); // Send the document as a JSON response
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Error fetching document" });
  }
});

app.post("/api/documents", async (req, res) => {
  console.log("Creating document:", req.body);
  const { title, content } = req.body;

  try {
    // Generate a new unique ID for the document
    const newDocument = await Document.create({
      _id: uuidv4(), // Use uuid or another method to generate a unique string
      title,
      data: content,
    });

    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res
      .status(500)
      .json({ message: "Error creating document", error: error.message });
  }
});

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
    if (document) {
      // Emit the loaded document if it exists
      socket.emit("load-document", document);
    } else {
      // Handle the case where the document does not exist
      socket.emit("load-document", { data: "", title: "Untitled" }); // Send an empty document or handle as needed
    }
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
    if (document) {
      // Check if the document exists before saving
      document.data = changes;
      await document.save();
    }
  }
  documentChanges = {}; // Clear the memory after saving
}, 3000); // 3 seconds

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

async function findOrCreateDocument(id) {
  if (id === null) return;

  // Attempt to find the document by its ID
  const document = await Document.findById(id);

  // If the document exists, return it
  if (document) return document;

  // Return null if the document does not exist
  return null;
}

// Note: Only allow access to documents shared with the user.
// Implement authorization as needed.
// break down server.js to modules including socket, mongodb, app.get functionality
