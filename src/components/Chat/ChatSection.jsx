import { useState, useEffect } from 'react'
import QueryTemplates from './QueryTemplates'
import ChatMessage from './ChatMessage'
import '../../styles/ChatSection.css'
import { API_BASE_URL } from '../../config/config'

const ChatSection = () => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [selectedDocument, setSelectedDocument] = useState('')
    const [availableDocuments, setAvailableDocuments] = useState([])

    useEffect(() => {
        const fetchAvailableDocuments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/files`);
                const data = await response.json();

                setAvailableDocuments(data);
            } catch (error) {
                console.error('Error fetching available documents:', error);
            }
        };

        fetchAvailableDocuments();
    }, []);

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
        } catch (error) {
            console.error('Chat error:', error)
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

            <QueryTemplates onSelect={setInputMessage} />

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
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