import React, { useEffect } from 'react';

// Replace with your actual Tawk.to Property ID and Widget ID
const TAWK_PROPERTY_ID = 'YOUR_PROPERTY_ID'; // e.g., '5f8b3c4d5e1d1a0d9c8b4567'
const TAWK_WIDGET_ID = 'default'; // Usually 'default' or a specific widget ID

const LiveChat = () => {
    useEffect(() => {
        // Only load if IDs are configured
        if (TAWK_PROPERTY_ID === 'YOUR_PROPERTY_ID') {
            console.warn('Tawk.to not configured. Please update TAWK_PROPERTY_ID in LiveChat.jsx');
            return;
        }

        // Tawk.to integration script
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();

        // Customize the widget
        if (typeof Tawk_API !== 'undefined') {
            Tawk_API.onLoad = function () {
                console.log('Live chat loaded successfully');
            };
        }

        // Cleanup function
        return () => {
            // Remove Tawk widget when component unmounts
            const tawkScript = document.querySelector(`script[src*="tawk.to"]`);
            if (tawkScript) {
                tawkScript.remove();
            }
            const tawkWidget = document.getElementById('tawkchat-container');
            if (tawkWidget) {
                tawkWidget.remove();
            }
        };
    }, []);

    return null; // Component renders nothing, just loads the script
};

export default LiveChat;
