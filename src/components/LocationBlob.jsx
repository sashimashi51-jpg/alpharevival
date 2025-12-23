import React, { useState, useEffect } from 'react';

const LocationBlob = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Using https://ipapi.co/json/ for HTTPS support
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLocation({
                        country_code: data.countryCode,
                        country_name: data.country
                    });
                } else {
                    // Fallback to second service if first fails
                    return fetch('https://ipapi.co/json/');
                }
            })
            .then(res => res && res.json())
            .then(data => {
                if (data && data.country_code) {
                    setLocation(data);
                }
            })
            .catch(err => {
                console.error("Error fetching location:", err);
                // Last resort fallback
                if (!location) {
                    setLocation({ country_code: 'US', country_name: 'United States' });
                }
            });
    }, []);


    if (!location) return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 shadow-sm animate-pulse">
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
