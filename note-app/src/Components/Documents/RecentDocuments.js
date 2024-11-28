import React, { useState, useEffect } from "react";
import DocumentCard from "./DocumentCard";
import "./RecentDocuments.css";

export default function RecentDocuments({ documents, openDocument }) {
  const [documentList, setDocumentList] = useState(documents);

  useEffect(() => {
    setDocumentList(documents);
  }, [documents]);

  const handleDeleteDocument = (id) => {
    setDocumentList((prevList) => prevList.filter((doc) => doc._id !== id));
  };

  return (
    <div className="recent-document-container">
      <div className="recent-document-title">Recent Documents</div>
      <div className="recent-document-elements">
        {documentList.length > 0 ? (
          documentList.map((doc) => (
            <DocumentCard
              key={doc._id}
              document={doc}
              openDocument={openDocument}
              onDelete={handleDeleteDocument}
            />
          ))
        ) : (
          <p>No documents available</p>
        )}
      </div>
    </div>
  );
}
