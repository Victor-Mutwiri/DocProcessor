import { useState, useEffect, useRef } from 'react'
import QueryTemplates from './QueryTemplates'
import ChatMessage from './ChatMessage'
import '../../styles/ChatSection.css'
import { API_BASE_URL } from '../../config/config'
import Processing from '../Processing/Processing'
import LoadingDots from '../Loading/LoadingDots'

const ChatSection = () => {
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
                const response = await fetch(`${API_BASE_URL}/api/files`);
                const data = await response.json();
                setAvailableDocuments(data || []);
            } catch (error) {
                console.error('Error fetching available documents:', error);
            }
        };

        fetchAvailableDocuments();
    }, []);

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
                },
                body: JSON.stringify({ filename }),
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
                },
                body: JSON.stringify({
                    message: inputMessage,
                    document: selectedDocument,
                }),
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
            
            <select
                value={selectedDocument}
                onChange={(e) => handleSetActiveDocument(e.target.value)}
                className="chat-select"
            >
                <option value="">All Active Documents</option>
                {availableDocuments.map((doc) => (
                    <option key={doc.filename} value={doc.filename}>
                        {doc.filename} {doc.active ? '✔️' : ''}
                    </option>
                ))}
            </select>

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