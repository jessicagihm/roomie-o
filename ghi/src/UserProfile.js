// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';



// function UserDetails() {
//   const { roomId } = useParams();
//   const [roomData, setRoomData] = useState(null);

//   useEffect(() => {
//     const userUrl = `${process.env.REACT_APP_API_HOST}/api/users/${userId}`;

//     fetch(userUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed network response");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setRoomData(data);
//       })
//       .catch((error) => {
//         console.error("Could not fetch data", error);
//       });
//   }, [userId]);

//   if (!userData) {
//     return <div>User Profile</div>;
//   }

//   function capFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

//  function formatDate(dateString) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   }

//   return (
//     <div className="page-container">
//       <div className="user-details">
//         {roomData ? (
//           <>
//             <h2 className="custom-font">{capFirstLetter(roomData.space)}</h2>
//             <div className="image-container">
//               <img src={userData.picture} alt="User" className="centered-image" />
//             </div>
//             <div className="text-columns">
//               <div className="column">
//                 <p>Listing Price: ${userData.cost} <span style={{ fontSize: '12px' }}>month</span></p>
//                 <p>Lease Type: {userData.lease_type}</p>
//                 <p>Available Rooms: {userData.available_rooms}</p>
//                 <p>Bathrooms: {userData.bathrooms}</p>
//               </div>
//               <div className="column">
//                 <p>Description: {userData.description}</p>
//                 <p>City: {userData.city}</p>
//                 <p>State: {userData.state}</p>
//                 <p>Pets Allowed: {userData.pets_allowed ? 'Yes' : 'No'}</p>
//                 <p>Available Date: {formatDate(userData.created)}</p>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p>Room data</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RoomDetails;
