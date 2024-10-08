import React from "react";

export default function HighlightColorSelector({
  highlightColor,
  highlightPickerRef,
  onHandleHighlightChange,
  onToggleHighlightPicker,
}) {
  return (
    <div>
      {/* Highlight Color Selector with Icon */}
      <button
        onClick={onToggleHighlightPicker}
        title="Highlight Color"
        className="highlight-color-button"
      >
        <i
          className="fa-solid fa-highlighter"
          style={{ color: highlightColor }}
        />
        <div
          className="current-highlight-color" // Corrected class name
          style={{ backgroundColor: highlightColor }}
        />
        <input
          type="color"
          value={highlightColor}
          onChange={onHandleHighlightChange}
          title="Highlight Color"
          ref={highlightPickerRef} // Reference to the hidden input
          style={{ display: "none" }} // Hide the color input
        />
      </button>
    </div>
  );
}
