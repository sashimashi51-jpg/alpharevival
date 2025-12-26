import React, { useState } from 'react';
import styles from './EbookSection.module.css';

export default function EbookSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // In production (Vercel), use relative path to serverless function
            // In development, use backend URL from environment variable
            const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiUrl = isDevelopment
                ? `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4242'}/api/subscribe`
                : '/api/subscribe'; // Vercel serverless function

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    source: 'ebook_inline'
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setEmail('');
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(errorData.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

} else {
    const errorData = await response.json().catch(() => ({}));
    alert(errorData.error || 'Something went wrong. Please try again.');
}
        } catch (error) {
    console.error('Subscription error:', error);
    alert('Network error. Please check your connection and try again.');
} finally {
    setIsSubmitting(false);
}
    };

return (
    <section className={styles.ebookSection}>
        <div className={styles.ebookContainer}>
            <div className={styles.ebookGrid}>
                {/* Left: Book Image */}
                <div className={styles.ebookImageWrapper}>
                    <img
                        src="/assets/product-upscaled.png"
                        alt="The CPR Protocol"
                        className={styles.ebookImage}
                    />
                </div>

                {/* Right: Content */}
                <div className={styles.ebookContent}>
                    <h2 className={styles.ebookTitle}>
                        Get The FREE CPR Protocol
                    </h2>
                    <p className={styles.ebookSubtitle}>
                        How to Flip the Switch on Dormant Hair Follicles (Without Drugs)
                    </p>

                    <ul className={styles.ebookBenefits}>
                        <li>✓ The 3-phase activation system backed by science</li>
                        <li>✓ Why drug-free methods work better long-term</li>
                        <li>✓ The exact timeline for visible results</li>
                        <li>✓ Common mistakes that sabotage regrowth</li>
                        <li>✓ How to maintain results for life</li>
                    </ul>

                    {!isSuccess ? (
                        <>
                            <form onSubmit={handleSubmit} className={styles.ebookForm}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                    className={styles.ebookInput}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={styles.ebookButton}
                                >
                                    {isSubmitting ? 'Sending...' : 'Download Free Guide'}
                                </button>
                            </form>

                            <p className={styles.ebookPrivacy}>
                                🔒 We respect your privacy. Unsubscribe anytime.
                            </p>
                        </>
                    ) : (
                        <div className={styles.successMessage}>
                            ✓ Success! Check your inbox for the CPR Protocol guide.
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
);
}
