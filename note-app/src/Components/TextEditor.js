import React, { useRef, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Highlight from "@tiptap/extension-highlight";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import ToolBar from "./ToolBar";
import FontSize from "../Extensions/FontSize";
import TextColor from "../Extensions/TextColor";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const limit = 280;

export default function TextEditor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState(null);

  const wrapperRef = useRef();

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
      Strike,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    content: "<p>Hello World! 🎉Yippiii</p>", // Initial content
    onUpdate: ({ editor }) => {
      const newText = editor.getHTML(); // Get the HTML format
      if (socket) {
        socket.emit("send-changes", { id: documentId, changes: newText }); // Emit changes to the server
      }
    },
  });

  // useEffect for connecting to socket
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to the server");
      s.emit("join-document", documentId); // Join the document room
      s.emit("load-document", documentId); // Load the document
    });

    // Listen for changes from other clients
    s.on("receive-changes", (newText) => {
      if (editor && newText !== editor.getHTML()) {
        editor.commands.setContent(newText, false); // Update editor with new content
      }
    });

    // Listen for the loaded document
    s.on("load-document", (document) => {
      if (editor) {
        editor.commands.setContent(document.data, false); // Load document data into the editor
      }
    });

    return () => {
      s.disconnect();
    };
  }, [editor, documentId]); // Re-run when 'editor' or 'documentId' changes

  if (!editor) {
    return null;
  }

  return (
    <div className="container" ref={wrapperRef}>
      <ToolBar editor={editor} />
      <div className="tiptap-container">
        <EditorContent
          className="text-container"
          editor={editor}
          onClick={() => editor.commands.focus()}
        />
      </div>
    </div>
  );
}
