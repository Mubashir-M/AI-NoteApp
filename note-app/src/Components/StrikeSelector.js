import React from "react";

export default function StrikeSelector({ editor }) {
  const toggleStrikethrough = () => {
    if (editor.isActive("strike")) {
      editor.chain().focus().unsetStrike().run(); // Remove strikethrough if active
    } else {
      editor.chain().focus().toggleStrike().run(); // Apply strikethrough
    }
  };

  return (
    <div className="strike-selector-container">
      <button
        onClick={toggleStrikethrough}
        className={editor.isActive("strike") ? "is-active" : ""}
        title={
          editor.isActive("strike")
            ? "Remove Strikethrough"
            : "Add Strikethrough"
        }
      >
        <i className="fa-solid fa-strikethrough"></i>
      </button>
    </div>
  );
}
