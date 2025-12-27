import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import './ProductAccordions.css';

const AccordionItem = ({ title, isOpen, onClick, children }) => {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    };

    return (
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button className="accordion-header" onClick={handleClick} type="button">
                <span className="accordion-title">{title}</span>
                <Plus size={20} className={`accordion-icon ${isOpen ? 'rotated' : ''}`} />
            </button>
            <div className="accordion-content">
                <div className="accordion-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function ProductAccordions() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        // Lock scroll position before changing accordion state
        const scrollY = window.scrollY;

        setOpenIndex(openIndex === index ? -1 : index);

        // Restore scroll position after state change
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
        });
    };

    return (
        <div className="product-accordions-section">
            <div className="accordion-container">

                {/* 1. Clinical Studies */}
                <AccordionItem
                    title="Clinical Studies"
                    isOpen={openIndex === 0}
                    onClick={() => toggleAccordion(0)}
                >
                    <div className="clinical-studies-content">
                        <h3 className="cs-headline">How It Works — Explained by a Dermatologist</h3>

                        <div className="video-wrapper">
                            <video controls className="cs-video" src="/assets/product_clinicalstudy.mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <blockquote className="cs-quote">
                            "It doesn't matter how strong your formula is if it never reaches the problem."
                            <footer>– Blane Schilling, a world-renowned trichologist specializing in hair loss research.</footer>
                        </blockquote>

                        <p className="cs-text">
                            Micro-Infusion Technology creates tiny scalp channels, boosting absorption by up to 300%. This delivers 10-15x more active ingredients where they’re needed most.
                        </p>

                        <h4 className="cs-subhead">Independently tested. Scientifically proven</h4>

                        <div className="cs-ticks">
                            <div className="tick-row"><Check size={18} className="tick-icon" /> 73% of users report visible improvement within the first month</div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> 94.7% satisfaction rate from verified customer testing</div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> Micro-infusion delivers 10x better absorption than topical treatments alone</div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> Zero side effects reported in safety testing</div>
                        </div>

                        <div className="cs-ticks-secondary">
                            <div className="tick-row"><Check size={18} className="tick-icon" /> Revolutionary micro-infusion technology transforming hair loss treatment</div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> Proven multiple times more effective than traditional treatments</div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> Safe and effective with no side effects</div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> Published in peer-reviewed dermatology research</div>
                        </div>
                    </div>
                </AccordionItem>

                <AccordionItem
                    title="Includes"
                    isOpen={openIndex === 1}
                    onClick={() => toggleAccordion(1)}
                >
                    <div className="includes-content">
                        <p>One box includes:</p>
                        <ul className="includes-list">
                            <li>(1) Hair Regrowth Micro-Infusion Device</li>
                            <li>(4) AlphaRevival Hair Regrowth Serums</li>
                        </ul>
                        <p className="supply-text">1-month supply.</p>
                    </div>
                </AccordionItem>

                {/* 3. How to Use */}
                <AccordionItem
                    title="How to Use"
                    isOpen={openIndex === 2}
                    onClick={() => toggleAccordion(2)}
                >
                    <div className="how-to-use-content">
                        <ol className="use-steps">
                            <li>
                                <strong>1. Start with clean, dry hair.</strong>
                            </li>
                            <li>
                                <strong>2. Gently stamp the micro-infusion device onto thinning areas.</strong> Takes less than 60 seconds and feels like lightly tapping your nail on your skin—completely painless. That’s it. Let it absorb and go about your day.
                            </li>
                            <li>
                                <strong>3. Use the device once a week</strong> to evenly distribute the serum across the scalp. Consistency is key to seeing improvements.
                            </li>
                            <li>
                                <strong>4. Avoid washing your hair or applying other products</strong> for at least 1 hour after use to allow the serum to work its magic.
                            </li>
                        </ol>
                    </div>
                </AccordionItem>

                {/* 4. Key Ingredients */}
                <AccordionItem
                    title="Key Ingredients"
                    isOpen={openIndex === 3}
                    onClick={() => toggleAccordion(3)}
                >
                    <div className="ingredients-content">
                        <div className="ingredient-item">
                            <strong>Eclipta Prostrata Extract</strong>– this potent botanical has been shown in studies to outperform Minoxidil in stimulating rapid follicle regeneration and extending the hair growth cycle.
                        </div>
                        <div className="ingredient-item">
                            <strong>Panax Ginseng</strong>– A powerful growth factor clinically proven to eliminate DHT, making way for new, healthy hair to regrow.
                        </div>
                        <div className="ingredient-item">
                            <strong>Peppermint Oil & Ginger Root Extract</strong>– rich in vitamins and antioxidants, these ingredients nourish the scalp, improve circulation, and create the perfect environment for strong, thick hair to grow.
                        </div>
                        <div className="ingredient-item">
                            <strong>Rosemary Leaf Extract</strong>: Natural alternative to minoxidil in promoting hair regrowth, particularly for androgenetic alopecia.
                        </div>
                    </div>
                </AccordionItem>

            </div>
        </div>
    );
}
