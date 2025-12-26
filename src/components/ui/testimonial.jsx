import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TestimonialCarousel = React.forwardRef(
    ({ className, testimonials, showArrows = false, showDots = true, ...props }, ref) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [exitX, setExitX] = useState(0);

        const handleDragEnd = (event, info) => {
            if (Math.abs(info.offset.x) > 100) {
                setExitX(info.offset.x);
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                    setExitX(0);
                }, 200);
            }
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "h-96 w-full flex items-center justify-center",
                    className
                )}
                {...props}
            >
                <div className="relative w-full max-w-md h-80">
                    {testimonials.map((testimonial, index) => {
                        const isCurrentCard = index === currentIndex;
                        const isPrevCard =
                            index === (currentIndex + 1) % testimonials.length;
                        const isNextCard =
                            index === (currentIndex + 2) % testimonials.length;

                        if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

                        return (
                            <motion.div
                                key={testimonial.id}
                                className={cn(
                                    "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                                    "bg-white shadow-xl border border-gray-100",
                                )}
                                style={{
                                    zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                                }}
                                drag={isCurrentCard ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.7}
                                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                                initial={{
                                    scale: 0.95,
                                    opacity: 0,
                                    y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                                    rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                                }}
                                animate={{
                                    scale: isCurrentCard ? 1 : 0.95,
                                    opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                                    x: isCurrentCard ? exitX : 0,
                                    y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                                    rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <div className="p-8 flex flex-col items-center gap-4 h-full justify-center">
                                    <div className="text-yellow-400 text-xl mb-2">★ ★ ★ ★ ★</div>
                                    <p className="text-center text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {testimonial.description}
                                    </p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-gray-900">— {testimonial.name}</p>
                                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                <span className="text-green-600">✓</span> Verified Purchase
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    {showDots && (
                        <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                            {testimonials.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-colors cursor-pointer",
                                        index === currentIndex
                                            ? "bg-green-600"
                                            : "bg-gray-300",
                                    )}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel };
