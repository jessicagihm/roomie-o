import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import Construct from "./Construct";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <ErrorNotification error={error} />
        <Construct info={launchInfo} />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
