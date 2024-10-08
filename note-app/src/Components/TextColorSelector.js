import React from "react";

export default function TextColorSelector({
  textColor,
  onHandleColorChange,
  colorPickerRef,
  onToggleColorPicker,
}) {
  return (
    <div className="text-color-container">
      {/* Text Color Selector with Icon */}
      <button
        onClick={onToggleColorPicker}
        title="Text Color"
        className="text-color-button"
      >
        <i className="fa-solid fa-a" style={{ color: textColor }} />
        <input
          type="color"
          value={textColor}
          onChange={onHandleColorChange}
          title="Text Color"
          ref={colorPickerRef} // Reference to the hidden input
          style={{ display: "none" }} // Hide the color input
        />
      </button>
    </div>
  );
}
