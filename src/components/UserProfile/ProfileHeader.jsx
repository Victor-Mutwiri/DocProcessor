import { useNavigate } from "react-router-dom"
import './UserProfile.css'

const ProfileHeader = () => {
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
          <button onClick={handleClose} className="">Close</button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;