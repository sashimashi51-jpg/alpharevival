import React, { useState } from 'react';
import { Star, Check, Undo2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductAccordions from '../components/ProductAccordions';

import SuccessStories from '../components/SuccessStories';
import ResultsSection from '../components/ResultsSection';
import AllySection from '../components/AllySection';
import TimelineDemo from '../components/TimelineDemo';
import FaqSection from '../components/FaqSection';
import { StaggerTestimonials } from '../components/StaggerTestimonials';
import TrustBadges from '../components/TrustBadges';

import SEO from '../components/SEO';
import ProductSchema from '../components/seo/ProductSchema';
import FAQSchema from '../components/seo/FAQSchema';
import ImageLightbox from '../components/ImageLightbox';
import './ProductPage.css';

const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "AlphaRevive Hair Growth System",
    "image": "https://www.alpharevive.shop/assets/banner_1.png",
    "description": "The 3-phase microneedling system to reactivate dormant hair follicles naturally. Includes medical-grade 0.5mm microneedling, 650nm red light therapy, and bioactive serum delivery.",
    "brand": {
        "@type": "Brand",
        "name": "AlphaRevive"
    },
    "offers": {
        "@type": "AggregateOffer",
        "url": "https://www.alpharevive.shop/product",
        "priceCurrency": "USD",
        "lowPrice": "54.99",
        "highPrice": "129.99",
        "offerCount": "3",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
    }
};

const productImages = [
    '/assets/product_photos_final/first_photo.webp',
    '/assets/product_photos_final/second_photo.webp',
    '/assets/product_photos_final/third_photo.webp',
    '/assets/product_photos_final/fourth_photo.webp',
    '/assets/product_photos_final/fifth_photo.webp',
    '/assets/product_photos_final/sixth_photo.webp',
    '/assets/product_photos_final/seventh_photo.webp',
    '/assets/product_photos_final/eighth_photo.webp',
    '/assets/product_photos_final/ninth_photo.webp',
];

// Tier-specific main images for dynamic switching
const tierMainImages = {
    0: '/assets/product_photos_final/first_photo.webp',  // 1-month: single kit
    1: '/assets/product_photos_final/first_photo.webp',  // 2-month: single kit
    2: '/assets/product_photos_final/first_photo.webp',  // 4-month: multiple boxes
};

const offers = [
    {
        id: '1-month',
        title: '1-MONTH SUPPLY',
        badge: 'STARTUP',
        price: '$54.99',
        pricePerDay: '$1.83/day',
        refPrice: '$99.00',
        footer: 'INCLUDES: 1x Infusion system + 4 serums',
        popular: false,
        bestValue: false,
        hasGuarantee: false,
        bonusGuide: false,
        perks: []
    },
    {
        id: '2-month',
        title: '2-MONTH SUPPLY',
        badge: 'SAVE $40',
        price: '$79.99',
        pricePerDay: '$1.33/day',
        refPrice: '$119.99',
        footer: 'INCLUDES: 2-Month Treatment Supply (+ 8 Serums)',
        popular: true,
        bestValue: false,
        hasGuarantee: false,
        bonusGuide: false,
        perks: [
            { label: 'FREE Shipping', type: 'shipping' },
            { label: 'FREE Sterile Needle', type: 'needle' }
        ]
    },
    {
        id: '4-month',
        title: '4-MONTH SUPPLY',
        badge: 'SAVE $90',
        price: '$129.99',
        pricePerDay: '$1.08/day',
        refPrice: '$219.99',
        footer: 'INCLUDES: 4-Month Treatment Supply (+ 16 Serums)',
        popular: false,
        bestValue: true,
        hasGuarantee: true,
        bonusGuide: false,
        perks: [
            { label: 'FREE Shipping', type: 'shipping' },
            { label: 'FREE Sterile Needle', type: 'needle' },
            { label: 'FREE Gift', type: 'gift' }
        ]
    }
];

import { useCart } from '../context/CartContext';

