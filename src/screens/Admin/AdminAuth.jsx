import { useState } from 'react';
import AdminLogin from '../../components/Admin/Authentication/AdminLogin';
import AdminRegister from '../../components/Admin/Authentication/AdminRegister';

const AdminAuth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <div className="userAuth">
            <div className="auth-container">
                <div className="welcome-section">
                    <h2>Welcome, Admin</h2>
                    <p>Please {isLoginMode ? 'log in' : 'register'} to continue.</p>
                </div>
                <div className="auth-toggle">
                    <button
                        className={`toggle-btn ${isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`toggle-btn ${!isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(false)}
                    >
                        Register
                    </button>
                </div>
                {isLoginMode ? <AdminLogin /> : <AdminRegister />}
            </div>
        </div>
    );
};

export default AdminAuth;