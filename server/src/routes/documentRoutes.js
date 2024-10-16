const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Document = require("../models/Document"); // Adjust the path as needed
const router = express.Router();

// Get all documents
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Get a document by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Error fetching document" });
  }
});

// Create a new document
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newDocument = await Document.create({
      _id: uuidv4(),
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

module.exports = router;
