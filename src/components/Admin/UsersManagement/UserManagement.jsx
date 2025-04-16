import { useState, useEffect } from 'react';
import { fetchUsers } from '../../../services/api';
import UsersList from './UsersList'

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const refreshUsers= async()=>{
    setLoading(true);
    setError(null);
    try{
      const data = await fetchUsers();
      setUsers(data);
    } catch (err){
      setError(err.message);
    }finally{
      setLoading(false)
    }
  }

  
  useEffect(() => {
    refreshUsers();
  }, []);


  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-management">
      <h2>Users Management</h2>
      <UsersList
        users={users}
        onRefreshUsers={refreshUsers}
      />
    </div>
  );
};

export default UserManagement;