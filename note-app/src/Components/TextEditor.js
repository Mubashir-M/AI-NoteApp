import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Highlight from "@tiptap/extension-highlight";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold"; // Import bold extension
import Italic from "@tiptap/extension-italic"; // Import italic extension
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import ToolBar from "./ToolBar";
import FontSize from "../Extensions/FontSize";
import TextColor from "../Extensions/TextColor";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";

export default function TextEditor() {
  const wrapperRef = useRef();

  // Initialize the Tiptap editor
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      TextStyle,
      FontSize,
      TextColor,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ], // Added text formatting extensions
    content: "<p>Hello World! 🎉Yippiii</p>", // Initial content
    onUpdate: ({ editor }) => {
      // Handle updates, if necessary...
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="container" ref={wrapperRef}>
      <ToolBar editor={editor} /> {/* Pass the editor to the toolbar */}
      <div className="tiptap-container">
        <EditorContent
          className="text-container"
          editor={editor}
          onClick={() => editor.commands.focus()} // Make the editor focus on click
        />{" "}
        {/* Render the Tiptap editor */}
      </div>
    </div>
  );
}
