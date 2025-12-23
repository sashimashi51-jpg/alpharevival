import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const FakeLiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Pre-written responses based on keywords
    const responses = {
        greeting: "Hi! 👋 I'm here to help you with any questions about AlphaRevive. What would you like to know?",

        price: "Great question! Our most popular package is the 3-Month Supply at $109 (saves $100). We also have 1-month ($69) and 6-month ($189) options. All include FREE shipping and our 120-Day Money-Back Guarantee!",

        works: "AlphaRevive uses microneedling + peptide serums to reactivate dormant hair follicles. Most men see baby hairs within 8 weeks, and noticeable thickening by month 4. It's backed by clinical studies and a 120-day guarantee!",

        safe: "100% safe! The 0.5mm needles stay in the safe zone (epidermis) and our serum is drug-free. No side effects like Minoxidil or Finasteride. Thousands of men use it safely.",

        guarantee: "We offer a 120-Day Money-Back Guarantee - that's 4 full months to try it! If you don't see results, we'll refund you. We take all the risk.",

        shipping: "FREE shipping on all orders! We ship within 24 hours and delivery typically takes 3-5 business days in the US. International shipping is also available.",

        results: "Most men notice baby hairs (vellus) within 8 weeks. Visible thickening happens around month 4. For best results, use twice weekly for 6 months. Check our before/after photos!",

        pain: "Not at all! The 0.5mm needles feel like a gentle tingle - most guys say it's actually relaxing. Takes just 2 minutes, twice a week.",

        sideeffects: "Zero side effects! Unlike drugs (Minoxidil, Finasteride), there's no dizziness, heart issues, or sexual problems. It's 100% natural and safe.",

        forever: "For best results, use long-term (like brushing teeth). But once follicles reactivate, you can often reduce to once weekly for maintenance.",

        default: "I can help with questions about:\n• Pricing & packages\n• How it works\n• Safety & side effects\n• Money-back guarantee\n• Shipping & delivery\n• Results timeline\n\nWhat would you like to know?"
    };

    const quickButtons = [
        { text: "How does it work?", keyword: "works" },
        { text: "Is it safe?", keyword: "safe" },
        { text: "Pricing?", keyword: "price" },
        { text: "Money-back guarantee?", keyword: "guarantee" }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Send greeting after a short delay
            setTimeout(() => {
                addBotMessage(responses.greeting);
            }, 500);
        }
    }, [isOpen]);

    const addBotMessage = (text) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { text, sender: 'bot', timestamp: new Date() }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000); // Random typing delay
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { text, sender: 'user', timestamp: new Date() }]);
        handleResponse(text);
    };

    const handleResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();
        let response = responses.default;

        if (msg.includes('price') || msg.includes('cost') || msg.includes('much')) {
            response = responses.price;
        } else if (msg.includes('work') || msg.includes('effective')) {
            response = responses.works;
        } else if (msg.includes('safe') || msg.includes('dangerous')) {
            response = responses.safe;
        } else if (msg.includes('guarantee') || msg.includes('refund') || msg.includes('money back')) {
            response = responses.guarantee;
        } else if (msg.includes('ship') || msg.includes('delivery') || msg.includes('deliver')) {
            response = responses.shipping;
        } else if (msg.includes('result') || msg.includes('see') || msg.includes('when')) {
            response = responses.results;
        } else if (msg.includes('pain') || msg.includes('hurt')) {
            response = responses.pain;
        } else if (msg.includes('side effect') || msg.includes('side-effect')) {
            response = responses.sideeffects;
        } else if (msg.includes('forever') || msg.includes('stop')) {
            response = responses.forever;
        } else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
            response = responses.greeting;
        }

        addBotMessage(response);
    };

    const handleQuickButton = (keyword) => {
        addUserMessage(quickButtons.find(b => b.keyword === keyword).text);
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 group"
                    style={{ width: '64px', height: '64px' }}
                >
                    <MessageCircle size={32} className="group-hover:animate-bounce" />
                    <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Bot size={32} />
                                <span className="absolute bottom-0 right-0 bg-green-400 w-3 h-3 rounded-full border-2 border-white"></span>
                            </div>
                            <div>
                                <div className="font-bold">AlphaRevive Support</div>
                                <div className="text-xs opacity-90">Online • Instant replies</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                                    }`}>
                                    <div className="text-sm whitespace-pre-line">{msg.text}</div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl p-3 flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Buttons */}
                    {messages.length > 0 && (
                        <div className="p-3 bg-white border-t border-gray-200 flex flex-wrap gap-2">
                            {quickButtons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuickButton(btn.keyword)}
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
                                >
                                    {btn.text}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input - Disabled but looks real */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="text-xs text-center text-gray-500 mb-2">
                            Click a question above or ask anything!
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FakeLiveChat;
