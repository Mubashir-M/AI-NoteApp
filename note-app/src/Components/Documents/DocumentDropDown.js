import React, { useState, useEffect, useRef } from "react";
import "./DocumentDropDown.css";
import axios from "axios";

export default function DocumentDropDown({ documentId, onDelete }) {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close
  const dropdownRef = useRef(null); // Ref for dropdown menu
  const buttonRef = useRef(null); // Ref for dropdown button

  // Toggle dropdown visibility
  const toggleDropDown = (e) => {
    e.stopPropagation(); // Prevent event from propagating to the parent card
    setIsOpen(!isOpen);
  };

  const deleteDocument = async (e) => {
    e.stopPropagation(); // Prevent dropdown from closing when clicking delete

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/documents/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Document deleted successfully!");
        onDelete(documentId);
      } else {
        alert("Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Error deleting document");
    }
  };

  const shareDocument = async (e) => {
    e.stopPropagation(); // Prevent dropdown from closing when clicking share

    const email = prompt(
      "Enter the email of the user to share the document with:"
    );
    if (!email) {
      alert("Email is required to share the document.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/documents/${documentId}/share`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Document shared successfully!");
      } else {
        alert("Failed to share document");
      }
    } catch (error) {
      console.error("Error sharing document:", error);
      alert("Error sharing document");
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="document-dropdown">
      <button className="dropdown-btn" ref={buttonRef} onClick={toggleDropDown}>
        <i className="fa fa-ellipsis-v"></i>
      </button>

      {isOpen && (
        <ul className="dropdown-menu" ref={dropdownRef}>
          <li onClick={shareDocument}>Share Document</li>
          <li onClick={deleteDocument}>Delete Document</li>
        </ul>
      )}
    </div>
  );
}

/*Handle other user deleting document when shared with them */
