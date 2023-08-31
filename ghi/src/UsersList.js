import React, { useEffect, useState } from "react";

function UsersList() {
  const [users, setUser] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/users/");
    const data = await response.json();
    setUser(data.users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.user_id}</td>
                <td>{user.first}</td>
                <td>{user.last}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.image}</td>
                <td>{user.bio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
