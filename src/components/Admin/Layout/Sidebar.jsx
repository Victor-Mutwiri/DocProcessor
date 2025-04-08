import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Admin Panel</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin" exact activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName="active">
              Users Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/system" activeClassName="active">
              System Health
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;