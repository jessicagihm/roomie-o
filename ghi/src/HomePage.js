import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import jwtDecode from "jwt-decode";
import "./HomePage.css";

const HomePage = () => {
  const { token, loading } = useToken();
  const decodedToken = token ? jwtDecode(token) : null;
  const userFirstName = decodedToken ? decodedToken.account.first : "User";

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          throw new Error("No token received");
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

    const fetchRoomData = async () => {
      try {
        if (!token) {
          throw new Error("No token received");
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

    if (token && !loading) {
      fetchUserData();
      fetchRoomData();
    }
  }, [token, loading]);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>
            <span className="fade-in">{`Welcome, ${userFirstName}!`}</span>
          </h1>
          <h2>Find your next roomie</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {users.slice(0, 3).map((user) => (
              <div key={user.id} style={{ marginRight: "20px" }}>
                <span
                  className="clickable-card"
                  onClick={() => {
                    window.location.href = `/preferences/${user.id}`;
                  }}
                >
                  <div className="user-card">
                    <div className="user-image">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={`${user.first} ${user.last}`}
                        />
                      ) : (
                        <div className="default-user-image">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3>{`${user.first} ${user.last}`}</h3>
                    <p>{user.bio}</p>
                  </div>
                </span>
              </div>
            ))}
          </div>
          <h2>Find your next home</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {rooms.slice(0, 3).map((room) => (
              <div key={room.room_id} style={{ marginRight: "20px" }}>
                <span
                  className="clickable-card"
                  onClick={() => {
                    window.location.href = `/rooms/${room.room_id}`;
                  }}
                >
                  <div className="room-card">
                    <div className="room-image">
                      {room.picture ? (
                        <img src={room.picture} alt={`Room in ${room.city}`} />
                      ) : (
                        <div className="default-room-image">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3>{`${room.city}, ${room.state}`}</h3>
                    <p>{`Cost: $${room.cost} per month`}</p>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
