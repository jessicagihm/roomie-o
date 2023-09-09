import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import './UsersList.css';

function UsersList() {
  const { token } = useToken();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/users`, {
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
      console.error("Could not fetch user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="users-container">
      {users
        ? users.map((user) => (
            <div key={user.id}>
              <button onClick={() => navigate(`/preferences/${user.pref_id}`)} className="unstyled-button">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={user.image} />
                  <Card.Body>
                    <Card.Title>{user.first} {user.last}</Card.Title>
                    <Card.Text>
                      Room
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

export default UsersList;
