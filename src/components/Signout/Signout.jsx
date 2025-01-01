import {useAuth} from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';
import {API_BASE_URL} from '../../config/config';

const Signout = () => {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            try {
                // Sign out from the backend
                const response = await fetch(`${API_BASE_URL}/logout`, {
                    method: 'GET',
                    credentials: 'include', // Include credentials (cookies) in the request
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data.message)
                } else {
                    console.error('Error signing out from backend:', data.error)
                }
            } catch (error) {
                console.error('Error signing out from backend:', error)
            }

            // Sign out from Clerk
            signOut().then(() => {
                navigate('/')
            })
        }
    }

    return (
        <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default Signout;