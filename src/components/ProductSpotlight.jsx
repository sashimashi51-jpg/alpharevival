import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ProductSpotlight() {
    const navigate = useNavigate();

    return (
        <div className="my-12 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
                <div className="bg-green-600 rounded-full p-2">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to start?</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Get the <strong>AlphaInfuse System + Free Growth Serum</strong>. Everything you need to begin your hair regrowth journey, backed by our 90-day guarantee.
                    </p>
                </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Medical-grade device</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>90-day guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Save $100 today</span>
                </div>
            </div>

            {/* CTA Button */}
            <button
                onClick={() => navigate('/product')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
                <span>Get the Bundle - Save $100</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
                Over 10,000 men using AlphaInfuse daily
            </p>
        </div>
    );
}
