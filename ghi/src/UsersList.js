import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./RoomForm.css";




function UsersList() {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    const response = await fetch("http://localhost:8000/api/users");
    const data = await response.json();
    setUsers(data.users)
  }


  useEffect(() => {
    getData()
  }, [])

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
  )
  }


  export default UsersList;
