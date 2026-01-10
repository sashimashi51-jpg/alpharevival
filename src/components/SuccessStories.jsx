import React, { useState } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import './SuccessStories.css';

const stories = [
    {
        name: "Alexander L.",
        details: "34, Chicago IL",
        image: "/assets/Subjects/8.webp",
        alt: "Alexander L. hair regrowth results",
        text: "My barber noticed my temples receding fast. I almost paid $8,000 for a transplant but tried this first. 2 months in, even my wife saw the difference. Now, 6 months later, my hairline is full again and I'm done wearing hats. Best investment I've made."
    },
    {
        name: "Mitch K.",
        details: "57, Montana",
        image: "/assets/Subjects/44.webp",
        alt: "Mitch K. hair regrowth results",
        text: "My wide part was embarrassing. After failing with foams and vitamins, I tried this. The micro-channeling actually gets ingredients into the scalp. By month 5, my part filled in. I can style my hair normally again and feel confident in photos."
    },
    {
        name: "Mike J.",
        details: "37, NYC",
        image: "/assets/Subjects/40.webp",
        alt: "Mike J. hair regrowth results",
        text: "I was super self-conscious about the balding on the back of my head. Just week 6 into using this, I saw new growth. By month 4, the coverage was incredible. The weekly routine is so simple, and the confidence boost is life-changing."
    },
    {
        name: "Peter H.",
        details: "64, Los Angeles, CA",
        image: "/photoassets/peter_successful_story.png",
        alt: "Peter H. hair regrowth results",
        text: "My kids joked about my thinning hair until it really hit me. I started the Sunday routine, and 3 months later my barber asked what I was using because my hair looked thicker. At 7 months, it has actual volume again. No more jokes, just compliments."
    },
    {
        name: "George",
        details: "36, Miami FL",
        image: "/photoassets/georgig.png",
        alt: "George hair regrowth results",
        text: "The science behind the micro-channels made sense. By month 3, the difference was undeniable—thinning areas have completely filled in. It takes consistency, but it really works, especially for the crown."
    }
];

export default function SuccessStories({ onImageClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Desktop: Show 4 cards. Max Index = Total - 4.
    // If Total is 5, Max Index is 1.
    const cardsToShow = 4;
    const maxIndex = Math.max(0, stories.length - cardsToShow);

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <section className="stories-section">
            <div className="container stories-header">
                <h2>RESULTS YOU WILL SEE WITH YOUR OWN EYES</h2>
                <p>Real results from verified customers</p>
            </div>

            <div className="stories-slider-wrapper">
                {/* Right Arrow (Desktop Only mostly) */}
                {currentIndex < maxIndex && (
                    <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Next">
                        <ChevronRight size={24} />
                    </button>
                )}
                {/* Optional Left Arrow if scrolled */}
                {currentIndex > 0 && (
                    <button className="slider-arrow arrow-left" onClick={handlePrev} style={{ right: 'auto', left: 0 }} aria-label="Previous">
                        <ChevronLeft size={24} />
                    </button>
                )}

                <div
                    className="stories-track"
                    style={{
                        '--slider-transform': `calc(-1 * ${currentIndex} * (25% + 0.375rem))`
                    }}
                >
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="story-card"
                            onClick={() => onImageClick && onImageClick(story.image, story.alt)}
                            style={{ cursor: 'zoom-in' }}
                        >
                            <div className="story-image-container">
                                <img
                                    src={story.image}
                                    alt={story.alt}
                                    className="story-image"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                            <div className="story-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                                ))}
                            </div>
                            <p className="story-text">"{story.text}"</p>
                            <div className="story-author">
                                {story.name}
                                <span>{story.details} • Verified Buyer</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

