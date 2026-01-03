import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ImageLightbox = ({ imageSrc, imageAlt, isOpen, onClose }) => {
    // Handle ESC key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !imageSrc) return null;

    // Detect if the source is a video file
    const isVideo = imageSrc?.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/);

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            animation: 'fadeIn 0.2s ease-in-out'
        },
        closeButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
        },
        media: {
            maxWidth: '90%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '4px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }
    };

    return (
        <div
            style={styles.overlay}
            onClick={onClose}
        >
            <button
                style={styles.closeButton}
                onClick={onClose}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Close"
            >
                <X size={24} color="white" />
            </button>

            {isVideo ? (
                <video
                    src={imageSrc}
                    style={{
                        ...styles.media,
                        animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    controls
                    autoPlay
                    loop
                    muted
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    style={{
                        ...styles.media,
                        animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
            )}

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default ImageLightbox;
