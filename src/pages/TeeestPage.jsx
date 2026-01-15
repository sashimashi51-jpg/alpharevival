import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User, Play, Instagram, Facebook, Twitter, Youtube, ChevronDown } from 'lucide-react';
import './TeeestPage.css';

// Placeholder logo component text representations
const LogoVogue = () => <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: '400' }}>VOGUE</span>;
const LogoElite = () => <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: '400' }}>ELITE</span>;
const LogoAllure = () => <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: '400' }}>ALLURE</span>;
const LogoHarp = () => <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: '400' }}>HARPER'S</span>;
const LogoMarie = () => <span style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: '400' }}>MARIE CLAIRE</span>;

const categories = [
    { id: 1, title: 'Best Sellers', image: '/assets/teeest/category1.png' },
    { id: 2, title: 'LED Devices', image: '/assets/teeest/category2.png' },
    { id: 3, title: 'Moisturizers', image: '/assets/teeest/category3.png' },
    { id: 4, title: 'Serums', image: '/assets/teeest/category1.png' },
    { id: 5, title: 'Gift Sets', image: '/assets/teeest/category2.png' },
    { id: 6, title: 'New Arrivals', image: '/assets/teeest/category3.png' },
];

const advisors = [
    { id: 1, name: 'Dr. Sarah Mitchell', title: 'Board Certified Dermatologist', image: '/assets/teeest/advisor.png' },
    { id: 2, name: 'Dr. James Chen', title: 'Cosmetic Surgeon', image: '/assets/teeest/advisor.png' },
    { id: 3, name: 'Dr. Emily Russo', title: 'Anti-Aging Specialist', image: '/assets/teeest/advisor.png' },
    { id: 4, name: 'Dr. Michael Torres', title: 'Skin Research Director', image: '/assets/teeest/advisor.png' },
];

