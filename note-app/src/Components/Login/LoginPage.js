import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link component
import SocialLogin from "./SocialLogin";
import InputField from "./InputField";
import "./LoginPage.css";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("jwtToken", response.data.token);
      onLogin();
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login-container">
      <h2 className="form-title">Login with</h2>
      <SocialLogin />

      <p className="separator">
        <span>or</span>
      </p>

      <form onSubmit={handleSubmit} action="#" className="login-form">
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
          Log In
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="signup-prompt">
        Don’t have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}

/*
Add image sources to icons img
ADD FORGOT PASSWORD OPTION
<a href="#" className="forgot-password-link">
          Forgot password?
        </a>
*/
