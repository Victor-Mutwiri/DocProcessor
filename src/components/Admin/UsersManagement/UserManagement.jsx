import { useState } from 'react';
import { fetchUsers } from '../../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      console.log('Fetched users:', data); // Log the response to the console
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-management">
      <h2>Users Management</h2>
      <button onClick={handleFetchUsers} className="btn-fetch-users">
        Fetch Users
      </button>
      {loading && <div className="loading">Loading users...</div>}
      {error && <div className="error">Error: {error}</div>}
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.is_active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;