import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserAuth.css';

const UserLogin = ({ onLogin }) => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin,
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
                mode: 'cors',
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Login successful!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                onLogin(data.session_id);
                setTimeout(() => {
                    navigate('/main');
                }, 5000);
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="welcome-section">
                <h2>Welcome Back</h2>
                <p>Please log in to continue.</p>
            </div>
            <form onSubmit={handleLogin} className="auth-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={username}
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
            {/* Forgot Password Section */}
            <div className="forgot-password">
                <p><Link to="/recovery">Forgot your password?</Link></p>
            </div>
        </div>
    );
};

UserLogin.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default UserLogin;