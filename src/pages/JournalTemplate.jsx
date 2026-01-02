import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ArticleSchema from '../components/seo/ArticleSchema';
import HowToSchema from '../components/seo/HowToSchema';
import './JournalTemplate.css';

export default function JournalTemplate() {
    const [activeSection, setActiveSection] = useState('');

    // Sticky TOC scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['science', 'protocol', 'timeline', 'howto'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Helmet>
                <title>Microneedling Hair Regrowth: The 2026 Protocol | AlphaRevive</title>
                <meta name="description" content="Complete guide to microneedling for hair regrowth. Learn the innovative method combining microneedling with peptide therapy for hair restoration without surgery or drugs." />
            </Helmet>
            <ArticleSchema />
            <HowToSchema />

            <article className="journal-page">
                <div className="container">
                    <div className="journal-grid">
                        {/* Sticky Table of Contents - Desktop Only */}
                        <aside className="sticky-toc">
                            <h3>Table of Contents</h3>
                            <nav>
                                <a
                                    href="#science"
                                    className={activeSection === 'science' ? 'active' : ''}
                                >
                                    The Science of Follicle Activation
                                </a>
                                <a
                                    href="#protocol"
                                    className={activeSection === 'protocol' ? 'active' : ''}
                                >
                                    Depth Protocol Comparison
                                </a>
                                <a
                                    href="#timeline"
                                    className={activeSection === 'timeline' ? 'active' : ''}
                                >
                                    Expected Timeline
                                </a>
                                <a
                                    href="#howto"
                                    className={activeSection === 'howto' ? 'active' : ''}
                                >
                                    How to Apply
                                </a>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="journal-content">
                            {/*  1. HERO SECTION */}
                            <header className="journal-hero">
                                <div className="hero-text">
                                    <h1>The Follicle Activation Protocol: Why 2026 Microneedling is the 'Non-Surgical Transplant'</h1>
                                    <p className="journal-subtitle">
                                        A deep dive into the innovative method for hair regrowth that combines microneedling with peptide therapy.
                                    </p>
                                    <div className="meta-data">
                                        <span><Clock size={16} /> Read Time: 6 min</span>
                                        <span><Check size={16} /> Verified by AlphaRevive Science Team</span>
                                    </div>
                                </div>
                                <div className="hero-image">
                                    <img src="/assets/blog/microneedling-hero.jpg" alt="Microneedling hair regrowth science" />
                                </div>
                            </header>

                            {/* 2. SCIENCE SECTION */}
                            <section id="science" className="science-section">
                                <h2>The Science of Follicle Activation</h2>
                                <p>
                                    For decades, the hair loss industry focused on <strong>blocking DHT</strong> (finasteride) or <strong>artificially stimulating blood flow</strong> (minoxidil).
                                    Both approaches treat symptoms, not root causes. In 2024, researchers discovered something remarkable: the body can regenerate follicles through a process called <em>Wound-Induced Hair Follicle Neogenesis</em>.
                                </p>

                                <div className="highlight-box">
                                    <p><strong>Unlike old methods, this innovative method for hair regrowth triggers stem cells, not just blood flow.</strong></p>
                                </div>

                                <p>
                                    When you create controlled micro-wounds at the 0.5-1.5mm depth, your scalp enters "emergency repair mode." Dormant stem cells in the dermal papilla wake up and begin differentiating into new hair follicle structures. This is the same mechanism your body uses to heal cuts—but strategically harnessed for microneedling hair regrowth.
                                </p>

                                <p>
                                    The AlphaRevive protocol goes further. By combining <strong>microneedling for hair</strong> with copper peptides (GHK-Cu) and growth factors, we're not just creating wounds—we're providing the exact nutrients needed for terminal hair growth. Studies show this combination increases follicle density by 36% in 16 weeks.
                                </p>
                            </section>

                            {/* 3. INTERACTIVE PROTOCOL TABLE */}
                            <section id="protocol" className="protocol-section">
                                <h2>The Depth Protocol: Beginner vs Growth Mode</h2>
                                <p>Not all microneedling for hair is created equal. Depth matters. Here's how to progressively activate follicles:</p>

                                <div className="protocol-table">
                                    <div className="protocol-column">
                                        <div className="protocol-header beginner">
                                            <h3>Beginner Mode</h3>
                                            <span className="depth-badge">0.5mm Depth</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Frequency</span>
                                            <span className="value">2x per week</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Target Area</span>
                                            <span className="value">Thinning zones only</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Pain Level</span>
                                            <span className="value">Mild tingling</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Expected Results</span>
                                            <span className="value">Vellus hair (peach fuzz) in 6-8 weeks</span>
                                        </div>
                                    </div>

                                    <div className="protocol-column">
                                        <div className="protocol-header growth">
                                            <h3>Growth Mode</h3>
                                            <span className="depth-badge">1.5mm Depth</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Frequency</span>
                                            <span className="value">1x per week</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Target Area</span>
                                            <span className="value">Full scalp coverage</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Pain Level</span>
                                            <span className="value">Moderate (tolerable)</span>
                                        </div>
                                        <div className="protocol-row">
                                            <span className="label">Expected Results</span>
                                            <span className="value">Terminal hair thickening by month 4</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 4. TIMELINE COMPONENT */}
                            <section id="timeline" className="timeline-section">
                                <h2>Your Hair Regrowth Timeline: What to Expect</h2>
                                <p>Patience is key. Here's the realistic progression of microneedling hair regrowth:</p>

                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-icon">
                                            <img src="/assets/icons/awakening.svg" alt="Day 1-30 icon" />
                                        </div>
                                        <div className="timeline-content">
                                            <h3>Day 1-30: The Awakening</h3>
                                            <p>
                                                Your scalp will feel tingly and slightly inflamed (this is good—it means stem cells are activating).
                                                By week 4, you'll notice <strong>vellus hairs</strong> (baby hairs/peach fuzz) appearing in previously bald spots.
                                                These are the first sign that dormant follicles are waking up.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="timeline-item">
                                        <div className="timeline-icon">
                                            <img src="/assets/icons/shedding.svg" alt="Day 30-60 icon" />
                                        </div>
                                        <div className="timeline-content">
                                            <h3>Day 30-60: The Shedding (Don't Panic!)</h3>
                                            <p>
                                                Around week 5-8, some of those new vellus hairs will fall out. <strong>This is normal and necessary.</strong>
                                                Your body is replacing weak vellus follicles with stronger, terminal hair roots. Think of it as "upgrading the foundation" before building the house.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="timeline-item">
                                        <div className="timeline-icon">
                                            <img src="/assets/icons/growth.svg" alt="Day 90+ icon" />
                                        </div>
                                        <div className="timeline-content">
                                            <h3>Day 90+: Terminal Growth & Thickening</h3>
                                            <p>
                                                By month 3-4, the magic happens. Those vellus hairs transition into <strong>terminal hairs</strong>—thicker, darker, permanent.
                                                Most users report visible density improvements. This is when people start noticing "you look different" without knowing why.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 5. HOW-TO SECTION WITH VIDEO */}
                            <section id="howto" className="howto-section">
                                <h2>Your 3-Minute Sunday Routine</h2>
                                <p>Here's exactly how to apply the AlphaRevive protocol at home:</p>

                                <div className="video-container">
                                    <iframe
                                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                        title="How to use AlphaRevive microneedling system"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                <div className="steps-list">
                                    <h3>Quick Steps:</h3>
                                    <ol>
                                        <li><strong>Cleanse:</strong> Wash scalp with lukewarm water (no shampoo 24hrs before)</li>
                                        <li><strong>Microneedle:</strong> Roll in 4 directions (vertical, horizontal, diagonal both ways) over thinning areas</li>
                                        <li><strong>Apply Serum:</strong> Immediately apply 1ml of peptide serum while micro-channels are open</li>
                                        <li><strong>Wait:</strong> Let absorb for 10 minutes, then rinse gently (optional)</li>
                                    </ol>
                                </div>
                            </section>

                            {/* 7. CTA FOOTER */}
                            <section className="cta-footer">
                                <div className="cta-card">
                                    <h2>Ready to Start Your Regrowth Journey?</h2>
                                    <p>Join 10,000+ men who've activated dormant follicles with the AlphaRevive system.</p>
                                    <Link to="/product" className="btn-primary">
                                        Get the AlphaRevive System <ChevronRight size={20} />
                                    </Link>
                                    <span className="guarantee-text"><Check size={16} /> 120-Day Money-Back Guarantee</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
