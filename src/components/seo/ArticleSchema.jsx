import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function ArticleSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The Follicle Activation Protocol: Why 2026 Microneedling is the 'Non-Surgical Transplant'",
        "description": "A deep dive into the innovative method for hair regrowth that combines microneedling with peptide therapy.",
        "image": "https://www.alpharevive.shop/assets/blog/microneedling-hero.jpg",
        "author": {
            "@type": "Organization",
            "name": "AlphaRevive Science Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AlphaRevive",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.alpharevive.shop/assets/logo_alpharevive.webp"
            }
        },
        "datePublished": "2026-01-02",
        "dateModified": "2026-01-02",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.alpharevive.shop/journal/follicle-activation-protocol"
        },
        "keywords": "microneedling hair regrowth, microneedling hair, hair regrowth new method, innovative method hair regrowth, microneedling for hair"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
