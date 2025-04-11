import PropTypes from 'prop-types';
import { deleteUser, toggleUserStatus } from '../../../services/api';

const UserActions = ({ user, onStatusToggle, onDelete }) => {
  const handleToggleStatus = async () => {
    try {
      const updatedUser = await toggleUserStatus(user.id);
      onStatusToggle(updatedUser);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user.id);
        onDelete(user.id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="user-actions">
      <button 
        onClick={handleToggleStatus}
        className={user.is_active ? 'btn-warning' : 'btn-success'}
      >
        {user.is_active ? 'Deactivate' : 'Activate'}
      </button>
      <button onClick={handleDelete} className="btn-danger">
        Delete
      </button>
    </div>
  );
};

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
  onStatusToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserActions;