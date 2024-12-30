import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import './UserAuth.css';

const UserAuth = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState('login')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            })
            const data = await response.json()
            if (data.message) {
                navigate('/main')
            } else {
                setError(data.error)
            }
        } catch (error) {
            setError('An error occurred during login')
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            })
            const data = await response.json()
            if (data.message) {
                navigate('/main')
            } else {
                setError(data.error)
            }
        } catch (error) {
            setError('An error occurred during registration')
        }
    }

    return (
        <div className="userAuth">
            <div className="auth-container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                {activeTab === 'login' && (
                    <div className="login">
                        <h1>Login</h1>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                )}

                {activeTab === 'signup' && (
                    <div className="signup">
                        <h1>Sign Up</h1>
                        <form onSubmit={handleSignup}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserAuth