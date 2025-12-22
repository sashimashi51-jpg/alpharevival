import React, { useState, useEffect } from 'react';
import './CountdownBanner.css'; // We'll move styles here or keep in index/LandingPage.css

const CountdownBanner = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set fixed deadline? Or daily?
        // LandingPage used a fixed date '2025-12-25'. I'll stick to that or a daily loop for evergreen.
        // LandingPage Logic:
        const deadline = new Date('2025-12-25T23:59:59').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = deadline - now;
            if (distance > 0) {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="countdown-banner">
            <div className="container countdown-container">
                <span className="countdown-text desktop-label">BLACK FRIDAY SALE ENDS IN:</span>
                <span className="countdown-text mobile-label">ENDS IN:</span>
                <span className="countdown-simple-time">
                    {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

export default CountdownBanner;
