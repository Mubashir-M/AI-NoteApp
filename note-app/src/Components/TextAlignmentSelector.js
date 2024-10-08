import React, { useState } from "react";

export default function TextAlignmentSelector({
  currentAlignment,
  setAlignment,
}) {
  const [isAlignmentMenuOpen, setAlignmentMenuOpen] = useState(false);

  const handleAlignmentChange = (alignment) => {
    setAlignment(alignment); // Call the setAlignment function from props
    setAlignmentMenuOpen(false); // Close the menu after selection
  };

  const getAlignmentIcon = () => {
    switch (currentAlignment) {
      case "center":
        return <i className="fas fa-align-center"></i>;
      case "right":
        return <i className="fas fa-align-right"></i>;
      case "justify":
        return <i className="fas fa-align-justify"></i>;
      default: // 'left'
        return <i className="fas fa-align-left"></i>;
    }
  };

  return (
    <div className="text-alignment-container">
      {/* Text Alignment Button */}
      <button
        onClick={() => setAlignmentMenuOpen(!isAlignmentMenuOpen)} // Toggle alignment menu
        title="Text Alignment"
        className="alignment-button"
      >
        {getAlignmentIcon()} {/* Show the current alignment icon */}
      </button>

      {/* Dropdown Menu for Text Alignment */}
      {isAlignmentMenuOpen && (
        <div className="alignment-menu">
          <button
            onClick={() => handleAlignmentChange("left")}
            title="Align Left"
          >
            <i className="fas fa-align-left"></i>
          </button>
          <button
            onClick={() => handleAlignmentChange("center")}
            title="Align Center"
          >
            <i className="fas fa-align-center"></i>
          </button>
          <button
            onClick={() => handleAlignmentChange("right")}
            title="Align Right"
          >
            <i className="fas fa-align-right"></i>
          </button>
          <button
            onClick={() => handleAlignmentChange("justify")}
            title="Justify"
          >
            <i className="fas fa-align-justify"></i>
          </button>
        </div>
      )}
    </div>
  );
}
