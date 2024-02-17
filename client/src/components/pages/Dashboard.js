// components/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Dashboard() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/auth/all-users', {
        headers: { Authorization: `Bearer ${user?.token}` }, // Add the check here
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user?.token, user?.role]); // Add the checks here

  const handleSetAdmin = async (userId) => {
    try {
      await axios.put(`http://localhost:5001/api/auth/set-admin/${userId}`, {}, {
        headers: { Authorization: `Bearer ${user?.token}` }, // Add the check here
      });
      // Refresh the user list after setting admin role
      fetchUsers();
    } catch (error) {
      console.error('Error setting admin role:', error);
    }
  };

  return (
    <div>
      {user && user.role === 'admin' ? (
        <>
          <h1>Admin Dashboard</h1>
          <h1>{user && user.name} {user && user.lastName}</h1>
          <h3>{user && user.email}</h3>

          <h2>All Users</h2>
          <ul>
            {users.map((u) => (
              <li key={u._id}>
                {u.name} {u.lastName} - {u.email}
                {!u.role && <button onClick={() => handleSetAdmin(u._id)}>Set Admin</button>}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1>Welcome, {user && user.name}!</h1>
      )}
    </div>
  );
}

export default Dashboard;







