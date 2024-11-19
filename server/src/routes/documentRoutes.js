const express = require("express");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middlware/authMiddleware");
const Document = require("../models/Document"); // Adjust the path as needed
const router = express.Router();

// Get all documents
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const documents = await Document.find({
      $or: [{ ownerId: userId }, { sharedWith: userId }],
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Get a document by ID
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the document by its ID, and check if the user is the owner or has been shared with
    const userId = req.user.userId;
    const document = await Document.findOne({
      _id: id,
      $or: [
        { ownerId: userId }, // The user is the owner of the document
        { sharedWith: userId }, // The document has been shared with the user
      ],
    });

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found or access denied" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Error fetching document" });
  }
});

// Create a new document
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newDocument = await Document.create({
      _id: uuidv4(),
      title,
      data: content,
      ownerId: req.user.userId,
    });
    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res
      .status(500)
      .json({ message: "Error creating document", error: error.message });
  }
});

// Update the document name by ID
router.put("/:id/title", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      { title },
      { new: true } // Return the updated document
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error("Error updating document title:", error);
    res.status(500).json({ message: "Error updating document title" });
  }
});

module.exports = router;

// Add updating the sharedWith when users share document acess.
