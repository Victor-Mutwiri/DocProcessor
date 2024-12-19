import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import './Home.css'

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
        <div className="landing-page">
            <h1>Welcome to Our Service</h1>
            <section className="hero-section">
                <h2>Your Amazing Service Title</h2>
                <p>Discover what makes our service unique and powerful</p>
                <button onClick={handleSignIn} className="sign-in-button">
                    Get Started
                </button>
            </section>
            
            <section className="features">
                <h2>Our Features</h2>
                {/* Add your features/services here */}
                <div className="feature-grid">
                    <div className="feature">
                        <h3>Feature 1</h3>
                        <p>Description of feature 1</p>
                    </div>
                    <div className="feature">
                        <h3>Feature 2</h3>
                        <p>Description of feature 2</p>
                    </div>
                    {/* Add more features as needed */}
                </div>
            </section>
        </div>
    )
}

export default Home
