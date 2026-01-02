import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AlphaRevive",
        "alternateName": "AlphaRevive Hair Regrowth",
        "url": "https://www.alpharevive.shop",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.alpharevive.shop/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
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
