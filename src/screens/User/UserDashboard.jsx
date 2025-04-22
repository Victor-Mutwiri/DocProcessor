import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserAuth.css';

const UserDashboard = () => {
    const [accountSummary, setAccountSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccountSummary = async () => {
            setLoading(true);
            setError(null);
            try {
                const sessionId = localStorage.getItem('userSessionId');
                if (!sessionId) {
                    throw new Error('Unauthorized: No session ID found.');
                }

                const response = await fetch(`${API_BASE_URL}/api/account-summary`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Id': sessionId,
                    },
                    credentials: 'include',
                });

                const data = await response.json();
                if (response.ok) {
                    setAccountSummary(data);
                } else {
                    setError(data.error || 'Failed to fetch account summary.');
                }
            } catch (err) {
                console.error('Error fetching account summary:', err);
                setError(err.message || 'An error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchAccountSummary();
    }, []);

    if (loading) return <div className="loading">Loading account details...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard-container">
            <ToastContainer />
            <div className="dashboard-header">
                <h2>Welcome, {accountSummary.username}</h2>
                <p>Email: {accountSummary.email}</p>
                <p>Password Hint: {accountSummary.password_hint}</p>
            </div>
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Total Files</h3>
                    <p>{accountSummary.total_files}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Contracts</h3>
                    <p>{accountSummary.total_contracts}</p>
                </div>
            </div>
            <div className="dashboard-details">
                <h3>Your Files</h3>
                {accountSummary.files.length > 0 ? (
                    <ul>
                        {accountSummary.files.map((file, index) => (
                            <li key={index}>
                                <strong>{file.filename}</strong> - Uploaded on{' '}
                                {new Date(file.uploaded_at).toLocaleDateString()}
                                {file.active ? ' (Active)' : ' (Inactive)'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No files uploaded yet.</p>
                )}
                <h3>Your Contracts</h3>
                {accountSummary.contracts.length > 0 ? (
                    <ul>
                        {accountSummary.contracts.map((contract, index) => (
                            <li key={index}>
                                <strong>{contract.filename}</strong> - Uploaded on{' '}
                                {new Date(contract.uploaded_at).toLocaleDateString()}
                                {contract.active ? ' (Active)' : ' (Inactive)'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No contracts uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;