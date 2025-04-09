import PropTypes from 'prop-types';

const Header = ({onLogout}) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;