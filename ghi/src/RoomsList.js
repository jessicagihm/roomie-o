import React, { useEffect, useState, useCallback } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import './RoomsList.css';

function RoomsList() {
  const { token } = useToken();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const fetchRooms = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Network response failed (status ${response.status})`
        );
      }

      const data = await response.json();
      setRooms(data.rooms);
    } catch (error) {
      console.error("Could not fetch room data:", error);
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchRooms();
      }
    };

    loadData();
  }, [token, fetchRooms]);

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="rooms-container">
      {rooms
        ? rooms.map((room) => (
          <div key={room.room_id}>
            <button onClick={() => navigate(`/rooms/${room.room_id}`)} className="unstyled-button">
              <Card className="hovered-card" style={{ width: "20rem", height: "19rem" }}>
                <Card.Img variant="top" src={room.picture} />
                <Card.Body style={{ padding: "1rem" }}>
                  <Card.Title>
                    {capFirstLetter(room.city)}, {room.state}
                  </Card.Title>
                  <Card.Text>
                    {capFirstLetter(room.space)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </button>
          </div>
        ))
        : null}
    </div>
  );
}

export default RoomsList;
