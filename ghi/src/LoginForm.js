import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    console.log("Login submitted");
    e.target.reset();
    navigate('/home');
    console.log("Navigation executed");
  };


    return (
    <div className="container flex-r">
      <form onSubmit={handleSubmit} className="login-text">
        <div className="logo">
          <span>
            <i className="fas fa-user"></i>
          </span>
        </div>
        <h1>Login</h1>
        <p>Please enter your credentials to proceed.</p>
        <div className="input-box">
          <label className="label">Username:</label>
          <div className="input">
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div className="input-box">
          <label className="label">Password:</label>
          <div className="input">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <i className="fas fa-lock"></i>
          </div>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <p className="extra-line">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
