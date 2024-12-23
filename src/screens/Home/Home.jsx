import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import ProductImage from '../../assets/Sheria.png'
import SliderComponent from '../../components/Slider/Slider'

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
                    <h2>Simplify Docs like never before with Sheria Aide</h2>
                    <p>
                        Legal and compliance professionals face the daunting task of managing vast amounts of 
                        <br/>documentation while ensuring accuracy and adherence to regulations.
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
                <SliderComponent/>
            </section>
            <section className='review'>
                <h4>What do professionals say?</h4>
                <div className='quote'>
                    <div className='client'>
                        <p>“Sheria Aide is a game changer. It has helped me save time and get more done in less time.”</p>
                        <h6>Teng Whan, Advocate</h6>
                        <h6>4.8/5</h6>
                    </div>
                    <div className='client'>
                        <p>“I can’t imagine working without Sheria Aide. It has become an indispensable tool for me.”</p>
                        <h6>Michael Smith, Barrister</h6>
                        <h6>4.5/5</h6>
                    </div>
                    <div className='client'>
                        <p>“Sheria Aide has helped me find key information in seconds. It’s like having a legal assistant by my side.”</p>
                        <h6>Antony Faulkner, Solicitor</h6>
                        <h6>4.3/5</h6>
                    </div>
                    <div className='client'>
                        <p>“...My experience so far has been very positive. Sheria Aide has significantly helped me to quickly filter out important information from a multitude of documents—often information that I wouldn't have found otherwise.
                        The support has been particularly impressive...”</p>
                        <h6>Peter Karanja, Corporate Lawyer</h6>
                        <h6>4.5/5</h6>
                    </div>
                    <div className='client'>
                        <p>“Very Impressive!
                        I have been looking for an application like this one... My first document was over 500 pages. It was processed in a few minutes, maybe less. It was very accurate on the responses to my questions... This is an excellent tool for day to day use, and as a knowledge base for our legal work.”</p>
                        <h6>Patrick Jackson, Court reporter</h6>
                        <h6>4.6/5</h6>
                    </div>
                    <div className='client'>
                        <p>“Sheria Aide is a game-changer for chatting with documents! The AI-powered document analysis is incredibly accurate and efficient, saving so much time. It's intuitive to use and the answers it provides are invaluable. Highly recommend this tool!”</p>
                        <h6>Sharley Gibson, Arbitrator / Mediator</h6>
                        <h6>4.7/5</h6>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Home
