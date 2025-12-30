import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, AlertCircle, Home, Calendar } from 'lucide-react';

export default function TrackingPage() {
    const [searchParams] = useSearchParams();
    const [orderNumber, setOrderNumber] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'found', 'not_found'
    const [trackingData, setTrackingData] = useState(null);

    useEffect(() => {
        const orderParam = searchParams.get('order');
        if (orderParam) {
            setOrderNumber(orderParam);
            // Optional: Auto-search if coming from success page
            // But usually better to ask for email for verification,
            // however for this demo flow we'll auto-check if it matches session.
            const storedOrderNumber = sessionStorage.getItem('lastOrderNumber');
            if (storedOrderNumber === orderParam) {
                 performSearch(orderParam, true);
            }
        }
    }, [searchParams]);

    const performSearch = (orderId, isAuto = false) => {
        setStatus('loading');

        // Simulate network delay
        setTimeout(() => {
            const storedOrderNumber = sessionStorage.getItem('lastOrderNumber');

            // Logic:
            // 1. If matches session storage -> Found (Processing)
            // 2. If looks like valid format (REV-XXXXX) -> Found (Processing) - for demo
            // 3. Else -> Not Found

            if (orderId === storedOrderNumber || (orderId.startsWith('REV-') && orderId.length > 5)) {
                setStatus('found');
                setTrackingData({
                    status: 'Processing',
                    date: new Date().toLocaleDateString(),
                    step: 1, // 0: Confirmed, 1: Processing, 2: Shipped, 3: Delivered
                    carrier: 'USPS',
                    estimatedDelivery: '3-5 Business Days',
                    history: [
                        { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), status: 'Order Confirmed', location: 'Online Store' },
                        { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), status: 'Processing Order', location: 'Warehouse' }
                    ]
                });
            } else {
                setStatus('not_found');
                setTrackingData(null);
            }
        }, isAuto ? 500 : 1000);
    };

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderNumber) return;
        performSearch(orderNumber);
    };

    const getStatusStep = (step) => {
        const steps = [
            { icon: CheckCircle, label: 'Confirmed' },
            { icon: Package, label: 'Processing' },
            { icon: Truck, label: 'Shipped' },
            { icon: Home, label: 'Delivered' }
        ];

        return (
            <div className="relative flex justify-between items-center w-full my-8 px-4">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-black -z-10 -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i <= step;
                    const isCompleted = i < step;

                    return (
                        <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                                ${isActive ? 'bg-black border-black text-white' : 'bg-white border-gray-300 text-gray-400'}
                            `}>
                                <Icon size={18} />
                            </div>
                            <span className={`text-xs font-medium ${isActive ? 'text-black' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 min-h-screen pt-32 pb-20"
        >
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
                    <p className="text-gray-600">Enter your order number to see the current status of your shipment.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-10">
                    <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-grow">
                            <label htmlFor="orderNumber" className="sr-only">Order Number</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    id="orderNumber"
                                    placeholder="Order Number (e.g. REV-12345)"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-black text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Searching...
                                    </>
                                ) : 'Track Order'}
                            </button>
                        </div>
                    </form>

                    {status === 'found' && trackingData && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-t border-gray-100 pt-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wide">Order Status</p>
                                    <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                                        {trackingData.status}
                                    </h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Expected Delivery</p>
                                    <p className="font-semibold text-gray-900 flex items-center gap-1 md:justify-end">
                                        <Calendar size={16} />
                                        {trackingData.estimatedDelivery}
                                    </p>
                                </div>
                            </div>

                            {getStatusStep(trackingData.step)}

                            <div className="mt-10 bg-gray-50 rounded-xl p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Tracking History</h3>
                                <div className="space-y-6 relative pl-2">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                                    {trackingData.history.map((event, idx) => (
                                        <div key={idx} className="relative flex gap-4">
                                            <div className="w-3 h-3 bg-black rounded-full mt-1.5 relative z-10 ring-4 ring-gray-50"></div>
                                            <div>
                                                <p className="font-bold text-gray-900">{event.status}</p>
                                                <p className="text-sm text-gray-500">{event.location}</p>
                                                <p className="text-xs text-gray-400 mt-1">{event.date} at {event.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 text-center text-sm text-gray-500">
                                <p>Carrier: {trackingData.carrier} — Tracking info may take up to 24 hours to update.</p>
                            </div>
                        </motion.div>
                    )}

                    {status === 'not_found' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-10 bg-red-50 rounded-xl border border-red-100"
                        >
                            <AlertCircle className="mx-auto text-red-500 mb-3" size={48} />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                We couldn't find an order with that number. Please check the number and try again, or contact support if you believe this is an error.
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Note: New orders may take a few minutes to appear in our system.
                            </p>
                        </motion.div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 mb-4">Need help finding your order?</p>
                    <Link to="/contact" className="text-black font-semibold hover:underline">
                        Contact Customer Support
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
