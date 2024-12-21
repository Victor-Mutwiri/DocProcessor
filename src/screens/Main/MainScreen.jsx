import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import './MainScreen.css'
import DarkModeToggle from '../../components/common/DarkModeToggle'
import Signout from '../../components/Signout/Signout'
import DocumentAnalysis from '../../components/DocumentAnalysis/DocumentAnalysis'
import FileManagement from '../../components/FileManagement/FileList'
import FileUpload from '../../components/FileManagement/FileUpload'
import ChatSection from '../../components/Chat/ChatSection'

const MainScreen = () => {
    const { isSignedIn, isLoaded } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/sign-in')
        }
    }, [isSignedIn, isLoaded, navigate])

    if (!isLoaded || !isSignedIn) {
        return <div style={{display:'flex', justifyContent:'center', alignSelf:'center', alignItems: 'center'}}>Loading...</div>
    }

    return (
        <div className="mainScreen">
        {/* <div className="container mx-auto px-4 py-8"> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="text-3xl font-bold mb-5 text-center">
                    Sheria Aide
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <DarkModeToggle />
                    <Signout />
                </div>
                
            </div>
            {/* <DocumentAnalysis /> */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                <div className='fileManagement' style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start' }}>
                    <FileManagement />
                    <FileUpload />
                </div>
                <ChatSection />
            </div>
        </div>
    )
}

export default MainScreen