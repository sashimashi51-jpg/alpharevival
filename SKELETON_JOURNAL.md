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

# Part 3: The Code Skeleton (Journal / Blog Index)

```jsx
/*
  ========================================
  JOURNAL PAGE SKELETON
  ========================================
  Contains:
  - BlogIndex (Main)
  - Blog Post Data Structure (Mock)
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
// import SEO from '../components/SEO'; // Assumed shared component

// Mock Data Structure
const blogPosts = [
    {
        id: 1,
        title: "{{POST_1_TITLE}}",
        summary: "{{POST_1_SUMMARY}}",
        category: "SCIENCE",
        author: "{{AUTHOR_1}}",
        readTime: "5 min read",
        image: "https://placehold.co/800x600?text=Post1",
        slug: "post-1-slug"
    },
    {
        id: 2,
        title: "{{POST_2_TITLE}}",
        summary: "{{POST_2_SUMMARY}}",
        category: "ROUTINE",
        author: "{{AUTHOR_2}}",
        readTime: "3 min read",
        image: "https://placehold.co/800x600?text=Post2",
        slug: "post-2-slug"
    }
];

export default function BlogIndex() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('ALL');

    const categories = ['ALL', '{{CATEGORY_1}}', '{{CATEGORY_2}}', '{{CATEGORY_3}}'];

    // Author avatar mapping
    const authorAvatars = {
        '{{AUTHOR_1}}': 'https://placehold.co/100x100?text=A1',
        '{{AUTHOR_2}}': 'https://placehold.co/100x100?text=A2',
        'Editorial Team': 'https://placehold.co/100x100?text=Team'
    };

    const VerifiedBadge = ({ size = 16 }) => (
        <div
            className="inline-flex items-center justify-center rounded-full bg-blue-500"
            style={{ width: size, height: size, minWidth: size, minHeight: size }}
        >
            <svg viewBox="0 0 24 24" fill="white" style={{ width: size * 0.6, height: size * 0.6 }}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
        </div>
    );

    const filteredPosts = activeCategory === 'ALL'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    const featuredPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* SEO Component would go here */}

            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {{JOURNAL_TITLE}}
                    </h1>
                    <p className="text-xl text-gray-600">{{JOURNAL_SUBTITLE}}</p>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-start md:justify-center gap-6 sm:gap-8 overflow-x-auto py-4 no-scrollbar px-2 sm:px-0">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-2 py-2 text-sm whitespace-nowrap transition-all border-b-2 ${activeCategory === category
                                    ? 'border-emerald-600 font-bold text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Featured Hero */}
                {featuredPost && (
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-1">
                        <div className="grid lg:grid-cols-[40%_60%] gap-0">
                            <div className="h-64 sm:h-80 md:h-96 lg:h-auto overflow-hidden flex items-center justify-center bg-gray-100">
                                <img
                                    src={activeCategory === 'ALL' ? 'https://placehold.co/800x600?text=FeaturedBanner' : featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
                                <div className="inline-block mb-4 sm:mb-6">
                                    <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-green-800 bg-green-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm uppercase">
                                        {{FEATURED_BADGE_TEXT}}
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                                    {featuredPost.title}
                                </h2>

                                <p className="text-gray-600 text-base sm:text-lg mb-8" style={{ lineHeight: '1.7' }}>
                                    {featuredPost.summary}
                                </p>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={authorAvatars[featuredPost.author] || 'https://placehold.co/100x100'}
                                            alt={featuredPost.author}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900">{featuredPost.author}</span>
                                                <VerifiedBadge size={16} />
                                            </div>
                                            <span className="hidden sm:inline">•</span>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{featuredPost.readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/journal/${featuredPost.slug}`)}
                                        className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-bold py-3.5 px-7 rounded-xl transition-all inline-flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        <span>{{READ_BUTTON_TEXT}}</span>
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Newsletter Capture Block */}
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-center shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                                    U{i}
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                        {{NEWSLETTER_HEADLINE}}
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                        {{NEWSLETTER_SUBHEAD}}
                    </p>

                    <div className="max-w-lg mx-auto">
                        <div className="flex items-stretch rounded-xl overflow-hidden shadow-xl">
                            <input
                                type="email"
                                placeholder="{{EMAIL_PLACEHOLDER}}"
                                className="flex-1 px-6 py-4 bg-white text-gray-900 placeholder-gray-500 focus:outline-none text-base"
                            />
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 transition-all whitespace-nowrap">
                                {{JOIN_BUTTON_TEXT}}
                            </button>
                        </div>
                        <p className="text-gray-300 text-sm mt-4">
                            {{PRIVACY_TEXT}}
                        </p>
                    </div>
                </div>

                {/* Article Grid */}
                {gridPosts.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridPosts.map(post => (
                            <article
                                key={post.id}
                                onClick={() => navigate(`/journal/${post.slug}`)}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                            >
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock size={12} />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3" style={{ lineHeight: '1.6' }}>
                                        {post.summary}
                                    </p>

                                    <div className="mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wide text-gray-800 hover:text-emerald-600 transition-colors">
                                            {{READ_MORE_LINK_TEXT}}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <img
                                            src={authorAvatars[post.author] || 'https://placehold.co/100x100'}
                                            alt={post.author}
                                            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-semibold text-gray-700">{post.author}</span>
                                            <VerifiedBadge size={14} />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
```
