import { NavLink } from 'react-router-dom';

const ProfileSidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">User Panel</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/profile" end activeclassname="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/passwords" activeclassname="active">
              Passwords
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/account" activeclassname="active">
              Account
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileSidebar;