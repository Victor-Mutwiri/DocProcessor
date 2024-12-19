import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
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
            <h1 className="text-3xl font-bold mb-5 text-center">
                Legal Document Assistant
            </h1>
            
            <DocumentAnalysis />
            
            <FileManagement />
            
            <FileUpload />
            
            <ChatSection />
        </div>
    )
}

export default MainScreen