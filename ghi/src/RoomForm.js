import React, { useState } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './RoomForm.css';


function RoomForm() {
  const [housingType, setHousingType] = useState('');
  const [availableRooms, setAvailableRooms] = useState('');
  const [leaseType, setLeaseType] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [petsAllowed, setPetsAllowed] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUpload, setPictureUpload] = useState(null);

  const { token } = useToken();
  const currentLocation = useLocation();
  const navigate = useNavigate();

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
  "VA", "WA", "WV", "WI", "WY"

 ];

  function handleAvailableRooms(e) {
    setAvailableRooms(e.target.value);
  }

  function handleLeaseType(e) {
    setLeaseType(e.target.value);
  }

  function handleBathrooms(e) {
    setBathrooms(e.target.value);
  }

  function handleAvailableDate(e) {
    setAvailableDate(e.target.value);
  }

//   const formattedListingPrice = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(listingPrice);


  function handleListingPriceChange(e) {
    const inputText = e.target.value;

    const numericValue = parseFloat(inputText.replace(/[^0-9.-]/g, ''));

    if (!isNaN(numericValue)) {
        const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        }).format(numericValue);
        setListingPrice(formattedValue);
    } else {
        setListingPrice('');
    }
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

  function handlePictureUpload(e) {
    const file = e.target.files[0];
    setPictureUpload(file);
  }


  const createRoom = async (roomData) => {
  try {
    const response = await fetch(`http://localhost:8000/api/rooms/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      housingType,
      availableRooms,
      leaseType,
      bathrooms,
      availableDate,
      listingPrice,
      city,
      state,
      petsAllowed,
      description,
      pictureUpload
    };

    try {
      const roomUrl = `${process.env.REACT_APP_API_HOST}/api/rooms/create`;
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(roomData),
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
      };
      const response = await fetch(roomUrl, fetchConfig);

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      setHousingType('');
      setAvailableRooms('');
      setLeaseType('');
      setBathrooms('');
      setAvailableDate('');
      setListingPrice('');
      setCity('');
      setState('');
      setPetsAllowed('');
      setDescription('');
      setPictureUpload(null);

      navigate('/success');
    } catch (error) {
      console.error('Error submitting room form:', error);
    }
  };


  const isCreateRoomPage = currentLocation.pathname === '/rooms/create';

  return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-5 mt-5">
            <form onSubmit={handleSubmit}>
            {!isCreateRoomPage && (
                <div className="form-container">
                <NavLink to="/">Home</NavLink>
                <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle me-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {/* Additional dropdown menu items */}
                    </div>
                </div>
                </div>
            )}
            <label className="label">
                Housing Type:
                <select value={housingType} onChange={(e) => setHousingType(e.target.value)}>
                <option value="">Select Housing Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="studio">Studio</option>
                <option value="off-grid">Off Grid</option>
                </select>
            </label>
            <label>
                Available Rooms:
                <input type="text" value={availableRooms} onChange={handleAvailableRooms} className="input"/>
            </label>
            <label>
                Lease Type:
                <input type="text" value={leaseType} onChange={handleLeaseType} className="input" />
            </label>
            <label>
                Bathrooms:
                <input type="text" value={bathrooms} onChange={handleBathrooms} className="input" />
            </label>
            <label>
                Available Date:
                <input
                type="date"
                value={availableDate}
                onChange={handleAvailableDate}
                className="input"
                />
            </label>
            <label>
                Listing Price:
                <input
                    type="text"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(e.target.value)}
                    className="input"
                />
            </label>
            <label>
                City:
                <input type="text" value={city} onChange={handleCity} className="input" />
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
                <textarea value={description} onChange={handleDescription} className="input" > </textarea>
            </label>
            <label>
                Room Picture:
                <input type="file" accept="image/*" onChange={handlePictureUpload} className="input" />
            </label>
            <button type="submit">List Room</button>
            </form>
        </div>
        </div>
    </div>
    );
    }
export default RoomForm;
