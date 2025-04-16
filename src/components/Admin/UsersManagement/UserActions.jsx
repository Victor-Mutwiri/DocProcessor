import PropTypes from 'prop-types';
import { deleteUser, toggleUserStatus } from '../../../services/api';

const UserActions = ({ user, onRefreshUsers }) => {
  const handleToggleStatus = async () => {
    try {
      await toggleUserStatus(user.id);
      onRefreshUsers(); // Refresh the user list after toggling status
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user.id);
        onRefreshUsers(); // Refresh the user list after deleting a user
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const actionLabel = user.is_active? 'Deactivate':'Activate';

  return (
    <div className="user-actions">
      <button
        onClick={handleToggleStatus}
        className={user.is_active ? 'btn-warning' : 'btn-success'}
      >
        {actionLabel}
      </button>
      <button onClick={handleDelete} className="btn-danger">
        Delete
      </button>
    </div>
  );
};

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
  onRefreshUsers:PropTypes.func.isRequired,
};

export default UserActions;