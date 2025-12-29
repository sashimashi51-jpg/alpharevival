import React, { useEffect, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import './StaggerTestimonials.css';

const testimonials = [
    {
        name: "James D.",
        role: "Verified Buyer",
        content: "I was skeptical about microneedling at home, but AlphaRevive made it so easy. The quality of the roller is top-notch, and the serum doesn't leave my hair greasy. 3 months in and my crown is filling in nicely.",
        rating: 5,
    },
    {
        name: "Michael R.",
        role: "Verified Buyer",
        content: "My wife noticed the difference before I did. She said my hair looked 'healthier' after just a few weeks. Now, 2 months later, I can see the thinning spots disappearing. Huge confidence booster.",
        rating: 5,
    },
    {
        name: "David K.",
        role: "Verified Buyer",
        content: "I've tried Minoxidil, but the side effects were too much. This system is completely different. No heart palpitations, no dizziness. Just a simple weekly routine and actual results. Highly recommend.",
        rating: 5,
    },
    {
        name: "Chris P.",
        role: "Verified Buyer",
        content: "It takes consistency. Don't expect magic in week 1. But if you stick to the schedule, it works. I started seeing baby hairs around week 6. Now they are terminal hairs.",
        rating: 4,
    },
    {
        name: "Tom H.",
        role: "Verified Buyer",
        content: "The best part is how little time it takes. 5 minutes on a Sunday? I can do that. It fits perfectly into my busy schedule and the results speak for themselves.",
        rating: 5,
    },
    {
        name: "Robert L.",
        role: "Verified Buyer",
        content: "Finally, something that targets the root cause without drugs. I feel like I'm actually healing my scalp, not just masking the problem.",
        rating: 5,
    },
];

export const StaggerTestimonials = () => {
    return (
        <section className="stagger-section">
            <div className="stagger-container">
                <div className="stagger-header">
                    <h2>Join Thousands of Men Regaining Control</h2>
                    <p>Real stories, real growth.</p>
                </div>

                <div className="stagger-grid">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <div className="testimonial-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < testimonial.rating ? "#fbbf24" : "none"}
                                        color={i < testimonial.rating ? "#fbbf24" : "#e5e7eb"}
                                    />
                                ))}
                            </div>
                            <p className="testimonial-content">"{testimonial.content}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    {/* Initials Avatar */}
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="author-info">
                                    <span className="author-name">{testimonial.name}</span>
                                    <span className="author-role">{testimonial.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
