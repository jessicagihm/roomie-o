import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import RoomDetails from "./RoomDetails";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import RoomForm from "./RoomForm";
import HomePage from "./HomePage";
import PreferenceCreateForm from "./PreferencesForm";
import UsersList from "./UsersList";
import PreferenceDisplay from "./PreferenceDisplay";
import RoomsList from "./RoomsList";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <Router basename={basename}>
        <div>
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/rooms/create" element={<RoomForm />} />
              <Route path="/rooms/:roomId" element={<RoomDetails />} />
              <Route path="/rooms" element={<RoomsList />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/preferences" element={<PreferenceCreateForm />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/preferences/:pref_id" element={<PreferenceDisplay />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
