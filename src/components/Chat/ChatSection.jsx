import { useState } from 'react'
import QueryTemplates from './QueryTemplates'
import ChatMessage from './ChatMessage'
import '../../styles/ChatSection.css'
import { API_BASE_URL } from '../../config/config'

const ChatSection = () => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [selectedDocument, setSelectedDocument] = useState('')

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
                sender: 'AI',
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
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="chat-select"
            >
                <option value="">All Active Documents</option>
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