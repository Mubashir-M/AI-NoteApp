import axios from "axios";
import React from "react";
import TextEditor from "../src/Components/TextEditor";
import FrontPage from "../src/Components/FrontPage"; // Import your FrontPage component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AppRoutes = () => {
  const navigate = useNavigate(); // Call useNavigate here

  const openDocument = (id) => {
    navigate(`/documents/${id}`); // Navigate to the document editor with the specific document ID
  };

  const createNewDocument = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/documents", {
        title: "New Document",
        content: "",
      });

      // Extract the new document ID from the response
      const newDocumentId = response.data._id;

      navigate(`/documents/${newDocumentId}`); // Navigate to the new document editor
    } catch (error) {
      console.error("(Client) Error in creating a new document: ", error);
    }
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
