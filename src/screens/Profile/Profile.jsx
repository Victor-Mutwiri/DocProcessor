import { UserProfile } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import './Profile.css'
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate()
  /* useEffect(() => {
    navigate('/main')
  }, [navigate]) */
  const handleClose = () => {
    navigate('/main')
  }
  return (
    <div className="profile-container">
      <UserProfile />
      <button className="close-btn" onClick={handleClose}>Close</button>
    </div>
  )
}

export default Profile