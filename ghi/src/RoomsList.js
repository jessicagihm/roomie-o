// import React, { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function RoomsList() {
//   const [rooms, setRooms] = useState();
//   const navigate = useNavigate();

//   const getData = async () => {
//     const response = await fetch("http://localhost:8000/api/rooms");
//     const data = await response.json();
//     setRooms(data.rooms);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       {rooms
//         ? rooms.map((room) => {
//             return (
//               <div>
//                 <button
//                   onClick={() => navigate("/")}
//                   className="unstyled-button"
//                 >
//                   <Card key={room.id} style={{ width: "18rem" }}>
//                     <Card.Img variant="top" src={room.image} />
//                     <Card.Body>
//                       <Card.Title>
//                         {room.user_id} {room.space}
//                         {room.available_rooms} {room.bathrooms}
//                         {room.city} {room.state}
//                         {room.user_id} {room.space}
//                       </Card.Title>
//                       <Card.Text>About Me</Card.Text>
//                       <Link to={`/rooms/${room.id}`}></Link>
//                     </Card.Body>
//                   </Card>
//                 </button>
//               </div>
//             );
//           })
//         : null}
//     </div>
//   );
// }

// export default RoomsList;
