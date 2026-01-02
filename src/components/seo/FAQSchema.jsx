import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function FAQSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Does microneedling work for hair loss?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, clinical studies show microneedling for hair loss is effective. It creates micro-channels that stimulate hair follicles and enhance absorption of growth factors by up to 400%, leading to visible regrowth in 90-120 days."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to see hair regrowth results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most users see visible results within 90 days of consistent use. Initial improvements like reduced shedding may appear within 4-6 weeks, with significant regrowth visible by month 3-4."
                }
            },
            {
                "@type": "Question",
                "name": "Is AlphaRevive safe to use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, AlphaRevive is safe and uses natural peptides with no prescription drugs like Minoxidil or Finasteride. The microneedling device is designed for safe at-home use with minimal discomfort."
                }
            },
            {
                "@type": "Question",
                "name": "What causes hair loss in men?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Male pattern baldness is primarily caused by DHT (dihydrotestosterone) shrinking hair follicles, genetics, hormonal changes, poor scalp circulation, and nutrient deficiency. AlphaRevive addresses multiple causes simultaneously."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use AlphaRevive with other hair loss treatments?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, AlphaRevive can be used alongside other treatments. However, we recommend using it as a standalone solution first for 90 days to properly evaluate results before combining therapies."
                }
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
