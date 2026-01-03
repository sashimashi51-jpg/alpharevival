import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer section">
            <div className="container footer-content">
                <div className="footer-brand">
                    <img src="/assets/logo_alpharevive.webp" alt="AlphaRevive" className="footer-logo" />
                    <p>© 2025 AlphaRevive. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <h4>Support</h4>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/shipping">Shipping & Returns</Link>
                    <Link to="/track">Track Order</Link>
                </div>
                <div className="footer-links">
                    <h4>Legal</h4>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
                <div className="footer-social">
                    {/* Add social icons if needed */}
                </div>
            </div>
        </footer>
    );
}
