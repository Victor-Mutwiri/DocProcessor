import {API_BASE_URL} from '../../../config/config'
import { useNavigate } from 'react-router-dom';

const useAdminLogout = () => {
    const navigate = useNavigate();

    const handleAdminLogout = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                localStorage.removeItem('adminSessionId');
                localStorage.removeItem('adminSessionExpiration');
                navigate('/adminlogin'); // Redirect to login page
            } else {
                console.error('Failed to logout:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out admin:', error);
        }
    };

    return handleAdminLogout
};

export default useAdminLogout;