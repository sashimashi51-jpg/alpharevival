import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './FeaturedArticle.css';

export default function FeaturedArticle() {
    return (
        <section className="featured-article-section">
            <div className="container">
                <div className="featured-article-card">
                    <div className="article-badge">Featured Guide</div>
                    <h2>Want to understand the science behind hair regrowth?</h2>
                    <p>
                        Learn everything about our revolutionary approach in our comprehensive guide on{' '}
                        <Link to="/journal/microneedling-hair-regrowth-protocol" className="keyword-link">
                            microneedling hair regrowth
                        </Link>
                        .
                    </p>
                    <Link to="/journal/microneedling-hair-regrowth-protocol" className="article-cta">
                        Read the Full Guide <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
