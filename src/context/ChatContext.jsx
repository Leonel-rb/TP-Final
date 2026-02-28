import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { formatTime } from '../utils/constants';
import { contactsData } from '../data/contacts.Data.jsx';
import { initialMessages, ciudadelaMessages, getBotResponseFor } from '../data/initialMessages';

const ChatContext = createContext();

const CIUDADELA_CONTACT = {
    PhoneNumber: 'ciudadela-ricks',
    name: 'La Ciudadela de Ricks',
    lastMsg: 'Rick Presidente: Nos vemos en el sector.',
    avatar: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    isGroup: true,
};

export const ChatProvider = ({ children, onLogout }) => {
    const [userName, setUserName] = useState(
        () => localStorage.getItem('squanch_user') || 'Usuario'
    );

    const [extraContacts, setExtraContacts] = useState(() =>
        localStorage.getItem('squanch_ciudadela') === 'true' ? [CIUDADELA_CONTACT] : []
    );

    const contacts = [...contactsData, ...extraContacts];

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('squanch_messages');
        if (saved) return JSON.parse(saved);
        const user = localStorage.getItem('squanch_user') || 'Usuario';
        return initialMessages(user);
    });

    const [isTyping, setIsTyping] = useState(null);

    useEffect(() => { localStorage.setItem('squanch_user', userName); }, [userName]);
    useEffect(() => { localStorage.setItem('squanch_messages', JSON.stringify(messages)); }, [messages]);
    useEffect(() => {
        localStorage.setItem('squanch_ciudadela', extraContacts.length > 0 ? 'true' : 'false');
    }, [extraContacts]);

    const addCiudadela = useCallback(() => {
        const yaAgregada = extraContacts.some(c => c.PhoneNumber === 'ciudadela-ricks');
        if (yaAgregada) return;
        setExtraContacts([CIUDADELA_CONTACT]);
        setMessages(prev =>
            prev['ciudadela-ricks'] ? prev : { ...prev, 'ciudadela-ricks': ciudadelaMessages }
        );
    }, [extraContacts]);

    const logout = useCallback(() => {
        localStorage.removeItem('squanch_user');
        localStorage.removeItem('squanch_messages');
        localStorage.removeItem('squanch_ciudadela');
        if (onLogout) onLogout();
    }, [onLogout]);

    const sendMessage = useCallback((contactId, text) => {
        const hora = formatTime(new Date());
        const newMsg = { id: Date.now(), text, author: userName, time: hora, status: 'sent' };

        setMessages(prev => ({
            ...prev,
            [contactId]: [...(prev[contactId] || []), newMsg],
        }));

        // el grupo no tiene autorespuesta
        if (contactId === 'ciudadela-ricks') return;

        setIsTyping(contactId);
        setTimeout(() => {
            const contact = contacts.find(c => c.PhoneNumber === contactId);
            if (!contact) { setIsTyping(null); return; }

            const reply = {
                id: Date.now() + 1,
                text: getBotResponseFor(contactId, userName),
                author: contact.name,
                time: formatTime(new Date()),
                status: 'read',
            };

            setMessages(prev => {
                const updated = (prev[contactId] || []).map(m =>
                    m.author === userName ? { ...m, status: 'read' } : m
                );
                return { ...prev, [contactId]: [...updated, reply] };
            });
            setIsTyping(null);
        }, 1800);
    }, [contacts, userName]);

    return (
        <ChatContext.Provider value={{
            contacts,
            messages,
            sendMessage,
            userName,
            setUserName,
            isTyping,
            logout,
            addCiudadela,
            ciudadelaAdded: extraContacts.some(c => c.PhoneNumber === 'ciudadela-ricks'),
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
