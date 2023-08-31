import React, { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/");
      if (!response.ok) {
        throw new Error("Unable to retrieve profile");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <tbody>
      {users.map((user) => (
        return ()
        <div key={user.id} className="card" style={{ width: "18rem" }}>
          <img src={user.image} className="card-img-top" alt={user.first} />
          <div className="card-body">
            <h5 className="card-title">
              {user.first} {user.last}
            </h5>
            <p className="card-text">Looking for a Roomie.</p>
            <a href="#" className="btn btn-primary">
              My Profile
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
