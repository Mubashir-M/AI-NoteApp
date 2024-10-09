import React, { useState, useEffect, useRef } from "react";

export default function LinkSelector({ editor }) {
  const [url, setUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const linkInputRef = useRef(null);
  const linkButtonRef = useRef(null); // Create a ref for the button

  const toggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      setIsEditing(!isEditing);
    }
  };

  const setLink = () => {
    let formattedUrl = url;
    // Check if the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }
    if (formattedUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl })
        .run();
    }
    setIsEditing(false);
    setUrl("");
  };

  const handleClickOutside = (event) => {
    if (
      linkInputRef.current &&
      !linkInputRef.current.contains(event.target) &&
      linkButtonRef.current &&
      !linkButtonRef.current.contains(event.target)
    ) {
      setIsEditing(false); // Hide input if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="link-button-container">
      <button
        className={editor.isActive("link") ? "is-active" : ""}
        ref={linkButtonRef}
        onClick={toggleLink}
        title={editor.isActive("link") ? "Remove Link" : "Insert Link"}
      >
        <i className="fa-solid fa-link"></i>
      </button>

      {isEditing && (
        <div className="link-input-container" ref={linkInputRef}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            autoFocus
          />
          <button onClick={setLink}>Apply</button>
        </div>
      )}
    </div>
  );
}
