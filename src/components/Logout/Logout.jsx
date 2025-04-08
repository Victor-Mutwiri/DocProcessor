import './Logout.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PropTypes from 'prop-types'
import {API_BASE_URL} from '../../config/config'



const Logout = ({onLogout}) => {
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            setIsLoggingOut(true)
            try {
                // Sign out from the backend
                const response = await fetch(`${API_BASE_URL}/logout`, {
                    method: 'GET',
                    credentials: 'include',
                })
                
                // First check if the response is OK
                if (response.ok) {
                    // Check if there's actually content to parse before trying to parse JSON
                    const contentType = response.headers.get('content-type')
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json()
                        console.log(data.message)
                    } else {
                        console.log('Logout successful (non-JSON response)')
                    }
                    
                    // Handle successful logout regardless of response format
                    onLogout()
                    navigate('/')
                } else {
                    // Handle error response
                    const errorText = await response.text()
                    console.error('Error logging out:', errorText)
                    alert('Error logging out. Please try again.')
                }
            } catch (error) {
                console.error('Error during logout process:', error)
                alert('An error occurred while logging out.')
            } finally {
                setIsLoggingOut(false)
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

Logout.propTypes = {
    onLogout: PropTypes.func.isRequired
}

export default Logout