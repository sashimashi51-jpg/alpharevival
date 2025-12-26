import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Thresholds in Dollars
const THRESHOLDS = {
    SHIPPING: 80, // Free shipping
    GIFT: 116    // Free gift
};

const SHIPPING_COST = 6.95;

const GIFT_ITEM = {
    id: 'free-gift-needle',
    title: 'Sterile Needle Head',
    subtitle: 'Free Gift',
    price: 0,
    originalPrice: 15,
    quantity: 1,
    image: '/assets/nial.png',
    isGift: true
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shippingProtection, setShippingProtection] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);


    // Load initial state from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        const savedProtection = localStorage.getItem('shippingProtection');

        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                if (parsedCart && parsedCart.length > 0) {
                    setCartItems(parsedCart);
                }
            } catch (e) {
                console.error("Failed to parse cart items", e);
                localStorage.removeItem('cartItems'); // Clear corrupted data
            }
        }

        if (savedProtection !== null) {
            setShippingProtection(savedProtection === 'true');
        }
    }, []); // Only run once on mount

    // Calculate totals and handle gift logic
    useEffect(() => {
        // 1. Calculate clean subtotal (excluding gifts)
        const subtotal = cartItems.reduce((acc, item) => {
            if (item.isGift) return acc;
            return acc + (item.price * item.quantity);
        }, 0);

        setCartTotal(subtotal);

        // 2. Update Progress Bar
        const percent = Math.min((subtotal / THRESHOLDS.GIFT) * 100, 100);
        setProgressPercentage(percent);

        // 3. Handle Free Gift Logic
        const hasGift = cartItems.some(item => item.isGift);
        const qualifiesForGift = subtotal >= THRESHOLDS.GIFT;

        if (qualifiesForGift && !hasGift) {
            setCartItems(prev => [...prev, { ...GIFT_ITEM }]);
            return; // Exit early to prevent double save
        } else if (!qualifiesForGift && hasGift) {
            setCartItems(prev => prev.filter(item => !item.isGift));
            return; // Exit early to prevent double save
        }

        // 4. Persist to localStorage (only if not modifying gift)
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    }, [cartItems]);


    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, isGift: false }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => {
            const newCart = prev.filter(item => item.id !== id);
            // Auto-close cart if it becomes empty (excluding gift items)
            const hasNonGiftItems = newCart.some(item => !item.isGift);
            if (!hasNonGiftItems) {
                setIsCartOpen(false);
            }
            return newCart;
        });
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                // Prevent editing gift quantity
                if (item.isGift) return item;

                const newQuantity = item.quantity + delta;
                if (newQuantity < 1) return item; // Handled by trash icon usually, but strict check here
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    // Persist shipping protection
    useEffect(() => {
        localStorage.setItem('shippingProtection', shippingProtection.toString());
    }, [shippingProtection]);

    // Derived cart count excluding gift
    const cartCount = cartItems.reduce((acc, item) => item.isGift ? acc : acc + item.quantity, 0);

    const currencySymbol = '$';

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            cartCount,
            progressPercentage,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            shippingProtection,
            setShippingProtection,
            THRESHOLDS,
            SHIPPING_COST,
            currencySymbol
        }}>
            {children}
        </CartContext.Provider>
    );
};
