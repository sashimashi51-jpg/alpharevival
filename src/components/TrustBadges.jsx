import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const TrustBadges = () => {
    return (
        <div className="flex flex-col items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock size={16} className="text-green-600" />
                <span>Guaranteed Safe & Secure Checkout</span>
            </div>

            {/* Payment Logos */}
            <div className="flex items-center gap-3 opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-6 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="Apple Pay" className="h-6 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google Pay" className="h-6 object-contain" />
            </div>

            {/* Additional Badges via Lucide Icons if images fail or for extra trust */}
            <div className="flex items-center justify-center gap-6 w-full pt-3 border-t border-gray-200">
                <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={20} className="text-gray-600" />
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wide">SSL Encrypted</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="font-serif font-bold text-lg leading-none text-gray-600">24/7</div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wide">Support</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="font-bold text-lg leading-none text-gray-600">120</span>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wide">Day Guarantee</span>
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;
