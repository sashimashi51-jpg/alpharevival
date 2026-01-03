---
NI_CHE: ""
PRODUCT_NAME: ""
PRIMARY_COLOR_THEME: ""
SECONDARY_COLOR_THEME: ""
TARGET_AUDIENCE: ""
VALUE_PROPOSITION: ""
---

# Part 2: The .env Template

```env
# ========================================
# PRODUCTION ENVIRONMENT VARIABLES
# ========================================

# STRIPE (PAYMENTS)
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# FRONTEND KEYS
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
VITE_API_URL=http://localhost:4242

# EMAIL CONFIGURATION (TRANSACTIONAL)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password

# CONTACT FORM RECIPIENT
CONTACT_EMAIL=support@yourdomain.com

# SERVER CONFIGURATION
PORT=4242
NODE_ENV=production
```

# Part 3: The Code Skeleton (Product Page)

```jsx
/*
  ========================================
  PRODUCT PAGE SKELETON
  ========================================
  Contains:
  - ProductPage (Main)
  - ProductAccordions
  - StaggerTestimonials
  - TrustBadges
  - ImageLightbox
  - (References to Shared Components: SEO, EbookSection, FaqSection, etc.)
*/

import React, { useState } from 'react';
import { Star, Check, Undo2, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// NOTE: These components (SuccessStories, FaqSection, EbookSection, TrustBadges)
// should be imported from their respective reusable files or the Landing Skeleton.
// For this skeleton file, we will mock the unique ones inline or use placeholders.

// ==========================================
// COMPONENT: ProductAccordions
// ==========================================
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

export function ProductAccordions() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        const scrollY = window.scrollY;
        setOpenIndex(openIndex === index ? -1 : index);
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
        });
    };

    return (
        <div className="product-accordions-section">
            <div className="accordion-container">

                {/* 1. Clinical Studies / Proof */}
                <AccordionItem
                    title="{{ACCORDION_TITLE_1}}"
                    isOpen={openIndex === 0}
                    onClick={() => toggleAccordion(0)}
                >
                    <div className="clinical-studies-content">
                        <h3 className="cs-headline">{{ACCORDION_HEADLINE_1}}</h3>

                        <div className="video-wrapper">
                            <video controls className="cs-video" src="https://placehold.co/1280x720.mp4?text=ClinicalVideo">
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        <blockquote className="cs-quote">
                            "{{QUOTE_TEXT}}"
                            <footer>– {{QUOTE_AUTHOR}}</footer>
                        </blockquote>

                        <div className="cs-text-section">
                            <p className="cs-text">
                                {{ACCORDION_PARA_1}}
                            </p>

                            <ul className="cs-bullets">
                                <li><strong>{{BULLET_BOLD_1}}:</strong> {{BULLET_TEXT_1}}</li>
                                <li><strong>{{BULLET_BOLD_2}}:</strong> {{BULLET_TEXT_2}}</li>
                                <li><strong>{{BULLET_BOLD_3}}:</strong> {{BULLET_TEXT_3}}</li>
                            </ul>
                        </div>

                        <h4 className="cs-subhead">{{SUBHEAD_TEXT}}</h4>

                        <div className="cs-ticks">
                            <div className="tick-row"><Check size={18} className="tick-icon" /> <strong>{{STAT_1}}</strong></div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> <strong>{{STAT_2}}</strong></div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> <strong>{{STAT_3}}</strong></div>
                            <div className="tick-row"><Check size={18} className="tick-icon" /> <strong>{{STAT_4}}</strong></div>
                        </div>
                    </div>
                </AccordionItem>

                {/* 2. Includes */}
                <AccordionItem
                    title="{{ACCORDION_TITLE_2}}"
                    isOpen={openIndex === 1}
                    onClick={() => toggleAccordion(1)}
                >
                    <div className="includes-content">
                        <p>One box includes:</p>
                        <ul className="includes-list">
                            <li>{{INCLUDE_ITEM_1}}</li>
                            <li>{{INCLUDE_ITEM_2}}</li>
                        </ul>
                        <p className="supply-text">{{SUPPLY_TEXT}}</p>
                    </div>
                </AccordionItem>

                {/* 3. How to Use */}
                <AccordionItem
                    title="{{ACCORDION_TITLE_3}}"
                    isOpen={openIndex === 2}
                    onClick={() => toggleAccordion(2)}
                >
                    <div className="how-to-use-content">
                        <ol className="use-steps">
                            <li><strong>1. {{STEP_1}}</strong></li>
                            <li><strong>2. {{STEP_2}}</strong></li>
                            <li><strong>3. {{STEP_3}}</strong></li>
                            <li><strong>4. {{STEP_4}}</strong></li>
                        </ol>
                    </div>
                </AccordionItem>

                {/* 4. Key Ingredients */}
                <AccordionItem
                    title="{{ACCORDION_TITLE_4}}"
                    isOpen={openIndex === 3}
                    onClick={() => toggleAccordion(3)}
                >
                    <div className="ingredients-content">
                        <div className="ingredient-item"><strong>{{INGREDIENT_1}}</strong> – {{INGREDIENT_DESC_1}}</div>
                        <div className="ingredient-item"><strong>{{INGREDIENT_2}}</strong> – {{INGREDIENT_DESC_2}}</div>
                        <div className="ingredient-item"><strong>{{INGREDIENT_3}}</strong> – {{INGREDIENT_DESC_3}}</div>
                    </div>
                </AccordionItem>

            </div>
        </div>
    );
}

// ==========================================
// PAGE: ProductPage
// ==========================================
const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "{{PRODUCT_NAME}}",
    "image": "https://placehold.co/800x800?text=ProductSchema",
    "description": "{{PRODUCT_DESCRIPTION_SCHEMA}}",
    "brand": { "@type": "Brand", "name": "{{PRODUCT_NAME}}" },
    "offers": {
        "@type": "AggregateOffer",
        "url": "https://yourdomain.com/product",
        "priceCurrency": "USD",
        "lowPrice": "54.99",
        "highPrice": "129.99",
        "offerCount": "3",
        "availability": "https://schema.org/InStock"
    }
};

const productImages = [
    'https://placehold.co/800x800?text=View+1',
    'https://placehold.co/800x800?text=View+2',
    'https://placehold.co/800x800?text=View+3',
    'https://placehold.co/800x800?text=View+4',
    'https://placehold.co/800x800?text=View+5'
];

const offers = [
    {
        id: '1-month',
        title: '{{OFFER_1_TITLE}}',
        badge: '{{OFFER_1_BADGE}}',
        price: '{{OFFER_1_PRICE}}',
        pricePerDay: '{{OFFER_1_DAILY}}',
        refPrice: '{{OFFER_1_REF_PRICE}}',
        footer: '{{OFFER_1_FOOTER}}',
        popular: false,
        bestValue: false,
        hasGuarantee: false,
        bonusGuide: false,
        perks: []
    },
    {
        id: '2-month',
        title: '{{OFFER_2_TITLE}}',
        badge: '{{OFFER_2_BADGE}}',
        price: '{{OFFER_2_PRICE}}',
        pricePerDay: '{{OFFER_2_DAILY}}',
        refPrice: '{{OFFER_2_REF_PRICE}}',
        footer: '{{OFFER_2_FOOTER}}',
        popular: true,
        bestValue: false,
        hasGuarantee: false,
        bonusGuide: false,
        perks: [
            { label: 'FREE Shipping', type: 'shipping' },
            { label: 'FREE Gift', type: 'gift' }
        ]
    },
    {
        id: '4-month',
        title: '{{OFFER_3_TITLE}}',
        badge: '{{OFFER_3_BADGE}}',
        price: '{{OFFER_3_PRICE}}',
        pricePerDay: '{{OFFER_3_DAILY}}',
        refPrice: '{{OFFER_3_REF_PRICE}}',
        footer: '{{OFFER_3_FOOTER}}',
        popular: false,
        bestValue: true,
        hasGuarantee: true,
        bonusGuide: false,
        perks: [
            { label: 'FREE Shipping', type: 'shipping' },
            { label: 'FREE Gift', type: 'gift' },
            { label: 'VIP Support', type: 'vip' }
        ]
    }
];

// Mock Cart Hook
const useCart = () => ({ addToCart: (item) => console.log('Added', item) });

export default function ProductPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(1);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxAlt, setLightboxAlt] = useState('');
    const { addToCart } = useCart();
    const [isFading, setIsFading] = useState(false);

    const handleImageClick = (src, alt) => {
        setLightboxImage(src);
        setLightboxAlt(alt);
        setIsLightboxOpen(true);
    };

    const handleOfferChange = (index) => {
        setSelectedOffer(index);
        setActiveImage(0);
    };

    const handleAddToCart = () => {
        const offer = offers[selectedOffer];
        const priceNumber = parseFloat(offer.price.replace('$', ''));
        const refPriceNumber = parseFloat(offer.refPrice.replace('$', ''));

        addToCart({
            id: offer.id,
            title: "{{PRODUCT_NAME}}",
            subtitle: offer.title,
            price: priceNumber,
            originalPrice: refPriceNumber,
            image: productImages[0]
        });
    };

    const changeImage = (newIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setActiveImage(newIndex);
            setIsFading(false);
        }, 300);
    };

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
        <div className="product-page">
            <div className="container product-grid">
                {/* Left Column: Gallery */}
                <div className="product-gallery">
                    <div
                        className="main-image-wrapper"
                        onClick={() => handleImageClick(productImages[activeImage], "{{PRODUCT_NAME}}")}
                        style={{ cursor: 'zoom-in' }}
                    >
                        <img
                            src={productImages[activeImage]}
                            alt="{{PRODUCT_NAME}}"
                            className="main-image"
                            style={{ opacity: isFading ? 0 : 1 }}
                        />

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
                        <h1>{{PRODUCT_NAME}}</h1>
                        <div className="reviews-row">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="black" color="black" />
                                ))}
                            </div>
                            <span className="review-text">{{SOCIAL_PROOF_TEXT}}</span>
                        </div>
                    </div>

                    <div className="guarantee-text">
                        {{CATCHY_ONE_LINER}}
                    </div>
                    <p className="subheadline-text">
                        {{PRODUCT_SUBHEADLINE}}
                    </p>

                    <ul className="checklist">
                        <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>{{BENEFIT_1}}</span></li>
                        <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>{{BENEFIT_2}}</span></li>
                        <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>{{BENEFIT_3}}</span></li>
                        <li><Check size={20} className="check-icon" /><span style={{ fontWeight: '700' }}>{{BENEFIT_4}}</span></li>
                    </ul>

                    <div className="infographic-container" onClick={() => handleImageClick("https://placehold.co/600x400?text=Infographic", "Infographic")} style={{ cursor: 'zoom-in' }}>
                        <img src="https://placehold.co/600x400?text=Infographic" alt="Infographic" className="infographic-image" />
                    </div>

                    <div className="divider-section">
                        <div className="divider-line"></div>
                        <span className="divider-text">{{FREE_SHIPPING_TEXT}}</span>
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
                                    <div className="footer-base-text">{offer.footer}</div>

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
                                            🛡️ {{GUARANTEE_BADGE_TEXT}}
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

                    {/* Trust Badges Mock */}
                    <div className="py-4 border-t border-gray-100 mt-4 flex justify-center gap-4">
                        <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest">[Trust Badges Placeholder]</div>
                    </div>

                    <div className="guarantee-box">
                        <div className="guarantee-header">
                            <Undo2 size={20} color="#1A1A1A" strokeWidth={2} />
                            <span className="guarantee-title">{{GUARANTEE_TITLE}}</span>
                        </div>
                        <p className="guarantee-body">
                            {{GUARANTEE_BODY}}
                        </p>
                        <Link to="/return-refund" className="guarantee-link">More Details</Link>
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
                                <img src="https://placehold.co/100x40?text=Media1" alt="Media" />
                                <img src="https://placehold.co/100x40?text=Media2" alt="Media" />
                                <img src="https://placehold.co/100x40?text=Media3" alt="Media" />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Unique Mechanism Section */}
            <section className="mechanism-section">
                <div className="container">
                    <div className="stories-header">
                        <h2>{{MECHANISM_SECTION_TITLE}}</h2>
                    </div>

                    <div className="mechanism-video-wrapper"
                        onClick={() => handleImageClick("https://placehold.co/800x600.mp4?text=MechVideo", "Mechanism")}
                        style={{
                            textAlign: 'center',
                            margin: '0 auto 3rem',
                            maxWidth: '800px',
                            cursor: 'zoom-in'
                        }}>
                        <video
                            src="https://placehold.co/800x600.mp4?text=MechVideo"
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
                                    <h4>{{PHASE_1_TITLE}}</h4>
                                    <p>{{PHASE_1_DESC}}</p>
                                </div>
                                <div className="step-diagram">
                                    {/* SVG Placeholder */}
                                    <div style={{width:'100%', height:'100px', background:'#eee'}}>SVG 1</div>
                                </div>
                            </div>

                            <div className="step-box">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>{{PHASE_2_TITLE}}</h4>
                                    <p>{{PHASE_2_DESC}}</p>
                                </div>
                                <div className="step-diagram">
                                    <div style={{width:'100%', height:'100px', background:'#eee'}}>SVG 2</div>
                                </div>
                            </div>

                            <div className="step-box">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>{{PHASE_3_TITLE}}</h4>
                                    <p>{{PHASE_3_DESC}}</p>
                                </div>
                                <div className="step-diagram">
                                    <div style={{width:'100%', height:'100px', background:'#eee'}}>SVG 3</div>
                                </div>
                            </div>
                        </div>

                        <div className="mechanism-final-image" onClick={() => handleImageClick("https://placehold.co/800x400?text=Concept", "Concept")} style={{ margin: '3rem 0', cursor: 'zoom-in' }}>
                            <img
                                src="https://placehold.co/800x400?text=Concept"
                                alt="Concept"
                                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <ProductAccordions />

            <div className="mobile-sticky-bar">
                <div className="sticky-info">
                    <span className="sticky-title">{offers[selectedOffer].title}</span>
                    <span className="sticky-price">{offers[selectedOffer].price}</span>
                </div>
                <button className="btn btn-primary compact-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>

            {/* Lightbox (Mock) */}
            {isLightboxOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setIsLightboxOpen(false)}>
                    <img src={lightboxImage} alt={lightboxAlt} className="max-w-full max-h-full" />
                 </div>
            )}
        </div>
    );
}
```
