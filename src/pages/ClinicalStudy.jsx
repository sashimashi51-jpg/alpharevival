import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Undo2 } from 'lucide-react';
import FeaturedProduct from '../components/FeaturedProduct';
import { TestimonialCarousel } from '../components/ui/testimonial';
import EditorialHeader from '../components/EditorialHeader';
import ImageLightbox from '../components/ImageLightbox';
import AbsorptionChart from '../components/AbsorptionChart';
import './ClinicalStudy.css';

export default function ClinicalStudy() {
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxAlt, setLightboxAlt] = useState('');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleImageClick = (src, alt) => {
        setLightboxImage(src);
        setLightboxAlt(alt);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    return (
        <div className="clinical-study-page">
            {/* Editorial Header with Updated Content */}
            <EditorialHeader
                headline="Why Everything You've Tried For Hair Loss Has Failed (And What Finally Works)"
                subheadline="The minoxidil didn't work. The finasteride didn't work. And now you know why: your follicles are suffocating behind a delivery system that's been broken from day one."
                authorName="Harry Ellison"
                authorTitle="Medical Researcher"
                publishDate="Dec 27, 2024"
                readTime="10 Min Read"
                authorImage="/assets/advertorial-reporter.png"
                onImageClick={handleImageClick}
            />

            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1rem 2rem' }}>

                {/* SECTION 1: The Hook & The "Aha" Moment */}
                <div className="advertorial-section">
                    {/* Hero Image */}
                    <div className="hero-image-wrapper" style={{
                        textAlign: 'center',
                        margin: '2rem 0'
                    }}>
                        <img
                            src="/assets/advertorial-photo.png"
                            alt="Millions of men are treating the surface, ignoring the dormant life beneath"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleImageClick('/assets/advertorial-photo.png', 'Millions of men are treating the surface, ignoring the dormant life beneath')}
                        />
                        <p style={{
                            color: '#666',
                            fontSize: '0.85rem',
                            marginTop: '0.75rem',
                            fontStyle: 'italic'
                        }}>
                            Millions of men are treating the surface, ignoring the dormant life beneath.
                        </p>
                    </div>

                    <p className="advertorial-p">
                        <strong>Your hair follicles aren't dead.</strong>
                    </p>
                    <p className="advertorial-p">
                        Let me say that again, because it's the most important thing you need to understand: your follicles aren't dead.
                    </p>
                    <p className="advertorial-p">
                        They're dormant. Asleep. Waiting - and that changes everything.
                    </p>
                    <p className="advertorial-p">
                        Because it means you haven't "lost" your hair permanently. You haven't passed some point of no return. Your genetics haven't won.
                    </p>
                    <p className="advertorial-p">
                        What's actually happened is much simpler—and much more fixable than you've been led to believe. The hair follicles in your scalp right now—the ones that used to produce thick, healthy hair—are still there. Still alive. Still capable of producing hair again. They just can't reach the oxygen, energy, and growth factors they need to wake up.
                    </p>

                    <p className="advertorial-p">
                        <strong>The hair follicles in your scalp right now... are still there. Still alive. They just can't reach the oxygen.</strong>
                    </p>

                    <p className="advertorial-p">
                        And here's why the treatments you've tried all failed: they were never designed to reach your follicles in the first place. Not because you did something wrong, neither because you started too late. They were made to trap you as a customer by design.
                    </p>
                </div>

                {/* SECTION 2: The Problem (The 3 Barriers) */}
                <div className="advertorial-section">
                    <p className="advertorial-p">
                        But because of three biological barriers that exist between your scalp surface and your follicles—barriers that foam can't penetrate, pills can't activate, and supplements can't deliver through. And this is where science, not magic made on empty promises, comes in.
                    </p>
                    <p className="advertorial-p">
                        For years, you've been told that once hair loss starts, it's irreversible - which is absolutely false. What is true, however, is that conventional treatments can't bypass these three barriers. So they fail no matter how many times you try or how much time you spend using them. And then you start to blame yourself, your genetics, or "starting too late. But the real problem was never you, rather a system that made you have hope built on lies.
                    </p>

                    {/* Absorption Chart */}
                    <div className="absorption-chart-wrapper" style={{
                        margin: '3rem 0'
                    }}>
                        <AbsorptionChart />
                    </div>

                    <h2 className="advertorial-subhead">Why Everything You've Tried Couldn't Reach Your Follicles</h2>
                    <p className="advertorial-p">
                        Here's what's really happening beneath your scalp—and why understanding this changes everything about your ability to regrow hair:
                    </p>

                    <h3 className="advertorial-small-head">The First Barrier: Your Skin Won't Let Anything Through</h3>
                    <p className="advertorial-p">
                        When you apply minoxidil foam, here's what actually happens - the protective layer your scalp has (the stratum corneum) allows a tiny bit of the active ingredients through. That is its job to begin with. It's made to keep foreign substances out of your body. The other 95% of them? Sits on the surface, evaporates and never reaches the follicles that really need it.
                    </p>
                    <p className="advertorial-p">
                        Your follicles are three millimeters below the surface—and they never receive what you're applying. It's not you that's the problem, again, it's the delivery system.
                    </p>

                    <h3 className="advertorial-small-head">The Second Barrier: Your Follicles' Energy Source Shut Down</h3>
                    <p className="advertorial-p">
                        Even if ingredients could reach your follicles, there's a second problem:
                    </p>
                    <p className="advertorial-p">
                        Your follicles need energy to produce hair. That energy comes from tiny power plants inside each follicle called mitochondria. When bloodflow to your scalp gradually decreases over time, the mitochondria go into hibernation mode to conserve resources - energy.
                    </p>
                    <p className="advertorial-p">
                        That's when your follicles enter a "resting phase" called telogen effuvium. They're not dead. They're not gone. They are just asleep.
                    </p>
                    <p className="advertorial-p">
                        Waiting for the signal to wake up. But foams and pills cannot send that signal. They can't flip the switch that reactivates your follicles' energy production. So they stay asleep - even though they're fully capable of producing hair again.
                    </p>

                    <h3 className="advertorial-small-head">The Third Barrier: There's No Direct Path to Deliver Growth Factors</h3>
                    <p className="advertorial-p">
                        Let's say you could somehow get ingredients through your skin barrier. And let's say you could somehow reactivate your follicles' energy production.
                    </p>
                    <p className="advertorial-p">
                        You'd still need to deliver growth factors directly to the follicle matrix—where new hair actually forms. The biotin supplements you take? They get distributed through your entire body. The dermaroller? It creates holes, but there's no system to actually deliver growth factors through those holes to your follicles.
                    </p>
                    <p className="advertorial-p">
                        So even when you do everything right, the growth factors never reach where they need to go.
                    </p>

                    <p className="advertorial-p">
                        <strong>Here's the truth they don't tell you: Your follicles have been starving for oxygen, energy, and growth factors - sometimes for years. The treatments failed because they couldn't solve all three barriers. Not because your follicles are dead. Not because it's too late. But because no one had built a delivery system that actually works.</strong>
                    </p>

                    {/* Dormant vs Normal Follicle Image */}
                    <div className="dormant-follicle-wrapper" style={{
                        textAlign: 'center',
                        margin: '3rem 0'
                    }}>
                        <img
                            src="/assets/dormanyt.webp"
                            alt="Comparison between dormant and normal hair follicle"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleImageClick('/assets/dormanyt.webp', 'Comparison between dormant and normal hair follicle')}
                        />
                        <p style={{
                            color: '#666',
                            fontSize: '0.85rem',
                            marginTop: '0.75rem',
                            fontStyle: 'italic'
                        }}>
                            Dormant follicle (left) vs. normal follicle (right)
                        </p>
                    </div>
                </div>

                {/* SECTION 3: The Solution (The Pivot) */}
                <div className="advertorial-section">

                    <h2 className="advertorial-subhead">The First System That Solves All Three Barriers</h2>
                    <p className="advertorial-p">
                        While you've been told your hair loss is permanent, a small group of men discovered something different. A 3-phase system that doesn't just treat symptoms—it rebuilds the entire delivery system your follicles need. They're seeing new hair growth in places that have been bald for years. Hairlines filling back in. Crowns thickening. Actual new hair where there was only scalp. Not because of some miracle or magic, but because they found the first system that actually reaches the dormant follicles everyone said were "dead."
                    </p>

                    {/* Mechanism Video */}
                    <div className="mechanism-video-wrapper" style={{
                        textAlign: 'center',
                        margin: '3rem 0'
                    }}>
                        <video
                            src="/assets/hero-gif.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px'
                            }}
                        />
                        <p style={{
                            color: '#666',
                            fontSize: '0.85rem',
                            marginTop: '0.75rem',
                            fontStyle: 'italic'
                        }}>
                            The mechanism behind the follicle restoration
                        </p>
                    </div>
                </div>

                {/* SECTION 4: How It Works (The 3 Phases) */}
                <div className="advertorial-section">
                    <h3 className="advertorial-small-head">How It Works (The 3-Phase Mechanism)</h3>

                    <div className="mechanism-steps">
                        <div className="step-box">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h4>Phase 1: Create Direct Pathways to Your Follicles</h4>
                                <p>Medical-grade microneedling creates thousands of microscopic channels in your scalp. Each channel is precisely 0.5mm deep—the exact depth that reaches your follicles without causing damage.</p>
                                <p>This isn't about "better absorption." This is about bypassing the skin barrier entirely. Creating direct highways to your dormant follicles so that growth factors can finally reach them at 60-80% efficiency instead of 2-5%. The barrier that's been blocking every treatment you've tried? Gone.</p>
                            </div>
                            <div className="step-diagram">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="10" y1="45" x2="90" y2="45" stroke="#000" strokeWidth="2" />
                                    <line x1="10" y1="55" x2="90" y2="55" stroke="#000" strokeWidth="1.5" />
                                    <line x1="30" y1="20" x2="30" y2="50" stroke="#000" strokeWidth="1.5" />
                                    <line x1="50" y1="15" x2="50" y2="50" stroke="#000" strokeWidth="1.5" />
                                    <line x1="70" y1="22" x2="70" y2="50" stroke="#000" strokeWidth="1.5" />
                                    <circle cx="30" cy="50" r="2" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="50" cy="50" r="2" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="70" cy="50" r="2" stroke="#000" strokeWidth="1" fill="none" />
                                </svg>
                            </div>
                        </div>

                        <div className="step-box">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h4>Phase 2: Wake Up Your Follicles' Energy Production</h4>
                                <p>The system uses targeted red light therapy at 650 nanometers wavelength. That specific frequency penetrates to the follicle level and activates the mitochondria—your follicles' energy factories.</p>
                                <p>At 650nm, light literally flips the switch on dormant mitochondria. Follicles that have been asleep for years restart their growth cycle.</p>
                                <p>Not from chemicals, and not from some hormones. But from light activating your own cellular machinery at the exact frequency that turns it back on.</p>
                            </div>
                            <div className="step-diagram">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="50" cy="70" rx="18" ry="22" stroke="#000" strokeWidth="1.5" fill="none" />
                                    <line x1="50" y1="30" x2="50" y2="48" stroke="#000" strokeWidth="2" />
                                    <circle cx="35" cy="20" r="2.5" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="50" cy="15" r="2.5" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="65" cy="22" r="2.5" stroke="#000" strokeWidth="1" fill="none" />
                                    <line x1="35" y1="25" x2="40" y2="48" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                                    <line x1="50" y1="20" x2="50" y2="45" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                                    <line x1="65" y1="27" x2="60" y2="48" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                                </svg>
                            </div>
                        </div>

                        <div className="step-box">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h4>Phase 3: Deliver Growth Factors Directly Where They're Needed</h4>
                                <p>With channels open and energy restored, the system delivers a serum containing:</p>
                                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <Check size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                        <span><strong>Copper peptides (GHK-Cu):</strong> Signal dormant follicles to enter the growth phase</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <Check size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                        <span><strong>Vasodilators:</strong> Restore blood flow locally to bring oxygen back to your follicles</span>
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <Check size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                        <span><strong>Bioactive peptides:</strong> Provide the building blocks your follicles need to produce keratin—the protein that hair is made of</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="step-diagram">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="50" y1="25" x2="50" y2="70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                    <ellipse cx="50" cy="72" rx="14" ry="16" stroke="#000" strokeWidth="1.5" fill="none" />
                                    <circle cx="50" cy="75" r="7" stroke="#000" strokeWidth="1" fill="none" />
                                    <path d="M32 75 Q 40 68, 45 72" stroke="#000" strokeWidth="1" fill="none" />
                                    <path d="M68 75 Q 60 68, 55 72" stroke="#000" strokeWidth="1" fill="none" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <p className="advertorial-p">
                        These travel through the channels you created, reaching follicles with reactivated energy, in concentrations that actually matter.
                    </p>
                    <p className="advertorial-p" style={{ fontWeight: '600' }}>
                        For the first time, all three barriers are solved:<br />
                        Penetration achieved → Energy reactivated → Growth factors delivered
                    </p>

                    {/* Before/After Image */}
                    <div className="before-after-wrapper" style={{
                        textAlign: 'center',
                        margin: '3rem 0'
                    }}>
                        <img
                            src="/assets/georgi.webp"
                            alt="User transformation using AlphaRevive for 10 weeks"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleImageClick('/assets/georgi.webp', 'User transformation using AlphaRevive for 10 weeks')}
                        />
                        <p style={{
                            color: '#666',
                            fontSize: '0.85rem',
                            marginTop: '0.75rem',
                            fontStyle: 'italic'
                        }}>
                            User's transformation using our product for only 10 weeks
                        </p>
                    </div>
                </div>

                {/* SECTION 5: The Offer & Scarcity */}
                <div className="advertorial-section">
                    <h2 className="advertorial-subhead">What This Means for You</h2>
                    <p className="advertorial-p">
                        It means that your follicles aren't dead and that it's only a matter of time until you restore your appearance.
                    </p>
                    <p className="advertorial-p">
                        First visible new hair growth could be noticed at the week 6 mark. Actual new hair where once was only scalp. By the third month mark you'll have a measurable hairline fill-in which people will notice. The minoxidil couldn't do this because it couldn't penetrate the barrier. The finasteride couldn't do this because it couldn't reactivate your follicles' energy.
                    </p>
                    <p className="advertorial-p">
                        The supplements couldn't do this because they couldn't deliver to the right place.
                    </p>
                    <p className="advertorial-p">
                        But for the first time, there's a system that addresses all three in the correct order to wake up the follicles that have been waiting. You haven't lost your hair permanently. You've just been using treatments that couldn't reach it.
                    </p>

                    <h3 className="advertorial-small-head">Why This Isn't Available Everywhere</h3>
                    <p className="advertorial-p">
                        The AlphaRevive Microneedling Hair Regrowth System isn't available at CVS or on Amazon.
                    </p>
                    <p className="advertorial-p">
                        Each unit requires precision manufacturing—0.5mm microneedling cartridges and red light calibrated to exactly 650nm. Right now, there's a 2-3 week waitlist depending on your region.
                    </p>
                    <p className="advertorial-p">
                        But here's what matters:
                    </p>
                    <p className="advertorial-p">
                        If you've spent thousands on treatments that didn't work...<br />
                        If you've been told it's "too late" or that your follicles are "dead"...<br />
                        If you're watching your hairline recede and assuming it's permanent...
                    </p>
                    <p className="advertorial-p" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                        It's not.
                    </p>
                    <p className="advertorial-p" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                        Your follicles are dormant, not dead.
                    </p>
                </div>
            </div>

            {/* As Seen In - Carousel */}
            <div className="proof-bar" style={{ borderTop: 'none', borderBottom: 'none', padding: '3rem 0 1rem 0', margin: '0' }}>
                <p className="text-center proof-bar-title" style={{ textAlign: 'center' }}>As seen in</p>
                <div className="logo-carousel">
                    <div className="logo-track">
                        {[...Array(8)].map((_, setIndex) => (
                            <React.Fragment key={setIndex}>
                                <img src="/assets/as_seen_in_menshealth.png" alt="Men's Health" />
                                <img src="/assets/as_seen_in_style.png" alt="Style" />
                                <img src="/assets/as_seen_in_cosmopolitan.png" alt="Cosmopolitan" />
                                <img src="/assets/as_seen_in_logo.png" alt="Media" />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 6: Product Showcase */}
            <div style={{ padding: '0 1rem', margin: '3rem 0' }}>
                <FeaturedProduct />

                {/* Reviews Block */}
                <div className="container" style={{ maxWidth: '900px', margin: '3rem auto 0', padding: '0 1rem' }}>
                    <TestimonialCarousel
                        testimonials={[
                            {
                                id: 1,
                                name: "James T.",
                                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
                                description: "I was skeptical. But after 3 weeks, I saw fuzz where there was nothing. By month 3, my barber asked if I got a transplant."
                            },
                            {
                                id: 2,
                                name: "David M.",
                                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
                                description: "No more greasy foam. No pill side effects. Just results. My wife noticed before I did."
                            },
                            {
                                id: 3,
                                name: "Marcus L.",
                                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
                                description: "I've tried everything—this is the only thing that actually worked. The 120-day guarantee sealed the deal."
                            }
                        ]}
                        className="my-8"
                    />
                    <p className="swipe-instruction" style={{ textAlign: 'center', color: '#666' }}>
                        *Swipe to see all reviews
                    </p>

                    {/* Guarantee Box */}
                    <div className="guarantee-box" style={{ marginTop: '2.5rem' }}>
                        <div className="guarantee-header">
                            <Undo2 size={20} color="#1A1A1A" strokeWidth={2} />
                            <span className="guarantee-title">120-Day Money Back Guarantee</span>
                        </div>
                        <p className="guarantee-body">
                            Our 120-day money-back guarantee is designed to cover the full results period. So, if it somehow doesn't work, you get a full refund.
                        </p>
                        <Link to="/return-refund" className="guarantee-link">More Details</Link>
                    </div>
                </div>
            </div>

            {/* Image Lightbox Modal */}
            <ImageLightbox
                imageSrc={lightboxImage}
                imageAlt={lightboxAlt}
                isOpen={isLightboxOpen}
                onClose={closeLightbox}
            />
        </div>
    );
}
