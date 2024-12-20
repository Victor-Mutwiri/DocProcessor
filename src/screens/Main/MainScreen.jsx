import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
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
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="text-3xl font-bold mb-5 text-center">
                    Sheria Aide
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <DarkModeToggle />
                    <Signout />
                </div>
                
            </div>
            <DocumentAnalysis />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem' }}>
                <FileManagement />
                <FileUpload />
            </div>
            <ChatSection />
        </div>
    )
}

export default MainScreen