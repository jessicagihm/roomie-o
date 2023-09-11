import React, { useCallback, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        throw new Error(`Must be logged in (status ${response.status})`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token]); // Include token as a dependency

  useEffect(() => {
    getData(); // Call getData inside the useEffect
  }, [getData]);

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="users-container">
      {users
        ? users.map((user) => (
            <div key={user.id}>
              <button
                onClick={() => navigate(`/preferences/${user.id}`)}
                className="unstyled-button"
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={user.image} />
                  <Card.Body>
                    <Card.Title>
                      {capFirstLetter(user.first)} {capFirstLetter(user.last)}
                    </Card.Title>
                    <Card.Text>
                      {user.age}, {capFirstLetter(user.gender)}
                    </Card.Text>
                    <Card.Text>{user.bio}</Card.Text>
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
