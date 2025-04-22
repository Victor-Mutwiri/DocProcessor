import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserAuth.css';

const UserDelete = ({sessionId}) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            if (!sessionId) {
                throw new Error('Unauthorized: No session ID found.');
            }

            const response = await fetch(`${API_BASE_URL}/api/delete-account`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': sessionId,
                },
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Your account has been deleted successfully.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Clear session and redirect to the homepage
                localStorage.removeItem('userSessionId');
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            } else {
                toast.error(data.error || 'Failed to delete account.', {
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
            console.error('Error deleting account:', error);
            toast.error('An error occurred. Please try again.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="delete-account-container">
            <ToastContainer />
            <div className="delete-account-content">
                <h2>Delete Your Account</h2>
                <p className="warning-text">
                    Deleting your account is a permanent action and cannot be undone. All your data, including files, contracts, and account information, will be permanently deleted. You will no longer have access to your account, and your data will not be stored further.
                </p>
                {!isConfirming ? (
                    <button
                        className="confirm-btn"
                        onClick={() => setIsConfirming(true)}
                    >
                        I Understand, Delete My Account
                    </button>
                ) : (
                    <div className="confirmation-section">
                        <p className="confirmation-text">
                            Are you absolutely sure you want to delete your account? This action is irreversible.
                        </p>
                        <div className="confirmation-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => setIsConfirming(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="delete-btn"
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

UserDelete.propTypes = {
    sessionId: PropTypes.string.isRequired,
}

export default UserDelete;