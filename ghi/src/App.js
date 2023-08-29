import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider, useAuthContext } from './path/to/auth-context'; // Import AuthProvider and useAuthContext
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./App.css";
import MainPage from "./MainPage";
import { NavLink } from "react-router-dom";


function App() {
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        {/* <AuthProvider> */}
          <Routes>
            <Route exact path="/" element={<MainPage />}></Route>
            <Route exact path="/signup" element={<SignUpForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
          </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </div>
  );
}


export default App;
