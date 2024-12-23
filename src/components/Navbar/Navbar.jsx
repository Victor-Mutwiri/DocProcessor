import { Link } from 'react-router-dom'
import Logo from '../../assets/Sheria Aide.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
        <div className='logo-container'>
            <img src={Logo} className='logo'/>
            <h4>Sheria Aide</h4>
        </div>
        {/* <Link to='/'>Home</Link> */}
        <Link to='/login'>
            <button className='login-btn'>Log in</button>
        </Link>
    </nav>
  )
}

export default Navbar