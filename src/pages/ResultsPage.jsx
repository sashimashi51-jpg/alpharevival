import React from 'react';
import SEO from '../components/SEO';
import ClinicalGallery from '../components/ClinicalGallery';
import SuccessStories from '../components/SuccessStories';
import FeaturedProduct from '../components/FeaturedProduct';
import { motion } from 'framer-motion';

export default function ResultsPage() {
    return (
        <div className="pt-20">
            <SEO
                title="Real Results | AlphaRevive Success Stories"
                description="See real before and after results from men who have used the AlphaRevive Hair Growth System to restore their hair density."
            />

            <div className="container mx-auto px-4 py-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                >
                    Real Men. Real Regrowth.
                </motion.h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                    Don't just take our word for it. See the transformations our community has achieved.
                </p>
            </div>

            <ClinicalGallery />

            <div className="bg-gray-50 py-12">
                <SuccessStories />
            </div>

            <div className="py-12">
                <FeaturedProduct />
            </div>
        </div>
    );
}
