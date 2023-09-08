import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then(() => {
        console.log("Login successful");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="login-container flex-r">
      <form onSubmit={handleSubmit} className="login-text-container">
        <div className="logo-container">
          <span>
            <i className="fas fa-user"></i>
          </span>
        </div>
        <h1>Login</h1>
        <p>Please enter your credentials to proceed.</p>
        <div className="input-box-container">
          <label className="label">Username:</label>
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div className="input-box-container">
          <label className="label">Password:</label>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <i className="fas fa-lock"></i>
          </div>
        </div>
        <button type="submit" className="custom-button">
          Login
        </button>
        <p className="extra-line">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
