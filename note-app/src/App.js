import axios from "axios";
import React, { useState, useEffect } from "react";
import TextEditor from "../src/Components/TextEditor";
import FrontPage from "../src/Components//FrontPage"; // Import your FrontPage component
import LoginPage from "../src/Components/Login/LoginPage";
import SignUp from "./Components/SignUp/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AppRoutes = ({ isAuthenticated, onLogin, onLogOut }) => {
  const navigate = useNavigate(); // Call useNavigate here

  const openDocument = (id) => {
    navigate(`/documents/${id}`); // Navigate to the document editor with the specific document ID
  };

  const createNewDocument = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3001/api/documents",
        {
          title: "New Document",
          content: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      // Extract the new document ID from the response
      const newDocumentId = response.data._id;

      navigate(`/documents/${newDocumentId}`); // Navigate to the new document editor
    } catch (error) {
      console.error("(Client) Error in creating a new document: ", error);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/signup" element={<SignUp onSignUp={onLogin} />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <FrontPage
              onOpenDocument={openDocument}
              onCreateNew={createNewDocument}
              onLogOut={onLogOut}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/documents/:id"
        element={
          isAuthenticated ? <TextEditor /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken")
  );

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove token on logout
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogOut={handleLogout}
      />
    </Router>
  );
}

export default App;
