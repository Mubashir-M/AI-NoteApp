import React, { useState, useRef } from "react";
import FontSizeSelector from "./FontSizeSelector";
import TextAlignmentSelector from "./TextAlignmentSelector";
import TextColorSelector from "./TextColorSelector";
import HighlightColorSelector from "./HighlightColorSelector";
import HeadingSelector from "./HeadingSelector";
import FontFamilySelector from "./FontFamilySelector";

export default function ToolBar({ editor }) {
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000"); // Default color is black
  const [highlightColor, setHighlightColor] = useState(""); // Default highlight color is none
  const colorPickerRef = useRef(null);
  const highlightPickerRef = useRef(null);

  const [currentAlignment, setCurrentAlignment] = useState("left");

  const handleFontSizeChange = (e) => {
    const size = Number(e.target.value);
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run(); // Call your editor's setFontSize method
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setTextColor(color);
    editor.chain().focus().setTextColor(color).run();
  };

  const toggleColorPicker = () => {
    if (colorPickerRef.current) {
      colorPickerRef.current.click(); // Trigger the hidden color input click
    }
  };

  const handleHighlightChange = (e) => {
    const color = e.target.value;
    setHighlightColor(color);
    editor.chain().focus().setMark("highlight", { color }).run(); // Use highlight command
  };

  const toggleHighlightPicker = () => {
    if (highlightPickerRef.current) {
      highlightPickerRef.current.click(); // Trigger the hidden color input click
    }
  };

  const setAlignment = (alignment) => {
    editor.chain().focus().setTextAlign(alignment).run();
    setCurrentAlignment(alignment); // Update the current alignment state
  };

  return (
    <div className="toolbar-container">
      <div className="vertical-line" />
      <HeadingSelector editor={editor} />
      <div className="vertical-line" />
      <FontSizeSelector
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
      />
      <div className="vertical-line" />
      <FontFamilySelector editor={editor} />
      <div className="vertical-line" />
      {/* Bold, Italic, and Underline buttons */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <i className="fas fa-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <i className="fas fa-italic"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title="Underline"
      >
        <i className="fas fa-underline"></i>
      </button>

      <TextColorSelector
        textColor={textColor}
        colorPickerRef={colorPickerRef}
        onHandleColorChange={handleColorChange}
        onToggleColorPicker={toggleColorPicker}
      />
      <div className="vertical-line" />

      <HighlightColorSelector
        highlightColor={highlightColor}
        highlightPickerRef={highlightPickerRef}
        onHandleHighlightChange={handleHighlightChange}
        onToggleHighlightPicker={toggleHighlightPicker}
      />

      <TextAlignmentSelector
        currentAlignment={currentAlignment}
        setAlignment={setAlignment}
      />
    </div>
  );
}

/* 
Continue to refactor menu items to their own components.
font family
line spacing
link
Strike
text style or font family
*/
