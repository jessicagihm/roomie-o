import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignUpForm from "./SignUpForm";
import "./App.css";
import MainPage from "./MainPage";
import Nav from './Nav';



function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
