import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FrontPage({ onOpenDocument, onCreateNew }) {
  const [documents, setDocuments] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch documents from backend
    axios
      .get("http://localhost:3001/api/documents")
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const openDocument = (id) => {
    onOpenDocument(id); // Call the passed function to open document
  };

  return (
    <div>
      <h1>Your Documents</h1>
      <button onClick={onCreateNew}>Create New Document</button>

      {/* Conditional rendering to ensure documents are available */}
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              <button onClick={() => openDocument(doc._id)}>
                Open Document {doc._id}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents available</p>
      )}
    </div>
  );
}

// add delete button to deletet document
// add donwload button to donwload document as pdf etc.
