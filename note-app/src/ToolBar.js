import React, { useState } from "react";

export default function ToolBar({ editor }) {
  const [fontSize, setFontSize] = useState("16"); // Default font size
  const [headerSize, setHeaderSize] = useState("paragraph"); // Default header size

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run();
  };

  const handleHeaderChange = (e) => {
    const size = e.target.value;
    setHeaderSize(size);
    if (size === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .setHeading({ level: parseInt(size, 10) })
        .run();
    }
  };

  return (
    <div className="toolbar-container">
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

      {/* Font Size Selector */}
      <select
        value={fontSize}
        onChange={handleFontSizeChange}
        title="Font Size"
      >
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28">28</option>
      </select>

      {/* Header Size Selector */}
      <select
        value={headerSize}
        onChange={handleHeaderChange}
        title="Header Size"
      >
        <option value="paragraph">Paragraph</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">H6</option>
      </select>

      {/* Add more buttons as needed */}
    </div>
  );
}
