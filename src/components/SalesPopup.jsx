import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import './SalesPopup.css';

const salesData = [
    { name: 'Michael T.', location: 'Dallas, TX', time: '2 minutes ago' },
    { name: 'James R.', location: 'New York, NY', time: '5 minutes ago' },
    { name: 'David K.', location: 'London, UK', time: '12 minutes ago' },
    { name: 'Sarah M.', location: 'Miami, FL', time: '1 minute ago' },
    { name: 'Robert P.', location: 'Los Angeles, CA', time: '8 minutes ago' },
];

export default function SalesPopup() {
    const [visible, setVisible] = useState(false);
    const [currentSale, setCurrentSale] = useState(salesData[0]);

    useEffect(() => {
        // Show first popup after 5 seconds
        const initialTimer = setTimeout(() => {
            setVisible(true);
        }, 5000);

        // subsequent loop
        const loop = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
                setCurrentSale(randomSale);
                setVisible(true);
            }, 3000); // Wait 3s before showing new one
        }, 15000); // Every 15s total cycle

        return () => {
            clearTimeout(initialTimer);
            clearInterval(loop);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="sales-popup glass animate-slide-in">
            <div className="popup-icon">
                <CheckCircle size={24} color="#10b981" />
            </div>
            <div className="popup-content">
                <p className="popup-title">Verified Purchase by {currentSale.name}</p>
                <p className="popup-sub">from {currentSale.location}</p>
                <p className="popup-time">{currentSale.time}</p>
            </div>
            <button className="popup-close" onClick={() => setVisible(false)}>×</button>
        </div>
    );
}
