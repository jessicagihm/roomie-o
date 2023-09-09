import React, { useEffect, useState, useCallback } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import './UsersList.css';

function UsersList() {
  const { token } = useToken();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/users`, {
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
      setUsers(data.users);
    } catch (error) {
      console.error("Could not fetch user data:", error);
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchUsers();
      }
    };

    loadData();
  }, [token, fetchUsers]);

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
                    <Card.Title>{capFirstLetter(user.first)} {capFirstLetter(user.last)}</Card.Title>
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
