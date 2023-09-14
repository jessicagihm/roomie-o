import React, { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

function RoomEdit({ roomData, onSave }) {
  const [editedRoomData, setEditedRoomData] = useState({
    ...roomData,
    bathrooms: parseInt(roomData.bathrooms, 10),
    available_rooms: parseInt(roomData.available_rooms, 10),
    pets_allowed: roomData.pets_allowed === "yes" ? true : false, // Convert to an integer
  });
  const { token } = useToken(); // Access the authentication token


  const stateOptions = [
    "AL", "AK", "AZ", "AR", "CA",
    "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO",
    "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH",
    "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT",
    "VA", "WA", "WV", "WI", "WY",
  ];

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  const parsedValue =
    name === 'petsAllowed'
      ? value === 'yes' ? true : false
      : name === 'bathrooms' || name === 'cost' || name === 'available_rooms'
      ? parseInt(value, 10)
      : value;


    setEditedRoomData({
      ...editedRoomData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedRoomData),
    };

    fetch(`${process.env.REACT_APP_API_HOST}/api/rooms/${roomData.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not update room');
        }

        onSave(editedRoomData);
      })
      .catch((error) => {
        console.error('Failed to update room data', error);
      });
  };

  return (
    <div className="page-container">
      <div className="room-details">
        <form onSubmit={handleSubmit}>
          {/* Input fields for editing room details */}
          <div className="form-group">
            <label htmlFor="space">Housing Type</label>
            <select
              className="form-select"
              name="space"
              id="space"
              value={editedRoomData.space}
              onChange={handleInputChange}
            >
              <option value="">Select Housing Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="studio">Studio</option>
              <option value="off-grid">Off Grid</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="available_rooms">Available Rooms</label>
            <input
              type="number"
              name="available_rooms"
              id="available_rooms"
              value={editedRoomData.available_rooms}
              onChange={handleInputChange}
              min="0"
              max="50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bathrooms">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              value={editedRoomData.bathrooms}
              onChange={handleInputChange}
              min="0"
              max="50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="created">Available Date</label>
            <input
              type="date"
              name="created"
              id="created"
              value={editedRoomData.created}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost">Listing Price (per month)</label>
            <input
              type="number"
              name="cost"
              id="cost"
              value={editedRoomData.cost}
              onChange={handleInputChange}
              min="0"
              max="5000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={editedRoomData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              value={editedRoomData.state}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select State</option>
              {stateOptions.map((stateOption) => (
                <option key={stateOption} value={stateOption}>
                  {stateOption}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Pets Allowed</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="pets_allowed"
                  value="yes"
                  checked={editedRoomData.pets_allowed === "yes"}
                  onChange={handleInputChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="pets_allowed"
                  value="no"
                  checked={editedRoomData.pets_allowed === "no"}
                  onChange={handleInputChange}
                />
                No
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={editedRoomData.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="picture">Image</label>
            <input
              type="text"
              name="picture"
              id="picture"
              value={editedRoomData.picture}
              onChange={handleInputChange}
              className="form-control"
            />
        </div>
        <button type="submit">Save Changes</button>
        </form>
    </div>
    </div>
    );
    }

export default RoomEdit;
