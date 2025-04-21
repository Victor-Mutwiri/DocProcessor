import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserAuth.css';

const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHint, setPasswordHint] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isPasswordStrong = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{6,}$/;
        return regex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isPasswordStrong(password)) {
            toast.error('Password is weak. It should be at least 6 characters and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin,
                },
                body: JSON.stringify({
                    username, 
                    email, 
                    password, 
                    password_hint: passwordHint
                }),
                credentials: 'include',
                mode: 'cors',
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Account registered successfully! Please log in.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    navigate('/main');
                }, 5000);
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="welcome-section">
                <h2>Create an Account</h2>
                <p>Please Signup to continue.</p>
            </div>
            <form onSubmit={handleRegister} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Password Hint"
                    value={passwordHint}
                    onChange={(e) => setPasswordHint(e.target.value)}
                    required
                />
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UserRegister;