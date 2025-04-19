import { useState } from 'react';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import PropTypes from 'prop-types';
import './UserAuth.css';

const UserAuth = ({ onLogin }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <div className="userAuth">
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
                    Sign Up
                </button>
            </div>
            {isLoginMode ? <UserLogin onLogin={onLogin} /> : <UserRegister />}
        </div>
    );
};

UserAuth.propTypes ={
    onLogin:PropTypes.func.isRequired,
}

export default UserAuth;