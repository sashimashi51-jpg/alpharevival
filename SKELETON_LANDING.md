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

# Part 3: The Code Skeleton (Landing Page)

```jsx
/*
  ========================================
  LANDING PAGE SKELETON
  ========================================
  Contains:
  - LandingPage (Main)
  - SalesPopup
  - FlowButton
  - SuccessStories (TestimonialsSection)
  - ShopByConcern (CategoryGridSection)
  - FeaturedProduct
  - EbookSection (LeadMagnet)
  - FaqSection
  - TestimonialsColumns
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Star, ShieldCheck, ArrowRight, Activity, Droplet, Zap,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle, Mail, X, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ==========================================
// COMPONENT: FlowButton
// ==========================================
export function FlowButton({ text = "{{PRIMARY_CTA_LABEL}}", to, type = "button", className = "", ...props }) {
    const content = (
        <>
            <ArrowRight className="flow-icon flow-icon-left" />
            <span className="flow-text">{text}</span>
            <span className="flow-circle"></span>
            <ArrowRight className="flow-icon flow-icon-right" />
        </>
    );

    const classes = `flow-btn ${className}`;

    if (to) {
        return <Link to={to} className={classes} {...props}>{content}</Link>;
    }

    return (
        <button type={type} className={classes} {...props}>
            {content}
        </button>
    );
}

// ==========================================
// COMPONENT: SalesPopup
// ==========================================
const salesData = [
    { name: '{{CUSTOMER_1_NAME}}', location: '{{LOCATION_1}}', time: '2 minutes ago' },
    { name: '{{CUSTOMER_2_NAME}}', location: '{{LOCATION_2}}', time: '5 minutes ago' },
    { name: '{{CUSTOMER_3_NAME}}', location: '{{LOCATION_3}}', time: '12 minutes ago' },
];

export function SalesPopup() {
    const [visible, setVisible] = useState(false);
    const [currentSale, setCurrentSale] = useState(salesData[0]);

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setVisible(true);
        }, 5000);

        const loop = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
                setCurrentSale(randomSale);
                setVisible(true);
            }, 3000);
        }, 15000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(loop);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="sales-popup glass animate-slide-in">
            <div className="popup-icon">
                <CheckCircle size={24} color="#10b981" />
            </div>
            <div className="popup-content">
                <p className="popup-title">Verified Purchase by {currentSale.name}</p>
                <p className="popup-sub">from {currentSale.location}</p>
                <p className="popup-time">{currentSale.time}</p>
            </div>
            <button className="popup-close" onClick={() => setVisible(false)}>×</button>
        </div>
    );
}

// ==========================================
// COMPONENT: TestimonialsSection (SuccessStories)
// ==========================================
const stories = [
    {
        name: "{{CUSTOMER_NAME_1}}",
        details: "{{CUSTOMER_DETAILS_1}}",
        image: "https://placehold.co/800x600?text=Result+1",
        alt: "{{CUSTOMER_ALT_1}}",
        text: "{{TESTIMONIAL_TEXT_1}}"
    },
    {
        name: "{{CUSTOMER_NAME_2}}",
        details: "{{CUSTOMER_DETAILS_2}}",
        image: "https://placehold.co/800x600?text=Result+2",
        alt: "{{CUSTOMER_ALT_2}}",
        text: "{{TESTIMONIAL_TEXT_2}}"
    },
     {
        name: "{{CUSTOMER_NAME_3}}",
        details: "{{CUSTOMER_DETAILS_3}}",
        image: "https://placehold.co/800x600?text=Result+3",
        alt: "{{CUSTOMER_ALT_3}}",
        text: "{{TESTIMONIAL_TEXT_3}}"
    },
    {
        name: "{{CUSTOMER_NAME_4}}",
        details: "{{CUSTOMER_DETAILS_4}}",
        image: "https://placehold.co/800x600?text=Result+4",
        alt: "{{CUSTOMER_ALT_4}}",
        text: "{{TESTIMONIAL_TEXT_4}}"
    }
];

export function TestimonialsSection({ onImageClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);
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
                <h2>{{TESTIMONIALS_HEADLINE}}</h2>
                <p>{{TESTIMONIALS_SUBHEAD}}</p>
            </div>

            <div className="stories-slider-wrapper">
                {currentIndex < maxIndex && (
                    <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Next">
                        <ChevronRight size={24} />
                    </button>
                )}
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
                    {stories.map((story, index) => (
                        <div
                            key={index}
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

// ==========================================
// COMPONENT: TestimonialsColumns
// ==========================================
const testimonialsList = [
    {
        text: "{{TESTIMONIAL_SHORT_1}}",
        image: "https://placehold.co/100x100?text=User1",
        name: "{{USER_1}}",
        role: "{{LOCATION_1}}",
    },
    {
        text: "{{TESTIMONIAL_SHORT_2}}",
        image: "https://placehold.co/100x100?text=User2",
        name: "{{USER_2}}",
        role: "{{LOCATION_2}}",
    },
    {
        text: "{{TESTIMONIAL_SHORT_3}}",
        image: "https://placehold.co/100x100?text=User3",
        name: "{{USER_3}}",
        role: "{{LOCATION_3}}",
    },
];

const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => (
    <div className={`testimonials-column ${className || ""}`}>
        <motion.div
            animate={{
                translateY: "-50%",
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
            }}
            className="testimonials-column-content"
        >
            {[...new Array(2)].fill(0).map((_, index) => (
                <React.Fragment key={index}>
                    {testimonials.map(({ text, image, name, role }, i) => (
                        <div className="testimonial-card-new" key={i}>
                            <div className="testimonial-text">{text}</div>
                            <div className="testimonial-user">
                                <img src={image} alt={name} />
                                <div className="testimonial-info">
                                    <div className="testimonial-name">{name}</div>
                                    <div className="testimonial-role">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
);

export const TestimonialsColumns = () => {
    return (
        <section className="testimonials-section-new">
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="testimonials-header"
                >
                    <div className="testimonials-badge">Results</div>
                    <h2 className="testimonials-title">
                        {{REAL_RESULTS_HEADLINE}}
                    </h2>
                    <p className="testimonials-subtitle">
                        {{REAL_RESULTS_SUBHEAD}}
                    </p>
                </motion.div>

                <div className="testimonials-columns-wrapper">
                    <TestimonialsColumn testimonials={testimonialsList} duration={15} />
                    <TestimonialsColumn testimonials={testimonialsList} className="hidden-mobile" duration={19} />
                    <TestimonialsColumn testimonials={testimonialsList} className="hidden-tablet" duration={17} />
                </div>
            </div>
        </section>
    );
};


// ==========================================
// COMPONENT: FaqSection
// ==========================================
const FaqItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className={`faq-item-new ${isOpen ? "open" : ""}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="faq-trigger"
                aria-expanded={isOpen}
            >
                <span className="faq-question-text">{question}</span>
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="faq-icon-wrapper"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" },
                        }}
                    >
                        <div className="faq-content">
                            <motion.p
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                className="faq-answer-text"
                            >
                                {answer}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const FaqSection = ({ title, description, items, contactInfo, className = "" }) => {
    return (
        <section className={`faq-section-new ${className}`}>
            <div className="faq-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="faq-header"
                >
                    <h2 className="faq-title">{title}</h2>
                    {description && (
                        <p className="faq-description">{description}</p>
                    )}
                </motion.div>

                <div className="faq-list-new">
                    {items.map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            index={index}
                        />
                    ))}
                </div>

                {contactInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="faq-contact-card"
                    >
                        <div className="faq-contact-icon">
                            <Mail size={16} />
                        </div>
                        <p className="faq-contact-title">{contactInfo.title}</p>
                        <p className="faq-contact-desc">{contactInfo.description}</p>
                        <FlowButton
                            text={contactInfo.buttonText}
                            onClick={contactInfo.onContact}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

// ==========================================
// COMPONENT: FeaturedProduct
// ==========================================
const productImages = [
    "https://placehold.co/800x800?text=Prod1",
    "https://placehold.co/800x800?text=Prod2",
    "https://placehold.co/800x800?text=Prod3",
    "https://placehold.co/800x800?text=Prod4"
];

export function FeaturedProduct() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(null);

    const nextImage = () => setCurrentIndex(prev => (prev + 1) % productImages.length);
    const prevImage = () => setCurrentIndex(prev => (prev - 1 + productImages.length) % productImages.length);
    const goToIndex = (idx) => setCurrentIndex(idx);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchEnd = (e) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) nextImage();
        if (touchStart - touchEnd < -50) prevImage();
        setTouchStart(null);
    };

    return (
        <section className="featured-product-section" id="featured-product">
            <div className="container">
                <div className="featured-product-header">
                    <h2>{{FEATURED_PRODUCT_HEADLINE}}</h2>
                </div>

                <div className="featured-product-container">
                    {/* Gallery */}
                    <div className="product-gallery-wrapper">
                        <div
                            className="product-gallery"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="product-gallery-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {productImages.map((src, idx) => (
                                    <img key={idx} src={src} alt={`Product View ${idx + 1}`} className="product-image-slide" />
                                ))}
                            </div>
                            <button className="zoom-button" onClick={() => setIsZoomed(true)} aria-label="Zoom Image">
                                <Search size={20} />
                            </button>
                        </div>

                        <div className="gallery-navigation">
                            <button className="nav-arrow" onClick={prevImage} aria-label="Previous">
                                <ChevronLeft size={32} />
                            </button>
                            <div className="nav-dots">
                                {productImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`nav-dot ${idx === currentIndex ? 'active' : ''}`}
                                        onClick={() => goToIndex(idx)}
                                    />
                                ))}
                            </div>
                            <button className="nav-arrow" onClick={nextImage} aria-label="Next">
                                <ChevronRight size={32} />
                            </button>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="product-details">
                        <h3 className="product-title">{{PRODUCT_NAME}}</h3>
                        <div className="product-reviews">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#000000" stroke="none" />)}
                            </div>
                            <span className="review-text">{{SOCIAL_PROOF_TEXT}}</span>
                        </div>
                        <div className="shop-button-container">
                            <Link to="/product" className="shop-now-btn">{{PRIMARY_CTA_LABEL}}</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {isZoomed && (
                <div className="lightbox-modal" onClick={() => setIsZoomed(false)}>
                    <img src={productImages[currentIndex]} alt="Zoomed Product" className="lightbox-image" />
                    <button className="zoom-close-btn" style={{ position: 'absolute', top: '2rem', right: '2rem', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <X size={40} />
                    </button>
                </div>
            )}
        </section>
    );
}

