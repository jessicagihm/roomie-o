// import React, { useEffect, useState } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import './RoomsList.css';

// function RoomsList() {
//   const { token } = useToken();
//   const [rooms, setRooms] = useState([]);
//   const navigate = useNavigate();

//   const fetchRooms = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/rooms", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Network response was not ok (status ${response.status})`
//         );
//       }

//       const data = await response.json();
//       setRooms(data.rooms);
//     } catch (error) {
//       console.error("Error fetching room data:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchRooms();
//     }
//   }, [token]);

//   function capFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

//   return (
//      <div className="rooms-container">
//       {rooms
//       ? rooms.map((room) => {
//           const [firstName, lastName] = typeof room.user_id === 'string' && room.user_id.includes(' ')
//         ? room.user_id.split(' ')
//         : ['', ''];

//           const displayName = firstName && lastName ? `${firstName} ${lastName}` : room.user_id;

//           return (
//             <div key={room.id}>
//               <button onClick={() => navigate("/")} className="unstyled-button">
//                 <Card style={{ width: "18rem" }}>
//                   <Card.Img variant="top" src={room.image} />
//                   <Card.Body>
//                     <Card.Title>
//                       {displayName}
//                     </Card.Title>
//                     <Card.Text>
//                       {capFirstLetter(room.space)}
//                       <div>
//                         {capFirstLetter(room.city)}, {room.state}
//                       </div>
//                     </Card.Text>
//                     <Link to={`/rooms/${room.id}`}></Link>
//                   </Card.Body>
//                 </Card>
//               </button>
//             </div>
//           );
//         })
//       : null}
//     </div>
//   );
// }

// export default RoomsList;
