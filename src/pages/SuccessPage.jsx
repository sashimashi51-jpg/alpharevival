import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Check, Package, Truck, Home, Mail, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function SuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const paymentIntent = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');

    const { clearCart, cartItems, cartTotal, currencySymbol, shippingProtection } = useCart();

    const [orderNumber, setOrderNumber] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Generate or retrieve order number
        const storedOrderNumber = sessionStorage.getItem('lastOrderNumber');
        if (storedOrderNumber && paymentIntent) {
            setOrderNumber(storedOrderNumber);
        } else {
            const newOrderNumber = "REV-" + Math.floor(10000 + Math.random() * 90000);
            setOrderNumber(newOrderNumber);
            sessionStorage.setItem('lastOrderNumber', newOrderNumber);
        }

        // Fetch payment intent details if available
        if (paymentIntent && redirectStatus === 'succeeded') {
            fetchPaymentDetails(paymentIntent);
        } else {
            setIsLoading(false);
        }

        // Clear cart on successful payment
        if (redirectStatus === 'succeeded' && paymentIntentClientSecret) {
            // Store order details before clearing
            const orderData = {
                items: cartItems,
                total: cartTotal,
                shippingProtection: shippingProtection,
                timestamp: new Date().toISOString()
            };
            sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
            clearCart();
        }
    }, [paymentIntent, redirectStatus, paymentIntentClientSecret]);

    const fetchPaymentDetails = async (piId) => {
        try {
            // In a real app, you'd fetch from your backend
            // For now, retrieve from session storage
            const storedOrder = sessionStorage.getItem('lastOrder');
            if (storedOrder) {
                setOrderDetails(JSON.parse(storedOrder));
            }
        } catch (error) {
            console.error('Error fetching payment details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTrackOrder = () => {
        navigate(`/track?order=${orderNumber}`);
    };

    const handleContactSupport = (e) => {
        e.preventDefault();
        // Navigate to contact page or open email
        window.location.href = 'mailto:support@alpharevive.shop?subject=Order ' + orderNumber;
    };

    const handleDownloadReceipt = () => {
        if (!orderDetails) return;

        const doc = new jsPDF();

        // Add company logo or name
        doc.setFontSize(20);
        doc.text("Alpha Revival", 14, 22);

        doc.setFontSize(11);
        doc.text(`Order Number: ${orderNumber}`, 14, 30);
        doc.text(`Date: ${new Date(orderDetails.timestamp).toLocaleDateString()}`, 14, 36);

        const tableColumn = ["Item", "Quantity", "Price", "Total"];
        const tableRows = [];

        orderDetails.items.forEach(item => {
            const itemData = [
                item.title,
                item.quantity,
                `${currencySymbol}${item.price.toFixed(2)}`,
                `${currencySymbol}${(item.price * item.quantity).toFixed(2)}`
            ];
            tableRows.push(itemData);
        });

        // Add Shipping Protection line item if applicable
        if (orderDetails.shippingProtection) {
             tableRows.push([
                "Shipping Protection",
                "1",
                `${currencySymbol}2.97`,
                `${currencySymbol}2.97`
            ]);
        }

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
        });

        // Calculate totals
        const subtotal = orderDetails.total;
        const shipping = subtotal >= 80 ? 0 : 6.95; // Hardcoded shipping logic
        const protectionCost = orderDetails.shippingProtection ? 2.97 : 0;
        const total = subtotal + shipping + protectionCost;

        const finalY = doc.lastAutoTable.finalY || 40;

        doc.text(`Subtotal: ${currencySymbol}${subtotal.toFixed(2)}`, 14, finalY + 10);
        doc.text(`Shipping: ${currencySymbol}${shipping.toFixed(2)}`, 14, finalY + 16);
        doc.text(`Total: ${currencySymbol}${total.toFixed(2)}`, 14, finalY + 22);

        doc.save(`receipt-${orderNumber}.pdf`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
                {/* Success Header */}
                <div className="bg-green-50 p-8 text-center border-b border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Check size={32} strokeWidth={3} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600">Thank you for your purchase. We've received your order.</p>

                    {/* Email Confirmation Notice */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-green-200">
                        <Mail size={16} className="text-green-600" />
                        <span className="text-sm text-gray-700">Confirmation email sent</span>
                    </div>
                </div>

                <div className="p-8">
                    {/* Order Number & Actions */}
                    <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Order Number</p>
                            <p className="text-xl font-bold text-gray-900">#{orderNumber}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleTrackOrder}
                                className="text-sm font-semibold text-gray-900 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors"
                            >
                                Track Order
                            </button>
                            <button
                                onClick={handleDownloadReceipt}
                                className="text-sm font-semibold text-gray-900 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-1"
                            >
                                <Download size={14} />
                                Receipt
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    {orderDetails && orderDetails.items && orderDetails.items.length > 0 && (
                        <div className="mb-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                            <div className="space-y-2">
                                {orderDetails.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="text-gray-700">
                                            {item.title} {item.quantity > 1 && `(x${item.quantity})`}
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {currencySymbol}{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                {orderDetails.shippingProtection && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-700">Shipping Protection</span>
                                        <span className="font-medium text-gray-900">{currencySymbol}2.97</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{currencySymbol}{(orderDetails.total + (orderDetails.total >= 80 ? 0 : 6.95) + (orderDetails.shippingProtection ? 2.97 : 0)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Tracker */}
                    <div className="relative flex justify-between items-center text-center px-4 mb-10">
                        {/* Line */}
                        <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0"></div>

                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border-4 border-white shadow-sm">
                                <Check size={14} />
                            </div>
                            <span className="text-xs font-bold text-gray-900">Confirmed</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center border-4 border-white shadow-sm">
                                <Package size={14} />
                            </div>
                            <span className="text-xs font-medium text-gray-500">Processing</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center border-4 border-white shadow-sm">
                                <Truck size={14} />
                            </div>
                            <span className="text-xs font-medium text-gray-500">Shipped</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center border-4 border-white shadow-sm">
                                <Home size={14} />
                            </div>
                            <span className="text-xs font-medium text-gray-500">Delivered</span>
                        </div>
                    </div>

                    {/* What's Next Section */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                        <h3 className="font-bold text-gray-900 mb-2">What happens next?</h3>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>• You'll receive an email confirmation shortly</li>
                            <li>• Your order will be processed within 24 hours</li>
                            <li>• Tracking information will be sent once shipped</li>
                            <li>• Expected delivery: 3-5 business days</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="text-center">
                        <Link
                            to="/"
                            className="inline-block bg-black text-white py-3 px-8 rounded-lg font-bold hover:opacity-90 transition-opacity"
                        >
                            Continue Shopping
                        </Link>
                        <div className="mt-4 flex justify-center gap-4 text-sm">
                            <a
                                href="#"
                                onClick={handleContactSupport}
                                className="text-gray-500 hover:text-gray-900 underline"
                            >
                                Contact Support
                            </a>
                            <Link
                                to="/legal/return-refund"
                                className="text-gray-500 hover:text-gray-900 underline"
                            >
                                Return Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
