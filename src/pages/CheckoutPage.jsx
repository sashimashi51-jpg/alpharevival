import React, { useState, useEffect, useRef, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check, ShieldCheck, Lock, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutForm = ({ clientSecret, email }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showExpressCheckout, setShowExpressCheckout] = useState(true);

    // Express Checkout buttons are now shown immediately without delay

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
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">

            {/* Express Checkout Buttons (Apple Pay, Google Pay, Link) - Deferred */}
            {showExpressCheckout && (
                <>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                            <ExpressCheckoutElement
                                onConfirm={async (event) => {
                                    if (!stripe || !elements) return;

                                    const { error } = await stripe.confirmPayment({
                                        elements,
                                        clientSecret,
                                        confirmParams: {
                                            return_url: `${window.location.origin}/success`,
                                        },
                                        redirect: 'if_required',
                                    });

                                    if (error) {
                                        setMessage(error.message);
                                    }
                                }}
                                options={{
                                    buttonType: {
                                        applePay: 'buy',
                                        googlePay: 'buy',
                                    },
                                    buttonHeight: 48,
                                }}
                            />
                        </div>

                        {/* OR Divider */}
                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 font-medium text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                    </div>
                </>
            )}

            {/* Regular Payment Element (Card, etc.) */}
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <PaymentElement
                    id="payment-element"
                    options={{
                        layout: {
                            type: 'accordion',
                            defaultCollapsed: false,
                            radios: true,
                            spacedAccordionItems: true
                        }
                    }}
                />
            </div>

            {/* Submit Button */}
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg tracking-wide hover:bg-gray-900 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
                <Lock size={20} className="group-hover:scale-110 transition-transform" />
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-transparent border-white" role="status"></div>
                        <span>Processing...</span>
                    </div>
                ) : (
                    <span>Complete Secure Checkout</span>
                )}
            </button>

            {/* Error Message */}
            {message && (
                <div className="text-red-600 text-sm font-medium text-center bg-red-50 p-4 rounded-xl border border-red-200">
                    {message}
                </div>
            )}

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock size={16} className="text-green-600" />
                    <span>Secure Checkout</span>
                </div>
            </div>
        </form>
    );
};

// Initialize Stripe singleton outside component for maximum speed
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
    const { cartItems, cartTotal, shippingProtection, currencySymbol, THRESHOLDS, SHIPPING_COST } = useCart();
    const [clientSecret, setClientSecret] = useState("");
    const [isLoadingIntent, setIsLoadingIntent] = useState(false);
    const [email, setEmail] = useState("");
    const paymentSectionRef = useRef(null);

    const currentShippingCost = cartTotal >= THRESHOLDS.SHIPPING ? 0 : SHIPPING_COST;
    const totalAmount = cartTotal + (shippingProtection ? 2.97 : 0) + currentShippingCost;
    // Stripe expects amount in cents
    const amountInCents = Math.round(totalAmount * 100);

    const savedTotal = cartItems.reduce((acc, item) => {
        const original = item.originalPrice || item.price;
        if (original > item.price) {
            return acc + (original - item.price) * item.quantity;
        }
        return acc;
    }, 0);

    // Create payment intent immediately on mount
    useEffect(() => {
        if (totalAmount > 0 && !clientSecret && !isLoadingIntent) {
            setIsLoadingIntent(true);
            // If VITE_API_URL is set (e.g. locally), use it. Otherwise, assume same-origin (Vercel) relative path /api
            const apiUrl = import.meta.env.VITE_API_URL || '/api';
            // Note: Sending the secret from the client is not fully secure as it can be inspected.
            // For higher security, use a server-side proxy (e.g. Vercel API routes) to attach the secret.
            fetch(`${apiUrl}/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-render-secret": import.meta.env.VITE_RENDER_SECRET_KEY || ""
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
            colorPrimary: '#059669', // Brand Green
            colorBackground: '#ffffff',
            colorText: '#374151',
            borderRadius: '12px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSizeBase: '16px',
            spacingUnit: '4px',
            spacingGridRow: '16px'
        },
        rules: {
            '.Tab': {
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            },
            '.Tab:hover': {
                borderColor: '#059669',
            },
            '.Tab--selected': {
                borderColor: '#059669',
                backgroundColor: '#ffffff',
                borderWidth: '2px',
            },
            '.Input': {
                border: '1px solid #d1d5db',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                padding: '12px'
            },
            '.Input:focus': {
                border: '2px solid #059669',
                boxShadow: 'none',
            },
            '.Label': {
                fontWeight: '600',
                color: '#374151',
                marginBottom: '6px'
            }
        }
    };

    // Use Deferred Intent (mode: 'payment') for instant loading
    const options = {
        mode: 'payment',
        amount: amountInCents,
        currency: 'usd',
        appearance,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Header */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">Secure Checkout</h1>
                    <p className="text-gray-600">Complete your order in just a few steps</p>
                </div>

                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">

                    {/* Left Column: Checkout Form */}
                    <div className="space-y-6">

                        {/* Step 1: Delivery Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="col-span-2 sm:col-span-1 w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="col-span-2 sm:col-span-1 w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                        required
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={(e) => {
                                        const emailVal = e.target.value;
                                        if (emailVal && emailVal.includes('@') && window.klaviyo) {
                                            // Identify the user
                                            window.klaviyo.push(['identify', { '$email': emailVal }]);
                                            // Track Started Checkout
                                            window.klaviyo.push(['track', 'Started Checkout', {
                                                'Items': cartItems.map(i => i.title),
                                                'CheckoutTotal': totalAmount,
                                                'Currency': 'USD'
                                            }]);
                                        }
                                    }}
                                    className="w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className="w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                    required
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="ZIP Code"
                                    className="w-full min-w-0 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-base"
                                    required
                                />
                            </div>
                        </div>

                        {/* Step 2: Shipping Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                <h2 className="text-xl font-bold text-gray-900">Shipping Method</h2>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-black transition-colors">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="shipping" defaultChecked className="w-5 h-5 text-black" />
                                        <div>
                                            <div className="font-semibold text-gray-900">Standard Shipping</div>
                                            <div className="text-sm text-gray-500">3-5 business days</div>
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
                                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                            </div>

                            {/* Stripe Payment Element - Mounts instantly with Deferred Intent */}
                            {stripePromise ? (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} email={email} />
                                </Elements>
                            ) : (
                                <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-gray-200">
                                    <div className="animate-pulse flex flex-col items-center gap-4">
                                        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                                        <div className="space-y-2 w-full">
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                                        </div>
                                        <div className="mt-4 space-y-3 w-full">
                                            <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                                            <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Initializing secure payment...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 flex flex-col h-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex-shrink-0">Order Summary</h2>

                            {/* Cart Items - Scrollable Section */}
                            <div className="space-y-4 mb-6 lg:max-h-[40vh] lg:overflow-y-auto flex-shrink min-h-0">
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-start">
                                            <div className="w-20 h-20 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                                                <img src={item.image || '/assets/placeholder.png'} alt={item.title} className="w-full h-full object-cover" />
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

                            {/* Pricing Breakdown - Always Visible */}
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

                                {savedTotal > 0 && (
                                    <div className="flex justify-between text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                        <span className="font-semibold">You Save</span>
                                        <span className="font-bold">-{currencySymbol}{savedTotal.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-gray-900">{currencySymbol}{totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Trust Badges - Always Visible */}
                            <div className="mt-6 pt-6 border-t border-gray-200 flex-shrink-0">
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span>120-Day Guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                                        <span>Secure Checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span>Fast Delivery</span>
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
