import React, { useEffect, useState } from "react";


function UsersList() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/users/");
    const data = await response.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<div>
      <h1>Technicians</h1>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>

            </tr>
        </thead>

        </table>
    </div>
    );
}




//    return (
//     <div>
//       {users.map((user) => (
//         <Card key={user.id} style={{ width: '18rem' }}>
//           <Card.Img variant="top" src={user.image} />
//           <Card.Body>
//             <Card.Title>{user.first} {user.last}</Card.Title>
//             <Card.Text>
//               About Me
//             </Card.Text>
//             <Link to={`/user/${user.id}`}>
//               <Button variant="primary">User Profile</Button>
//             </Link>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }

export default UsersList;
