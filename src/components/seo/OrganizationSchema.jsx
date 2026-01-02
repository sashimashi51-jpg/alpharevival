import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AlphaRevive",
        "url": "https://www.alpharevive.shop",
        "logo": "https://www.alpharevive.shop/assets/logo_alpharevive.webp",
        "description": "AlphaRevive offers clinically-proven hair regrowth solutions for men using advanced microneedling technology and peptide therapy.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "452 Saratoga Ave #103",
            "addressLocality": "San Jose",
            "addressRegion": "CA",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@alpharevive.shop",
            "contactType": "Customer Service"
        },
        "sameAs": [
            "https://www.facebook.com/alpharevive",
            "https://www.instagram.com/alpharevive"
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
