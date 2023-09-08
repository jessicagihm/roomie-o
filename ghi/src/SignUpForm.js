import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./LoginForm.css";

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

    // this is going to navigate to the user preferences page.
    // expecting this to be ("/preferences") on Ln40
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={username}
              type="text"
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              name="image"
              type="text"
              className="form-control"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <input
              name="bio"
              type="text"
              className="form-control"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </div>
          <div>
            <input className="custom-button" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
