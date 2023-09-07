import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./Nav.css";

function Nav() {
  const { token, logout, isAuthenticated } = useToken();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!token);
  console.log(isAuthenticated);
  const handleLogout = () => {
    logout();
    setIsUserAuthenticated(false);
  };

  useEffect(() => {
    setIsUserAuthenticated(!!token);
  }, [token]);

  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar-center">
          <NavLink to="/home">
            <img
              src={`${process.env.PUBLIC_URL}/roomieologo.png`}
              alt="Logo"
              className="custom-logo-img"
            />
          </NavLink>
          <NavLink className="btn btn-light" to="/rooms/create">
            List a Room
          </NavLink>
          <NavLink className="btn btn-light me-2" to="/signup/">
            SignUp
          </NavLink>
          <NavLink className="btn btn-light me-2" to="/users/">
            UsersList
          </NavLink>
          {/* <NavLink className="btn btn-light me-2" to="/rooms/">
            RoomsList
          </NavLink> */}
            User
        </div>
      </div>
    </nav>
  );
}

export default Nav;
