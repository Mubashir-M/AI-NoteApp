import React from "react";

const fontFamilies = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "'Georgia', serif", label: "Georgia" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
  { value: "'Verdana', sans-serif", label: "Verdana" },
  // Add more font families as needed
];

export default function FontFamilySelector({ editor }) {
  const handleFontFamilyChange = (e) => {
    const fontFamily = e.target.value;
    editor.chain().setFontFamily(fontFamily).run();
  };
  return (
    <div className="font-family-selector-container">
      <select onChange={handleFontFamilyChange} title="Select FontFamily">
        {fontFamilies.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
}
