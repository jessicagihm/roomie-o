import { NavLink } from "react-router-dom";
import React, { useState } from "react";


// import useToken from "@galvanize-inc/jwtdown-for-react";

function Nav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">Home</NavLink>
        <div className="ml-auto">
          <div className="dropdown d-inline-block">
            <button className="btn btn-light dropdown-toggle me-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavLink className="dropdown-item" to="/login/">Login</NavLink>
              <NavLink className="dropdown-item" to="/rooms/create">List a Room</NavLink>
              <NavLink className="dropdown-item" to="/signup/">SignUp</NavLink>
              <NavLink className="dropdown-item" to="/users/">Roomies</NavLink>



            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}




export default Nav;

// import useToken from "@galvanize-inc/jwtdown-for-react"; */}
