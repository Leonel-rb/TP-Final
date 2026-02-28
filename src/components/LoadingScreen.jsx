import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 15000;
        const intervalTime = 100;
        const increment = 100 / (duration / intervalTime);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinished, 500);
                    return 100;
                }
                return prev + increment;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onFinished]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="wa-dark-loading">
            <div className="wa-loading-center">
                <div className="wa-loading-icons">
                    <span>💬</span>
                    <span className="dots">..........</span>
                    <span>💻</span>
                </div>

                <div className="wa-progress-container">
                    <div className="wa-progress-bar" style={{ width: `${progress}%` }} />
                </div>

                <h2 className="wa-loading-title">SquanchApp — Conectando...</h2>
                <p className="wa-loading-subtitle">🔒 Cifrado de extremo a extremo</p>
            </div>

            <button className="wa-logout-btn" onClick={handleLogout}>
                CERRAR SESIÓN
            </button>
        </div>
    );
};

export default LoadingScreen;
