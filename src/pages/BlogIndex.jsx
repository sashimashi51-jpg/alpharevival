import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { ArrowRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogIndex() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('ALL');

    const categories = ['ALL', 'SCIENCE', 'EQUIPMENT', 'ROUTINE', 'MISTAKES'];

    // Author avatar mapping
    const authorAvatars = {
        'Dr. Harry Ellison': '/assets/advertorial-reporter.png',
        'James T.': '/assets/author-avatar-2.png',
        'Editorial Team': '/assets/author-avatar-3.png'
    };

    // Verified Badge Component - Social Media Style
    const VerifiedBadge = ({ size = 16 }) => (
        <div
            className="inline-flex items-center justify-center rounded-full bg-blue-500"
            style={{ width: size, height: size, minWidth: size, minHeight: size }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="white"
                style={{ width: size * 0.6, height: size * 0.6 }}
            >
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
            <SEO
                title="Hair Health Journal | Science & Research by AlphaRevive"
                description="The latest research on microneedling, hair growth peptides, and natural hair recovery protocols."
            />
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-wider mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        THE JOURNAL
                    </h1>
                    <p className="text-xl text-gray-600">Research, results, and hair health science.</p>
                </div>
            </div>

            {/* Category Navigation - Underline Tabs */}
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
                            {/* Dynamic Featured Image - Centered and Responsive */}
                            <div className="h-64 sm:h-80 md:h-96 lg:h-auto overflow-hidden flex items-center justify-center bg-gray-100">
                                <img
                                    src={activeCategory === 'ALL' ? '/assets/featured-banner.png' : featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content with Improved Mobile Readability */}
                            <div className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
                                {/* Improved Badge */}
                                <div className="inline-block mb-4 sm:mb-6">
                                    <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-green-800 bg-green-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm uppercase">
                                        FEATURED STORY
                                    </span>
                                </div>

                                {/* Headline */}
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                                    {featuredPost.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 text-base sm:text-lg mb-8" style={{ lineHeight: '1.7' }}>
                                    {featuredPost.summary}
                                </p>

                                {/* Responsive Footer: Meta + Button */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    {/* Author with Avatar and Verification Badge */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={authorAvatars[featuredPost.author]}
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
                                        <span>Read Story</span>
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Newsletter Capture Block - Clinical Style */}
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-center shadow-2xl">
                    {/* Trust Anchor - User Avatars */}
                    <div className="flex justify-center mb-6">
                        <div className="flex -space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                                JD
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                                MS
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                                RA
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                                TK
                            </div>
                        </div>
                    </div>

                    {/* Scientific Headline */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                        Get Clinical Updates & Protocol Adjustments
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                        Join 10,000+ users receiving the latest research on microneedling density and hair recovery science.
                    </p>

                    {/* Integrated Input Bar */}
                    <div className="max-w-lg mx-auto">
                        <div className="flex items-stretch rounded-xl overflow-hidden shadow-xl">
                            {/* White Input Field (70%) */}
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 bg-white text-gray-900 placeholder-gray-500 focus:outline-none text-base"
                            />
                            {/* Emerald Green Button (30%) */}
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 transition-all whitespace-nowrap">
                                Join
                            </button>
                        </div>
                        {/* Improved Privacy Note - More Legible */}
                        <p className="text-gray-300 text-sm mt-4">
                            🔒 We respect your privacy. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

                {/* Article Grid - Premium Cards */}
                {gridPosts.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridPosts.map(post => (
                            <article
                                key={post.id}
                                onClick={() => navigate(`/journal/${post.slug}`)}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                            >
                                {/* Consistent Aspect Ratio Image (16:9) */}
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    {/* Subtle Category Tag */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock size={12} />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Prominent Title - Serif for Academic Feel */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3" style={{ lineHeight: '1.6' }}>
                                        {post.summary}
                                    </p>

                                    {/* Read Protocol Link */}
                                    <div className="mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wide text-gray-800 hover:text-emerald-600 transition-colors">
                                            READ PROTOCOL ›
                                        </span>
                                    </div>

                                    {/* Author with Avatar and Verification */}
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={authorAvatars[post.author]}
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
