import { useState, useEffect } from 'react';
/* import ComparisonModal from '../../components/FileManagement/ComparisonModal'; */
import '../../styles/FileList.css';
import { API_BASE_URL } from '../../config/config';
import PropTypes from 'prop-types'

const ContractList = ({sessionId, setReview}) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/contract_files`, {
                    method: 'GET',
                    headers: {
                        'Session-Id': sessionId, // Pass sessionId in headers
                    },
                    credentials: 'include', // Include credentials (cookies) in the request
                });
                const data = await response.json()
                if (response.ok) {
                    setFiles(data.files || [])
                } else {
                    console.error('Error fetching files:', data.error)
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, [sessionId]);

    const handleDelete = async (filename) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/delete-contract/${filename}`, {
                method: 'POST',
                headers: {
                    'Session-Id': sessionId, // Pass sessionId in headers
                },
                credentials: 'include', // Include credentials (cookies) in the request
            });
            const data = await response.json();
            if (data.message) {
                setFiles(files.filter(file => file.filename !== filename));
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleReview = async () => {
        setLoading(true);
        setError('');
        setReview('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/review-contract`, {
                method: 'POST',
                headers: {
                    'Session-Id': sessionId,
                },
                credentials: 'include', // Include credentials (cookies) in the request
                mode: 'cors' // Explicitly set CORS mode
            });
            const data = await response.json();
            if (response.ok) {
                setReview(data.review);
                console.log('Review:', data.review);
            } else {
                setError(data.error || 'Failed to review contract.');
            }
        } catch (error) {
            setError('An error occurred while reviewing the contract.');
            console.error('Error reviewing contract:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log('sessionId in Contract List is:', sessionId)

    return (
        <div className="file-list-container">
            <h2 className="file-list-title">Current Files</h2>
            <div className="file-list">
                {files.map((file) => (
                    <div key={file.filename} className="file-item">
                        <div className="file-info">
                            <span>{file.filename}</span>
                        </div>
                        <div className="file-actions">
                            <button
                                onClick={() => handleReview(file.filename)}
                                className="btn-review"
                                disabled={loading}
                            >
                                {loading ? 'Reviewing...' : 'Review'}
                            </button>
                        </div>
                        <div className="file-actions">
                            <button
                                onClick={() => handleDelete(file.filename)}
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <p className="loading">Reviewing Contract</p>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

ContractList.propTypes = {
    sessionId: PropTypes.string.isRequired,
    setReview: PropTypes.func.isRequired
}

export default ContractList;