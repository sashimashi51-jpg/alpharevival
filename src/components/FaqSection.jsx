import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { FlowButton } from "./FlowButton";
import "./FaqSection.css";

const FaqItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className={`faq-item-new ${isOpen ? "open" : ""}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="faq-trigger"
                aria-expanded={isOpen}
            >
                <span className="faq-question-text">{question}</span>
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="faq-icon-wrapper"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeIn" },
                        }}
                    >
                        <div className="faq-content">
                            <motion.p
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                className="faq-answer-text"
                            >
                                {answer}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};



const FaqSection = ({
    title,
    description,
    items,
    contactInfo,
    className = ""
}) => {
    return (
        <section className={`faq-section-new ${className}`}>
            <div className="faq-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="faq-header"
                >
                    <h2 className="faq-title">{title}</h2>
                    {description && (
                        <p className="faq-description">{description}</p>
                    )}
                </motion.div>

                {/* FAQ Items */}
                <div className="faq-list-new">
                    {items.map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            index={index}
                        />
                    ))}
                </div>

                {/* Contact Section */}
                {contactInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="faq-contact-card"
                    >
                        <div className="faq-contact-icon">
                            <Mail size={16} />
                        </div>
                        <p className="faq-contact-title">{contactInfo.title}</p>
                        <p className="faq-contact-desc">{contactInfo.description}</p>
                        <FlowButton
                            text={contactInfo.buttonText}
                            onClick={contactInfo.onContact}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;
