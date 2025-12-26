import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Undo2 } from 'lucide-react';
import FeaturedProduct from '../components/FeaturedProduct';
import { TestimonialCarousel } from '../components/ui/testimonial';
import EditorialHeader from '../components/EditorialHeader';
import ImageLightbox from '../components/ImageLightbox';
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
            {/* Editorial Header with Author Byline */}
            <EditorialHeader
                headline="Why 90% of Hair Serums Fail (And The 'Micro-Channel' Fix That Changes Everything)"
                authorName="Harry Ellison"
                authorTitle="Senior Health Editor"
                publishDate="Oct 24, 2025"
                authorImage="/assets/advertorial-reporter.png"
                heroImage="/assets/advertorial-photo.png"
                heroImageAlt="Man noticing hair thinning in mirror"
                onImageClick={handleImageClick}
            />

            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1rem 2rem' }}>

                {/* The Lead - Michael's Story */}
                <div className="advertorial-section">
                    <p className="advertorial-p">
                        Michael noticed it one morning in the shower.
                    </p>
                    <p className="advertorial-p">
                        More hair than usual circling the drain. Then a few days later, his girlfriend casually mentioned his "expanding forehead."
                    </p>
                    <p className="advertorial-p">
                        He wasn't even 35 yet.
                    </p>
                    <p className="advertorial-p">
                        Like most guys, Michael tried everything. The <strong>foam that made his hair look greasy</strong>. The <strong>"miracle shampoo"</strong> that cost $60 and did nothing. Then came the pills.
                    </p>
                    <p className="advertorial-p">
                        His doctor said finasteride was "safe." But within weeks, Michael's libido crashed. His energy tanked. He felt like a shell of himself.
                    </p>
                    <p className="advertorial-p">
                        <strong>The choice was clear: Keep your hair or keep your manhood.</strong>
                    </p>
                    <p className="advertorial-p">
                        Frustrated, Michael started researching hair transplants. $10,000 to $15,000. Surgical scars. Weeks of recovery. No guarantees.
                    </p>
                    <p className="advertorial-p">
                        He was about to book the consultation when he ran into an old friend from college—a dermatologist.
                    </p>
                </div>

                {/* The Aha Moment */}
                <div className="advertorial-section">
                    <h2 className="advertorial-subhead">The Conversation That Changed Everything</h2>

                    <p className="advertorial-p">
                        "Your follicles aren't dead," his friend said over coffee. "They're just dormant. But here's the problem most guys don't understand:"
                    </p>

                    <blockquote className="editorial-quote">
                        <p>Your scalp is designed to keep things OUT. It's a barrier. Rubbing foam or serum on your head is like trying to water a plant through plastic wrap.</p>
                    </blockquote>


                    <p className="advertorial-p">
                        That's when he explained the science behind <strong>Micro-Infusion Technology</strong>.
                    </p>

                    <p className="advertorial-p">
                        The concept is simple but powerful:
                    </p>


                    <div
                        style={{ textAlign: 'center', margin: '2rem 0', cursor: 'pointer' }}
                        onClick={() => handleImageClick('/assets/advertorial-concept.png', 'Micro-Infusion Mechanism')}
                    >
                        <img
                            src="/assets/advertorial-concept.png"
                            alt="Micro-Infusion Mechanism"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                display: 'inline-block',
                                borderRadius: '8px',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </div>


                    <p className="advertorial-p">
                        "It's not about what you apply," his friend said. "It's about <strong>absorption</strong>."
                    </p>

                    {/* Before/After Transformation Video */}
                    <div
                        style={{ margin: '3rem 0', textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => handleImageClick('/assets/hero-gif.mp4', '90-Day Hair Transformation')}
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: '100%',
                                maxWidth: '800px',
                                height: 'auto',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            <source src="/assets/hero-gif.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>


                {/* The Solution */}
                <div className="advertorial-section">
                    <h2 className="advertorial-subhead">Enter AlphaInfuse: The First At-Home Micro-Infusion System</h2>

                    <p className="advertorial-p">
                        His friend didn't sell Michael anything that day. But he did show him a photo on his phone—a device that looked clinical but simple.
                    </p>

                    <p className="advertorial-p">
                        <strong>AlphaInfuse Hair Regrowth System.</strong>
                    </p>

                    <p className="advertorial-p">
                        It combines <strong>clinical-strength microneedling</strong> with a proprietary peptide serum. The kind of treatment you'd pay $300 per session for at a dermatologist's office—now available at home.
                    </p>


                    <h3 className="advertorial-small-head">How It Works (The 3-Phase Mechanism)</h3>

                    <div className="mechanism-steps">
                        <div className="step-box">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h4>Micro-Stimulation</h4>
                                <p>The dermal stimulator creates thousands of micro-channels. This "controlled damage" signals your body to send nutrient-rich blood to the scalp.</p>
                            </div>
                            <div className="step-diagram">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Simplified skin layers */}
                                    <line x1="10" y1="45" x2="90" y2="45" stroke="#000" strokeWidth="2" />
                                    <line x1="10" y1="55" x2="90" y2="55" stroke="#000" strokeWidth="1.5" />
                                    {/* Micro-needles */}
                                    <line x1="30" y1="20" x2="30" y2="50" stroke="#000" strokeWidth="1.5" />
                                    <line x1="50" y1="15" x2="50" y2="50" stroke="#000" strokeWidth="1.5" />
                                    <line x1="70" y1="22" x2="70" y2="50" stroke="#000" strokeWidth="1.5" />
                                    {/* Penetration points */}
                                    <circle cx="30" cy="50" r="2" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="50" cy="50" r="2" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="70" cy="50" r="2" stroke="#000" strokeWidth="1" fill="none" />
                                </svg>
                            </div>
                        </div>

                        <div className="step-box">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h4>Deep Peptide Infusion</h4>
                                <p>Bioactive peptides (Copper Tripeptide-1, Procapil, etc.) flood directly into the follicle—no barrier, no waste.</p>
                            </div>
                            <div className="step-diagram">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Hair follicle outline */}
                                    <ellipse cx="50" cy="70" rx="18" ry="22" stroke="#000" strokeWidth="1.5" fill="none" />
                                    <line x1="50" y1="30" x2="50" y2="48" stroke="#000" strokeWidth="2" />
                                    {/* Peptide droplets - simple circles */}
                                    <circle cx="35" cy="20" r="2.5" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="50" cy="15" r="2.5" stroke="#000" strokeWidth="1" fill="none" />
                                    <circle cx="65" cy="22" r="2.5" stroke="#000" strokeWidth="1" fill="none" />
                                    {/* Simple downward arrows */}
                                    <line x1="35" y1="25" x2="40" y2="48" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                                    <line x1="50" y1="20" x2="50" y2="45" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                                    <line x1="65" y1="27" x2="60" y2="48" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                                </svg>
                            </div>
                        </div>

                        <div className="step-box">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h4>Follicle Reactivation</h4>
                                <p>Dormant follicles shift back into the growth phase. You see "peach fuzz" within weeks. Real density in 90 days.</p>
                            </div>
                            <div className="step-diagram">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Growing hair shaft - simple line */}
                                    <line x1="50" y1="25" x2="50" y2="70" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                    {/* Follicle base - simple circle */}
                                    <ellipse cx="50" cy="72" rx="14" ry="16" stroke="#000" strokeWidth="1.5" fill="none" />
                                    <circle cx="50" cy="75" r="7" stroke="#000" strokeWidth="1" fill="none" />
                                    {/* Growth indicators - curved lines */}
                                    <path d="M32 75 Q 40 68, 45 72" stroke="#000" strokeWidth="1" fill="none" />
                                    <path d="M68 75 Q 60 68, 55 72" stroke="#000" strokeWidth="1" fill="none" />
                                </svg>
                            </div>
                        </div>
                    </div>



                    <div className="key-benefits">
                        <h3 className="advertorial-small-head">Why Men Choose AlphaInfuse Over Pills or Surgery</h3>
                        <ul className="benefit-list">
                            <li><Check size={20} className="check-icon" /> <strong>Drug-Free:</strong> No finasteride. No minoxidil. No sexual side effects.</li>
                            <li><Check size={20} className="check-icon" /> <strong>Painless:</strong> Feels like a light tingle. Not a tattoo gun.</li>
                            <li><Check size={20} className="check-icon" /> <strong>10 Minutes, Twice a Week:</strong> Less time than scrolling Instagram.</li>
                            <li><Check size={20} className="check-icon" /> <strong>Clinically Proven Ingredients:</strong> Published studies. Real science.</li>
                            <li><Check size={20} className="check-icon" /> <strong>120-Day Money-Back Guarantee:</strong> Try it risk-free for 4 months.</li>
                        </ul>
                    </div>
                </div>

                {/* Social Proof - Testimonials Carousel */}
                <div className="advertorial-section social-proof-section">
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
                    <p className="swipe-instruction">*Swipe to see all reviews</p>

                    {/* Product Page Style Guarantee Box */}
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

                {/* Manufacturing Batch Scarcity */}
                <div className="advertorial-section">
                    <div className="scarcity-notice">
                        <h3 className="scarcity-title">⚠️ Limited Manufacturing Run</h3>
                        <p className="scarcity-text">
                            Because AlphaInfuse is a <strong>medical-grade device</strong>, production runs are limited. Each batch must meet strict quality control standards, and our current inventory is almost sold out. Once this batch is gone, the next shipment won't arrive for 6-8 weeks.
                        </p>
                    </div>
                </div>

            </div>

            {/* Product Showcase Section - Full Width */}
            <FeaturedProduct />

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
