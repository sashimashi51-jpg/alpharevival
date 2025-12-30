import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FeaturedProduct.css';

const images = [
    "/assets/product_photos_final/first_photo.png",
    "/assets/product_photos_final/second_photo.png",
    "/assets/product_photos_final/third_photo.png",
    "/assets/product_photos_final/fourth_photo.png",
    "/assets/product_photos_final/fifth_photo.png",
    "/assets/product_photos_final/sixth_photo.png"
];

export default function FeaturedProduct() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(null);

    const nextImage = () => setCurrentIndex(prev => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
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
                    <h2>BEST SELLER – REAL RESULTS FOR THICKER, HEALTHIER HAIR</h2>
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
                                {images.map((src, idx) => (
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
                                {images.map((_, idx) => (
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
                        <h3 className="product-title">AlphaRevive™ Hair Regrowth System</h3>
                        <div className="product-reviews">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#000000" stroke="none" />)}
                            </div>
                            <span className="review-text">251 reviews | 69 questions</span>
                        </div>
                        <div className="shop-button-container">
                            <Link to="/product" className="shop-now-btn">SHOP NOW</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {isZoomed && (
                <div className="lightbox-modal" onClick={() => setIsZoomed(false)}>
                    <img src={images[currentIndex]} alt="Zoomed Product" className="lightbox-image" />
                    <button className="zoom-close-btn" style={{ position: 'absolute', top: '2rem', right: '2rem', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <X size={40} />
                    </button>
                </div>
            )}
        </section>
    );
}
