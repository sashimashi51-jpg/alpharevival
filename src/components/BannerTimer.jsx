import React, { useState, useEffect } from 'react';

const BannerTimer = ({ hours = 48 }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const savedDeadline = localStorage.getItem('countdownDeadline');
            let endTime;

            if (savedDeadline) {
                endTime = parseInt(savedDeadline);
            } else {
                endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
                localStorage.setItem('countdownDeadline', endTime.toString());
            }

            const now = new Date().getTime();
            const difference = endTime - now;

            if (difference > 0) {
                const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ hours: h, minutes: m, seconds: s });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                localStorage.removeItem('countdownDeadline');
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [hours]);

    return (
        <span className="inline-flex items-center gap-1.5 text-white font-semibold">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="opacity-60">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="opacity-60">:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        </span>
    );
};

export default BannerTimer;
