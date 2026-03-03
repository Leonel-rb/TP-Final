import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

// Panel de info del contacto — se abre al clickear el avatar en el header
const ContactPanel = ({ contact, onClose }) => (
    <div className="contact-panel">
        <header className="contact-panel-header">
            <button className="profile-back-btn" onClick={onClose} title="Cerrar">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
            </button>
            <span>Información del contacto</span>
        </header>

        <div className="contact-panel-avatar-section">
            <img
                src={contact.avatar}
                alt={contact.name}
                className={`contact-panel-avatar ${contact.isGroup ? 'contact-panel-avatar-group' : ''}`}
            />
            <h2 className="contact-panel-name">{contact.name}</h2>
            {contact.age > 0 && (
                <p className="contact-panel-age">{contact.age} años</p>
            )}
        </div>

        {contact.description && (
            <div className="contact-panel-section">
                <p className="profile-label">Info.</p>
                <p className="profile-value">{contact.description}</p>
            </div>
        )}

        <div className="contact-panel-section">
            <p className="profile-label">Dimensión</p>
            <p className="profile-value">C-137</p>
        </div>

        <div className="contact-panel-section">
            <p className="profile-label">Estado</p>
            <p className="profile-value contact-panel-online">● En línea</p>
        </div>
    </div>
);

const ChatWindow = () => {
    const { PhoneNumber } = useParams();
    const { contacts, messages, sendMessage, userName, isTyping } = useChat();
    const [text, setText] = useState('');
    const [showContactPanel, setShowContactPanel] = useState(false);
    const scrollRef = useRef();

    const contact = useMemo(
        () => contacts.find(c => c.PhoneNumber === PhoneNumber),
        [contacts, PhoneNumber]
    );

    const chatMsgs = useMemo(
        () => messages[PhoneNumber] || [],
        [messages, PhoneNumber]
    );

    // cierra el panel si cambia el chat
    useEffect(() => {
        setShowContactPanel(false);
    }, [PhoneNumber]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMsgs]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!text.trim()) return;
        sendMessage(PhoneNumber, text);
        setText('');
    }, [text, PhoneNumber, sendMessage]);

    const getAvatar = (authorName) => contacts.find(c => c.name === authorName)?.avatar || null;

    if (!contact) return <div className="chat-empty">Seleccioná un chat para comenzar</div>;

    return (
        <div className="chat-window-wrapper">
            <div className="chat-window">
                <header className="chat-header">
                    <Link to="/" className="back-btn">←</Link>
                    <div className="chat-header-content">
                        <img
                            src={contact.avatar}
                            alt={contact.name}
                            className={`avatar ${contact.isGroup ? 'avatar-group-header' : ''} avatar-clickable`}
                            onClick={() => setShowContactPanel(p => !p)}
                            title="Ver perfil"
                        />
                        <div
                            className="header-info"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowContactPanel(p => !p)}
                        >
                            <h3 className="contact-name">{contact.name}</h3>
                            <span className="contact-status">
                                {isTyping === PhoneNumber ? 'Escribiendo...' : 'En línea'}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="message-area">
                    {chatMsgs.map((m, idx) => {
                        const isMe = m.author === userName;
                        const avatar = isMe ? null : getAvatar(m.author);
                        const prev = chatMsgs[idx - 1];

                        // en grupos muestra avatar solo al primer mensaje consecutivo del mismo autor
                        const showAvatar = !isMe && (contact.isGroup ? !prev || prev.author !== m.author : true);
                        const showAuthor = contact.isGroup && !isMe && showAvatar;

                        return (
                            <div key={m.id} className={`msg-row ${isMe ? 'me' : 'them'}`}>
                                {!isMe && (
                                    <div className="msg-avatar-slot">
                                        {showAvatar && avatar
                                            ? <img src={avatar} alt={m.author} className="msg-avatar" />
                                            : <div className="msg-avatar-spacer" />
                                        }
                                    </div>
                                )}
                                <div className={`msg-bubble ${isMe ? 'me' : 'them'}`}>
                                    {showAuthor && <span className="msg-author-name">{m.author}</span>}
                                    <p>{m.text}</p>
                                    <div className="msg-footer">
                                        <span className="msg-time">{m.time}</span>
                                        {isMe && (
                                            <div className={`msg-status ${m.status === 'read' ? 'read' : ''}`}>
                                                <span className="check">✓</span>
                                                <span className="check">✓</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {isTyping === PhoneNumber && (
                        <div className="msg-row them">
                            <div className="msg-avatar-slot">
                                <img src={contact.avatar} alt={contact.name} className="msg-avatar" />
                            </div>
                            <div className="msg-bubble them">
                                <span className="typing-text">Escribiendo...</span>
                            </div>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </main>

                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    />
                    <button type="submit" className="send-btn">Enviar</button>
                </form>
            </div>

            {/* Panel lateral de info — se desliza desde la derecha */}
            {showContactPanel && (
                <ContactPanel
                    contact={contact}
                    onClose={() => setShowContactPanel(false)}
                />
            )}
        </div>
    );
};

export default ChatWindow;
