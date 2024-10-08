import React from "react";

export default function FontSizeSelector({ fontSize, onFontSizeChange }) {
  return (
    <div className="font-size-selector-container">
      {/* Font Size Selector */}
      <select value={fontSize} onChange={onFontSizeChange} title="Font Size">
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28">28</option>
      </select>
    </div>
  );
}
