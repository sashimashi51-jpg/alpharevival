import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "AlphaRevival | Regrow Thicker Hair Naturally",
    description = "The 3-phase microneedling system to reactivate dormant hair follicles. Drug-free, effective, and guaranteed to show results.",
    image = "https://alpharevive.vercel.app/assets/banner_1.png",
    url = "https://alpharevive.vercel.app/",
    type = "website",
    schema = null
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
