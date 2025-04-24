import { useNavigate } from "react-router-dom"
import './UserProfile.css'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const ProfileHeader = ({onLogout}) => {
    const navigate = useNavigate()
  /* useEffect(() => {
    navigate('/main')
  }, [navigate]) */
  const handleClose = () => {
    navigate('/main')
  }
  return (
    <header className="profile-header">
      <div className="profile-header-content">
        <h1>User Profile</h1>
        <div className="profile-user-info">
          {/* <span>Welcome</span> */}
          <div className="logout">
            
            <button onClick={onLogout} className="logout-button"> <FontAwesomeIcon icon={faSignOut} className="logout-icon" /> Logout</button>
          </div>
          <button onClick={handleClose} className="">Close</button>
        </div>
      </div>
    </header>
  );
};

ProfileHeader.propTypes = {
    onLogout: PropTypes.func.isRequired
}

export default ProfileHeader;