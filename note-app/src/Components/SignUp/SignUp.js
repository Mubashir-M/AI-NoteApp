import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Login/InputField";
import axios from "axios";

export default function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      localStorage.setItem("jwtToken", response.data.token);
      onSignUp();
      navigate("/");
    } catch (error) {
      console.log(error);
      // Check if the error has a response object with data
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} action="#" className="signup-form">
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
