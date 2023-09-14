import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";
import RoomEdit from './RoomEdit';
import './RoomDetails.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faDollarSign,
  faHouse,
  faCity,
  faGlobe,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'; // Import React Modal

Modal.setAppElement('#root'); // Set the root element for accessibility

function RoomDetails() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { token } = useToken(); // Get the authentication token

  const handleEditClick = () => {
    setIsEditing(true);
    setShowModal(true); // Show the modal when editing
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setIsEditing(false); // Stop editing
  };

  const handleSave = (editedRoomData) => {
    setRoomData(editedRoomData);
    setIsEditing(false);
    setShowModal(false); // Close the modal after saving
  };

  const handleDelete = async () => {
      try {
        const deleteUrl = `${process.env.REACT_APP_API_HOST}/api/rooms/${roomId}`;

        const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the authentication token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete room');
        }

        window.location.href = '/rooms'; // Redirect after successful deletion
      } catch (error) {
        console.error('Failed to delete room', error);
      }
    };

    useEffect(() => {
      const fetchRoomAndUserData = async () => {
        try {
          const roomUrl = `${process.env.REACT_APP_API_HOST}/api/rooms/${roomId}`;
          const roomResponse = await fetch(roomUrl);

          if (!roomResponse.ok) {
            throw new Error('Failed to fetch room data');
          }

          const roomData = await roomResponse.json();
          roomData.pets_allowed = roomData.pets_allowed === 'yes';
          setRoomData(roomData);

          if (roomData.user_id) {
            const userUrl = `${process.env.REACT_APP_API_HOST}/api/users/${roomData.user_id}`;
            const userResponse = await fetch(userUrl);

            if (!userResponse.ok) {
              throw new Error('Failed to fetch user data');
            }

            const userData = await userResponse.json();
            setUserData(userData);
          }
        } catch (error) {
          console.error('Could not fetch data', error);
        }
      };

      fetchRoomAndUserData();
    }, [roomId]);

    if (!roomData || !userData) {
      return <div>Loading...</div>;
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
    <div className="room-details" style={{ overflow: 'hidden' }}>
      {isEditing ? (
        <RoomEdit roomData={roomData} onSave={handleSave} roomId={roomId} />
      ) : (
        <>
          <h2 className="custom-font">{capFirstLetter(roomData.space)}</h2>
          <div className="image-container">
            <img src={roomData.picture} alt="Room" className="centered-image" />
          </div>
          <div className="edit-container">
            <button className="edit-button" onClick={handleEditClick}>
              Edit Details
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete Room
            </button>
          </div>
          <div className="text-columns">
            <div className="column">
              <p style={{ marginTop: '20px' }}></p>
              <p className="custom-font">
                <FontAwesomeIcon icon={faUser} /> Host: {userData?.firstName}{' '}
                {userData?.lastName}
              </p>
              <p className="custom-font">
                <FontAwesomeIcon icon={faDollarSign} /> Listing Price: ${roomData.cost}{' '}
                <span style={{ fontSize: '13px' }}>month</span>
              </p>
              <p className="custom-font">
                <FontAwesomeIcon icon={faHouse} /> Lease Type:{' '}
                {capFirstLetter(roomData.lease_type)}
              </p>
              <p className="custom-font">
                <i className="fa fa-bed"></i> Available Rooms: {roomData.available_rooms}
              </p>
              <p className="custom-font">
                <i className="fa fa-bath"></i> Bathrooms: {roomData.bathrooms}
              </p>
            </div>
            <div className="column">
              <p style={{ marginTop: '20px' }}></p>
              <p className="custom-font">
                <FontAwesomeIcon icon={faCity} /> City: {capFirstLetter(roomData.city)}
              </p>
              <p className="custom-font">
                <FontAwesomeIcon icon={faGlobe} /> State: {roomData.state}
              </p>
              <p className="custom-font">
                <i className="fa fa-paw"></i> Pets Allowed:{' '}
                {roomData.pets_allowed ? 'Yes' : 'No'}
              </p>
              <p className="custom-font">
                <FontAwesomeIcon icon={faCalendarDays} /> Available Date:{' '}
                {formatDate(roomData.created)}
              </p>
              <p className="custom-font">
                <i className="fa fa-info-circle"></i> Description: {roomData.description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Edit Details"
      overlayClassName=""
    >
      {/* Add your RoomEdit component or other modal content here */}
      <h3>Edit Details</h3>
      <Link to={`/edit-room/${roomId}`} className="edit-button">
        Edit Room
      </Link>
      <RoomEdit roomData={roomData} onSave={handleSave} roomId={roomId} />
      <div className="edit-container">
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  </div>
);
}

export default RoomDetails;
