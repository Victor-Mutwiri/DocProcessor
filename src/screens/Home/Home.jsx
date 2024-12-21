import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import ProductImage from '../../assets/Sheria.png'

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
                    {/* <button onClick={handleSignIn} className="sign-in-button">
                        Get Started
                    </button> */}
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
            <section className="product-image">
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                    <img src={ProductImage} alt='Product' />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <h4 style={{fontSize:'2.5rem', color:'black'}}>Built for Professionals</h4>
                        <h5 style={{fontSize:'1.6rem', color:'black', fontStyle:'italic'}}>The right tools just for you...</h5>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Home
