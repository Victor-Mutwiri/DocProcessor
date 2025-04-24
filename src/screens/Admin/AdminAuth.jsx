import { useState } from 'react';
import AdminLogin from '../../components/Admin/Authentication/AdminLogin';
import AdminRegister from '../../components/Admin/Authentication/AdminRegister';
import './AdminAuth.css';

const AdminAuth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <div className="usersAuth">
            <div className="home-btn">
                <div></div>
                <a href="/main" className="home-link">
                    <i className="fas fa-home home"></i> Home
                </a>
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
                        SignUp
                    </button>
                </div>
                {isLoginMode ? <AdminLogin /> : <AdminRegister />}
        </div>
    );
};

export default AdminAuth;