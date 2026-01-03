import React from 'react';
import { Check } from 'lucide-react';

const EditorialHeader = ({
    headline,
    subheadline,
    authorName = "Harry Ellison",
    authorTitle = "Senior Health Editor",
    publishDate = "Oct 24, 2025",
    readTime,
    authorImage = "/assets/advertorial-reporter.webp",
    heroImage,
    heroImageAlt = "Article hero image",
    onImageClick
}) => {
    const styles = {
        container: {
            maxWidth: '740px',
            margin: '0 auto',
            fontFamily: "'Georgia', 'Merriweather', serif",
            padding: '2rem 1rem'
        },
        headline: {
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: "'Georgia', 'Merriweather', serif"
        },
        subheadline: {
            fontSize: '1.25rem',
            fontWeight: '400',
            lineHeight: '1.5',
            color: '#4B5563',
            marginBottom: '24px',
            fontFamily: "'Georgia', 'Merriweather', serif"
        },
        bylineWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '24px'
        },
        authorImage: {
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        nameText: {
            fontSize: '16px',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        },
        nameStrong: {
            fontWeight: '600',
            color: '#111827'
        },
        verifiedBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            flexShrink: 0
        },
        credentialsText: {
            fontSize: '14px',
            color: '#6B7280',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        },
        heroImageWrapper: {
            width: '100%',
            marginBottom: '32px',
            cursor: 'pointer'
        },
        heroImage: {
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }
    };

    return (
        <div style={styles.container}>
            {/* Headline */}
            <h1 style={styles.headline}>
                {headline}
            </h1>

            {/* Subheadline */}
            {subheadline && (
                <p style={styles.subheadline}>
                    {subheadline}
                </p>
            )}

            {/* Author Byline */}
            <div style={styles.bylineWrapper}>
                <img
                    src={authorImage}
                    alt={authorName}
                    style={styles.authorImage}
                />
                <div style={styles.textWrapper}>
                    <div style={styles.nameText}>
                        Published by <strong style={styles.nameStrong}>{authorName}</strong>
                        <span style={styles.verifiedBadge}>
                            <Check size={12} color="white" strokeWidth={3} />
                        </span>
                    </div>
                    <div style={styles.credentialsText}>
                        {authorTitle} • Updated {publishDate}{readTime && ` • ${readTime}`}
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            {heroImage && (
                <div
                    style={styles.heroImageWrapper}
                    onClick={() => onImageClick && onImageClick(heroImage, heroImageAlt)}
                    onMouseEnter={(e) => {
                        e.currentTarget.querySelector('img').style.transform = 'scale(1.01)';
                        e.currentTarget.querySelector('img').style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                        e.currentTarget.querySelector('img').style.boxShadow = 'none';
                    }}
                >
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        style={styles.heroImage}
                    />
                </div>
            )}
        </div>
    );
};

export default EditorialHeader;
