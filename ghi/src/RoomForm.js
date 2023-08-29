import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function RoomForm() {
  const [housingType, setHousingType] = useState('');
  const [rooms, setRooms] = useState('');
  const [leaseType, setLeaseType] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [availableDate, setAvailableDate] = useState('');

  const currentLocation = useLocation();
  const navigate = useNavigate();

  const createRoom = async (roomData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/create`, {
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
      rooms,
      leaseType,
      bathrooms,
      location: locationValue,
      availableDate,
    };

    try {
      await createRoom(roomData);
      navigate('/success');
    } catch (error) {
      console.error('Error submitting room form:', error);
    }
  };

  const isCreateRoomPage = currentLocation.pathname === '/rooms/create';

  return (
    <form onSubmit={handleSubmit}>
      {!isCreateRoomPage && (
        <div>
          <NavLink to="/">Home</NavLink>
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle me-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            </div>
          </div>
        </div>
      )}
      <label>
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
      {/* Other input fields */}
      <button type="submit">List Room</button>
    </form>
  );
}

export default RoomForm;












// import React, { useState } from 'react';
// // import useAToken from './UIAuth.tsx';
// import { useNavigate } from 'react-router-dom';

// function RoomForm() {
//   const [housingType, setHousingType] = useState('');
//   const [rooms, setRooms] = useState('');
//   const [leaseType, setLeaseType] = useState('');
//   const [bathrooms, setBathrooms] = useState('');
//   const [location, setLocation] = useState('');
//   const [availableDate, setAvailableDate] = useState('');

//   const navigate = useNavigate(); // Navigation hook, assuming it's used for redirection

//   const createRoom = async (roomData) => {
//     // Simulate an API call or backend interaction
//     // Replace this with your actual API request logic
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(roomData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create room');
//     }
//   };

//   // Assuming you have a function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const roomData = {
//       housingType,
//       rooms,
//       leaseType,
//       bathrooms,
//       location,
//       availableDate,
//     };

//     try {
//       // Call the function to create a new room listing
//       await createRoom(roomData);

//       // Redirect after successful submission
//       navigate('/success'); // Redirect to a success page
//     } catch (error) {
//       console.error('Error submitting room form:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Housing Type:
//         <select value={housingType} onChange={(e) => setHousingType(e.target.value)}>
//           <option value="">Select Housing Type</option>
//           <option value="apartment">Apartment</option>
//           <option value="house">House</option>
//           <option value="condo">Condo</option>
//           <option value="studio">Studio</option>
//           <option value="studio">Off Grid</option>
//         </select>
//       </label>
//       {/* Other form fields */}
//       <button type="submit">List Room</button>
//     </form>
//   );
// }

// export default RoomForm;
