import './Logout.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {API_BASE_URL} from '../../config/config'



const Logout = () => {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            setIsLoggingOut(true) // Indicate the logout process has started
            try {
                // Sign out from the backend
                const response = await fetch(`${API_BASE_URL}/logout`, {
                    method: 'GET',
                    credentials: 'include', // Include credentials (cookies) in the request
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data.message)
                    navigate('/') // Redirect to home page
                } else {
                    console.error('Error signing out from backend:', data.error)
                    alert('Error logging out. Please try again.')
                }
            } catch (error) {
                console.error('Error signing out from backend:', error)
                alert('An error occurred while logging out.')
            } finally {
                setIsLoggingOut(false) // Reset the logout state
            }
        }
    }

    return (
        <div className="logout">
            <button 
                onClick={handleLogout}
                className="btn btn-primary"
                disabled={isLoggingOut}
                >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    )
}

export default Logout