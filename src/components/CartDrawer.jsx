import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Lock, Unlock, Check, ChevronRight, ShieldCheck, Minus, Plus, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
    const navigate = useNavigate();
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        progressPercentage,
        shippingProtection,
        setShippingProtection,
        THRESHOLDS,
        SHIPPING_COST,
        currencySymbol
    } = useCart();


    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const getNextRewardText = () => {
        if (cartTotal < THRESHOLDS.EBOOK) {
            return `ADD ${currencySymbol}${(THRESHOLDS.EBOOK - cartTotal).toFixed(0)} TO YOUR ORDER TO GET THE FREE EBOOK`;
        } else if (cartTotal < THRESHOLDS.SHIPPING) {
            return `ADD ${currencySymbol}${(THRESHOLDS.SHIPPING - cartTotal).toFixed(0)} TO YOUR ORDER TO GET FREE SHIPPING`;
        } else if (cartTotal < THRESHOLDS.GIFT) {
            return `ADD ${currencySymbol}${(THRESHOLDS.GIFT - cartTotal).toFixed(0)} TO YOUR ORDER TO GET THE FREE GIFT`;
        }
        return "CONGRATS! YOU'VE UNLOCKED ALL REWARDS";
    };

    const savedTotal = cartItems.reduce((acc, item) => {
        const original = item.originalPrice || item.price;
        if (original > item.price) {
            return acc + (original - item.price) * item.quantity;
        }
        return acc;
    }, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Dark Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black z-[2000] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-[2001] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
                            <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto no-scrollbar">

                            {/* Simplified Progress Bar - No Step Indicators */}
                            <div className="p-6 bg-gradient-to-b from-gray-50 to-white space-y-3">
                                {/* Simple progress message */}
                                <p className="text-center text-sm font-medium text-gray-700">
                                    {cartTotal < THRESHOLDS.SHIPPING
                                        ? `You are ${currencySymbol}${(THRESHOLDS.SHIPPING - cartTotal).toFixed(0)} away from Free Shipping`
                                        : cartTotal < THRESHOLDS.GIFT
                                            ? `You are ${currencySymbol}${(THRESHOLDS.GIFT - cartTotal).toFixed(0)} away from a Free Gift`
                                            : "🎉 You've unlocked all rewards!"}
                                </p>

                                {/* Clean Progress Bar */}
                                <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Simple milestone labels - Text + Icon */}
                                <div className="flex justify-between text-xs font-medium">
                                    <span className={cartTotal >= THRESHOLDS.SHIPPING ? 'text-green-600' : 'text-gray-400'}>
                                        Free Shipping
                                    </span>
                                    <span className={`flex items-center gap-1 ${cartTotal >= THRESHOLDS.GIFT ? 'text-green-600' : 'text-gray-400'}`}>
                                        <Gift size={14} />
                                    </span>
                                </div>
                            </div>

                            {/* Cart Items List - Filter out gifts if handled by rewards box, OR show disabled */}
                            <div className="p-6 space-y-6">
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        Your cart is empty
                                    </div>
                                ) : (
                                    cartItems.filter(item => !item.isGift).map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image || "/assets/placeholder.png"}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 font-medium mb-3">{item.subtitle}</p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Selector */}
                                                    <div className="flex items-center border border-gray-200 rounded-md">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-2 hover:bg-gray-50 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-2 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        {item.originalPrice && (
                                                            <div className="text-xs text-gray-400 line-through">
                                                                {currencySymbol}{item.originalPrice.toFixed(2)}
                                                            </div>
                                                        )}
                                                        <div className="font-bold text-gray-900">
                                                            {currencySymbol}{item.price.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Active Rewards - Only show unlocked */}
                            {cartTotal >= THRESHOLDS.GIFT && (
                                <div className="px-6 pb-4 space-y-2">
                                    {/* Free Gift Badge */}
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2">
                                        <Check size={16} className="text-orange-600" />
                                        <span className="text-sm font-medium text-orange-800">Free Sterile Needle Head Added</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        <div className="border-t border-gray-100 p-6 bg-white space-y-4">

                            {/* Savings Summary */}
                            {savedTotal > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">You Saved</span>
                                    <span className="text-red-600 font-bold">- {currencySymbol}{savedTotal.toFixed(2)}</span>
                                </div>
                            )}

                            {/* Upsell: Ultimate Hair Growth Guide - ALWAYS SHOW */}
                            {!cartItems.some(item => item.name === 'Ultimate Hair Growth Guide (eBook)') && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 flex items-center gap-3 mb-6"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src="/assets/product-upscaled.webp"
                                            alt="Ultimate Hair Growth Guide"
                                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 text-sm mb-0.5">Ultimate Hair Growth Guide</p>
                                        <p className="text-xs text-gray-600">Digital PDF Download</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart({
                                                name: 'Ultimate Hair Growth Guide (eBook)',
                                                title: 'Ultimate Hair Growth Guide',
                                                subtitle: 'Digital PDF Download',
                                                price: 20,
                                                quantity: 1,
                                                image: '/assets/product-upscaled.webp'
                                            });
                                        }}
                                        className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                                    >
                                        Add {currencySymbol}20
                                    </button>
                                </motion.div>
                            )}


                            {/* Modern Toggle Switch Shipping Protection */}
                            <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setShippingProtection(!shippingProtection)}>
                                <span className="text-sm font-medium text-gray-700">
                                    Priority Shipping Protection
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-gray-900">{currencySymbol}2.97</span>
                                    {/* Toggle Switch */}
                                    <div className={`w-10 h-6 rounded-full transition-colors relative ${shippingProtection ? 'bg-green-500' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${shippingProtection ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Cost */}
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className={`font-semibold ${cartTotal >= THRESHOLDS.SHIPPING ? 'text-green-600' : 'text-gray-900'}`}>
                                    {cartTotal >= THRESHOLDS.SHIPPING ? 'FREE' : `${currencySymbol}${SHIPPING_COST.toFixed(2)}`}
                                </span>
                            </div>

                            {/* Subtotal Row */}
                            <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                                <span className="text-base text-gray-500 font-medium">Subtotal</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-gray-900">
                                        {currencySymbol}{(cartTotal + (shippingProtection ? 2.97 : 0) + (cartTotal >= THRESHOLDS.SHIPPING ? 0 : SHIPPING_COST)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Dominant Checkout Button */}
                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/checkout');
                                }}
                                style={{
                                    background: '#16a34a',
                                    color: '#ffffff'
                                }}
                                className="btn btn-primary btn-large w-full py-5 rounded-xl font-bold text-lg tracking-wide hover:shadow-lg transition-all flex items-center justify-center gap-2 group shadow-md"
                            >
                                <ShieldCheck size={22} className="group-hover:scale-110 transition-transform" />
                                <span className="group-hover:translate-x-[-2px] transition-transform">SECURE CHECKOUT</span>
                                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

