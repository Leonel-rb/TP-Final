import React, { useCallback, useEffect, useState } from 'react';
import { useChat } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('squanch_theme');
        if (saved !== null) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('squanch_theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggle = useCallback(() => setIsDark(p => !p), []);
    return { isDark, toggle };
};

const NavRail = ({ activeTab, onChats, onCommunities }) => {
    const { userName, logout, addCiudadela } = useChat();
    const { isDark, toggle } = useDarkMode();
    const navigate = useNavigate();

    const handleChats = useCallback(() => {
        onChats();
        navigate('/');
    }, [onChats, navigate]);

    const handleCommunities = useCallback(() => {
        addCiudadela();
        onCommunities();
    }, [addCiudadela, onCommunities]);

    const handleLogout = useCallback(() => logout(), [logout]);

    return (
        <nav className="nav-rail">
            <div className="nav-rail-top">
                <div className="nav-avatar" title={userName}>
                    <span>👤</span>
                </div>
            </div>

            <div className="nav-rail-mid">
                <button
                    className={`nav-icon-btn ${activeTab === 'chats' ? 'nav-icon-active' : ''}`}
                    onClick={handleChats}
                    title="Chats"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                    </svg>
                </button>

                <button
                    className={`nav-icon-btn ${activeTab === 'communities' ? 'nav-icon-active' : ''}`}
                    onClick={handleCommunities}
                    title="Comunidades"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73C8.93 13.14 10.37 12.75 12 12.75zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
                    </svg>
                </button>
            </div>

            <div className="nav-rail-bot">
                <button className="nav-icon-btn" onClick={toggle} title={isDark ? 'Modo claro' : 'Modo oscuro'}>
                    {isDark ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM4.22 5.64a1 1 0 0 1 1.42-1.42l.7.71a1 1 0 0 1-1.41 1.41l-.71-.7zm13.02 12.02a1 1 0 0 1 1.42-1.41l.7.7a1 1 0 1 1-1.41 1.42l-.71-.71zM3 11h1a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm17 0h1a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zM5.64 17.66l-.7.71a1 1 0 1 1-1.42-1.42l.71-.7a1 1 0 0 1 1.41 1.41zm12.02-13.02l.71-.7a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 1 1-1.42-1.42z"/>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
                        </svg>
                    )}
                </button>

                <button className="nav-icon-btn nav-logout-btn" onClick={handleLogout} title="Cerrar sesión">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default NavRail;
