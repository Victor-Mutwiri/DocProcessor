import PropTypes from 'prop-types';
import UserActions from './UserActions';

const UsersList = ({ users, onRefreshUsers }) => {
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
              <td>{user.status || (user.is_active ? 'Active' : 'Inactive')}</td>
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
                  onRefreshUsers={onRefreshUsers}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefreshUsers:PropTypes.func.isRequired,
};

export default UsersList;