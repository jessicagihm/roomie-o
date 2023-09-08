import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RoomDetails() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const roomUrl = `${process.env.REACT_APP_API_HOST}/api/rooms/${roomId}`;

    fetch(roomUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed network response");
        }
        return response.json();
      })
      .then((data) => {
        setRoomData(data);
      })
      .catch((error) => {
        console.error("Could not fetch data", error);
      });
  }, [roomId]);

  if (!roomData) {
    return <div>Room details</div>;
  }

  return (
    <div>
      {roomData ? (
        <div>
          <h2>Room Details</h2>
          <p>Room Name: {roomData.name}</p>
          <p>Description: {roomData.description}</p>
        </div>
      ) : (
        <p>Room data</p>
      )}
    </div>
  );
}

export default RoomDetails;
