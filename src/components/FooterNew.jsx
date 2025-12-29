import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import "./FooterNew.css";

export default function FooterNew() {
    const [isDarkMode, setIsDarkMode] = useState(false); // Default to light for AlphaRevival theme matching initially

    useEffect(() => {
        // Check system preference or persisted state if needed
        // For now, simple toggle
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <footer className="footer-new">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Column 1: Newsletter */}
                    <div className="footer-col-newsletter">
                        <h2 className="footer-heading">Stay Connected</h2>
                        <p className="footer-text-muted">
                            Join our newsletter for the latest updates and exclusive offers.
                        </p>
                        <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="footer-input"
                            />
                            <button type="submit" className="footer-submit-btn" aria-label="Subscribe">
                                <Send className="h-4 w-4" size={16} />
                            </button>
                        </form>
                        <div className="footer-glow" />
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="footer-subheading">Quick Links</h3>
                        <nav className="footer-nav">
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/product" className="footer-link">Products</Link>
                            <Link to="/contact" className="footer-link">Contact</Link>
                            <Link to="/track" className="footer-link">Track Order</Link>
                        </nav>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div>
                        <h3 className="footer-subheading">Contact Us</h3>
                        <address className="footer-address">
                            <p>AlphaRevive HQ</p>
                            <p>452 Saratoga Ave #103, San Jose, CA, United States, California</p>
                            <p>Phone-support: +359883987033</p>
                            <p>Email-us: support@alpharevive.shop</p>
                        </address>
                    </div>

                    {/* Column 4: Follow Us & Theme */}
                    <div className="footer-col-follow">
                        <h3 className="footer-subheading">Follow Us</h3>
                        <div className="footer-social-row">
                            <button className="footer-icon-btn" title="Facebook">
                                <Facebook size={16} />
                            </button>
                            <button className="footer-icon-btn" title="Instagram">
                                <Instagram size={16} />
                            </button>
                        </div>

                        <div className="footer-toggle-row">
                            <Sun size={16} />
                            <button
                                className="switch-root"
                                data-state={isDarkMode ? "checked" : "unchecked"}
                                onClick={toggleTheme}
                                aria-label="Toggle dark mode"
                            >
                                <span className="switch-thumb" />
                            </button>
                            <Moon size={16} />
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-text-muted">
                        © {new Date().getFullYear()} AlphaRevive. All rights reserved.
                    </p>
                    <nav className="footer-bottom-nav">
                        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                        <Link to="/terms" className="footer-link">Terms of Service</Link>
                        <Link to="/shipping" className="footer-link">Shipping & Returns</Link>
                        <Link to="/return-refund" className="footer-link">Return and Refund Policy</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
