import React from "react";
import TextEditor from "../src/Components/TextEditor";
import FrontPage from "../src/Components/FrontPage"; // Import your FrontPage component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AppRoutes = () => {
  const navigate = useNavigate(); // Call useNavigate here

  const openDocument = (id) => {
    navigate(`/documents/${id}`); // Navigate to the document editor with the specific document ID
  };

  const createNewDocument = () => {
    const newDocumentId = uuidV4(); // Generate a new document ID
    navigate(`/documents/${newDocumentId}`); // Navigate to the new document editor
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FrontPage
            onOpenDocument={openDocument}
            onCreateNew={createNewDocument}
          />
        }
      />
      <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Use the new AppRoutes component */}
    </Router>
  );
}

export default App;
