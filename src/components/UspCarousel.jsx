import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './UspCarousel.css';

const USPs = [
    "FREE SHIPPING IN THE US",
    "120-DAY MONEY BACK GUARANTEE",
    "DERMATOLOGIST APPROVED",
    "100% DRUG-FREE FORMULA"
];

const UspCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % USPs.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + USPs.length) % USPs.length);
    };

    // Optional: Auto-rotate
    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="usp-bar">
            <div className="container usp-container">
                <button onClick={prevSlide} className="usp-arrow" aria-label="Previous USP">
                    <ChevronLeft size={16} />
                </button>

                <div className="usp-content">
                    <span key={currentIndex} className="usp-text fade-in">
                        {USPs[currentIndex]}
                    </span>
                </div>

                <button onClick={nextSlide} className="usp-arrow" aria-label="Next USP">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default UspCarousel;
