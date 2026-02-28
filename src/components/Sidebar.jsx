import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const CommunitySquareIcon = () => (
    <div className="community-square-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
    </div>
);

const CIUDADELA = {
    PhoneNumber: 'ciudadela-ricks',
    name: 'La Ciudadela de Ricks',
    lastMsg: 'Rick Presidente: Nos vemos en el sector.',
    avatar: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
};

const Sidebar = ({ activeTab }) => {
    const { contacts } = useChat();
    const [search, setSearch] = useState('');

    const chatContacts = useMemo(
        () => contacts.filter(c => c.PhoneNumber !== 'ciudadela-ricks'),
        [contacts]
    );

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return chatContacts;
        return chatContacts.filter(c => c.name.toLowerCase().includes(q));
    }, [chatContacts, search]);

    const handleSearch = useCallback(e => setSearch(e.target.value), []);

    return (
        <aside className="sidebar">
            {activeTab === 'chats' && (
                <>
                    <header className="sidebar-header">
                        <div className="sidebar-brand">
                            <img src="/app_icon.png" alt="SquanchApp" className="sidebar-brand-icon" />
                            <h1 className="sidebar-title">SquanchApp</h1>
                        </div>
                    </header>

                    <div className="search-bar-wrapper">
                        <div className="search-bar-pill">
                            <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                                <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar un chat o iniciar uno nuevo"
                                value={search}
                                onChange={handleSearch}
                                aria-label="Buscar contacto"
                            />
                            {search && (
                                <button className="search-clear-btn" onClick={() => setSearch('')} aria-label="Limpiar">✕</button>
                            )}
                        </div>
                    </div>

                    <nav className="contact-list">
                        {filtered.length > 0 ? (
                            filtered.map(c => (
                                <Link key={c.PhoneNumber} to={`/chat/${c.PhoneNumber}`} className="contact-link">
                                    <img src={c.avatar} alt={c.name} className="avatar" />
                                    <div className="contact-link-info">
                                        <strong>{c.name}</strong>
                                        <p>{c.lastMsg}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="no-results">Sin resultados para &ldquo;{search}&rdquo;</p>
                        )}
                    </nav>
                </>
            )}

            {activeTab === 'communities' && (
                <>
                    <header className="sidebar-header">
                        <h1 className="sidebar-title">Comunidades</h1>
                        <button className="sidebar-action-btn" title="Nueva comunidad">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                        </button>
                    </header>

                    <nav className="contact-list">
                        <p className="communities-section-label">Tus comunidades</p>
                        <Link to={`/chat/${CIUDADELA.PhoneNumber}`} className="contact-link community-row">
                            <img src={CIUDADELA.avatar} alt={CIUDADELA.name} className="avatar avatar-group-header" />
                            <div className="contact-link-info">
                                <strong>{CIUDADELA.name}</strong>
                                <p>{CIUDADELA.lastMsg}</p>
                            </div>
                        </Link>
                    </nav>
                </>
            )}
        </aside>
    );
};

export default Sidebar;
