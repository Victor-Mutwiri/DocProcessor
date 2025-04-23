import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Admin Panel</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin" end activeclassname="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeclassname="active">
              Users Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/models" activeclassname="active">
              Models
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;