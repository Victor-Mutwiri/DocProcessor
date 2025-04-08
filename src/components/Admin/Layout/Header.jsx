
const Header = () => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <button className="btn-logout">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;