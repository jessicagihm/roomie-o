import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RoomDetails.css';


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

  function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

 function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="page-container">
      <div className="room-details">
        {roomData ? (
          <>
            <h2 className="custom-font">{capFirstLetter(roomData.space)}</h2>
            Hosted by: <a href={`/host-profile/${roomData.hostId}`}>{roomData.profile}</a>
            <div className="image-container">
              <img src={roomData.picture} alt="Room" className="centered-image" />
            </div>
            <div className="text-columns">
              <div className="column">
                <p>Host: {roomData.profile}</p>
                <p>Listing Price: {roomData.cost}</p>
                <p>Lease Type: {roomData.lease_type}</p>
                <p>Available Rooms: {roomData.available_rooms}</p>
                <p>Bathrooms: {roomData.bathrooms}</p>
              </div>
              <div className="column">
                <p>Description: {roomData.description}</p>
                <p>City: {roomData.city}</p>
                <p>State: {roomData.state}</p>
                <p>Pets Allowed: {roomData.pets_allowed}</p>
                <p>Available Date: {formatDate(roomData.created)}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Room data</p>
        )}
      </div>
    </div>
  );
}

export default RoomDetails;
