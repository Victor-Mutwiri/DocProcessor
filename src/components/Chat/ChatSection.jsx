import { useState, useEffect, useRef } from 'react'
import QueryTemplates from './QueryTemplates'
import ChatMessage from './ChatMessage'
import '../../styles/ChatSection.css'
import { API_BASE_URL } from '../../config/config'
import Processing from '../Processing/Processing'
import LoadingDots from '../Loading/LoadingDots'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ChatSection = ({sessionId}) => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [selectedDocument, setSelectedDocument] = useState('')
    const [availableDocuments, setAvailableDocuments] = useState([])
    const [processingStatus, setProcessingStatus] = useState('Idle')
    const [showModal, setShowModal] = useState(false)
    const [isResponding, setIsResponding] = useState(false)
    const intervalIdRef = useRef(null)

    useEffect(() => {
        const fetchAvailableDocuments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/files`, {
                    method: 'GET',
                    headers: {
                        'Session-Id': sessionId, // Pass sessionId in headers
                    },
                    credentials: 'include', // Include credentials (cookies) in the request
                });
                const data = await response.json();
                if (response.ok) {
                    // Assuming 'files' key in response contains the documents
                    if (Array.isArray(data.files)) {
                        setAvailableDocuments(data.files);
                    } else {
                        setAvailableDocuments([]);
                        console.error('Unexpected response format:', data);
                    }
                } else {
                    console.error('Error fetching files:', data.error);
                    setAvailableDocuments([]);
                }
            } catch (error) {
                console.error('Error fetching available documents:', error);
                setAvailableDocuments([]);
            }
        };
    
        fetchAvailableDocuments();
    }, [sessionId]);

    /* console.log('sessionId in ChatSection is:', sessionId) */

    const fetchProcessingStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/processing-status`)
            const data = await response.json()
            setProcessingStatus(data.status)

            if (data.status === 'Document processing completed successfully') {
                setShowModal(true)
                setTimeout(() => {
                    setShowModal(false)
                }, 5000)
                clearInterval(intervalIdRef.current)
            }
        } catch (error) {
            console.error('Error fetching processing status:', error)
        }
    }

    const handleSetActiveDocument = async (filename) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/set-active-document`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': sessionId,
                },
                body: JSON.stringify({ filename }),
                credentials: 'include',
            })
            const data = await response.json()
            if (data.message) {
                setAvailableDocuments(prevDocuments =>
                    prevDocuments.map(doc =>
                        doc.filename === filename
                            ? { ...doc, active: true }
                            : { ...doc, active: false }
                    )
                )
                setSelectedDocument(filename)
                setProcessingStatus('Idle')

                if (intervalIdRef.current) {
                    clearInterval(intervalIdRef.current)
                }
                intervalIdRef.current = setInterval(fetchProcessingStatus, 8000)
            }
        } catch (error) {
            console.error('Error setting active document:', error)
        }
    }

    const handleDelete = async (filename) => {
        if (!confirm('Are you sure you want to delete this file?')) return
        try {
            const response = await fetch(`${API_BASE_URL}/api/delete/${filename}`, {
                method: 'POST',
                headers: {
                    'Session-Id': sessionId,
                },
                credentials: 'include',
            })
            const data = await response.json()
            if (data.message) {
                setAvailableDocuments(prevDocuments =>
                    prevDocuments.filter(doc => doc.filename !== filename)
                )
            }
        } catch (error) {
            console.error('Error deleting file:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!inputMessage.trim()) return

        const newMessage = { sender: 'You', content: inputMessage }
        setMessages([...messages, newMessage])
        setInputMessage('')
        setIsResponding(true)

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Id': sessionId,
                },
                body: JSON.stringify({
                    message: inputMessage,
                    document: selectedDocument,
                }),
                credentials: 'include',  // This is important
            })
            const data = await response.json()
            
            setMessages(prev => [...prev, {
                sender: 'Juri',
                content: data.response || data.error
            }])
            setIsResponding(false)
        } catch (error) {
            console.error('Chat error:', error)
            setMessages(prev => [...prev, {
                sender: 'Juri',
                content: 'Sorry, I could not respond to your message.'
            }])
            setIsResponding(false)
        }
    }

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat Assistant</h2>
            
            <div className="active-files-container">
                <label htmlFor="active-files-dropdown" className="active-files-label">
                    Select Document:
                </label>
                <div id="active-files-dropdown" className="active-files-dropdown">
                    <div
                        onClick={() => handleSetActiveDocument('')}
                        className={`file-item ${!selectedDocument ? 'active' : ''}`}
                    >
                        All Active Documents
                    </div>
                    {availableDocuments.map((doc) => (
                        <div
                            key={doc.filename}
                            className={`file-item ${doc.active ? 'active' : ''}`}
                            onClick={() => handleSetActiveDocument(doc.filename)}
                        >
                            <span className="file-name">
                                {doc.filename}
                                {doc.active && <span className="active-indicator">✔️</span>}
                            </span>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="trash-icon"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering `handleSetActiveDocument`
                                    handleDelete(doc.filename);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>


            <Processing status={processingStatus} showModal={showModal}/>

            <QueryTemplates onSelect={setInputMessage} />

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isResponding && <LoadingDots />}
            </div>

            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="chat-input"
                    placeholder="Ask about the legal documents..."
                />
                <button type="submit" className="chat-submit">
                    Send
                </button>
            </form>
        </div>
    )
}



export default ChatSection 