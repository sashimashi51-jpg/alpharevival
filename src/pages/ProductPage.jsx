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
import EbookSection from '../components/EbookSection';
import SEO from '../components/SEO';
import './ProductPage.css';

const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "AlphaRevive Hair Growth System",
    "image": "https://alpharevive.vercel.app/assets/banner_1.png",
    "description": "The 3-phase microneedling system to reactivate dormant hair follicles naturally.",
    "brand": {
        "@type": "Brand",
        "name": "AlphaRevive"
    },
    "offers": {
        "@type": "AggregateOffer",
        "url": "https://alpharevive.vercel.app/product",
        "priceCurrency": "USD",
        "lowPrice": "69.00",
        "highPrice": "189.00",
        "offerCount": "3"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250"
    }
};

const productImages = [
    '/assets/product_photos_final/first_photo.png',
    '/assets/product_photos_final/second_photo.png',
    '/assets/product_photos_final/third_photo.png',
    '/assets/product_photos_final/fourth_photo.png',
    '/assets/product_photos_final/fifth_photo.png',
    '/assets/product_photos_final/sixth_photo.png',
    '/assets/product_photos_final/seventh_photo.png',
    '/assets/product_photos_final/eighth_photo.png',
    '/assets/product_photos_final/ninth_photo.png',
];

// Tier-specific main images for dynamic switching
const tierMainImages = {
    0: '/assets/product_photos_final/first_photo.png',  // 1-month: single kit
    1: '/assets/product_photos_final/first_photo.png',  // 3-month: single kit
    2: '/assets/product_photos_final/first_photo.png',  // 6-month: multiple boxes
};

const offers = [
    {
        id: '1-month',
        title: '1-MONTH SUPPLY',
        badge: 'STARTUP',
        price: '$69.00',
        pricePerDay: '$2.30/day',
        refPrice: '$99.00',
        footer: 'INCLUDES: 1x Infusion system + 4 serums',
        popular: false,
        bestValue: false,
        hasGuarantee: false,
        bonusGuide: false,
    },
    {
        id: '3-month',
        title: '3-MONTH SUPPLY',
        badge: 'SAVE $100',
        price: '$109.00',
        pricePerDay: '$1.21/day',
        refPrice: '$209.00',
        footer: 'INCLUDES: 3-Month Treatment Supply (+ 12 Serums)',
        popular: true,
        bestValue: false,
        hasGuarantee: false,
        bonusGuide: false,
    },
    {
        id: '6-month',
        title: '6-MONTH SUPPLY',
        badge: 'SAVE $212',
        price: '$177.00',
        pricePerDay: '$0.98/day',
        refPrice: '$389.00',
        footer: 'INCLUDES: 6-Month Treatment Supply (+ 24 Serums)',
        popular: false,
        bestValue: true,
        hasGuarantee: true,
        bonusGuide: true,
    }
];

import { useCart } from '../context/CartContext';

export default function ProductPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(1);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const { addToCart } = useCart();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFading, setIsFading] = useState(false); // For buttery smooth transitions


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
            title: "AlphaRevival™ Hair Regrowth System",
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
            answer: "Compared to a $10,000 transplant or $40/month pills for life ($5,000+ over 10 years), AlphaRevival at $189 is a steal. Plus, it's a one-time purchase for the tool."
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
            <div className="product-page">
                <div className="container product-grid">
                    {/* Left Column: Gallery */}
                    <div className="product-gallery">
                        <div
                            className="main-image-wrapper"
                            onClick={() => setIsLightboxOpen(true)}
                            style={{ cursor: 'zoom-in' }}
                        >
                            <img
                                src={productImages[activeImage]}
                                alt="AlphaRevival System"
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
                            <h1>AlphaRevival™ Hair Regrowth System</h1>
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
                            REGROW YOUR HAIR IN 120 DAYS OR GET YOUR MONEY BACK
                        </div>


                        <ul className="checklist">
                            <li><Check size={20} className="check-icon" /><span>Perfect for all hair types and hair loss areas</span></li>
                            <li><Check size={20} className="check-icon" /><span>Painless, quick and simple</span></li>
                            <li><Check size={20} className="check-icon" /><span>No side effects, no marks or scars. No costly surgery</span></li>
                            <li><Check size={20} className="check-icon" /><span>100% secure checkout</span></li>
                        </ul>

                        <div className="feature-image-container">
                            <img src="/assets/pdp.png" alt="Product Features" className="feature-image" />
                        </div>

                        <div className="divider-section">
                            <div className="divider-line"></div>
                            <span className="divider-text">FREE SHIPPING ON ORDERS OVER $80</span>
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
                                    <div className="offer-footer">
                                        <div>{offer.footer}</div>
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
                                    <img src="/assets/as_seen_in_menshealth.png" alt="Men's Health" />
                                    <img src="/assets/as_seen_in_style.png" alt="Style" />
                                    <img src="/assets/as_seen_in_cosmopolitan.png" alt="Cosmopolitan" />
                                    <img src="/assets/as_seen_in_logo.png" alt="Media" />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <ProductAccordions />
                <SuccessStories />

                {/* Free Guide Lead Magnet */}
                <EbookSection />

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
                        title="AlphaRevival Mechanism Video"
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
                {isLightboxOpen && (
                    <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
                        <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
                            <X size={32} color="white" />
                        </button>

                        <button className="lightbox-nav prev" onClick={prevImage}>
                            <ChevronLeft size={48} color="white" />
                        </button>

                        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                            <img
                                src={productImages[activeImage]}
                                alt={`Product View ${activeImage + 1}`}
                                className="lightbox-image"
                            />
                        </div>

                        <button className="lightbox-nav next" onClick={nextImage}>
                            <ChevronRight size={48} color="white" />
                        </button>

                        <div className="lightbox-counter">
                            {activeImage + 1} / {productImages.length}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}