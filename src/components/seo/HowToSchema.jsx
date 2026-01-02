import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function HowToSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Apply the AlphaRevive Microneedling Protocol",
        "description": "Step-by-step guide for applying microneedling and peptide therapy for hair regrowth at home",
        "totalTime": "PT3M",
        "supply": [
            {
                "@type": "HowToSupply",
                "name": "AlphaRevive Microneedling Device"
            },
            {
                "@type": "HowToSupply",
                "name": "Peptide Serum (1ml)"
            }
        ],
        "tool": {
            "@type": "HowToTool",
            "name": "0.5mm or 1.5mm Microneedling Roller"
        },
        "step": [
            {
                "@type": "HowToStep",
                "name": "Cleanse",
                "text": "Wash scalp with lukewarm water (no shampoo 24hrs before)",
                "position": 1
            },
            {
                "@type": "HowToStep",
                "name": "Microneedle",
                "text": "Roll in 4 directions (vertical, horizontal, diagonal both ways) over thinning areas",
                "position": 2
            },
            {
                "@type": "HowToStep",
                "name": "Apply Serum",
                "text": "Immediately apply 1ml of peptide serum while micro-channels are open",
                "position": 3
            },
            {
                "@type": "HowToStep",
                "name": "Wait",
                "text": "Let absorb for 10 minutes, then rinse gently (optional)",
                "position": 4
            }
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
