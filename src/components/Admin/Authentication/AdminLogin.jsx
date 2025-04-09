import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/config';
import '../../../screens/User/UserAuth.css';


const SESSION_EXPIRATION_MINUTES = 30;

const AdminLogin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [sessionId, setSessionId] = useState(''); // State to store session ID
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin,
                },
                body: JSON.stringify({ name, password }),
                credentials: 'include',
                mode: 'cors',
            });

            const data = await response.json();
            if (response.ok) {
                const expirationTime = new Date().getTime() + SESSION_EXPIRATION_MINUTES * 60 * 1000;
                localStorage.setItem('adminSessionId', data.session_id);
                localStorage.setItem('adminSessionExpiration', expirationTime);
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    console.log('sessionId in AdminLogin is:', sessionId);

    return (
        <div className="userAuth">
            <div className="auth-container">
                <div className="welcome-section">
                    <h2>Welcome back, Admin</h2>
                    <p>Please log in to continue.</p>
                </div>
                <form onSubmit={handleLogin} className="auth-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;