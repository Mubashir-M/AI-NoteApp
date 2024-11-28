import React from "react";
import "./DocumentCard.css";
import DocumentDropDown from "./DocumentDropDown";

export default function DocumentCard({ document, openDocument, onDelete }) {
  const handleCardClick = () => {
    openDocument(document._id); // Call openDocument with the document's ID
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-top">
        <i className="fa-solid fa-file fa-3x"></i>
      </div>
      <div className="card-bottom">
        <div className="document-title">{document.title}</div>
        <DocumentDropDown documentId={document._id} onDelete={onDelete} />
      </div>
    </div>
  );
}
