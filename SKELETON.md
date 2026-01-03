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

# Part 3: The Code Skeleton

```jsx
/*
  ========================================
  MASTER SKELETON (REACT + TAILWIND)
  ========================================
  DEPENDENCIES:
  - react, react-dom, react-router-dom
  - framer-motion
  - lucide-react
  - tailwindcss
*/

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ShoppingCart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Check, Star, ShieldCheck, ArrowRight, Activity, Droplet, Zap,
  Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter, Mail, Search
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  PRODUCT_NAME: "{{PRODUCT_NAME}}",
  CONTACT_EMAIL: "{{CONTACT_EMAIL}}",
  COMPANY_ADDRESS: "{{COMPANY_ADDRESS}}"
};

// --- STYLES INJECTION (SIMULATED) ---
// Ideally, these are in index.css, but included here for the Skeleton reference
const STYLES = `
  /* Global Resets */
  :root {
    --color-brand-primary: {{PRIMARY_COLOR_THEME}};
    --color-brand-secondary: {{SECONDARY_COLOR_THEME}};
    --radius-lg: 0.75rem;
    --radius-md: 0.5rem;
  }
  body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
  .btn-primary { background: var(--color-brand-primary); color: white; padding: 1rem 2rem; border-radius: var(--radius-lg); font-weight: 700; transition: all 0.2s; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
`;

// --- MOCK CONTEXT ---
const CartContext = React.createContext({ cartCount: 0, setIsCartOpen: () => {} });
const useCart = () => React.useContext(CartContext);

// --- SUB-COMPONENTS ---

/* 1. TOP TIMER BANNER */
const BannerTimer = ({ hours = 48 }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        // Simple 48h loop logic
        const calculateTime = () => {
            const now = new Date();
            const h = 47 - (now.getHours() % 48);
            const m = 59 - now.getMinutes();
            const s = 59 - now.getSeconds();
            setTimeLeft({ hours: h, minutes: m, seconds: s });
        };
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <span className="font-mono font-bold">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
    );
};

const TimerBanner = () => (
    <div className="bg-black text-white py-2 text-center text-sm font-bold tracking-wide">
        <span className="mr-2">⚡</span>
        LIMITED TIME OFFER ENDS IN: <BannerTimer />
    </div>
);

/* 2. NAVBAR */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
            <div className="container flex justify-between items-center">
                <Link to="/" className="text-2xl font-black tracking-tighter">{{PRODUCT_NAME}}</Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    <Link to="/product" className="hover:text-red-600 transition">Product</Link>
                    <Link to="/results" className="hover:text-red-600 transition">Results</Link>
                    <Link to="/contact" className="hover:text-red-600 transition">Contact</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>}
                    </button>
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="absolute top-full w-full bg-white border-b overflow-hidden md:hidden">
                        <div className="flex flex-col p-4 gap-4 font-semibold">
                            <Link to="/product" onClick={() => setIsOpen(false)}>Product</Link>
                            <Link to="/results" onClick={() => setIsOpen(false)}>Results</Link>
                            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

/* 3. FOOTER */
const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
                <p className="text-gray-400 text-sm mb-4">Join our newsletter for updates.</p>
                <div className="flex gap-2">
                    <input type="email" placeholder="Email" className="bg-gray-800 border-none rounded px-3 py-2 text-sm w-full" />
                    <button className="bg-white text-black p-2 rounded hover:bg-gray-200"><Send size={16} /></button>
                </div>
            </div>
            <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <nav className="flex flex-col gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <Link to="/product" className="hover:text-white">Products</Link>
                    <Link to="/track" className="hover:text-white">Track Order</Link>
                </nav>
            </div>
            <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <p className="text-sm text-gray-400">{{COMPANY_ADDRESS}}</p>
                <p className="text-sm text-gray-400 mt-2">{{CONTACT_EMAIL}}</p>
            </div>
            <div>
                <h3 className="font-bold mb-4">Social</h3>
                <div className="flex gap-4">
                    <Facebook size={20} className="hover:text-blue-500 cursor-pointer" />
                    <Instagram size={20} className="hover:text-pink-500 cursor-pointer" />
                </div>
            </div>
        </div>
    </footer>
);

// --- SECTIONS ---

const CategoryGridSection = () => (
    <section className="py-16 bg-white">
        <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">{{SHOP_BY_CONCERN_HEADLINE}}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {['{{CATEGORY_1}}', '{{CATEGORY_2}}'].map((cat, i) => (
                    <Link to="/product" key={i} className="group relative h-48 rounded-2xl overflow-hidden bg-gray-100 flex items-center hover:shadow-xl transition">
                        <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center text-gray-400">IMG</div>
                        <div className="w-1/2 p-6">
                            <h3 className="font-bold text-lg mb-2">{cat}</h3>
                            <span className="text-sm font-semibold underline decoration-2 decoration-red-500">Shop Now</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
);

const TestimonialsSection = () => (
    <section className="py-20 bg-gray-50">
        <div className="container text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-2">{{TESTIMONIALS_HEADLINE}}</h2>
            <p className="text-gray-600">{{TESTIMONIALS_SUBHEAD}}</p>
        </div>
        <div className="container overflow-x-auto flex gap-6 pb-8 snap-x">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[300px] bg-white p-6 rounded-xl shadow-sm border border-gray-100 snap-center">
                    <div className="flex text-yellow-400 mb-4"><Star fill="currentColor" size={16} /></div>
                    <p className="text-sm text-gray-700 italic mb-4">"{{TESTIMONIAL_TEXT_LOREM}}"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="text-left">
                            <div className="font-bold text-sm">{{CUSTOMER_NAME}}</div>
                            <div className="text-xs text-gray-500">Verified Buyer</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        { q: "{{FAQ_QUESTION_1}}", a: "{{FAQ_ANSWER_1}}" },
        { q: "{{FAQ_QUESTION_2}}", a: "{{FAQ_ANSWER_2}}" },
        { q: "{{FAQ_QUESTION_3}}", a: "{{FAQ_ANSWER_3}}" },
    ];

    return (
        <section className="py-16 bg-white max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Your Questions, Answered</h2>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex justify-between items-center p-4 font-semibold text-left hover:bg-gray-50"
                        >
                            {faq.q}
                            <ChevronDown className={`transition ${openIndex === i ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                                    <div className="p-4 text-gray-600 border-t bg-gray-50">{faq.a}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- MAIN LANDING PAGE ---

const LandingPage = () => {
    return (
        <div className="pt-0">
            {/* HERO SECTION */}
            <div className="bg-white pt-8 pb-16">
                <div className="container flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400"><Star fill="currentColor" size={16} /></div>
                            <span className="text-sm font-bold">{{SOCIAL_PROOF_TEXT}}</span>
                        </div>
                        <div className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full mb-4">{{BADGE_TEXT}}</div>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-gray-900">
                            {{HERO_HEADLINE}}
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                            {{HERO_SUBHEAD}}
                        </p>

                        {/* Scarcity & CTA */}
                        <div className="max-w-md mx-auto md:mx-0">
                            <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-2 animate-pulse">
                                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                {{SCARCITY_TEXT}}
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                                <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <Link to="/product" className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all mb-4">
                                {{PRIMARY_CTA_LABEL}}
                            </Link>
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-800">
                                <ShieldCheck size={16} /> {{GUARANTEE_TEXT}}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="relative aspect-square md:aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://placehold.co/800x600?text={{HERO_IMAGE_PLACEHOLDER}}" alt="Hero" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* VALUE PROPOSITION STRIP */}
            <section className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="container max-w-4xl text-center">
                    <h2 className="text-2xl font-bold uppercase mb-4">{{SOLUTION_HEADLINE}}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">{{SOLUTION_DESCRIPTION}}</p>
                </div>
            </section>

            {/* SHOP BY CONCERN */}
            <CategoryGridSection />

            {/* SOCIAL PROOF BAR */}
            <section className="py-8 border-y border-gray-100 overflow-hidden">
                <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">As seen in</p>
                <div className="flex justify-center gap-12 opacity-50 grayscale">
                    {/* Placeholder Logos */}
                    <div className="h-8 bg-gray-300 w-24"></div>
                    <div className="h-8 bg-gray-300 w-24"></div>
                    <div className="h-8 bg-gray-300 w-24"></div>
                    <div className="h-8 bg-gray-300 w-24"></div>
                </div>
            </section>

            {/* RISK FREE BANNER */}
            <section className="relative py-24 bg-gray-900 text-center text-white">
                <div className="absolute inset-0 opacity-50 bg-[url('https://placehold.co/1200x400?text=Banner+Bg')] bg-cover bg-center"></div>
                <div className="relative z-10 container">
                    <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">{{RISK_FREE_HEADLINE}}</h3>
                    <p className="max-w-2xl mx-auto text-gray-200 font-bold tracking-widest">{{RISK_FREE_SUBHEAD}}</p>
                </div>
            </section>

            {/* HOW IT WORKS (FEATURES) */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-2">{{HOW_IT_WORKS_HEADLINE}}</h2>
                        <p className="text-indigo-600 font-semibold">{{HOW_IT_WORKS_SUBHEAD}}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Activity size={32} />, title: "{{PHASE_1_TITLE}}", desc: "{{PHASE_1_DESC}}" },
                            { icon: <Droplet size={32} />, title: "{{PHASE_2_TITLE}}", desc: "{{PHASE_2_DESC}}" },
                            { icon: <Zap size={32} />, title: "{{PHASE_3_TITLE}}", desc: "{{PHASE_3_DESC}}" }
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUCCESS STORIES */}
            <TestimonialsSection />

            {/* VIDEO SECTION */}
            <section className="w-full bg-black aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <span className="text-lg font-bold">[ VIDEO PLACEHOLDER ]</span>
                </div>
            </section>

            {/* FAQ */}
            <FaqSection />

            {/* STICKY MOBILE CTA */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 md:hidden z-40">
                <Link to="/product" className="block w-full bg-green-600 text-white text-center py-3 rounded-xl font-bold shadow-lg">
                    {{PRIMARY_CTA_LABEL}}
                </Link>
            </div>
        </div>
    );
};

// --- APP ENTRY POINT ---

const App = () => {
    return (
        <CartContext.Provider value={{ cartCount: 0, setIsCartOpen: () => {} }}>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <TimerBanner />
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            {/* Other routes would be defined here */}
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </CartContext.Provider>
    );
};

export default App;
```
