import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const ChatWindow = () => {
    const { PhoneNumber } = useParams();
    const { contacts, messages, sendMessage, userName, isTyping } = useChat();
    const [text, setText] = useState('');
    const scrollRef = useRef();

    const contact = useMemo(
        () => contacts.find(c => c.PhoneNumber === PhoneNumber),
        [contacts, PhoneNumber]
    );

    const chatMsgs = useMemo(
        () => messages[PhoneNumber] || [],
        [messages, PhoneNumber]
    );

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMsgs]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!text.trim()) return;
        sendMessage(PhoneNumber, text);
        setText('');
    }, [text, PhoneNumber, sendMessage]);

    // busca el avatar de quien manda el mensaje (para los chats grupales)
    const getAvatar = (authorName) => contacts.find(c => c.name === authorName)?.avatar || null;

    if (!contact) return <div className="chat-empty">Seleccioná un chat para comenzar</div>;

    return (
        <div className="chat-window">
            <header className="chat-header">
                <Link to="/" className="back-btn">←</Link>
                <div className="chat-header-content">
                    <img
                        src={contact.avatar}
                        alt={contact.name}
                        className={contact.isGroup ? 'avatar avatar-group-header' : 'avatar'}
                    />
                    <div className="header-info">
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
    );
};

export default ChatWindow;
