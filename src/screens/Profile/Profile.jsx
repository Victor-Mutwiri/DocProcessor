import {useEffect} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import './Profile.css'
import PasswordChange from './Passwordchange'
import ProfileSidebar from "../../components/UserProfile/ProfileSidebar"
import ProfileHeader from "../../components/UserProfile/ProfileHeader"

const Profile = ({sessionId}) => {
  const navigate = useNavigate()

    /* useEffect(() => {
        if (!sessionId) {
            navigate('/user')
        }
    }, [sessionId, navigate])
    console.log ('The sessionId in profilescreen is:', sessionId) */

  return (
    <div className="profile-container">
      <ProfileSidebar/>
      <div className="profile-content">
        <ProfileHeader/>
        <div className="profile-main-content">
          <Routes>
            {/* <Route index element={< />} /> */}
            <Route path="/passwords" element={<PasswordChange />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
    sessionId: PropTypes.string.isRequired,
}

export default Profile