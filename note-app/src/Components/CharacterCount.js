import React from "react";
import { EditorContent } from "@tiptap/react";

export default function CharacterCount({ editor, characterLimit }) {
  const characterCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();
  const percentage = (characterCount / characterLimit) * 100;

  return (
    <div className="characterCount-container">
      <EditorContent editor={editor} />
    </div>
  );
}
