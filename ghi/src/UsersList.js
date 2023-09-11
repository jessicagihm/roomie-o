import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react"


function UsersList() {
  const [users, setUsers] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        throw new Error(`Must be logged in (status ${response.status})`);
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    getData();
  }, []);

  return(
    <div>
      {
        users
        ?
        users.map((user) => {
          return(
            <div>
              <button onClick={()=> navigate("/")} className="unstyled-button">
                <Card key={user.id} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={user.image} />
                  <Card.Body>
                    <Card.Title>{user.first} {user.last}</Card.Title>
                    <Card.Text>
                      About Me
                    </Card.Text>
                    <Link to={`/user/${user.id}`}>
                    </Link>
                  </Card.Body>
                </Card>
              </button>
            </div>
          )
          })
          :
          null
        }

      </div>
  );
  }


  export default UsersList;
