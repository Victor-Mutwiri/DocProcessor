
import './Login.css';
import { useAuth } from "@clerk/clerk-react";
import {SignIn} from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { isSignedIn } = useAuth()
    const navigate = useNavigate()

    if (isSignedIn) {
        navigate('/main')
    }

    return (
        <div className='login-container'>
            <SignIn />
        </div>
    );
}

export default Login;