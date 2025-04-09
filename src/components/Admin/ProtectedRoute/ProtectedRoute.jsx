import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, redirectTo }) => {
    const sessionId = localStorage.getItem('adminSessionId');
    const sessionExpiration = localStorage.getItem('adminSessionExpiration');
    const currentTime = new Date().getTime();

    if (!sessionId || !sessionExpiration || currentTime > sessionExpiration) {
        localStorage.removeItem('adminSessionId');
        localStorage.removeItem('adminSessionExpiration');
        return <Navigate to={redirectTo} />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;