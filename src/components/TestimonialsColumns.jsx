import React from "react";
import { motion } from "framer-motion";
import "./TestimonialsColumns.css";

const testimonials = [
    {
        text: "My barber was the one who finally said something. 'Dude, your temples are really filling in.' Best $300 I ever spent. Way better than shaving it off.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Tony R.",
        role: "Chicago, IL",
    },
    {
        text: "I was skeptical because I'd wasted money before. But the weekly thing appealed to me. Around week 6, I started seeing these tiny hairs coming in.",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        name: "Dave W.",
        role: "Portland, OR",
    },
    {
        text: "No shedding, no pills, no side effects. I was terrified of Finasteride. This is exactly what I was looking for. My hairline is back.",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        name: "Mike T.",
        role: "Dallas, TX",
    },
    {
        text: "I almost paid $8,000 for a transplant. Tried this first. Six months later, I'm not wearing hats anymore. Even my dad was impressed.",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        name: "James K.",
        role: "Miami, FL",
    },
    {
        text: "The application is really simple. Just roll it around and apply the serum. Takes maybe a minute. The confidence boost alone was worth it.",
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        name: "Robert P.",
        role: "Austin, TX",
    },
    {
        text: "My wife kept insisting I try something. She found this. Now she says I look 10 years younger. Can't argue with that!",
        image: "https://randomuser.me/api/portraits/men/54.jpg",
        name: "Daniel H.",
        role: "Seattle, WA",
    },
    {
        text: "I was balding at the crown. It was embarrassing. 4 months of AlphaRevival and the spot is gone. Completely filled in.",
        image: "https://randomuser.me/api/portraits/men/76.jpg",
        name: "Chris M.",
        role: "Boston, MA",
    },
    {
        text: "Zero side effects. That was my main condition. This stuff actually works without messing with your hormones. Highly recommend.",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
        name: "Alex B.",
        role: "Denver, CO",
    },
    {
        text: "Shipping was fast, packaging is premium. But the results? Real. Look at the mirror and see hair instead of scalp. Amazing.",
        image: "https://randomuser.me/api/portraits/men/89.jpg",
        name: "Sam L.",
        role: "Phoenix, AZ",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => (
    <div className={`testimonials-column ${className || ""}`}>
        <motion.div
            animate={{
                translateY: "-50%",
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
            }}
            className="testimonials-column-content"
        >
            {[...new Array(2)].fill(0).map((_, index) => (
                <React.Fragment key={index}>
                    {testimonials.map(({ text, image, name, role }, i) => (
                        <div className="testimonial-card-new" key={i}>
                            <div className="testimonial-text">{text}</div>
                            <div className="testimonial-user">
                                <img src={image} alt={name} />
                                <div className="testimonial-info">
                                    <div className="testimonial-name">{name}</div>
                                    <div className="testimonial-role">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
);

const TestimonialsColumns = () => {
    return (
        <section className="testimonials-section-new">
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="testimonials-header"
                >
                    <div className="testimonials-badge">Results</div>
                    <h2 className="testimonials-title">
                        Real Men. Real Regrowth.
                    </h2>
                    <p className="testimonials-subtitle">
                        Join thousands of men who took action and reclaimed their hair.
                    </p>
                </motion.div>

                <div className="testimonials-columns-wrapper">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden-mobile" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden-tablet" duration={17} />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsColumns;