export default function ProductPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(1);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxAlt, setLightboxAlt] = useState('');
    const { addToCart } = useCart();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFading, setIsFading] = useState(false); // For buttery smooth transitions

    const handleImageClick = (src, alt) => {
        setLightboxImage(src);
        setLightboxAlt(alt);
        setIsLightboxOpen(true);
    };


    // Update main image when tier selection changes
    const handleOfferChange = (index) => {
        setSelectedOffer(index);
        setActiveImage(0); // Reset to first image
    };

    const handleAddToCart = () => {
        const offer = offers[selectedOffer];
        const priceNumber = parseFloat(offer.price.replace('$', ''));
        const refPriceNumber = parseFloat(offer.refPrice.replace('$', ''));

        addToCart({
            id: offer.id,
            title: "AlphaRevive™ Hair Regrowth System",
            subtitle: offer.title,
            price: priceNumber,
            originalPrice: refPriceNumber,
            image: productImages[0]
        });
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
            answer: "Compared to a $10,000 transplant or $40/month pills for life ($5,000+ over 10 years), AlphaRevive at $129.99 is a steal. Plus, it's a one-time purchase for the tool."
        },
        {
            question: "Will I have to use this forever?",
            answer: "Ideally, yes, for maintenance. But once follicles reactivate, you can often reduce frequency to once a week. It's hair care, like brushing your teeth."
        },
        {
            question: "I’ve seen scams – how do I know this is legit?",
            answer: "We offer a 120-Day Money-Back Guarantee. If you show us you used it and didn't see results, we refund you. We take all the risk."
        },
        {
            question: "I want to see actual hair regrowth – even a little.",
            answer: "Most men see 'vellus' hairs (baby hairs) by week 8. Thickening happens by month 4. Check our Reviews section for real photos."
        }
    ];

    // Smooth cloud-like image transitions with crossfade
    const changeImage = (newIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setActiveImage(newIndex);
            setIsFading(false);
        }, 300); // Crossfade timing
    };

    // Lightbox handlers
    const nextImage = (e) => {
        e.stopPropagation();
        const newIndex = (activeImage + 1) % productImages.length;
        changeImage(newIndex);
    };
    const prevImage = (e) => {
        e.stopPropagation();
        const newIndex = (activeImage - 1 + productImages.length) % productImages.length;
        changeImage(newIndex);
    };

    return (
        <>
            <SEO
                title="Hair Regrowth System | AlphaRevive Product"
                description="Experience the breakthrough 3-phase hair recovery system. Reactivate dormant follicles in 90 days or get your money back."
                schema={productSchema}
            />
            <ProductSchema />
            <FAQSchema />
            <div className="product-page">
                <div className="container product-grid">
                    {/* Left Column: Gallery */}
                    <div className="product-gallery">
                        <div
                            className="main-image-wrapper"
                            onClick={() => handleImageClick(productImages[activeImage], "AlphaRevive System")}
                            style={{ cursor: 'zoom-in' }}
                        >
                            <img
                                src={productImages[activeImage]}
                                alt="AlphaRevive System"
                                className="main-image"
                                style={{ opacity: isFading ? 0 : 1 }}
                            />

                            {/* Mobile Navigation - Arrows */}
                            <button
                                className="gallery-arrow prev"
                                onClick={(e) => { e.stopPropagation(); prevImage(e); }}
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                className="gallery-arrow next"
                                onClick={(e) => { e.stopPropagation(); nextImage(e); }}
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>

                            {/* Mobile Navigation - Dots */}
                            <div className="mobile-gallery-nav">
                                {productImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`gallery-dot ${activeImage === idx ? 'active' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); changeImage(idx); }}
                                        aria-label={`View image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Thumbnail Gallery Navigation */}
                        <div className="gallery-thumbnails">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`gallery-thumbnail ${activeImage === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="product-content">
                        <div className="header-section">
                            <h1>AlphaRevive™ Hair Regrowth System</h1>
                            <div className="reviews-row">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="black" color="black" />
                                    ))}
                                </div>
                                <span className="review-text">251 reviews | 66 questions</span>
                            </div>
                        </div>

                        <div className="guarantee-text">
                            STOP FEEDING YOUR PILLOW, START FEEDING YOUR FOLLICLES
                        </div>
                        <p className="subheadline-text">
                            The first micro-infusion system designed to bypass the scalp barrier and deliver serum 300% deeper than topical droppers.
                        </p>


                        <ul className="checklist">
                            <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>Perfect for all hair types and hair loss areas</span></li>
                            <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>Painless, quick and simple</span></li>
                            <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>100% Hormone-Free. Keep Your Hair & Your Edge</span></li>
                            <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>100% secure checkout</span></li>
                        </ul>


                        {/* Infographic removed per user request */}


                        <div className="feature-image-container" onClick={() => handleImageClick("/assets/pdp.webp", "Product Features")} style={{ cursor: 'zoom-in' }}>
                            <img src="/assets/pdp.webp" alt="Product Features" className="feature-image" />
                        </div>

                        <div className="divider-section">
                            <div className="divider-line"></div>
                            <span className="divider-text">FREE SHIPPING ON ORDERS OVER $75</span>
                            <div className="divider-line"></div>
                        </div>

                        {/* Pricing Stack */}
                        <div className="pricing-stack">
                            {offers.map((offer, index) => (
                                <div
                                    key={offer.id}
                                    className={`offer-card ${selectedOffer === index ? 'selected' : ''} `}
                                    onClick={() => handleOfferChange(index)}
                                >
                                    {offer.popular && <div className="floating-badge popular">MOST POPULAR</div>}
                                    {offer.bestValue && <div className="floating-badge best-value">✦ BEST VALUE ✦</div>}

                                    <div className="offer-main">
                                        <div className="radio-circle">
                                            {selectedOffer === index && <div className="radio-inner" />}
                                        </div>
                                        <div className="offer-details">
                                            <div className="offer-header">
                                                <span className="offer-title">{offer.title}</span>
                                                <span className="save-badge">{offer.badge}</span>
                                            </div>
                                        </div>
                                        <div className="offer-pricing">
                                            <div className="price-primary">{offer.price}</div>
                                            <div className="price-per-day">{offer.pricePerDay}</div>
                                            <div className="price-ref">{offer.refPrice}</div>
                                        </div>
                                    </div>

                                    {/* Footer - What's included */}
                                    <div className="offer-footer">
                                        <div className="footer-base-text">{offer.footer}</div>

                                        {/* Simplified Perks Badges */}
                                        {offer.perks && offer.perks.length > 0 && (
                                            <div className="perks-list">
                                                {offer.perks.map((perk, i) => (
                                                    <span key={i} className={`perk-badge ${perk.type}`}>
                                                        <Check size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                                                        <strong>{perk.label}</strong>
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {offer.hasGuarantee && (
                                            <div className="guarantee-badge">
                                                🛡️ Protected by the 120-Day Growth Guarantee
                                            </div>
                                        )}
                                        {offer.bonusGuide && (
                                            <div className="bonus-guide">
                                                + FREE "Hair CPR" Clinical Guide ($49 Value)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary btn-large btn-block add-to-cart-btn"
                            onClick={handleAddToCart}
                        >
                            ADD TO CART - {offers[selectedOffer].price}
                        </button>

                        <TrustBadges />

                        <div className="guarantee-box">
                            <div className="guarantee-header">
                                <Undo2 size={20} color="#1A1A1A" strokeWidth={2} />
                                <span className="guarantee-title">120-Day Money Back Guarantee</span>
                            </div>
                            <p className="guarantee-body">
                                Our 120-day money-back guarantee is designed to cover the full results period. So, if it somehow doesn’t work, you get a full refund.
                            </p>
                            <a href="/return-refund" className="guarantee-link">More Details</a>
                        </div>
                    </div>
                </div>

                {/* As Seen In - Carousel */}
                <div className="proof-bar" style={{ borderTop: 'none', borderBottom: 'none', padding: '1.5rem 0' }}>
                    <p className="text-center proof-bar-title" style={{ textAlign: 'center' }}>As seen in</p>
                    <div className="logo-carousel">
                        <div className="logo-track">
                            {[...Array(8)].map((_, setIndex) => (
                                <React.Fragment key={setIndex}>
                                    <img src="/assets/as_seen_in_menshealth.webp" alt="Men's Health" />
                                    <img src="/assets/as_seen_in_style.webp" alt="Style" />
                                    <img src="/assets/as_seen_in_cosmopolitan.webp" alt="Cosmopolitan" />
                                    <img src="/assets/as_seen_in_logo.webp" alt="Media" />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Our Unique Mechanism Section */}
                <section className="mechanism-section">
                    <div className="container">
                        <div className="stories-header">
                            <h2>OUR UNIQUE MECHANISM</h2>
                        </div>

                        <div className="mechanism-video-wrapper"
                            onClick={() => handleImageClick("/assets/hero-gif.mp4", "Mechanism behind follicle restoration")}
                            style={{
                                textAlign: 'center',
                                margin: '0 auto 3rem',
                                maxWidth: '800px',
                                cursor: 'zoom-in'
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
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                }}
                            />
                        </div>

                        <div className="mechanism-content-wrapper" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
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
                                                <span><strong>Copper peptides (GHK-Cu): Signal dormant follicles to enter the growth phase</strong></span>
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                                <Check size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                                <span><strong>Vasodilators: Restore blood flow locally to bring oxygen back to your follicles</strong></span>
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                                <Check size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.15rem' }} />
                                                <span><strong>Bioactive peptides: Provide the building blocks your follicles need to produce keratin—the protein that hair is made of</strong></span>
                                            </li>
                                        </ul>
                                        <p>Most men report a distinct 'tingling' sensation during the first week of application. This isn't irritation—it's perfusion. It's the physical sensation of blood rushing back into capillaries that haven't seen proper flow in years, feeding the follicle the first meal it's had in a decade.</p>
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

                            <div className="mechanism-final-image" onClick={() => handleImageClick("/assets/niko11.webp", "AlphaRevive concept")} style={{ margin: '3rem 0', cursor: 'zoom-in' }}>
                                <img
                                    src="/assets/niko11.webp"
                                    alt="AlphaRevive concept"
                                    style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <ProductAccordions />
                <SuccessStories onImageClick={handleImageClick} />


                <ResultsSection />
                <AllySection />
                <TimelineDemo />

                <section className="video-section" style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
                    <video
                        src="/assets/video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        title="AlphaRevive Mechanism Video"
                    />
                </section>

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

                <StaggerTestimonials />

                <div className="mobile-sticky-bar">
                    <div className="sticky-info">
                        <span className="sticky-title">{offers[selectedOffer].title}</span>
                        <span className="sticky-price">{offers[selectedOffer].price}</span>
                    </div>
                    <button className="btn btn-primary compact-btn" onClick={handleAddToCart}>Add to Cart</button>
                </div>



                {/* Lightbox Modal */}
                <ImageLightbox
                    imageSrc={lightboxImage}
                    imageAlt={lightboxAlt}
                    isOpen={isLightboxOpen}
                    onClose={() => setIsLightboxOpen(false)}
                />
            </div>
        </>
    );
}