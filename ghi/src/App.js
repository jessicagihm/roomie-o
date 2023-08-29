import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider, useAuthContext } from './path/to/auth-context'; // Import AuthProvider and useAuthContext
import Nav from "./Nav";
// import Construct from "./Construct";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./LoginForm";
import RoomForm from "./RoomForm";
import MainPage from "./MainPage";
import HomePage from "./HomePage";

function App() {
  // const { token } = useAuthContext();
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    // <AuthProvider>
      <Router>
        <div>
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/rooms/create" element={<RoomForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    // </AuthProvider>
  );
}

export default App;
