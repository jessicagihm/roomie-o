import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import useToken from "./App"

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password_hash, setPassword_hash] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const { register } = useToken
  const navigate = useNavigate();

   const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password_hash: password_hash,
      passwordConfirmation: passwordConfirmation,
    };
    // register(accountData, `${process.env.REACT_APP_API_HOST}/api/signup`);
    // e.target.reset();
    // navigate("/preferences");
  };



    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>SignUpForm</h1>
            <form onSubmit={(e) => handleRegistration(e)} id="create-user-form">
              <div className="form-floating mb-3">
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder=""
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={password_hash}
                  onChange={(e) => {
                    setPassword_hash(e.target.value);
                  }}
                  placeholder="password_hash"
                  type="text"
                  name="password_hash"
                  id="password_hash"
                  className="form-control"
                />
                <label htmlFor="password_hash">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setPasswordConfirmation(e.target.value);
                  }}
                  placeholder="Password Confirmation"
                  type="text"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="form-control"
                />
                <label htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}


export default SignUpForm;
