import { useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserAuth.css';

const UserRecovery = () => {
    const [email, setEmail] = useState('');
    const [passwordHint, setPasswordHint] = useState('');
    const [recoveredPassword, setRecoveredPassword] = useState('');
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);

    const handleRecoverPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/recover-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin,
                },
                body: JSON.stringify({ email, password_hint: passwordHint }),
                credentials: 'include',
                mode: 'cors',
            });

            const data = await response.json();
            if (response.ok) {
                setRecoveredPassword(data.password);
                setTimeLeft(10); // Set timer for 10 seconds
                toast.success('Password recovered successfully! Keep it secret.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Start the timer to hide the password after 10 seconds
                const countdown = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            clearInterval(countdown);
                            setRecoveredPassword('');
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
                setTimer(countdown);
            } else {
                toast.error(data.error || 'Failed to recover password.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Password recovery error:', error);
            toast.error('An error occurred. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(recoveredPassword);
        toast.info('Password copied to clipboard!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="welcome-section">
                <h2>Password Recovery</h2>
                <p>Enter your email and password hint to recover your password.</p>
            </div>
            <form onSubmit={handleRecoverPassword} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Password Hint"
                    value={passwordHint}
                    onChange={(e) => setPasswordHint(e.target.value)}
                    required
                />
                <button type="submit" className="submit-btn">
                    Recover Password
                </button>
            </form>
            {recoveredPassword && (
                <div className="recovered-password-popup">
                    <p>
                        <strong>Password:</strong> {recoveredPassword}
                    </p>
                    <button onClick={handleCopyPassword} className="copy-btn">
                        Copy Password
                    </button>
                    <p className="timer">This password will disappear in {timeLeft} seconds.</p>
                </div>
            )}
        </div>
    );
};

export default UserRecovery;