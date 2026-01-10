import React from 'react';
import { Link } from 'react-router-dom';
import './AdvertorialBfcm.css';

// Import images
const heroVideo = '/assets/Advertorial-Funnel/84d557b7-d92a-4956-9e16-57fdd071f675.mp4';
const beforeAfterMain = '/assets/Subjects/3.webp';
const beforeAfterSecond = '/assets/Subjects/12.webp';
const dhtGraph = '/assets/Advertorial-Funnel/PERCENTAGE_OF_DHT_IN_THE_SCALP.png';
const mechanism = '/assets/Advertorial-Funnel/mechanism.webp';
const deliverySystem = '/assets/Advertorial-Funnel/Untitled_design_-_2025-02-26T145408.101.webp';
const formulaImage = '/assets/Subjects/17.webp';
const microNeedleImage = '/assets/Subjects/20.webp';
const testimonialImage = '/assets/Advertorial-Funnel/ezgif.com-optimize_56.webp';
const guaranteeBadge = '/assets/Landing_guarantee.webp';
const productBox = '/assets/Advertorial-Funnel/Untitled_design_1_223c36e7-2be1-4ef2-bb52-260daea002d1.webp';

const AdvertorialBfcm = () => {
    return (
        <div className="adv-page">
            {/* STICKY HEADER */}
            <header className="adv-header">
                <span className="adv-header__logo">ALPHAINFUSE</span>
                <span className="adv-header__promo">Up to 90% off!</span>
                <Link to="/product" className="adv-header__cta">Try Alpha Today</Link>
            </header>

            {/* HERO SECTION */}
            <section className="adv-hero">
                <div className="adv-container adv-container--wide">
                    <div className="adv-hero__grid">
                        <div className="adv-hero__content">
                            <p className="adv-hero__pretitle">ARE YOU LOSING HAIR?</p>
                            <h1 className="adv-hero__title">Stop Hair Loss and Regrow Thicker Hair in Just Weeks</h1>
                            <ul className="adv-hero__benefits">
                                <li className="adv-hero__benefit">
                                    <span className="adv-hero__check">✓</span>
                                    <span>Eliminate the root cause of thinning hair and activate regrowth.</span>
                                </li>
                                <li className="adv-hero__benefit">
                                    <span className="adv-hero__check">✓</span>
                                    <span>Clinically proven to reverse hair loss caused by Genetics, DHT, Stress, Diet, Aging, and more.</span>
                                </li>
                                <li className="adv-hero__benefit">
                                    <span className="adv-hero__check">✓</span>
                                    <span>Painless and takes 1 minute to apply.</span>
                                </li>
                                <li className="adv-hero__benefit">
                                    <span className="adv-hero__check">✓</span>
                                    <span>Long-lasting and sustainable results for longer, more youthful hair.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="adv-hero__media">
                            <video
                                src={heroVideo}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="adv-hero__video"
                            />
                            <div className="adv-hero__badge">✨ 108.271+ Men Love Alpha ✨</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AS SEEN IN */}
            <section className="adv-seen">
                <div className="adv-container">
                    <p className="adv-seen__title">As seen in:</p>
                    <div className="adv-seen__logos">
                        <span className="adv-seen__logo adv-seen__logo--forbes">Forbes</span>
                        <span className="adv-seen__logo adv-seen__logo--mens">Men's Health</span>
                        <span className="adv-seen__logo adv-seen__logo--spy">SPY</span>
                        <span className="adv-seen__logo adv-seen__logo--rolling">Rolling Stone</span>
                        <span className="adv-seen__logo adv-seen__logo--gq">GQ</span>
                    </div>
                </div>
            </section>

            {/* DON'T LET HAIR LOSS SECTION */}
            <section className="adv-section">
                <div className="adv-container">
                    <h2 className="adv-section__title">Don't Let Hair Loss Take Away Your Confidence</h2>
                    <div className="adv-content">
                        <p>
                            You're not alone. <strong>86% of men</strong> struggle with the frustration of <u>thinning hair</u>, a <u>receding hairline</u>, and <u>embarrassing bald spots</u> as early as their late 20s..
                        </p>
                        <p>
                            ...The daily anxiety of seeing your <strong>hairline slowly retreat in the mirror</strong>, feeling self-conscious about <u>thinning strands</u> and <u>exposed scalp</u>, and watching your hair lose its <strong>volume</strong> and <strong>density</strong> every day.
                        </p>
                    </div>

                    <div className="adv-before-after">
                        <img src={beforeAfterMain} alt="Before hair treatment" />
                        <img src={beforeAfterSecond} alt="After hair treatment" />
                    </div>
                </div>
            </section>

            {/* SCIENTIFIC RESEARCH SECTION */}
            <section className="adv-section">
                <div className="adv-container">
                    <h2 className="adv-section__title">Scientific Research Exposes the Real Cause of Hair Loss</h2>
                    <div className="adv-content">
                        <p>
                            Leading hair loss experts have uncovered the #1 cause of hair loss: <strong>DHT</strong> (Dihydrotestosterone) a hormone silently attacking your hair follicles right now as you're reading.
                        </p>
                        <p>
                            It creates a "stranglehold effect" blocking vital nutrients from reaching your hair follicles and weakening them over time. Starved of what they need to survive, <strong>your follicles shrink daily until they completely die</strong>.
                        </p>
                        <p>
                            This process comes with <strong>daily warning signs: hair shedding</strong>, a <u>receding hairline</u>, <u>thinning strands</u>, and <u>visible scalp patches</u>.
                        </p>
                    </div>

                    {/* WARNING BOX */}
                    <div className="adv-warning-box">
                        <div className="adv-warning-box__icon">⚠️</div>
                        <p>
                            Studies show that <strong>8 out of 10 men</strong> have excessive DHT levels that are literally suffocating their hair follicles.
                        </p>
                        <p>Your hair is literally being starved of what it needs, leading to:</p>
                        <ul className="adv-warning-box__list">
                            <li className="adv-warning-box__item">Embarrassing thin patches that make you look older than you are</li>
                            <li className="adv-warning-box__item">Excessive shedding that leaves hair all over your pillow and shower</li>
                            <li className="adv-warning-box__item">A receding hairline that's impossible to hide or style around</li>
                            <li className="adv-warning-box__item">Progressive DHT buildup that slowly suffocates and weakens your follicles</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* DHT GRAPH */}
            <section className="adv-graph">
                <div className="adv-container">
                    <img src={dhtGraph} alt="Percentage of DHT in the Scalp - Critical vs Optimal levels" className="adv-graph__image" />
                </div>
            </section>

            {/* BREAKTHROUGH DISCOVERY */}
            <section className="adv-breakthrough">
                <div className="adv-container">
                    <h2 className="adv-section__title">Breakthrough Discovery: Why 99% of Hair Loss Treatments Are Useless</h2>

                    <div className="adv-breakthrough__box">
                        <div className="adv-warning-box__icon">⚠️</div>
                        <p>
                            According to <strong>Harvard Health</strong>, our roots can absorb <strong>only 15%</strong> of the ingredients applied on the scalp, and <strong>up to 25%</strong> if ingested as pills. But in the case of hair loss shampoos? <strong>0%!</strong>
                        </p>
                        <p>
                            That means most of the formula is <strong>completely wasted</strong>—never reaching the DHT buildup where the real damage happens.
                        </p>
                    </div>

                    <div className="adv-content">
                        <p>
                            See, 99% of so-called "<strong>hair thickening</strong>" and "<strong>hair restoring</strong>" treatments never reach the root cause of the problem. The issue? These treatments are applied on the surface of the skin, your scalp.
                        </p>
                        <p>Serums? Barely penetrate.</p>
                        <p>Supplements? Absorb too little to make a real impact.</p>
                        <p>And hair loss shampoos? You <u>wash them off</u> before they even have a chance to work!</p>
                        <p><strong>How stupid is that?!</strong></p>
                        <p>
                            So, as you can imagine, there is <strong>no real effect</strong>. No thickening. No regrowth. No restoration. Absolutely nothing.
                        </p>
                        <p>
                            Meanwhile, <strong>DHT levels continue rising</strong>, accelerating hair loss every single day. And by the time men realize it, it's often too late.
                        </p>
                    </div>

                    <img src={mechanism} alt="Poor absorption of ingredients in traditional treatments" style={{ maxWidth: '100%', margin: '30px auto', display: 'block' }} />
                </div>
            </section>

            {/* DANGER SECTION */}
            <section className="adv-danger">
                <div className="adv-container">
                    <h2 className="adv-danger__title">DANGER: Every Day You Delay, DHT Strengthens Its Grip</h2>
                    <p className="adv-danger__subtitle">Your Hair Loss Is Getting Worse As You Read This...</p>

                    <div className="adv-content">
                        <p>
                            At the International Hair Science Symposium, experts revealed a shocking truth—once DHT starts attacking your hair follicles, without immediate action:
                        </p>
                    </div>

                    <ul className="adv-danger__list">
                        <li className="adv-danger__item">
                            <span className="adv-danger__x">✗</span>
                            <span>Your follicles will completely die, making regrowth nearly impossible</span>
                        </li>
                        <li className="adv-danger__item">
                            <span className="adv-danger__x">✗</span>
                            <span>Thinning speeds up, leaving hair weaker by the day</span>
                        </li>
                        <li className="adv-danger__item">
                            <span className="adv-danger__x">✗</span>
                            <span>Your confident, youthful hair becomes a thing of the past</span>
                        </li>
                    </ul>

                    <div className="adv-before-after">
                        <img src={beforeAfterMain} alt="Before treatment" />
                        <img src={beforeAfterSecond} alt="After treatment" />
                    </div>
                </div>
            </section>

            {/* FIRST TRUE BREAKTHROUGH */}
            <section className="adv-first-breakthrough">
                <div className="adv-container">
                    <h2 className="adv-section__title">The First True Breakthrough in Hair Regrowth: Stronger, Faster, Proven</h2>

                    <div className="adv-content">
                        <p>
                            A groundbreaking scientific breakthrough published in the International Journal of Hair Restoration has uncovered a clinically proven solution to stop hair loss for good: <strong>Micro-Infusion Hair System</strong>
                        </p>
                    </div>

                    <div className="adv-article-preview">
                        <div className="adv-article-preview__header">
                            <span>≡</span>
                            <span>Q</span>
                            <span style={{ fontSize: '12px', color: '#666' }}>MEDICAL NEWS TODAY</span>
                            <span style={{ marginLeft: 'auto', fontSize: '12px' }}>SUBSCRIBE</span>
                        </div>
                        <h3 className="adv-article-preview__title">
                            Scientists Uncover Revolutionary <br />
                            <span className="adv-article-preview__highlight">Micro-Infusion Technology</span><br />
                            Transforming the Hair Industry
                        </h3>
                        <p className="adv-article-preview__source">ScienceDaily</p>
                    </div>

                    <div className="adv-content" style={{ marginTop: '30px' }}>
                        <p style={{ background: '#e6f7f7', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
                            <strong>✓</strong> The key? A <strong>high-absorption</strong> delivery system called <strong>Micro-Infusion</strong>, paired with a clinically backed formula that penetrates deep beneath the scalp neutralizing DHT and delivering vital nutrients directly to your hair follicles.
                        </p>
                    </div>

                    <div className="adv-content">
                        <p>And the results speak for themselves:</p>
                    </div>

                    <ul className="adv-results">
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span><strong>300% increase</strong> in formula absorption</span>
                        </li>
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span><strong>5X faster</strong> hair growth with micro-needle stimulation.</span>
                        </li>
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span><strong>75% increase</strong> in hair thickness</span>
                        </li>
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span>Neutralizes DHT to protect and revive your hair follicles</span>
                        </li>
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span>Dramatical increase in overall hair density</span>
                        </li>
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span>Fills in embarrassing thin spots, restores receding hairline, with strong new growth</span>
                        </li>
                        <li className="adv-results__item">
                            <span className="adv-results__check">✓</span>
                            <span>Transforms weak, lifeless strands into thick, healthy hair</span>
                        </li>
                    </ul>

                    <div className="adv-content">
                        <p>
                            Now, thanks to this discovery, the <strong>AlphaInfuse™ Hair Regrowth System</strong> has helped thousands of men regrow the hair they thought was gone forever. It's hands down the most effective hair restoration system ever developed.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3 INNOVATIONS SECTION */}
            <section className="adv-innovations">
                <div className="adv-container adv-container--wide">
                    <h2 className="adv-innovations__title">Get Thicker, Attractive Hair Fast</h2>
                    <p className="adv-innovations__subtitle">The 3 scientific innovations behind AlphaInfuse™ Hair Regrowth System</p>

                    {/* Innovation 1 */}
                    <div className="adv-innovation">
                        <div className="adv-innovation__content">
                            <div className="adv-innovation__number">1.</div>
                            <h3 className="adv-innovation__title">Advanced Delivery System</h3>
                            <p className="adv-innovation__text">
                                For years, researchers searched for a way to deliver key ingredients directly to the root of hair loss—until now.
                            </p>
                            <p className="adv-innovation__text">
                                Micro-Infusion Technology creates <strong>tiny scalp channels</strong>, boosting absorption by up to 300%. This <u>delivers 10-15x more active ingredients</u> where they're needed most.
                            </p>
                            <p className="adv-innovation__text">
                                This breakthrough has helped thousands of men <strong>stop hair loss</strong> instantly and <strong>accelerate hair growth</strong> like never before.
                            </p>
                            <div className="adv-linked-study">
                                <span>LINKED STUDY</span>
                                <span>▼</span>
                            </div>
                        </div>
                        <div className="adv-innovation__media">
                            <img src={deliverySystem} alt="Advanced Delivery System - Micro-needles creating channels" className="adv-innovation__image" />
                        </div>
                    </div>

                    {/* Innovation 2 */}
                    <div className="adv-innovation adv-innovation--reverse">
                        <div className="adv-innovation__content">
                            <div className="adv-innovation__number">2.</div>
                            <h3 className="adv-innovation__title">Dual-Action Formula</h3>
                            <p className="adv-innovation__text">
                                AlphaInfuse™ Hair Regrowth System features a clinically proven natural blend, delivering powerful results with zero side effects.
                            </p>
                            <p className="adv-innovation__text">
                                Its formula combines <strong>Panax Ginseng</strong>, clinically proven to eliminate DHT and promote regrowth, <strong>Eclipta Prostrata Extract</strong>, which accelerates follicle regeneration, and <strong>Peppermint Oil</strong> & <strong>Ginger Root Extract</strong>, rich in nutrients that improve circulation and create the ideal scalp environment for thicker, stronger hair.
                            </p>
                            <div className="adv-linked-study">
                                <span>LINKED STUDY</span>
                                <span>▼</span>
                            </div>
                        </div>
                        <div className="adv-innovation__media">
                            <img src={formulaImage} alt="Day 0 - Hair before treatment" className="adv-innovation__image" />
                        </div>
                    </div>

                    {/* Innovation 3 */}
                    <div className="adv-innovation">
                        <div className="adv-innovation__content">
                            <div className="adv-innovation__number">3.</div>
                            <h3 className="adv-innovation__title">Micro-Needle Stimulation</h3>
                            <p className="adv-innovation__text">
                                Micro-needles do more than just enhance absorption. They actively stimulate your scalp for accelerated hair growth.
                            </p>
                            <p className="adv-innovation__text">
                                Thanks to these <strong>tiny punctures</strong>, your <strong>body sends more nutrients</strong> to the scalp to heal them, triggering a natural repair response that <u>speeds up hair regeneration</u>. Clinical studies confirm: Micro-needles accelerate hair growth <strong>up to 5x faster</strong>.
                            </p>
                            <div className="adv-linked-study">
                                <span>LINKED STUDY</span>
                                <span>▼</span>
                            </div>
                        </div>
                        <div className="adv-innovation__media">
                            <img src={microNeedleImage} alt="Micro-needle stimulation results" className="adv-innovation__image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* USAGE SECTION */}
            <section className="adv-usage">
                <div className="adv-container">
                    <h2 className="adv-usage__title">Maximum Results with Minimal Effort</h2>
                    <p className="adv-usage__subtitle">No complicated steps. No long routines. Just real results.</p>

                    <div className="adv-usage__steps">
                        <div className="adv-usage__step">
                            <div className="adv-usage__step-icon">✓</div>
                            <span><strong>Step 1:</strong> Load the formula into the micro-infusion device—no prep, no mess.</span>
                        </div>
                        <div className="adv-usage__step">
                            <div className="adv-usage__step-icon">✓</div>
                            <span><strong>Step 2:</strong> Gently stamp the micro-infusion device onto thinning areas. Takes less than <strong>1 minute</strong> and feels like lightly tapping your nail on your skin, <strong>completely painless</strong>. That's it. Let it absorb and go about your day.</span>
                        </div>
                        <div className="adv-usage__step">
                            <div className="adv-usage__step-icon">✓</div>
                            <span><strong>Step 3:</strong> See results in as little as 1 week, with remarkable growth in just 8-10 weeks.</span>
                        </div>
                    </div>

                    <div className="adv-content" style={{ textAlign: 'center', marginTop: '30px' }}>
                        <p>This system is engineered for <u>real</u> men who want <u>real</u> regrowth without the hassle.</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL / ONLY TREATMENT */}
            <section className="adv-testimonial">
                <div className="adv-container">
                    <img src={testimonialImage} alt="Happy customer with Alpha product" className="adv-testimonial__image" />

                    <h2 className="adv-testimonial__title">The Only Hair Treatment You'll Ever Need</h2>
                    <p className="adv-testimonial__subtitle">108.271+ customers use Alpha daily!</p>

                    <div className="adv-benefits">
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span>Fills in bald patches for a <strong>thicker, fuller</strong> look</span>
                        </div>
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span><strong>Restores</strong> receding hairline to its <strong>full potential</strong></span>
                        </div>
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span><strong>Stops hair loss</strong> and promotes <strong>drastic hair regrowth</strong></span>
                        </div>
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span><strong>No side effects</strong> - Pure natural blend formulated and developed in the US.</span>
                        </div>
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span><strong>Painless</strong> and takes <strong>1 minute</strong> to apply</span>
                        </div>
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span><strong>Long-lasting</strong> results</span>
                        </div>
                        <div className="adv-benefits__item">
                            <span className="adv-benefits__check">✓</span>
                            <span>Backed by a <strong>120-Day Growth Money-Back Guarantee</strong></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* BIG BEFORE/AFTER */}
            <section className="adv-comparison">
                <div className="adv-container adv-container--wide">
                    <div className="adv-comparison__grid">
                        <div className="adv-comparison__card">
                            <img src={beforeAfterMain} alt="Before treatment" className="adv-comparison__image" />
                        </div>
                        <div className="adv-comparison__card">
                            <img src={beforeAfterSecond} alt="After treatment" className="adv-comparison__image" />
                        </div>
                    </div>
                    <h3 style={{ textAlign: 'center', fontSize: '24px', marginTop: '30px' }}>
                        One simple solution to solve all your hair problems
                    </h3>
                </div>
            </section>

            {/* MAIN CTA */}
            <section className="adv-cta-section">
                <div className="adv-container adv-container--wide">
                    <Link to="/product" className="adv-cta-button">TRY TODAY</Link>
                </div>
            </section>

            {/* GUARANTEE SECTION */}
            <section className="adv-guarantee">
                <div className="adv-container">
                    <h2 className="adv-guarantee__title">The Best Part? You Don't Have to Decide Now! Try It Risk-FREE for 120 Days.</h2>

                    <img src={guaranteeBadge} alt="120 Days Growth Guarantee" className="adv-guarantee__image" />

                    <div className="adv-guarantee__content">
                        <h3 className="adv-guarantee__heading">Here's the deal:</h3>
                        <p className="adv-guarantee__text">
                            We're so confident in AlphaInfuse™ that we don't want you to spend a dime until you're 100% sure it works for you.
                        </p>
                        <p className="adv-guarantee__text">
                            <strong>That's why we offer a 120-day, no-questions-asked guarantee.</strong>
                        </p>
                        <p className="adv-guarantee__text">
                            If you don't see the results you expect, we'll issue a full refund—no hassle, no risk.
                        </p>
                        <p className="adv-guarantee__text">
                            Simply put, you only pay if it delivers real, life-changing results. And based on our track record, we're certain it will.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRODUCT SHOWCASE */}
            <section className="adv-product-showcase">
                <div className="adv-container">
                    <img src={productBox} alt="AlphaInfuse Product Box" className="adv-product-showcase__image" />
                </div>
            </section>

            {/* FOOTER */}
            <footer className="adv-footer">
                <div className="adv-container adv-container--wide">
                    {/* CTA Button */}
                    <div className="adv-footer__cta">
                        <Link to="/product" className="adv-footer__cta-button">TRY TODAY</Link>
                    </div>

                    {/* Contact Info */}
                    <div className="adv-footer__contact">
                        <div className="adv-footer__contact-item">
                            <span className="adv-footer__contact-icon">✉</span>
                            <span className="adv-footer__contact-label">Email</span>
                            <span className="adv-footer__contact-value">support@alphainfuse.com</span>
                        </div>
                        <div className="adv-footer__contact-item">
                            <span className="adv-footer__contact-icon">📞</span>
                            <span className="adv-footer__contact-label">Phone-Support</span>
                            <span className="adv-footer__contact-value">+1 (555) 229-9353</span>
                        </div>
                        <div className="adv-footer__contact-item">
                            <span className="adv-footer__contact-icon">📍</span>
                            <span className="adv-footer__contact-label">Address</span>
                            <span className="adv-footer__contact-value">930 Washington Avenue,<br />Miami Beach, FL 33139, United States</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="adv-footer__stats">
                        <div className="adv-footer__stat">
                            <span className="adv-footer__stat-icon">⭐</span>
                            <span className="adv-footer__stat-label">Google</span>
                            <span className="adv-footer__stat-label">reviews</span>
                            <span className="adv-footer__stat-value adv-footer__stat-value--orange">4.82</span>
                            <span style={{ color: '#f59e0b', fontSize: '16px' }}>★★★★★</span>
                        </div>
                        <div className="adv-footer__stat">
                            <span className="adv-footer__stat-value">108.271+</span>
                            <span className="adv-footer__stat-label">Satisfied Customers</span>
                        </div>
                        <div className="adv-footer__stat">
                            <span className="adv-footer__stat-value">27.872+</span>
                            <span className="adv-footer__stat-label">5 Star Reviews</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="adv-footer__links">
                        <ul className="adv-footer__links-list">
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms and Conditions</Link></li>
                            <li><Link to="/return-refund">Returns and Refunds Policy</Link></li>
                            <li><Link to="/shipping">Shipping Policy</Link></li>
                        </ul>
                        <div className="adv-footer__brand">
                            <div className="adv-footer__brand-name">ALPHAINFUSE</div>
                            <div className="adv-footer__brand-email">support@alphainfuse.com</div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="adv-footer__trust">
                        <div className="adv-footer__trust-item">
                            <span className="adv-footer__trust-icon">🛡️</span>
                            <span>120-DAY MONEY BACK GUARANTEE</span>
                        </div>
                        <div className="adv-footer__trust-item">
                            <span className="adv-footer__trust-icon">🎧</span>
                            <span>CUSTOMER SERVICE</span>
                        </div>
                        <div className="adv-footer__trust-item">
                            <span className="adv-footer__trust-icon">🔒</span>
                            <span>SECURE PAYMENT</span>
                        </div>
                        <div className="adv-footer__trust-item">
                            <span className="adv-footer__trust-icon">📧</span>
                            <span>CONTACT US</span>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="adv-footer__bottom">
                        <span className="adv-footer__copyright">© 2026 AlphaRevive. All rights reserved.</span>
                        <div className="adv-footer__legal">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/shipping">Shipping & Returns</Link>
                            <Link to="/return-refund">Return and Refund Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdvertorialBfcm;
