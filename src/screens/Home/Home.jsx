import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
    const { isSignedIn } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        // If user is already signed in, redirect to main screen
        if (isSignedIn) {
            navigate('/main')
        }
    }, [isSignedIn, navigate])
    
    const handleSignIn = () => {
        navigate('/sign-in')
    }

    return (
        <div className="home">
            <Navbar />
            <div className="landing-page">
                <h1>Chat with documents</h1>
                <section className="hero-section">
                    <h2>Dive into PDFs like never before with Sheria Aide</h2>
                    <p>Stop wasting time searching through PDFs. Summarize long documents and simplify complex PDFs with Sheria Aide.
                        <br /> Sheria Aide is a smart assistant that helps you get instant answers, highlights, <br/>explain complex concepts, and find key information in seconds.
                    </p>
                    <button onClick={handleSignIn} className="sign-in-button">
                        Get Started
                    </button>
                </section>
                
                <section className="features">
                    <h4>Used by over 100+ legal professionals</h4>
                    <div className='formats'>
                        <p>Supported formats: </p>
                        <div className='format-icons'>
                            <span className='file'>PDF</span>
                            <span className='file'>DOCX</span>
                            <span className='file'>DOC</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home
