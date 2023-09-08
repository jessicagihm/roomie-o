import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./RoomForm.css";

function RoomForm() {
  const [space, setSpace] = useState("");
  const [leaseType, setLeaseType] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [created, setCreated] = useState("");
  const [cost, setCost] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [petsAllowed, setPetsAllowed] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  const { token } = useToken();
  const isAuthenticated = !!token;
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.account.id;
  console.log("User ID:", userId);

  const currentLocation = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <div>Please log in to list a room.</div>;
  }

  const stateOptions = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  function handleLeaseType(e) {
    setLeaseType(e.target.value);
  }

  function handleAvailableRooms(e) {
    setAvailableRooms(e.target.value);
  }

  function handleBathrooms(e) {
    setBathrooms(e.target.value);
  }

  function handleCreated(e) {
    setCreated(e.target.value);
  }

  function handleCost(e) {
    setCost(e.target.value);
  }

  function handleCity(e) {
    setCity(e.target.value);
  }

  function handleState(e) {
    setState(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handlePicture(e) {
    const file = e.target.files[0];
    setPicture(file);

    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;

      setPicture({ file: file, sizeKB: fileSizeInKB });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      space,
      lease_type: leaseType,
      available_rooms: parseInt(availableRooms),
      bathrooms: parseInt(bathrooms),
      created: created,
      cost: parseInt(cost),
      city,
      state,
      pets_allowed: petsAllowed === "yes" ? true : false,
      description,
      picture: picture ? URL.createObjectURL(picture.file) : null,
      user_id: parseInt(userId),
    };

    try {
      const roomUrl = `${process.env.REACT_APP_API_HOST}/api/rooms/create`;
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(roomData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(roomUrl, fetchConfig);

      if (!response.ok) {
        throw new Error("Could not create room");
      }

      setSpace("");
      setLeaseType("");
      setAvailableRooms("");
      setBathrooms("");
      setCreated("");
      setCost("");
      setCity("");
      setState("");
      setPetsAllowed("");
      setDescription("");
      setPicture(null);

      const responseData = await response.json();
      const roomId = responseData.room_id;

      navigate(`/rooms/${roomId}`);
    } catch (error) {
      console.error("Could not list room:", error);
    }
  };

  const isCreateRoomPage = currentLocation.pathname === "/rooms/create";

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-5 mt-5">
          <form onSubmit={handleSubmit}>
            {!isCreateRoomPage && (
              <div className="form-container">
                <NavLink to="/">Home</NavLink>
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle me-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Menu
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  ></div>
                </div>
              </div>
            )}
            <label className="label">
              Housing Type:
              <select value={space} onChange={(e) => setSpace(e.target.value)}>
                <option value="">Select Housing Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="studio">Studio</option>
                <option value="off-grid">Off Grid</option>
              </select>
            </label>
            <label>
              Lease Type:
              <input
                type="text"
                value={leaseType}
                onChange={handleLeaseType}
                className="input"
              />
            </label>
            <label>
              Available Rooms:
              <input
                type="number"
                value={availableRooms}
                onChange={handleAvailableRooms}
                className="input"
                min="0"
                max="50"
              />
            </label>
            <label>
              Bathrooms:
              <input
                type="number"
                value={bathrooms}
                onChange={handleBathrooms}
                className="input"
                min="0"
                max="50"
              />
            </label>
            <label>
              Available Date:
              <input
                type="date"
                value={created}
                onChange={handleCreated}
                className="input"
              />
            </label>
            <label>
              Listing Price:
              <input
                type="number"
                value={cost}
                onChange={handleCost}
                className="input"
                min="0"
                max="5000"
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={city}
                onChange={handleCity}
                className="input"
              />
            </label>
            <label>
              State:
              <select value={state} onChange={handleState} className="input">
                <option value="">Select State</option>
                {stateOptions.map((stateOption) => (
                  <option key={stateOption} value={stateOption}>
                    {stateOption}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              Pets Allowed:
              <div>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={petsAllowed === "yes"}
                    onChange={() => setPetsAllowed("yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={petsAllowed === "no"}
                    onChange={() => setPetsAllowed("no")}
                  />
                  No
                </label>
              </div>
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={handleDescription}
                className="input"
              >
                {" "}
              </textarea>
            </label>
            {picture ? (
              <div>
                <p>Picture Attached: {picture.name}</p>
                <button onClick={() => setPicture(null)}>Remove Picture</button>
              </div>
            ) : (
              <label className="label">
                Upload Picture:
                <input type="file" accept="image/*" onChange={handlePicture} />
              </label>
            )}
            <button type="submit">List Room</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RoomForm;
