import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ShieldCheck, ArrowRight, Activity, Droplet, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SalesPopup from '../components/SalesPopup';
import TestimonialsColumns from '../components/TestimonialsColumns';
import FaqSection from '../components/FaqSection';
import { FlowButton } from '../components/FlowButton';
import SuccessStories from '../components/SuccessStories';
import FeaturedProduct from '../components/FeaturedProduct';

import './LandingPage.css';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function LandingPage() {
    const [activeAccordion, setActiveAccordion] = React.useState(null);
    const [timeLeft, setTimeLeft] = React.useState({ hours: 0, minutes: 0, seconds: 0 });

    // Countdown Timer
    React.useEffect(() => {
        const deadline = new Date('2025-12-25T23:59:59').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance > 0) {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const faqItems = [
        {
            question: "Will it make things worse (initial shedding or damage)?",
            answer: "No. Unlike Minoxidil that shocks follicles causing a 'dread shed', our peptides nourish roots immediately. Microneedling is damage-free at 0.5mm."
        },
        {
            question: "Is this safe? Any side effects?",
            answer: "100% safe. The 0.5mm needles stay in the epidermis (safe zone) and our serum is drug-free. No dizziness, no heart palpitations, no sexual side effects."
        },
        {
            question: "I’m not sure I can stick with it – what if it’s too much hassle?",
            answer: "It takes 2 minutes, twice a week. That's less time than brushing your teeth. Can you spare 4 minutes a week to save your hair?"
        },
        {
            question: "It’s too expensive – is it worth the money?",
            answer: "Compared to a $10,000 transplant or $40/month pills for life ($5,000+ over 10 years), AlphaRevival at $189 is a steal. Plus, it's a one-time purchase for the tool."
        },
        {
            question: "Will I have to use this forever?",
            answer: "Ideally, yes, for maintenance. But once follicles reactivate, you can often reduce frequency to once a week. It's hair care, like brushing your teeth."
        },
        {
            question: "I’ve seen scams – how do I know this is legit?",
            answer: "We offer a 180-Day Money-Back Guarantee. If you show us you used it and didn't see results, we refund you. We take all the risk."
        },
        {
            question: "I want to see actual hair regrowth – even a little.",
            answer: "Most men see 'vellus' hairs (baby hairs) by week 8. Thickening happens by month 4. Check our Reviews section for real photos."
        }
    ];



    return (
        <div className="landing-page">
            {/* Hero Section */}
            <div className="hero section" style={{ backgroundColor: '#ffffff', marginTop: 0 }}>
                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge">New Mechanism</div>
                        <h1 style={{ color: '#000000' }}>Regrow Thicker Hair Without Drugs or Shedding</h1>
                        <p className="hero-sub">
                            Our science-backed system reactivates dormant follicles using precision microneedling and peptides.
                            The most effective drug-free method to trigger regrowth.
                        </p>
                        <div className="hero-cta-group">
                            <div className="scarcity-bar-container">
                                <p className="scarcity-text" style={{ color: '#dc2626', fontWeight: '800' }}>
                                    <span className="blink-red"></span> LOW STOCK: Only 12 Kits Left!
                                </p>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '96%', background: '#dc2626' }}></div></div>
                            </div>
                            <FlowButton to="/product" text="Shop Now" />
                            <div className="guarantee-text">
                                <ShieldCheck size={16} /> 180-Day Money-Back Guarantee
                            </div>
                        </div>
                        <div className="hero-social-proof">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="#f59e0b" color="#f59e0b" size={16} />)}
                            </div>
                            <span>4.9/5 based on 1,700+ reviews</span>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="/assets/landing_hero_model.jpg" alt="AlphaRevival Results" />
                    </motion.div>
                </div>
            </div>

            {/* Solution Section */}
            <section className="solution-section">
                <div className="container solution-container">
                    <h4 className="solution-title">THE MOST EFFECTIVE SOLUTION FOR MEN WHO REFUSE TO GO BALD.</h4>
                    <p className="solution-text">
                        <strong>MICRO INFUSION</strong> doesn’t sit on your scalp like shampoos or serums. It works deeper, targeting hair loss at the root and reviving thinning hair for real results.
                    </p>
                    <p className="solution-text">
                        <strong>MICRO INFUSION</strong> represents a breakthrough in men’s hair restoration—a commitment to helping men reclaim their confidence and take control of hair loss.
                    </p>
                </div>
            </section>

            {/* Social Proof / Trusted By - Infinite Carousel */}
            <section className="proof-bar">
                <p className="text-center proof-bar-title">As seen in</p>
                <div className="logo-carousel">
                    <div className="logo-track">
                        <img src="/assets/as_seen_in_menshealth.png" alt="Men's Health" />
                        <img src="/assets/as_seen_in_style.png" alt="Style" />
                        <img src="/assets/as_seen_in_cosmopolitan.png" alt="Cosmopolitan" />
                        <img src="/assets/as_seen_in_logo.png" alt="Media" />
                        {/* Duplicate 1 */}
                        <img src="/assets/as_seen_in_menshealth.png" alt="Men's Health" />
                        <img src="/assets/as_seen_in_style.png" alt="Style" />
                        <img src="/assets/as_seen_in_cosmopolitan.png" alt="Cosmopolitan" />
                        <img src="/assets/as_seen_in_logo.png" alt="Media" />
                        {/* Duplicate 2 */}
                        <img src="/assets/as_seen_in_menshealth.png" alt="Men's Health" />
                        <img src="/assets/as_seen_in_style.png" alt="Style" />
                        <img src="/assets/as_seen_in_cosmopolitan.png" alt="Cosmopolitan" />
                        <img src="/assets/as_seen_in_logo.png" alt="Media" />
                        {/* Duplicate 3 */}
                        <img src="/assets/as_seen_in_menshealth.png" alt="Men's Health" />
                        <img src="/assets/as_seen_in_style.png" alt="Style" />
                        <img src="/assets/as_seen_in_cosmopolitan.png" alt="Cosmopolitan" />
                        <img src="/assets/as_seen_in_logo.png" alt="Media" />
                    </div>
                </div>
            </section>

            {/* Large Banner Section - Text Overlay with Original Aspect Ratio */}
            <section className="risk-free-banner">
                <img src="/assets/banner_1.png" alt="Risk Free Banner" className="banner-bg" />
                <div className="risk-free-overlay">
                    <div className="risk-free-content">
                        <p className="risk-free-text">
                            WE HAVE FULL CONFIDENCE IN OUR PRODUCTS, WHICH IS WHY WE OFFER A 120-DAY RISK-FREE TRIAL. IF YOU'RE NOT SATISFIED WITH YOUR RESULTS, WE'LL GIVE YOU A FULL REFUND.
                        </p>
                        <h3 className="risk-free-title">
                            TRY US RISK FREE
                            <br />
                            <span style={{ display: 'block', marginTop: '0.5rem' }}>120-DAY</span>
                        </h3>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="trusted-by-section">
                <div className="container">
                    <h4>TRUSTED BY OVER 100,000 CUSTOMERS</h4>
                </div>
            </section>



            {/* Mechanism / Big Idea */}
            <section className="section bg-secondary" id="how-it-works">
                <div className="container text-center">
                    <h2 className="section-title">CPR for Your Hair Follicles</h2>
                    <p className="section-subtitle">A 3-Phase System to "Flip the Switch" on Growth</p>

                    <div className="grid-3 features">
                        <div className="feature-card">
                            <div className="icon-box"><Activity size={32} /></div>
                            <h3>Phase 1: Micro-Stimulation</h3>
                            <p>The dermal stimulator creates channels to wake dormant follicles and boost blood flow.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><Droplet size={32} /></div>
                            <h3>Phase 2: Peptide Infusion</h3>
                            <p>Special peptides penetrate the scalp barrier through micro-channels to fuel growth.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><Zap size={32} /></div>
                            <h3>Phase 3: Activation Mist</h3>
                            <p>Nutrient-rich mist seals the scalp and ensures 24/7 nourishment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Slider */}
            <SuccessStories />

            {/* Full Width Video Loop */}
            <section className="video-section" style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
                <video
                    src="/assets/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    title="AlphaRevival Mechanism Video"
                />
            </section>

            {/* Testimonials Section (New Animated) */}
            <TestimonialsColumns />

            {/* Featured Product Section */}
            <FeaturedProduct />

            {/* Guarantee Banner */}
            <section className="section guarantee-section" style={{ padding: 0 }}>
                <img
                    src="/assets/guaranted.png"
                    alt="Money Back Guarantee"
                    className="responsive-img"
                    style={{ width: '100%', display: 'block' }}
                />
            </section>

            {/* FAQs (New Animated) */}
            <FaqSection
                title="Your Questions, Answered"
                description="Everything you need to know about starting your regrowth journey."
                items={faqItems}
                contactInfo={{
                    title: "Still have questions?",
                    description: "Our hair restoration experts are here to help.",
                    buttonText: "Contact Support",
                    onContact: () => window.location.href = "/contact"
                }}
            />


            <SalesPopup />
            <div className="mobile-sticky-bar">
                <FlowButton to="/product" text="Shop Now" className="w-full" />
            </div>
        </div>
    );
}
