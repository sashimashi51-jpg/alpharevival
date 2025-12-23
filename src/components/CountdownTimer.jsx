import React, { useState, useEffect } from 'react';

const CountdownTimer = ({
    targetDate = null,
    hours = 24,
    label = "Sale Ends In:",
    urgentThreshold = 60 // minutes
}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            let endTime;

            if (targetDate) {
                endTime = new Date(targetDate).getTime();
            } else {
                // Calculate from localStorage or set new deadline
                const savedDeadline = localStorage.getItem('countdownDeadline');
                if (savedDeadline) {
                    endTime = parseInt(savedDeadline);
                } else {
                    endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
                    localStorage.setItem('countdownDeadline', endTime.toString());
                }
            }

            const now = new Date().getTime();
            const difference = endTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({
                    days,
                    hours,
                    minutes,
                    seconds,
                    total: difference
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
                // Reset timer when it hits zero
                if (!targetDate) {
                    localStorage.removeItem('countdownDeadline');
                }
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate, hours]);

    const isUrgent = timeLeft.total < (urgentThreshold * 60 * 1000);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center px-2">
            <div className={`text-2xl md:text-3xl font-bold ${isUrgent ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wide mt-1">
                {label}
            </div>
        </div>
    );

    return (
        <div className={`inline-flex flex-col items-center justify-center p-4 rounded-lg ${isUrgent ? 'bg-red-50 border-2 border-red-200' : 'bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200'}`}>
            <div className="text-sm md:text-base font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                {label}
            </div>
            <div className="flex items-center gap-1 md:gap-2">
                {timeLeft.days > 0 && (
                    <>
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <span className="text-2xl font-bold text-orange-600">:</span>
                    </>
                )}
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <span className="text-2xl font-bold text-orange-600">:</span>
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <span className="text-2xl font-bold text-orange-600">:</span>
                <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>
            {isUrgent && (
                <div className="mt-2 text-xs font-bold text-red-600 uppercase animate-pulse">
                    ⚡ Hurry! Offer Ending Soon!
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
