import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"
// import Button from "react-bootstrap/Button"
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
  // }

  export default UsersList;

//   }
//   return (
//       <div onClick={() => alert("Hello from here")}>
//         <Card key={users.id} style={{ width: '18rem' }}>
//           <Meta
//             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//             avatar={<Button type="primary" shape="circle-outline">{this.props.owner}</Button>}
//             title={this.props.title}
//             description={this.props.descp}
//           />
//           <Card.Img variant="top" src={users.image} />
//           <Card.Body>
//             <Card.Title>{user.first} {users.last}</Card.Title>
//             <Card.Text>
//               About Me
//             </Card.Text>
//             <Link to={`/user/${users.id}`}>
//               <Button variant="primary">User Profile</Button>
//             </Link>
//           </Card.Body>
//         </Card>
//       )}
//     </div>
//   );
// }

// export default UsersList;
