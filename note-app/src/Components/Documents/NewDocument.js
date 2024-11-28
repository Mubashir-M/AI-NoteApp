import React from "react";
import "./NewDocument.css";

export default function NewDocument({ onCreateNew }) {
  return (
    <div className="new-document-container">
      <div className="new-document-elements">
        <h3 className="start-new-document">Start a new document</h3>
        <button className="create-new-document-button" onClick={onCreateNew}>
          <i className="fa-solid fa-plus"></i>
        </button>
        <div className="new-document">New Document</div>
      </div>
    </div>
  );
}
