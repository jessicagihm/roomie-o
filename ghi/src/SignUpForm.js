import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./SignUpForm.css";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password: password,
      first: first,
      last: last,
      age: age,
      gender: gender,
      image: image,
      bio: bio,
    };
    register(accountData, `${process.env.REACT_APP_API_HOST}/api/signup`);

    e.target.reset();
    navigate("/preferences");
  };

  return (
    <div className="centered-container">
      <div className="card preferences-form mb-3">
        <h5 className="card-header">Sign Up</h5>
        <div className="card-body">
          <form onSubmit={(e) => handleRegistration(e)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={username}
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                value={password}
                type="password"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">First</label>
              <input
                name="first"
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last</label>
              <input
                name="last"
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setLast(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                name="age"
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <input
                name="gender"
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                name="image"
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tell us about yourself</label>
              <input
                name="bio"
                type="text"
                className="form-control preferences-form-input"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </div>
            <div>
              <button className="custom-button preferences-btn" type="submit">
                Sign Up
                <div className="glow"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
