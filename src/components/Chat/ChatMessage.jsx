import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import '../../styles/ChatMessage.css'

const ChatMessage = ({ message }) => {
    const { sender, content } = message
    const messageRef = useRef(null)

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [message])

    const highlightContent = (text) => {
        return text
            .replace(
                /shall|must|will|agreement|contract|party|parties/gi,
                match => `<span class="legal-term">${match}</span>`
            )
            .replace(
                /risk|liability|penalty|terminate|breach/gi,
                match => `<span class="risk-highlight">${match}</span>`
            )
            .replace(
                /clause|section|article|provision/gi,
                match => `<span class="clause-highlight">${match}</span>`
            )
    }

    return (
        <div 
            ref={messageRef}
            className={`message ${sender === 'You' ? 'message-user' : 'message-ai'}`}
        >
            <div className="message-header">
                <span className="message-sender">{sender}</span>
                {/* <span className="message-time">
                    {new Date().toLocaleTimeString()}
                </span> */}
            </div>
            <div 
                className="message-content"
                dangerouslySetInnerHTML={{ __html: highlightContent(content) }} 
            />
        </div>
    )
}

ChatMessage.propTypes = {
    message: PropTypes.shape({
        sender: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired
}

export default ChatMessage 