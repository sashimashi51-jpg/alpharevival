import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import './BlogPost.css';

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [readingProgress, setReadingProgress] = useState(0);

    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setReadingProgress(scrollPercentage);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                    <button
                        onClick={() => navigate('/journal')}
                        className="text-green-600 hover:text-green-700 font-semibold"
                    >
                        ← Back to Journal
                    </button>
                </div>
            </div>
        );
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-green-600 transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Clinical Manuscript Layout */}
            <div className="min-h-screen bg-white pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/journal')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Journal</span>
                    </button>

                    {/* Manuscript Container - Very Narrow (680px max) */}
                    <article className="max-w-[680px] mx-auto">
                        {/* Breadcrumbs - Clinical Style */}
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-8 font-sans">
                            <span className="hover:text-gray-700 cursor-pointer" onClick={() => navigate('/')}>HOME</span>
                            <ChevronRight size={12} />
                            <span className="hover:text-gray-700 cursor-pointer" onClick={() => navigate('/journal')}>CLINICAL JOURNALS</span>
                            <ChevronRight size={12} />
                            <span className="text-gray-700">HAIR RECOVERY</span>
                        </div>

                        {/* Category Badge */}
                        <div className="mb-6">
                            <span className="text-[10px] font-bold tracking-widest text-green-700 bg-green-50 px-3 py-1.5 rounded-sm uppercase">
                                {post.category}
                            </span>
                        </div>

                        {/* Headline - Academic Style (Left-aligned, Heavy Serif) */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
                            style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                            {post.title}
                        </h1>

                        {/* Author Block - Consolidated Left */}
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <p className="text-base font-bold text-gray-900">
                                Dr. {post.author}, MD
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Reviewed by Dr. Lisa Chen, PhD | {formattedDate}
                            </p>
                        </div>

                        {/* Abstract - Centered with Horizontal Dividers */}
                        <div className="my-12">
                            <hr className="border-t border-gray-300 mb-8" />
                            <div className="text-center px-8">
                                <p className="text-lg italic leading-relaxed text-gray-700"
                                    style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                                    <strong className="font-bold not-italic">Abstract:</strong> {post.summary}
                                </p>
                            </div>
                            <hr className="border-t border-gray-300 mt-8" />
                        </div>

                        {/* Article Body - Refined Manuscript Typography */}
                        <div
                            className="prose prose-lg max-w-none article-content"
                            style={{
                                fontFamily: 'Merriweather, Georgia, serif',
                                fontSize: '19px',
                                lineHeight: '1.85',
                                color: '#333333'
                            }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* HR Separator */}
                        <hr className="my-16 border-t-2 border-gray-200" />

                        {/* Newsletter Signup Section - Enhanced UX */}
                        <div className="newsletter-signup-section bg-gray-900 rounded-2xl p-10 md:p-12 mb-16">
                            {/* User Avatars - Trust Anchor */}
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center -space-x-3">
                                    <div className="avatar-circle">
                                        <img src="/assets/avatar-1.webp" alt="User" className="w-12 h-12 rounded-full border-3 border-white object-cover" />
                                    </div>
                                    <div className="avatar-circle">
                                        <img src="/assets/avatar-2.webp" alt="User" className="w-12 h-12 rounded-full border-3 border-white object-cover" />
                                    </div>
                                    <div className="avatar-circle">
                                        <img src="/assets/avatar-3.webp" alt="User" className="w-12 h-12 rounded-full border-3 border-white object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Headline - Serif Font */}
                            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                                style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                                Get Clinical Updates & Protocol Adjustments
                            </h2>

                            {/* Subtext - Light Gray */}
                            <p className="text-base md:text-lg text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                                Join 10,000+ users receiving the latest research on microneedling density and hair recovery science.
                            </p>

                            {/* Integrated Action Bar */}
                            <div className="integrated-action-bar max-w-xl mx-auto">
                                <div className="flex flex-col sm:flex-row gap-0 rounded-lg overflow-hidden shadow-lg">
                                    {/* Input Field - Bright White, 70% width */}
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="flex-[7] px-6 py-4 text-base bg-white text-gray-900 border-0 outline-none focus:ring-2 focus:ring-green-500"
                                        style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
                                    />
                                    {/* Submit Button - Green, 30% width */}
                                    <button
                                        className="flex-[3] px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-base transition-all duration-200"
                                        style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
                                    >
                                        Join Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Clinical Recommendation Block */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2"
                                style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                                The Protocol Referenced in this Article
                            </h2>
                            <p className="text-sm text-gray-600 mb-8">Clinical-grade treatment system used in observational studies</p>

                            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                                {/* Product Image */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                    <img
                                        src="/assets/product-upscaled.webp"
                                        alt="AlphaRevival Clinical System"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>

                                {/* Technical Specifications */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications:</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start gap-3">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span><strong>Needle Depth:</strong> 0.5mm Titanium (Medical-Grade)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span><strong>Serum:</strong> Liposomal Peptide Complex (60ml)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span><strong>Frequency:</strong> Once weekly protocol (7-10 day intervals)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-green-600 font-bold mt-1">•</span>
                                            <span><strong>Duration:</strong> 120-day observational period</span>
                                        </li>
                                    </ul>

                                    <button
                                        onClick={() => navigate('/product')}
                                        className="mt-6 w-full md:w-auto bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-lg transition-all shadow-md hover:shadow-lg"
                                    >
                                        View Treatment System
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Citation Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <p className="text-xs text-gray-500 italic">
                                This article is for educational purposes and does not constitute medical advice.
                                Consult a healthcare professional before starting any treatment protocol.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
