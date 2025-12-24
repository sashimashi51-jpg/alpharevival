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
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        progressPercentage,
        shippingProtection,
        setShippingProtection,
        THRESHOLDS,
        currencySymbol
    } = useCart();
