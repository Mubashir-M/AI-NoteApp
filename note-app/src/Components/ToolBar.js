import React, { useState, useRef } from "react";
import FontSizeSelector from "./FontSizeSelector";
import TextAlignmentSelector from "./TextAlignmentSelector";
import TextColorSelector from "./TextColorSelector";
import HighlightColorSelector from "./HighlightColorSelector";
import HeadingSelector from "./HeadingSelector";
import FontFamilySelector from "./FontFamilySelector";
import TextFormattingButtons from "./TextFormattingButtons";
import LinkSelector from "./LinkSelector";
import StrikeSelector from "./StrikeSelector";

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

      <TextFormattingButtons editor={editor} />
      <TextColorSelector
        textColor={textColor}
        colorPickerRef={colorPickerRef}
        onHandleColorChange={handleColorChange}
        onToggleColorPicker={toggleColorPicker}
      />

      <HighlightColorSelector
        highlightColor={highlightColor}
        highlightPickerRef={highlightPickerRef}
        onHandleHighlightChange={handleHighlightChange}
        onToggleHighlightPicker={toggleHighlightPicker}
      />

      <div className="vertical-line" />
      <LinkSelector editor={editor} />
      <StrikeSelector editor={editor} />
      <div className="vertical-line" />

      <TextAlignmentSelector
        currentAlignment={currentAlignment}
        setAlignment={setAlignment}
      />
    </div>
  );
}

/* 
character count
name of the file top left
*/
