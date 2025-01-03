import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ProgressBar from '../common/ProgressBar'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/FileUpload.css'
import { API_BASE_URL } from '../../config/config'

const FileUpload = ({sessionId}) => {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (sessionId){
            localStorage.setItem('sessionId', sessionId)
        }
    }, [sessionId])

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const files = e.dataTransfer.files
        if (files.length > 1) {
            setStatus('Please upload only one document at a time.')
            return
        }

        const file = files[0]
        if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
            setStatus('Invalid file type. Only .pdf, .doc, or .docx files are allowed.')
            return
        }

        await handleFile(file)
    }

    const handleFile = async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            setUploading(true)
            setProgress(0)
            setStatus('Starting upload...')

            const response = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    'Session-Id': sessionId, // Pass sessionId in headers
                },
                body: formData,
                credentials: 'include', // Include credentials (cookies) in the request
            })

            if (response.ok) {
                setProgress(100)
                setStatus('Upload complete!')
                setTimeout(() => {
                    setUploading(false)
                    window.location.reload()
                }, 1000)
            } else {
                const data = await response.json()
                throw new Error(data.error || 'Upload failed')
            }
        } catch (error) {
            setStatus(error.message)
            setProgress(0)
            setTimeout(() => setUploading(false), 2000)
        }
    }

    const handleButtonClick = () => {
        inputRef.current.click()
    }

    console.log('sessionId in Uploads is:', sessionId)
    return (
        <div className="upload-container">
            <h2 className="upload-title">Upload Documents</h2>
            
            <div onDragEnter={handleDrag}>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                />
                
                <div 
                    className={`dropzone ${dragActive ? 'active' : ''} ${uploading ? 'disabled' : ''}`}
                    onClick={handleButtonClick}
                >
                    <div className="text-center">
                        {uploading ? (
                            <LoadingSpinner size="medium" color="blue" />
                        ) : (
                            <>
                                <svg 
                                    className="upload-icon"
                                    stroke="currentColor" 
                                    fill="none" 
                                    viewBox="0 0 48 48"
                                >
                                    <path 
                                        d="M24 32V16m0 0l-8 8m8-8l8 8" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="upload-text">
                                    Drag and drop your PDF/DOC/DOCX file here, or click to select files
                                </p>
                                <p className="upload-hint">
                                    PDF/DOC/DOCX files only, up to 10MB each
                                </p>
                            </>
                        )}
                    </div>
                </div>
                
                {dragActive && (
                    <div 
                        className="dropzone-overlay"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    />
                )}
            </div>

            {uploading && (
                <div className="upload-progress">
                    <ProgressBar progress={progress} status={status} />
                </div>
            )}
        </div>
    )
}

FileUpload.propTypes = {
    sessionId: PropTypes.string.isRequired
}

export default FileUpload 