import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.trim() || !pass.trim()) return;
        // guarda el nombre antes de saltar al loading
        localStorage.setItem('squanch_user', user.trim());
        onLogin();
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-logo">
                    <img src="/app_icon.png" alt="Portal" className="login-portal-icon" />
                    <h1>SquanchApp</h1>
                </div>
                <p className="login-subtitle">Ingresa para chatear con el multiverso</p>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
