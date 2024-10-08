import React from "react";

export default function HeadingSelector({ editor }) {
  const handleHeadingChange = (e) => {
    const headingLevel = e.target.value;
    if (headingLevel === "paragraph") {
      editor.chain().focus().setNode("paragraph").run(); // Set back to paragraph
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number(headingLevel) })
        .run();
    }
  };

  return (
    <div className="heading-selector-container">
      <select onChange={handleHeadingChange} title="Select Heading">
        <option value="paragraph">Normal</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>
    </div>
  );
}
