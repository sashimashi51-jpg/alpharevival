---
NI_CHE: ""
PRODUCT_NAME: ""
PRIMARY_COLOR_THEME: ""
SECONDARY_COLOR_THEME: ""
TARGET_AUDIENCE: ""
VALUE_PROPOSITION: ""
---

# Part 2: The .env Template

```env
# ========================================
# PRODUCTION ENVIRONMENT VARIABLES
# ========================================

# STRIPE (PAYMENTS)
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# FRONTEND KEYS
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
VITE_API_URL=http://localhost:4242

# EMAIL CONFIGURATION (TRANSACTIONAL)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password

# CONTACT FORM RECIPIENT
CONTACT_EMAIL=support@yourdomain.com

# SERVER CONFIGURATION
PORT=4242
NODE_ENV=production
```

# Part 3: The Code Skeleton (Checkout Page)

```jsx
/*
  ========================================
  CHECKOUT PAGE SKELETON
  ========================================
  Contains:
  - CheckoutPage (Main Wrapper)
  - CheckoutForm (Stripe Elements)
*/

import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check, ShieldCheck, Lock } from 'lucide-react';

// Mock Cart Context Hook
// In a real app, import { useCart } from '../context/CartContext';
const useCart = () => ({
    cartItems: [
        { id: 1, title: "{{PRODUCT_1_TITLE}}", subtitle: "{{PRODUCT_1_SUBTITLE}}", price: 54.99, originalPrice: 99.00, quantity: 1, image: "https://placehold.co/100x100?text=Prod" }
    ],
    cartTotal: 54.99,
    shippingProtection: true,
    currencySymbol: "$",
    THRESHOLDS: { SHIPPING: 75 },
    SHIPPING_COST: 4.99
});

// ==========================================
// COMPONENT: CheckoutForm
// ==========================================
const CheckoutForm = ({ clientSecret, email }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showExpressCheckout, setShowExpressCheckout] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
                receipt_email: email,
            },
        });

        if (error) {
            setMessage(error.type === "card_error" || error.type === "validation_error" ? error.message : "{{ERROR_GENERIC}}");
        }
        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            {showExpressCheckout && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                        <ExpressCheckoutElement
                            onConfirm={async () => {
                                // Logic for express checkout confirm
                            }}
                            options={{ buttonType: { applePay: 'buy', googlePay: 'buy' }, buttonHeight: 48 }}
                        />
                    </div>
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500 font-medium text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <PaymentElement id="payment-element" options={{ layout: { type: 'accordion', defaultCollapsed: false, radios: true, spacedAccordionItems: true } }} />
            </div>

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg tracking-wide hover:bg-gray-900 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
                <Lock size={20} className="group-hover:scale-110 transition-transform" />
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <span>{{PROCESSING_TEXT}}</span>
                    </div>
                ) : (
                    <span>{{COMPLETE_CHECKOUT_BUTTON}}</span>
                )}
            </button>

            {message && (
                <div className="text-red-600 text-sm font-medium text-center bg-red-50 p-4 rounded-xl border border-red-200">
                    {message}
                </div>
            )}

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span>{{SSL_BADGE_TEXT}}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock size={16} className="text-green-600" />
                    <span>{{SECURE_BADGE_TEXT}}</span>
                </div>
            </div>
        </form>
    );
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ==========================================
// PAGE: CheckoutPage
// ==========================================
export default function CheckoutPage() {
    const { cartItems, cartTotal, shippingProtection, currencySymbol, THRESHOLDS, SHIPPING_COST } = useCart();

    // Stripe Loading
    useEffect(() => {
        if (!window.Stripe) {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    const [clientSecret, setClientSecret] = useState("");
    const [isLoadingIntent, setIsLoadingIntent] = useState(false);
    const [email, setEmail] = useState("");
    const paymentSectionRef = useRef(null);

    const currentShippingCost = cartTotal >= THRESHOLDS.SHIPPING ? 0 : SHIPPING_COST;
    const totalAmount = cartTotal + (shippingProtection ? 2.97 : 0) + currentShippingCost;
    const amountInCents = Math.round(totalAmount * 100);

    const savedTotal = cartItems.reduce((acc, item) => {
        const original = item.originalPrice || item.price;
        return original > item.price ? acc + (original - item.price) * item.quantity : acc;
    }, 0);

    useEffect(() => {
        if (totalAmount > 0 && !clientSecret && !isLoadingIntent) {
            setIsLoadingIntent(true);
            const apiUrl = import.meta.env.VITE_API_URL || '/api';

            // Mock Fetch for Skeleton - In real app, call your backend
            // setClientSecret("pi_mock_secret"); setIsLoadingIntent(false);

            fetch(`${apiUrl}/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-render-secret": import.meta.env.VITE_PUBLIC_RENDER_SECRET || ""
                },
                body: JSON.stringify({ items: cartItems, amount: totalAmount, shippingProtection }),
            })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setIsLoadingIntent(false);
            })
            .catch((err) => {
                console.error("Payment intent error:", err);
                setIsLoadingIntent(false);
            });
        }
    }, [totalAmount]);

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#059669',
            colorBackground: '#ffffff',
            colorText: '#374151',
            borderRadius: '12px',
        }
    };

    const options = {
        mode: 'payment',
        amount: amountInCents,
        currency: 'usd',
        appearance,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">{{CHECKOUT_TITLE}}</h1>
                    <p className="text-gray-600">{{CHECKOUT_SUBTITLE}}</p>
                </div>

                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
                    {/* Left Column: Form Steps */}
                    <div className="space-y-6">
                        {/* Step 1: Delivery Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                <h2 className="text-xl font-bold text-gray-900">{{STEP_1_TITLE}}</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="{{PLACEHOLDER_FIRST_NAME}}" className="col-span-2 sm:col-span-1 w-full px-4 py-3 border-2 border-gray-200 rounded-xl" required />
                                    <input type="text" placeholder="{{PLACEHOLDER_LAST_NAME}}" className="col-span-2 sm:col-span-1 w-full px-4 py-3 border-2 border-gray-200 rounded-xl" required />
                                </div>
                                <input
                                    type="email"
                                    placeholder="{{PLACEHOLDER_EMAIL}}"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                                    required
                                />
                                <input type="text" placeholder="{{PLACEHOLDER_ADDRESS}}" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" required />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder="{{PLACEHOLDER_CITY}}" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" required />
                                    <input type="text" placeholder="{{PLACEHOLDER_STATE}}" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" required />
                                </div>
                                <input type="text" placeholder="{{PLACEHOLDER_ZIP}}" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" required />
                            </div>
                        </div>

                        {/* Step 2: Shipping Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                <h2 className="text-xl font-bold text-gray-900">{{STEP_2_TITLE}}</h2>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-black transition-colors">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="shipping" defaultChecked className="w-5 h-5 text-black" />
                                        <div>
                                            <div className="font-semibold text-gray-900">{{SHIPPING_METHOD_NAME}}</div>
                                            <div className="text-sm text-gray-500">{{SHIPPING_METHOD_TIME}}</div>
                                        </div>
                                    </div>
                                    <span className={`font-bold ${currentShippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                        {currentShippingCost === 0 ? 'FREE' : `${currencySymbol}${currentShippingCost.toFixed(2)}`}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Step 3: Payment Method */}
                        <div ref={paymentSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                <h2 className="text-xl font-bold text-gray-900">{{STEP_3_TITLE}}</h2>
                            </div>

                            {stripePromise ? (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} email={email} />
                                </Elements>
                            ) : (
                                <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-gray-200">
                                    <p className="text-sm text-gray-500">{{LOADING_PAYMENT_TEXT}}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 flex flex-col h-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex-shrink-0">{{SUMMARY_TITLE}}</h2>

                            <div className="space-y-4 mb-6 lg:max-h-[40vh] lg:overflow-y-auto flex-shrink min-h-0">
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">{{EMPTY_CART_TEXT}}</p>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-start">
                                            <div className="w-20 h-20 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                                                <img src={item.image || 'https://placehold.co/100x100?text=Prod'} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
                                                {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                                    <span className="font-bold text-gray-900">{currencySymbol}{(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-3 flex-shrink-0">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{currencySymbol}{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className={`font-semibold ${currentShippingCost === 0 ? 'text-green-600' : 'text-gray-700'}`}>
                                        {currentShippingCost === 0 ? 'FREE' : `${currencySymbol}${currentShippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                {shippingProtection && (
                                    <div className="flex justify-between text-gray-700">
                                        <span className="text-sm">Shipping Protection</span>
                                        <span className="font-semibold">{currencySymbol}2.97</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-gray-900">{currencySymbol}{totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 flex-shrink-0">
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span>{{BADGE_1}}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                                        <span>{{BADGE_2}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
