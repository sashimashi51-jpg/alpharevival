import React, { useState, useEffect } from 'react';

const RealSaleBanner = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            // REAL FIXED DATE - January 13, 2026 at 11:59:59 PM
            const endDate = new Date('2026-01-13T23:59:59').getTime();
            const now = new Date().getTime();
            const difference = endDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setIsExpired(true);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    // Don't show banner after sale expires
    if (isExpired) return null;

    return (
        <div style={{
            background: 'linear-gradient(to right, #dc2626, #b91c1c)',
            color: 'white',
            padding: '0.75rem 1rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
        }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🔥</span>
                <span>NEW YEAR SALE</span>
            </span>
            <span style={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '1rem'
            }}>
                {timeLeft.days > 0 && <span>{timeLeft.days}d</span>}
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </span>
            <span style={{ fontSize: '0.85rem', opacity: 0.95 }}>
                Ends January 13th!
            </span>
        </div>
    );
};

export default RealSaleBanner;
