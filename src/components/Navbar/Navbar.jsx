import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import Logo from '../../assets/Sheria Aide.png'
import './Navbar.css'

const Navbar = () => {
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
    <nav>
        <div className='logo-container'>
            <img src={Logo} className='logo'/>
            <h4>Sheria Aide</h4>
        </div>
        <ul><li>Home</li></ul>
        <button className='login-btn' onClick={handleSignIn}>Log in</button>
    </nav>
  )
}

export default Navbar