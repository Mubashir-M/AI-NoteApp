import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
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
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

export default function TextEditor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
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
    ],
    content: "<p>Hello World! 🎉Yippiii</p>", // Initial content
    onUpdate: ({ editor }) => {
      const newText = editor.getHTML(); // Get the HTML format
      if (socket) {
        socket.emit("send-changes", { id: documentId, changes: newText }); // Emit changes to the server
      }
    },
  });

  // Socket connection and event handling
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to the server");
      s.emit("join-document", documentId); // Join the document room
      s.emit("load-document", documentId); // Load the document
    });

    s.on("receive-changes", (newText) => {
      if (editor && newText !== editor.getHTML()) {
        editor.commands.setContent(newText, false); // Update editor with new content
      }
    });

    s.on("load-document", (document) => {
      if (editor) {
        editor.commands.setContent(document.data, false); // Load document data into the editor
      }
    });

    return () => {
      s.off("receive-changes");
      s.off("load.document");
      s.disconnect();
    };
  }, [editor, documentId]);

  // Fetch document on mount or when documentId changes
  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) return;

      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage

        // Make the GET request with Authorization header
        const response = await axios.get(
          `http://localhost:3001/api/documents/${documentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token here
            },
          }
        );
        setCurrentDocument(response.data);
        if (editor) {
          editor.commands.setContent(response.data.content);
        }
      } catch (error) {
        console.error("Error fetching document from TextEditor.js:", error);
      }
    };

    fetchDocument();
  }, [documentId, editor]);

  if (!editor) {
    return null; // Render nothing until editor is ready
  }

  return (
    <div className="container" ref={wrapperRef}>
      {currentDocument ? (
        <>
          <ToolBar editor={editor} currentDocument={currentDocument} />
          <div className="tiptap-container">
            <EditorContent
              className="text-container"
              editor={editor}
              onClick={() => editor.commands.focus()}
            />
          </div>
        </>
      ) : (
        <p>Loading document...</p> // Optional loading state
      )}
    </div>
  );
}
