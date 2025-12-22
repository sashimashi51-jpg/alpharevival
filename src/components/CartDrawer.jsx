import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Lock, Unlock, Check, ChevronRight, ShieldCheck, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
    const navigate = useNavigate();
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        progressPercentage,
        shippingProtection,
        setShippingProtection,
        THRESHOLDS,
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

                            {/* Rewards Progress Section */}
                            <div className="p-6 bg-gray-50/50 space-y-4">
                                <p className="text-center text-sm font-bold tracking-wide text-gray-800">
                                    {getNextRewardText()}
                                </p>

                                {/* Progress Bar Container */}
                                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-black"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Milestones */}
                                <div className="flex justify-between text-[10px] font-semibold text-gray-500 tracking-wider">
                                    <div className={`flex flex-col items-center ${cartTotal >= THRESHOLDS.EBOOK ? 'text-black' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${cartTotal >= THRESHOLDS.EBOOK ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
                                            {cartTotal >= THRESHOLDS.EBOOK ? <Check size={14} /> : '1'}
                                        </div>
                                        <span>E-BOOK</span>
                                    </div>
                                    <div className={`flex flex-col items-center ${cartTotal >= THRESHOLDS.SHIPPING ? 'text-black' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${cartTotal >= THRESHOLDS.SHIPPING ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
                                            {cartTotal >= THRESHOLDS.SHIPPING ? <Check size={14} /> : '2'}
                                        </div>
                                        <span className="text-center leading-tight">FREE<br />SHIPPING</span>
                                    </div>
                                    <div className={`flex flex-col items-center ${cartTotal >= THRESHOLDS.GIFT ? 'text-black' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${cartTotal >= THRESHOLDS.GIFT ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
                                            {cartTotal >= THRESHOLDS.GIFT ? <Check size={14} /> : '3'}
                                        </div>
                                        <span>GIFT</span>
                                    </div>
                                </div>
                            </div>

                            {/* Urgency Banner - Updated Colors */}
                            <div className="bg-gray-100 p-3 text-center mb-2">
                                <p className="text-gray-800 text-xs font-medium flex items-center justify-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-600"></span>
                                    </span>
                                    The items in your cart are selling fast!
                                </p>
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

                            {/* Reward Tiers List */}
                            <div className="px-6 pb-6 space-y-3">
                                {/* Gift Item - Dynamic State */}
                                <div className={`border rounded-lg p-3 flex items-center gap-3 ${cartTotal >= THRESHOLDS.GIFT ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center border border-gray-100 flex-shrink-0">
                                        <img src="/assets/needle_head.png" alt="Gift" className="w-8 h-8 object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-bold ${cartTotal >= THRESHOLDS.GIFT ? 'text-orange-700' : 'text-gray-500'}`}>
                                            {cartTotal >= THRESHOLDS.GIFT ? "Unlocked: Free Gift!" : "Locked: Sterile Needle Head"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {cartTotal >= THRESHOLDS.GIFT ? "Added to your order." : `Add ${currencySymbol}${(THRESHOLDS.GIFT - cartTotal).toFixed(0)} more to unlock`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {cartTotal >= THRESHOLDS.GIFT ? (
                                            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">FREE</span>
                                        ) : (
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-gray-400"><Lock size={14} /></span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Shipping Tier */}
                                {cartTotal >= THRESHOLDS.SHIPPING && (
                                    <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center border border-gray-100 flex-shrink-0 text-green-600">
                                            <Check size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-green-800">Free Shipping Applied!</p>
                                            <p className="text-xs text-green-600">You saved on delivery costs.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="border-t border-gray-100 p-6 bg-white space-y-4">

                            {/* Coupon Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Coupon code"
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                                />
                                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                    Apply
                                </button>
                            </div>

                            {/* Savings Summary */}
                            {savedTotal > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">You Saved</span>
                                    <span className="text-gray-900 font-bold">- {currencySymbol}{savedTotal.toFixed(2)}</span>
                                </div>
                            )}

                            {/* Priority Shipping */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer" onClick={() => setShippingProtection(!shippingProtection)}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${shippingProtection ? 'bg-black' : 'border border-gray-300 bg-white'}`}>
                                        {shippingProtection && <Check size={12} className="text-white" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                                            Priority Shipping Protection
                                            <ShieldCheck size={14} className="text-gray-400" />
                                        </span>
                                        <span className="text-xs text-gray-500">Protect your package from loss or damage</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold">{currencySymbol}2.97</span>
                            </div>

                            {/* Subtotal Row */}
                            <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                                <span className="text-base text-gray-500 font-medium">Subtotal</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-gray-900">
                                        {currencySymbol}{(cartTotal + (shippingProtection ? 2.97 : 0)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/checkout');
                                }}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                            >
                                <span className="group-hover:translate-x-[-2px] transition-transform">SECURE CHECKOUT</span>
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
