import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import PropTypes from 'prop-types';
import './UserAuth.css';

const UserAuth = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLoginMode ? '/login' : '/register';
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': 'https://doc-processor-theta.vercel.app'
                },
                body: JSON.stringify({ name, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                onLogin(data.session_id);
                navigate('/main');
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="userAuth">
            <div className="auth-container">
                <div className="welcome-section">
                    <h2>Welcome to Sheria Aide</h2>
                    <p>Please {isLoginMode ? 'log in' : 'register'} to continue.</p>
                </div>
                <div className="auth-toggle">
                    <button
                        className={`toggle-btn ${isLoginMode ? 'active' : ''}`}
                        onClick={() => {
                            setIsLoginMode(true);
                            setError('');
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={`toggle-btn ${!isLoginMode ? 'active' : ''}`}
                        onClick={() => {
                            setIsLoginMode(false);
                            setError('');
                        }}
                    >
                        Sign Up
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
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
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

UserAuth.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default UserAuth;
