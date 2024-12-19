import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/ComparisonModal.css'
import { API_BASE_URL } from '../config/config'

const ComparisonModal = ({ file, onClose }) => {
    const [loading, setLoading] = useState(true)
    const [compareWith, setCompareWith] = useState('')
    const [files, setFiles] = useState([])
    const [differences, setDifferences] = useState(null)

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/files`)
                const data = await response.json()
                setFiles(data.files.filter(f => f.filename !== file.filename))
            } catch (error) {
                console.error('Error fetching files:', error)
            }
        }
        fetchFiles()
    }, [file])

    const handleCompare = async () => {
        if (!compareWith) return
        
        setLoading(true)
        try {
            const response = await fetch('/compare-documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file1: file.filename,
                    file2: compareWith
                })
            })
            const data = await response.json()
            setDifferences(data.differences)
        } catch (error) {
            console.error('Comparison error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3 className="modal-title">Document Comparison</h3>
                    <button onClick={onClose} className="modal-close">
                        ×
                    </button>
                </div>

                <div className="modal-content">
                    <select
                        value={compareWith}
                        onChange={(e) => setCompareWith(e.target.value)}
                        className="comparison-select"
                    >
                        <option value="">Select a document to compare with</option>
                        {files.map((f) => (
                            <option key={f.filename} value={f.filename}>
                                {f.filename}
                            </option>
                        ))}
                    </select>
                    
                    <button
                        onClick={handleCompare}
                        disabled={!compareWith || loading}
                        className="compare-button"
                    >
                        Compare Documents
                    </button>

                    <div className="comparison-grid">
                        <div className="document-panel">
                            <h4 className="document-title">{file.filename}</h4>
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <div className="document-content">
                                    {differences?.file1Content || 'Select a document to compare'}
                                </div>
                            )}
                        </div>
                        <div className="document-panel">
                            <h4 className="document-title">
                                {compareWith || 'Compare with...'}
                            </h4>
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <div className="document-content">
                                    {differences?.file2Content || 'Select a document to compare'}
                                </div>
                            )}
                        </div>
                    </div>

                    {differences && !loading && (
                        <div className="differences-section">
                            <h4 className="differences-title">Key Differences</h4>
                            <ul className="differences-list">
                                {differences.keyDifferences.map((diff, index) => (
                                    <li key={index} className="difference-item">{diff}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

ComparisonModal.propTypes = {
    file: PropTypes.shape({
        filename: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired
}

export default ComparisonModal 