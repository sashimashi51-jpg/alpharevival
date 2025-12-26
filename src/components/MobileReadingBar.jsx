import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function MobileReadingBar() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            // Show bar after 30% scroll on mobile
            if (scrollPercentage > 30 && window.innerWidth < 768) {
                setIsVisible(true);
            } else if (scrollPercentage <= 30) {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-up">
            <div className="bg-white border-t-2 border-gray-200 shadow-2xl p-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Reading about regrowth?</p>
                        <p className="text-xs text-gray-600">Get the complete system</p>
                    </div>
                    <button
                        onClick={() => navigate('/product')}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg whitespace-nowrap transition-all"
                    >
                        <ShoppingBag size={18} />
                        <span>Shop System</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