export default function TeeestPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="teeest-page">
            {/* Announcement Bar */}
            <div className="teeest-announcement-bar">
                ✨ NEW YEAR SALE: 25% OFF SITEWIDE
                <a href="#">Shop Now →</a>
            </div>

            {/* Header / Navbar */}
            <header className="teeest-header">
                <div className="teeest-header-left">
                    <button
                        className="teeest-hamburger"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <nav className="teeest-header-nav">
                        <a href="#">Shop All</a>
                        <a href="#">Devices</a>
                        <a href="#">Skincare</a>
                    </nav>
                </div>

                <a href="#" className="teeest-logo">QURE</a>

                <div className="teeest-header-right">
                    <nav className="teeest-header-nav">
                        <a href="#">Science</a>
                        <a href="#">Results</a>
                        <a href="#">About</a>
                    </nav>
                    <div className="teeest-header-icons">
                        <button className="teeest-header-icon" aria-label="Search">
                            <Search size={20} />
                        </button>
                        <button className="teeest-header-icon" aria-label="Account">
                            <User size={20} />
                        </button>
                        <button className="teeest-header-icon" aria-label="Cart">
                            <ShoppingBag size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="teeest-hero">
                <div className="teeest-hero-content">
                    <span className="teeest-hero-label">Science-Backed Skincare</span>
                    <h1 className="teeest-hero-title">
                        Transform Your Skin<br />
                        With Clinical Results
                    </h1>
                    <p className="teeest-hero-subtitle">
                        Experience the power of medical-grade LED technology
                        and clinically-proven formulas for visibly younger,
                        healthier skin.
                    </p>
                    <a href="#" className="teeest-btn teeest-btn-primary">
                        Shop Best Sellers
                    </a>
                </div>
                <div className="teeest-hero-image-wrapper">
                    <img
                        src="/assets/teeest/hero.png"
                        alt="Woman with glowing skin holding skincare product"
                        className="teeest-hero-image"
                    />
                </div>
            </section>

            {/* Product Categories */}
            <section className="teeest-categories">
                <div className="teeest-container">
                    <div className="teeest-categories-grid">
                        {categories.map(category => (
                            <a key={category.id} href="#" className="teeest-category-card">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="teeest-category-image"
                                />
                                <div className="teeest-category-title">{category.title}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured In Section */}
            <section className="teeest-featured-in">
                <div className="teeest-container">
                    <div className="teeest-featured-title">As Seen In</div>
                    <div className="teeest-logos">
                        <div className="teeest-logo-img"><LogoVogue /></div>
                        <div className="teeest-logo-img"><LogoElite /></div>
                        <div className="teeest-logo-img"><LogoAllure /></div>
                        <div className="teeest-logo-img"><LogoHarp /></div>
                        <div className="teeest-logo-img"><LogoMarie /></div>
                    </div>
                </div>
            </section>

            {/* Before/After Results Section */}
            <section className="teeest-results">
                <div className="teeest-container">
                    <div className="teeest-section-header">
                        <div className="teeest-section-label">Real Results</div>
                        <h2 className="teeest-section-title">
                            See the Transformation
                        </h2>
                    </div>
                    <div className="teeest-results-grid">
                        <div className="teeest-result-card">
                            <img
                                src="/assets/teeest/before_after.png"
                                alt="Before and after results"
                                className="teeest-result-image"
                            />
                        </div>
                        <div className="teeest-result-card">
                            <img
                                src="/assets/teeest/before_after.png"
                                alt="Before and after results"
                                className="teeest-result-image"
                            />
                        </div>
                        <div className="teeest-result-card">
                            <img
                                src="/assets/teeest/before_after.png"
                                alt="Before and after results"
                                className="teeest-result-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Board of Advisors */}
            <section className="teeest-advisors">
                <div className="teeest-container">
                    <div className="teeest-section-header">
                        <div className="teeest-section-label">Our Experts</div>
                        <h2 className="teeest-section-title">
                            Board of Advisors
                        </h2>
                    </div>
                    <div className="teeest-advisors-grid">
                        {advisors.map(advisor => (
                            <div key={advisor.id} className="teeest-advisor-card">
                                <img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    className="teeest-advisor-image"
                                />
                                <h3 className="teeest-advisor-name">{advisor.name}</h3>
                                <p className="teeest-advisor-title">{advisor.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Testimonials */}
            <section className="teeest-testimonials">
                <div className="teeest-container">
                    <div className="teeest-section-header">
                        <div className="teeest-section-label">Social Proof</div>
                        <h2 className="teeest-section-title">
                            What Our Customers Say
                        </h2>
                    </div>
                    <div className="teeest-testimonials-grid">
                        <div className="teeest-testimonial-card">
                            <span className="teeest-testimonial-placeholder">
                                <Play size={48} />
                            </span>
                        </div>
                        <div className="teeest-testimonial-card">
                            <span className="teeest-testimonial-placeholder">
                                <Play size={48} />
                            </span>
                        </div>
                        <div className="teeest-testimonial-card">
                            <span className="teeest-testimonial-placeholder">
                                <Play size={48} />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="teeest-footer">
                <div className="teeest-container">
                    <div className="teeest-footer-grid">
                        <div className="teeest-footer-brand">
                            <h3>QURE</h3>
                            <p>
                                Science-backed skincare delivering real,
                                visible results. Trusted by dermatologists
                                and loved by thousands.
                            </p>
                            <form className="teeest-newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="teeest-newsletter-input"
                                />
                                <button type="submit" className="teeest-btn teeest-btn-primary">
                                    Subscribe
                                </button>
                            </form>
                        </div>

                        <div className="teeest-footer-column">
                            <h4>Shop <ChevronDown size={16} /></h4>
                            <ul>
                                <li><a href="#">All Products</a></li>
                                <li><a href="#">LED Devices</a></li>
                                <li><a href="#">Skincare</a></li>
                                <li><a href="#">Gift Sets</a></li>
                            </ul>
                        </div>

                        <div className="teeest-footer-column">
                            <h4>Learn <ChevronDown size={16} /></h4>
                            <ul>
                                <li><a href="#">The Science</a></li>
                                <li><a href="#">Clinical Studies</a></li>
                                <li><a href="#">How To Use</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>

                        <div className="teeest-footer-column">
                            <h4>Support <ChevronDown size={16} /></h4>
                            <ul>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Returns</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="teeest-footer-bottom">
                        <span>© 2026 QURE Skincare. All rights reserved.</span>
                        <div className="teeest-social-links">
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
