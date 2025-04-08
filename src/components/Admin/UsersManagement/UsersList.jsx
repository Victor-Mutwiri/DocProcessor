import { useState, useEffect } from 'react';
import { fetchUsers } from '../../../services/api';
import UserActions from './UserActions';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleUserDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="users-list">
      <h2>Users Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Files</th>
            <th>Contracts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                {user.files.length > 0 ? (
                  <ul>
                    {user.files.map((file, idx) => (
                      <li key={idx}>{file.filename} ({new Date(file.uploaded_at).toLocaleDateString()})</li>
                    ))}
                  </ul>
                ) : 'No files'}
              </td>
              <td>
                {user.contracts.length > 0 ? (
                  <ul>
                    {user.contracts.map((contract, idx) => (
                      <li key={idx}>{contract.filename} ({new Date(contract.uploaded_at).toLocaleDateString()})</li>
                    ))}
                  </ul>
                ) : 'No contracts'}
              </td>
              <td>
                <UserActions 
                  user={user} 
                  onStatusToggle={handleUserUpdate} 
                  onDelete={handleUserDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;