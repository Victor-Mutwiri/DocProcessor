import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import './MainScreen.css'
import DarkModeToggle from '../../components/common/DarkModeToggle'
import Signout from '../../components/Signout/Signout'
import Profile from '../Profile/Profile'
import DocumentAnalysis from '../../components/DocumentAnalysis/DocumentAnalysis'
import FileList from '../../components/FileManagement/FileList'
import FileUpload from '../../components/FileManagement/FileUpload'
import ChatSection from '../../components/Chat/ChatSection'
import Logout from '../../components/Logout/Logout'
import UserAuth from '../User/UserAuth'
import FeaturesNav from '../../components/FeaturesNav/FeaturesNav'

const MainScreen = ({sessionId, onLogout}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionId) {
            navigate('/user')
        }
    }, [sessionId, navigate])
    console.log ('The sessionId in mainscreen is:', sessionId)

    return (
        <div className="mainScreen">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 className="text-3xl font-bold mb-5 text-center">
                    Sheria Aide
                </h1>
                {/* <div style={{ display: 'flex', gap: '1rem' }}>
                    <DarkModeToggle />
                    <Logout onLogout={onLogout} />
                    <a href="/contract-review" className="text-blue-500">Contracts</a>
                </div> */} 
            </div>
            <FeaturesNav />
            {/* <DocumentAnalysis /> */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                <div className='fileManagement' style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start' }}>
                    <FileList sessionId={sessionId}/>
                    <FileUpload sessionId={sessionId} />
                </div>
                <ChatSection sessionId={sessionId}/>
            </div>
        </div>
    )
}

MainScreen.propTypes = {
    sessionId: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default MainScreen