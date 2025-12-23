import React, { useEffect } from 'react';

// Replace with your actual IDs
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
const CLARITY_PROJECT_ID = 'xxxxxxxxx';

const Analytics = () => {
    useEffect(() => {
        // --- Google Analytics 4 ---
        if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}');
            `;
            document.head.appendChild(script2);
        }

        // --- Microsoft Clarity ---
        if (CLARITY_PROJECT_ID && CLARITY_PROJECT_ID !== 'xxxxxxxxx') {
            (function (c, l, a, r, i, t, y) {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
        }
    }, []);

    return null; // Component renders nothing
};

export default Analytics;
