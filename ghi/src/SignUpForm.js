import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");

  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,

    };
    register(accountData, `${process.env.REACT_APP_API_HOST}/api/signup`);
    e.target.reset();
    navigate("/");
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
        </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
        </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation</label>
            <input
              name="first"
              type="text"
              className="form-control"
              onChange={(e) => {
                setPasswordConf(e.target.value);
              }}
            />
        </div>
          <div>
            <input className="btn btn-primary" type="submit" value="SignUp" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
