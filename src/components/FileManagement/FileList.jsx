import { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal';
import '../../styles/FileList.css';
import { API_BASE_URL } from '../../config/config';

const FileList = ({sessionId}) => {
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    /* useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/files`, {
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
    }, [sessionId]); */

    const handleDelete = async (filename) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/delete/${filename}`, {
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

    console.log('sessionId in FileList is:', sessionId)

    return (
        <div className="file-list-container">
            <h2 className="file-list-title">Current Files</h2>
            <div className="file-list">
                {files.map((file) => (
                    <div key={file.filename} className="file-item">
                        <div className="file-info">
                            <input
                                type="checkbox"
                                className="file-checkbox"
                                checked={file.active}
                                onChange={() => {/* Handle checkbox change */}}
                            />
                            <span>{file.filename}</span>
                        </div>
                        <div className="file-actions">
                            <button
                                onClick={() => {/* Handle summary view */}}
                                className="btn-summary"
                            >
                                Summary
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedFile(file);
                                    setShowModal(true);
                                }}
                                className="btn-compare"
                            >
                                Compare
                            </button>
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
            
            {showModal && (
                <ComparisonModal
                    file={selectedFile}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default FileList;