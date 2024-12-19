import { useState, useRef } from 'react'
import ProgressBar from '../common/ProgressBar'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/FileUpload.css'
import { API_BASE_URL } from '../../config/config'

const FileUpload = () => {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)

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

        const files = [...e.dataTransfer.files].filter(file => file.type === 'application/pdf')
        if (files.length === 0) {
            setStatus('Please upload PDF files only')
            return
        }
        await handleFiles(files)
    }

    const handleFiles = async (files) => {
        const formData = new FormData()
        for (let file of files) {
            formData.append('files', file)
        }

        try {
            setUploading(true)
            setProgress(0)
            setStatus('Starting upload...')

            const response = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: formData,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                    setProgress(percentCompleted)
                    setStatus(`Uploading... ${percentCompleted}%`)
                },
            })
            const data = await response.json()

            if (data.message) {
                setProgress(100)
                setStatus('Upload complete!')
                setTimeout(() => {
                    setUploading(false)
                    window.location.reload()
                }, 1000)
            } else {
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

    return (
        <div className="upload-container">
            <h2 className="upload-title">Upload Documents</h2>
            
            <div onDragEnter={handleDrag}>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={(e) => handleFiles(e.target.files)}
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
                                    Drag and drop your PDF files here, or click to select files
                                </p>
                                <p className="upload-hint">
                                    PDF files only, up to 10MB each
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

export default FileUpload 