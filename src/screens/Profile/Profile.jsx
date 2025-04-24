import {useEffect} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import './Profile.css'
import PasswordChange from '../User/Passwordchange'
import ProfileSidebar from "../../components/UserProfile/ProfileSidebar"
import ProfileHeader from "../../components/UserProfile/ProfileHeader"
import UserDashboard from "../User/UserDashboard"
import UserDelete from "../User/UserDelete"

const Profile = ({sessionId, onLogout}) => {
  const navigate = useNavigate()

    useEffect(() => {
        if (!sessionId) {
            navigate('/user')
        }
    }, [sessionId, navigate])
    console.log ('The sessionId in profilescreen is:', sessionId)

  return (
    <div className="profile-container">
      <ProfileSidebar/>
      <div className="profile-content">
        <ProfileHeader onLogout={onLogout}/>
        <div className="profile-main-content">
          <Routes>
            <Route index element={< UserDashboard sessionId={sessionId} />} />
            <Route path="/passwords" element={<PasswordChange />} />
            <Route path="/account" element={<UserDelete sessionId={sessionId}/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
    sessionId: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default Profile