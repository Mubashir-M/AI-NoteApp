const http = require("http");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");
const authRoutes = require("./routes/authRoutes");
const setupSocketIO = require("./socket/socket");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoDb_Uri = process.env.MONGODB_URL;
connectDB(mongoDb_Uri);

// API Routes
app.use("/api/documents", documentRoutes);
app.use("/api/auth", authRoutes);

// Create HTTP server and set up Socket.IO
const server = http.createServer(app);
setupSocketIO(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
