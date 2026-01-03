import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function StickyProductCard() {
    const navigate = useNavigate();

    return (
        <div className="sticky top-24 bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 space-y-4">
            {/* Limited Offer Badge */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-center font-bold text-sm">
                🎁 Limited Offer: Save $100
            </div>

            {/* Product Image */}
            <div className="bg-gray-50 rounded-xl p-4">
                <img
                    src="/assets/product-upscaled.webp"
                    alt="AlphaRevival System"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900">AlphaRevival™ Hair Regrowth System</h3>
                <p className="text-sm text-gray-600">Complete 3-Phase Microneedling Kit</p>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">$109</span>
                    <span className="text-lg text-gray-400 line-through">$209</span>
                </div>

                {/* What's Included */}
                <div className="space-y-2 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                        <span>Micro-Infusion Device</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                        <span>Growth Serum (60ml)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                        <span>FREE Needle Head</span>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <button
                onClick={() => navigate('/product')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
                <span>Get the System</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>90-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>Free Shipping</span>
                </div>
            </div>
        </div>
    );
}
