import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import Signout from '../../components/Signout/Signout'
import DocumentAnalysis from '../../components/DocumentAnalysis/DocumentAnalysis'
import FileManagement from '../../components/FileManagement/FileList'
import FileUpload from '../../components/FileManagement/FileUpload'
import ChatSection from '../../components/Chat/ChatSection'
import DarkModeToggle from '../../components/common/DarkModeToggle'
import '../../styles/MainScreen.css'

const MainScreen = () => {
    const { isSignedIn, isLoaded } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/sign-in')
        }
    }, [isSignedIn, isLoaded, navigate])

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>
    }

    return (
        <div className="main-container">
            <div className="main-header">
                <h1 className="main-title">Legal Document Assistant</h1>
                <div>
                    <DarkModeToggle />
                    <Signout />
                </div>
                
            </div>
            <div className="main-content">
                <DocumentAnalysis />
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <FileManagement />
                    <FileUpload />
                </div>
                <ChatSection />
            </div>
        </div>
    )
}

export default MainScreen 