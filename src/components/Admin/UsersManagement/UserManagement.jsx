import { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, toggleUserStatus } from '../../../services/api';
/* import './UserManagement.css'; */

const UserManagement = () => {
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

  const handleToggleStatus = async (userId) => {
    try {
      const updatedUser = await toggleUserStatus(userId);
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-management">
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
                <div className="user-actions">
                  <button 
                    onClick={() => handleToggleStatus(user.id)}
                    className={user.is_active ? 'btn-warning' : 'btn-success'}
                  >
                    {user.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;