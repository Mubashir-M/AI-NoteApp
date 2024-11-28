import React, { useState, useEffect } from "react";
import axios from "axios";
import NewDocument from "./Documents/NewDocument";
import "./FrontPage.css";
import RecentDocuments from "./Documents/RecentDocuments";

export default function FrontPage({ onOpenDocument, onCreateNew, onLogOut }) {
  const [documents, setDocuments] = useState([]); // Store documents

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/documents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Pass token for authenticated request
        },
      })
      .then((response) => {
        setDocuments(response.data); // Set documents from the response
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const openDocument = (id) => {
    onOpenDocument(id); // Opens selected document
  };

  const handleLogout = () => {
    onLogOut(); // Handles logout
  };

  return (
    <div className="front-page-container">
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      <NewDocument onCreateNew={onCreateNew} />
      <RecentDocuments documents={documents} openDocument={openDocument} />
    </div>
  );
}