// ==========================================
// COMPONENT: CategoryGridSection (ShopByConcern)
// ==========================================
const concerns = [
  {
    title: "{{CATEGORY_1_TITLE}}",
    image: "https://placehold.co/600x600?text=Cat1",
    link: "/product",
    id: "cat1"
  },
  {
    title: "{{CATEGORY_2_TITLE}}",
    image: "https://placehold.co/600x600?text=Cat2",
    link: "/product",
    id: "cat2"
  }
];

export function CategoryGridSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {{CATEGORY_HEADLINE}}
          </h2>
          <p className="text-lg text-gray-600">
            {{CATEGORY_SUBHEAD}}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
          {concerns.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-row rounded-2xl bg-gradient-to-r from-[#EDF2F6] via-[#E9EFF2] to-[#D1DBE3] overflow-hidden h-[180px] transition-all hover:shadow-xl no-underline w-full"
              style={{ overflow: 'hidden' }}
            >
              <div className="w-[40%] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
              </div>

              <div className="w-[60%] p-5 flex flex-col justify-center items-start">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 leading-snug">
                  {item.title}
                </h3>
                <div className="bg-gradient-to-r from-white to-gray-50 text-black px-6 py-2.5 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-110 hover:-translate-y-1 border border-gray-200 cursor-pointer">
                  {{PRIMARY_CTA_LABEL}}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENT: LeadMagnetSection (EbookSection)
// ==========================================
export function LeadMagnetSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API
        setTimeout(() => {
             setIsSuccess(true);
             setEmail('');
             setIsSubmitting(false);
        }, 1000);
    };

    return (
        <section className="ebook-section">
            <div className="ebook-container">
                <div className="ebook-grid">
                    <div className="ebook-image-wrapper">
                        <img
                            src="https://placehold.co/400x600?text=LeadMagnet"
                            alt="Lead Magnet"
                            className="ebook-image"
                        />
                    </div>

                    <div className="ebook-content">
                        <h2 className="ebook-title">
                            {{LEAD_MAGNET_TITLE}}
                        </h2>
                        <p className="ebook-subtitle">
                            {{LEAD_MAGNET_SUBTITLE}}
                        </p>

                        <ul className="ebook-benefits">
                            <li>✓ {{BENEFIT_1}}</li>
                            <li>✓ {{BENEFIT_2}}</li>
                            <li>✓ {{BENEFIT_3}}</li>
                            <li>✓ {{BENEFIT_4}}</li>
                            <li>✓ {{BENEFIT_5}}</li>
                        </ul>

                        {!isSuccess ? (
                            <>
                                <form onSubmit={handleSubmit} className="ebook-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                        className="ebook-input"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="ebook-button"
                                    >
                                        {isSubmitting ? 'Sending...' : '{{DOWNLOAD_BUTTON_TEXT}}'}
                                    </button>
                                </form>

                                <p className="ebook-privacy">
                                    🔒 We respect your privacy. Unsubscribe anytime.
                                </p>
                            </>
                        ) : (
                            <div className="success-message">
                                ✓ Success! Check your inbox for the guide.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// PAGE: LandingPage
// ==========================================
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function LandingPage() {
    const [timeLeft, setTimeLeft] = React.useState({ hours: 0, minutes: 0, seconds: 0 });
    const [showStickyButton, setShowStickyButton] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setShowStickyButton(scrollPosition > 800);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Countdown Timer Loop (48h placeholder logic)
    React.useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
             const h = 47 - (now.getHours() % 48);
             const m = 59 - now.getMinutes();
             const s = 59 - now.getSeconds();
            setTimeLeft({ hours: h, minutes: m, seconds: s });
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const faqItems = [
        { question: "{{FAQ_Q1}}", answer: "{{FAQ_A1}}" },
        { question: "{{FAQ_Q2}}", answer: "{{FAQ_A2}}" },
        { question: "{{FAQ_Q3}}", answer: "{{FAQ_A3}}" },
        { question: "{{FAQ_Q4}}", answer: "{{FAQ_A4}}" },
        { question: "{{FAQ_Q5}}", answer: "{{FAQ_A5}}" },
        { question: "{{FAQ_Q6}}", answer: "{{FAQ_A6}}" },
        { question: "{{FAQ_Q7}}", answer: "{{FAQ_A7}}" }
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
                        <div className="hero-social-proof" style={{ marginBottom: '1rem' }}>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="#f59e0b" color="#f59e0b" size={18} />)}
                            </div>
                            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{{SOCIAL_PROOF_TEXT}}</span>
                        </div>

                        <div className="badge">{{BADGE_TEXT}}</div>
                        <h1 style={{ color: '#000000' }}>{{HERO_HEADLINE}}</h1>
                        <p className="hero-sub">{{HERO_SUBHEAD}}</p>
                        <div className="hero-cta-group">
                            <div className="scarcity-bar-container">
                                <p className="scarcity-text" style={{ color: '#dc2626', fontWeight: '800' }}>
                                    <span className="blink-red"></span> {{SCARCITY_TEXT}}
                                </p>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '96%', background: '#dc2626' }}></div></div>
                            </div>
                            <Link
                                to="/product"
                                style={{
                                    display: 'inline-block',
                                    width: '100%',
                                    maxWidth: '400px',
                                    background: 'linear-gradient(to right, {{SECONDARY_COLOR_THEME}}, #15803d)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: '700',
                                    fontSize: '1.125rem',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer'
                                }}
                            >
                                {{PRIMARY_CTA_LABEL}}
                            </Link>
                            <div className="guarantee-text">
                                <ShieldCheck size={16} /> {{GUARANTEE_TEXT}}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <video
                            src="https://placehold.co/600x600.mp4?text=HeroVideo"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
                            alt="Hero Video"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Solution Section */}
            <section className="solution-section">
                <div className="container solution-container">
                    <h4 className="solution-title">{{SOLUTION_HEADLINE}}</h4>
                    <p className="solution-text">
                        <strong>{{PRODUCT_NAME}}</strong> {{SOLUTION_PARA_1}}
                    </p>
                    <p className="solution-text">
                        <strong>{{PRODUCT_NAME}}</strong> {{SOLUTION_PARA_2}}
                    </p>
                </div>
            </section>

            {/* View Clinical Study CTA Section */}
            <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <Link
                        to="/clinical-study"
                        style={{
                            display: 'inline-block',
                            width: '100%',
                            maxWidth: '600px',
                            background: 'transparent',
                            color: '#000',
                            padding: '1.25rem 3rem',
                            borderRadius: '0.75rem',
                            fontWeight: '700',
                            fontSize: '1.25rem',
                            textAlign: 'center',
                            textDecoration: 'none',
                            border: '2px solid #000',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        {{SECONDARY_CTA_LABEL}}
                    </Link>
                </div>
            </section>

            {/* Shop By Concern Section */}
            <CategoryGridSection />

            {/* Social Proof / Trusted By - Infinite Carousel */}
            <section className="proof-bar">
                <p className="text-center proof-bar-title">As seen in</p>
                <div className="logo-carousel">
                    <div className="logo-track">
                        <img src="https://placehold.co/100x40?text=Logo1" alt="Media" />
                        <img src="https://placehold.co/100x40?text=Logo2" alt="Media" />
                        <img src="https://placehold.co/100x40?text=Logo3" alt="Media" />
                        <img src="https://placehold.co/100x40?text=Logo4" alt="Media" />
                        {/* Duplicates */}
                        <img src="https://placehold.co/100x40?text=Logo1" alt="Media" />
                        <img src="https://placehold.co/100x40?text=Logo2" alt="Media" />
                        <img src="https://placehold.co/100x40?text=Logo3" alt="Media" />
                        <img src="https://placehold.co/100x40?text=Logo4" alt="Media" />
                    </div>
                </div>
            </section>

            {/* Large Banner Section - Text Overlay with Original Aspect Ratio */}
            <section className="risk-free-banner">
                <img src="https://placehold.co/1200x400?text=RiskFreeBanner" alt="Risk Free Banner" className="banner-bg" />
                <div className="risk-free-overlay">
                    <div className="risk-free-content">
                        <p className="risk-free-text">
                            {{RISK_FREE_TEXT}}
                        </p>
                        <h3 className="risk-free-title">
                            {{RISK_FREE_HEADLINE_1}}
                            <br />
                            <span style={{ display: 'block', marginTop: '0.5rem' }}>{{RISK_FREE_HEADLINE_2}}</span>
                        </h3>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="trusted-by-section">
                <div className="container">
                    <h4>{{TRUSTED_BY_TEXT}}</h4>
                </div>
            </section>

            {/* Mechanism / Big Idea */}
            <section className="section bg-secondary" id="how-it-works">
                <div className="container text-center">
                    <h2 className="section-title">{{MECHANISM_HEADLINE}}</h2>
                    <p className="section-subtitle">{{MECHANISM_SUBHEAD}}</p>

                    <div className="grid-3 features">
                        <div className="feature-card">
                            <div className="icon-box"><Activity size={32} /></div>
                            <h3>{{PHASE_1_TITLE}}</h3>
                            <p>{{PHASE_1_DESC}}</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><Droplet size={32} /></div>
                            <h3>{{PHASE_2_TITLE}}</h3>
                            <p>{{PHASE_2_DESC}}</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-box"><Zap size={32} /></div>
                            <h3>{{PHASE_3_TITLE}}</h3>
                            <p>{{PHASE_3_DESC}}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Slider */}
            <TestimonialsSection />

            {/* Full Width Video Loop */}
            <section className="video-section" style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
                <video
                    src="https://placehold.co/1280x720.mp4?text=Mechanism"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    title="Mechanism Video"
                />
            </section>

            {/* Testimonials Section (New Animated) */}
            <TestimonialsColumns />

            {/* Lead Magnet - Ebook Section */}
            <LeadMagnetSection />

            {/* Featured Product Section */}
            <FeaturedProduct />

            {/* FAQs (New Animated) */}
            <FaqSection
                title="{{FAQ_HEADLINE}}"
                description="{{FAQ_SUBHEAD}}"
                items={faqItems}
                contactInfo={{
                    title: "Still have questions?",
                    description: "Our experts are here to help.",
                    buttonText: "Contact Support",
                    onContact: () => window.location.href = "/contact"
                }}
            />

            <SalesPopup />
            <div className="mobile-sticky-bar" data-visible={showStickyButton}>
                <FlowButton to="/product" text="{{PRIMARY_CTA_LABEL}}" className="w-full" />
            </div>
        </div>
    );
}
```
