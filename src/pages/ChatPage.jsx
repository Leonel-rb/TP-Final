import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NavRail    from '../components/NavRail';
import Sidebar    from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
    const { PhoneNumber } = useParams();
    const [activeTab, setActiveTab] = useState('chats');

    const goToChats       = useCallback(() => setActiveTab('chats'),       []);
    const goToCommunities = useCallback(() => setActiveTab('communities'), []);

    return (
        <div className="main-layout">
            <NavRail
                activeTab={activeTab}
                onChats={goToChats}
                onCommunities={goToCommunities}
            />

            {/* oculta el sidebar en móvil cuando hay un chat abierto */}
            <div className={`sidebar-wrapper ${PhoneNumber ? 'hide-on-mobile' : ''}`}>
                <Sidebar activeTab={activeTab} />
            </div>

            {PhoneNumber ? (
                <div className="chat-wrapper">
                    <ChatWindow />
                </div>
            ) : (
                <div className="desktop-only-placeholder">
                    <span className="placeholder-icon">🛸</span>
                    <h2>SquanchApp</h2>
                    <p>Seleccioná un personaje para chatear</p>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
