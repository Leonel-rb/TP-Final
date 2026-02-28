import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext.jsx';
import Login         from './pages/Login.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ChatPage      from './pages/ChatPage.jsx';
import './styles/App.css';

function App() {
    // login → loading → chat, siempre desde el principio
    const [phase, setPhase] = useState('login');

    const handleLogout = () => {
        localStorage.removeItem('squanch_user');
        localStorage.removeItem('squanch_messages');
        localStorage.removeItem('squanch_ciudadela');
        setPhase('login');
    };

    if (phase === 'login')   return <div className="app-container"><Login onLogin={() => setPhase('loading')} /></div>;
    if (phase === 'loading') return <div className="app-container"><LoadingScreen onFinished={() => setPhase('chat')} /></div>;

    return (
        <Router>
            <ChatProvider onLogout={handleLogout}>
                <div className="app-container">
                    <Routes>
                        <Route path="/"                  element={<ChatPage />} />
                        <Route path="/chat/:PhoneNumber" element={<ChatPage />} />
                        <Route path="*"                  element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </ChatProvider>
        </Router>
    );
}

export default App;
