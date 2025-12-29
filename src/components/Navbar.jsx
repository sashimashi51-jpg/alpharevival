import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import LocationBlob from './LocationBlob';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset mobile info dropdown when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setMobileInfoOpen(false);
    }
  }, [isOpen]);

  const infoLinks = [
    { label: 'Return and Refund policy', to: '/return-refund' },
    { label: 'Shipping Policy', to: '/shipping' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Track my Order', to: '/track' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled shadow-md' : 'shadow-sm'} sticky top-0 left-0 w-full h-20 z-[1000] bg-white/95 backdrop-blur-md flex items-center transition-all duration-300`}>
      <div className="container mx-auto px-6 flex items-center justify-between max-w-[1440px]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          onClick={(e) => {
            setIsOpen(false);
            // If already on homepage, scroll to top
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img src="/assets/logo_alpharevive.png" alt="AlphaRevive" className="h-10 md:h-12 w-auto mt-2" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/product" className="relative py-2 text-slate-700 hover:text-orange-600 transition-colors group">
            Product
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/results" className="relative py-2 text-slate-700 hover:text-orange-600 transition-colors group">
            Results
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="relative py-2 text-slate-700 hover:text-orange-600 transition-colors group">
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/journal" className="relative py-2 text-slate-700 hover:text-orange-600 transition-colors group">
            Journal
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Information Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className="flex items-center gap-1 py-2 text-slate-700 hover:text-orange-600 transition-colors group cursor-pointer"
            >
              Information
              <ChevronDown size={16} className={`transition-transform duration-200 ${infoOpen ? 'rotate-180' : ''}`} />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <AnimatePresence>
              {infoOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 rounded-xl shadow-2xl py-3 overflow-hidden z-[1100]"
                >
                  {infoLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.to}
                      className="block px-6 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-all border-b border-slate-50 last:border-0"
                      onClick={() => setInfoOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-6">
          <LocationBlob />


          {/* Cart Button */}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all group cursor-pointer"
          >
            <ShoppingCart size={24} strokeWidth={2} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full border-2 border-white px-1 shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden z-[999] border-t border-slate-100 overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-2 pb-24">
              <Link
                to="/product"
                className="flex items-center justify-between text-xl font-semibold text-slate-800 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Product
              </Link>
              <Link
                to="/results"
                className="flex items-center justify-between text-xl font-semibold text-slate-800 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Results
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-between text-xl font-semibold text-slate-800 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/journal"
                className="flex items-center justify-between text-xl font-semibold text-slate-800 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Journal
              </Link>

              {/* Collapsible Information Section */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                  className="flex items-center justify-between text-xl font-semibold text-slate-800 p-4 rounded-2xl hover:bg-slate-50 transition-colors w-full text-left"
                >
                  <span>Information</span>
                  <ChevronDown
                    size={22}
                    className={`text-slate-400 transition-transform duration-300 ${mobileInfoOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileInfoOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-slate-50/50 rounded-2xl mt-1 mx-2"
                    >
                      <div className="flex flex-col py-2 px-1">
                        {infoLinks.map((link, idx) => (
                          <Link
                            key={idx}
                            to={link.to}
                            className="text-lg text-slate-600 p-4 rounded-xl hover:text-orange-600 transition-colors flex items-center gap-3 border-b border-white last:border-0"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-600"></span>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
