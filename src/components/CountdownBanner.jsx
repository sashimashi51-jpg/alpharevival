import React, { useState, useEffect } from 'react';
import './CountdownBanner.css';

const CountdownBanner = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            let target;

            if (targetDate) {
                target = new Date(targetDate).getTime();
            } else {
                // Evergreen Strategy: Daily loop ending at 23:59:59 local time
                const midnight = new Date(now);
                midnight.setHours(23, 59, 59, 999);
                target = midnight.getTime();
            }

            const distance = target - now.getTime();

            if (distance > 0) {
                // Calculate total hours (can be > 24) for fixed dates
                // For daily loop, this will naturally be between 0 and 23.
                const totalHours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({
                    hours: totalHours,
                    minutes: minutes,
                    seconds: seconds
                });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Initial call
        updateTimer();

        // Update every second
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="countdown-banner">
            <div className="container countdown-container">
                <span className="countdown-text desktop-label">BLACK FRIDAY SALE ENDS IN:</span>
                <span className="countdown-text mobile-label">ENDS IN:</span>
                <span className="countdown-simple-time">
                    {/* Display hours. If > 99, it will just show the number (e.g. 120). padStart ensures at least 2 digits. */}
                    {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

export default CountdownBanner;
