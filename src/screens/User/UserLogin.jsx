import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import PropTypes from 'prop-types';
import './UserAuth.css';

const UserLogin = ({ onLogin }) => {
    const [name, setName] = useState('');
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
                body: JSON.stringify({ name, password }),
                credentials: 'include',
                mode: 'cors',
            });

            const data = await response.json();
            if (response.ok) {
                onLogin(data.session_id);
                navigate('/main');
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
            <div className="welcome-section">
                <h2>Welcome Back</h2>
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
    );
};

UserLogin.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default UserLogin;