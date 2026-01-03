import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function ProductSchema() {
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "AlphaRevive Hair Growth System",
        "image": "https://www.alpharevive.shop/assets/product-upscaled.webp",
        "description": "Clinically-proven hair regrowth system combining microneedling with peptide serum for treating hair loss, thinning, and bald spots in men.",
        "brand": {
            "@type": "Brand",
            "name": "AlphaRevive"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://www.alpharevive.shop/product",
            "priceCurrency": "USD",
            "price": "129.99",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "AlphaRevive"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
