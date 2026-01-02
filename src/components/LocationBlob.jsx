import React, { useState, useEffect } from 'react';

const LocationBlob = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Check session storage first
        const cached = sessionStorage.getItem('user_location');
        if (cached) {
            setLocation(JSON.parse(cached));
            return;
        }

        // Using https://ipapi.co/json/ for HTTPS support
        // Added timeout to prevent long blocking
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

        fetch('https://ipapi.co/json/', { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                const loc = {
                    country_code: data.country_code || data.countryCode || 'US',
                    country_name: data.country_name || data.country || 'United States'
                };
                setLocation(loc);
                sessionStorage.setItem('user_location', JSON.stringify(loc));
            })
            .catch(err => {
                // If timed out or failed, default to US immediately to stop loading state
                console.warn("Location fetch skipped:", err.message);
                const defaultLoc = { country_code: 'US', country_name: 'United States' };
                setLocation(defaultLoc);
                sessionStorage.setItem('user_location', JSON.stringify(defaultLoc));
            })
            .finally(() => clearTimeout(timeoutId));
    }, []);


    // Initial render state - keep placeholder to avoid layout shift, but it will be replaced quickly
    if (!location) return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 shadow-sm animate-pulse" style={{ minWidth: '80px' }}>
            <div className="w-5 h-5 rounded-full bg-slate-200"></div>
            <div className="w-4 h-3 bg-slate-200 rounded"></div>
        </div>
    );

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-white rounded-full border border-slate-200 shadow-sm transition-all cursor-default group relative">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center">
                <img
                    src={`https://flagcdn.com/w40/${location.country_code.toLowerCase()}.png`}
                    alt={location.country_name}
                    className="w-full h-full object-cover"
                />
            </div>
            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                {location.country_code}
            </span>
            {/* Tooltip on hover */}
            <div className="absolute top-full mt-2 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-md shadow-xl whitespace-nowrap pointer-events-none z-50">
                Shipping to {location.country_name}
            </div>
        </div>
    );
};

export default LocationBlob;
