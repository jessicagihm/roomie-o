import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { token } = useToken();
  const decodedToken = token ? jwtDecode(token) : null;
  const userFirstName = decodedToken ? decodedToken.account.first : "User";

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status ${response.status})`
          );
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status ${response.status})`
          );
        }

        const data = await response.json();
        setRooms(data.rooms);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    if (token) {
      fetchUsers();
      fetchRooms();
    }
  }, [token]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        <span className="fade-in">{`Welcome, ${userFirstName}!`}</span>
      </h1>
      <h2>Find your next roomie</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {users.slice(0, 3).map((user) => (
          <div key={user.id} style={{ marginRight: "20px" }}>
            <Link to={`/user/${user.id}`}>
              <div className="user-card">
                <img src={user.image} alt={`${user.first} ${user.last}`} />
                <h3>{`${user.first} ${user.last}`}</h3>
                <p>{user.bio}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h2>Find your next home</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {rooms.slice(0, 3).map((room) => (
          <div key={room.room_id} style={{ marginRight: "20px" }}>
            <Link to={`/room/${room.room_id}`}>
              <div className="room-card">
                <img src={room.picture} alt={`Room in ${room.city}`} />
                <h3>{`${room.city}, ${room.state}`}</h3>
                <p>{`Cost: $${room.cost} per month`}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
