const { Server } = require("socket.io");
const Document = require("../models/Document");

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let documentChanges = {};

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join-document", (documentId) => {
      socket.join(documentId);
    });

    socket.on("load-document", async (id) => {
      const document = await findOrCreateDocument(id);
      if (document) {
        socket.emit("load-document", document);
      } else {
        socket.emit("load-document", { data: "", title: "Untitled" });
      }
    });

    socket.on("send-changes", async ({ id, changes }) => {
      documentChanges[id] = changes;
      socket.broadcast.to(id).emit("receive-changes", changes);
    });
  });

  setInterval(async () => {
    for (const [id, changes] of Object.entries(documentChanges)) {
      const document = await findOrCreateDocument(id);
      if (document) {
        document.data = changes;
        await document.save();
      }
    }
    documentChanges = {};
  }, 3000);
};

async function findOrCreateDocument(id) {
  if (!id) return null;

  const document = await Document.findById(id);
  return document || null;
}

module.exports = setupSocketIO;
