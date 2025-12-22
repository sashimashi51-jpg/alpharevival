import React from 'react';
import { motion } from 'framer-motion';
import './ResultsSection.css';

const CircularProgress = ({ value }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    // We want to animate from full stroke-dashoffset (empty) to correct offset
    // offset = circumference - (value / 100) * circumference
    const targetOffset = circumference - (value / 100) * circumference;

    return (
        <div className="circular-chart">
            <svg viewBox="0 0 80 80" className="circle-svg">
                {/* Background Ring */}
                <circle
                    className="circle-bg"
                    cx="40"
                    cy="40"
                    r={radius}
                />
                {/* Progress Ring */}
                <motion.circle
                    className="circle-progress"
                    cx="40"
                    cy="40"
                    r={radius}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: targetOffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="percentage-text">
                {value}%
            </div>
        </div>
    );
};

const ResultsSection = () => {
    const data = [
        { percentage: 97, text: "Experienced visible hair regrowth and restored fullness." },
        { percentage: 92, text: "Felt more confident and youthful when dating, at the office, and in everyday life." },
        { percentage: 87, text: "Would recommend AlphaFuse over shampoos, supplements, and other solutions." }
    ];

    return (
        <section className="results-section">
            <div className="container results-container">
                <h2 className="results-title">In 30 Days, See the Difference</h2>

                <div className="results-list">
                    {data.map((item, index) => (
                        <div className="result-row" key={index}>
                            <div className="chart-wrapper">
                                <CircularProgress value={item.percentage} />
                            </div>
                            <p className="result-description">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResultsSection;
