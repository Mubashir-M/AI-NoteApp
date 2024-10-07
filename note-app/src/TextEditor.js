import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold"; // Import bold extension
import Italic from "@tiptap/extension-italic"; // Import italic extension
import Underline from "@tiptap/extension-underline";
import ToolBar from "./ToolBar";

export default function TextEditor() {
  const wrapperRef = useRef();

  // Initialize the Tiptap editor
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Italic, Underline], // Added text formatting extensions
    content: "<p>Hello World! 🎉Yippiii</p>", // Initial content
    onUpdate: ({ editor }) => {
      // Handle updates, if necessary
      console.log(editor.getHTML());
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
