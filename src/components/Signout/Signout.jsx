import {useAuth} from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';

const Signout = () => {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            signOut().then(() => {
                navigate('/');
            });
        }
    };

    return (
        <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default Signout;