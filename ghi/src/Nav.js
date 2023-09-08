import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./Nav.css";

function Nav() {
  const { token, logout, isAuthenticated } = useToken();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!token);
  console.log(isAuthenticated);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsUserAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    setIsUserAuthenticated(!!token);
  }, [token]);

  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <div className="d-flex">
          <NavLink className="btn btn-light me-2" to="/login/">
            Login
          </NavLink>
        </div>
        <div
          className={`navbar-center ${
            isUserAuthenticated ? "is-authenticated" : ""
          }`}
        >
          {isUserAuthenticated ? (
            <>
              <NavLink className="logged-in-nav-button" to="/rooms/create">
                List a Room
              </NavLink>
              <NavLink className="logged-in-nav-button" to="/preferences">
                Preferences
              </NavLink>
              <NavLink className="logged-in-nav-button" to="/users">
                Roomies
              </NavLink>
              <NavLink className="logged-in-nav-button" to="/rooms">
                Rooms
              </NavLink>
              <button className="logged-in-nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="custom-nav-button" to="/login/">
                Login
              </NavLink>
              <NavLink className="custom-nav-button" to="/signup/">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
        <div
          className={`navbar-center ${
            isUserAuthenticated ? "is-authenticated" : ""
          }`}
        >
          {isUserAuthenticated ? (
            <>
              <NavLink className="logged-in-nav-button" to="/rooms/create">
                List a Room
              </NavLink>
              <NavLink className="logged-in-nav-button" to="/preferences">
                Preferences
              </NavLink>
              <NavLink className="logged-in-nav-button" to="/users">
                Roomies
              </NavLink>
              <NavLink className="logged-in-nav-button" to="/rooms">
                Rooms
              </NavLink>
              <button
                className="logged-in-nav-button logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="custom-nav-button" to="/login/">
                Login
              </NavLink>
              <NavLink className="custom-nav-button" to="/signup/">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
