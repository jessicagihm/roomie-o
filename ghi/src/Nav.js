import { NavLink } from "react-router-dom";
import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Home</NavLink>
        <div className="dropdown">
          <button className="btn btn-light dropdown-toggle me-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menu
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink className="dropdown-item" to="/login/">Log in</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
