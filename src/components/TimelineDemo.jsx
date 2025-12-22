import React from "react";
import { Timeline } from "./Timeline"; // Fixed import path
import { Droplets, Sparkles, TrendingUp } from "lucide-react";
import './TimelineDemo.css';

export default function TimelineDemo() {
    const data = [
        {
            title: "Weeks 1–3",
            content: (
                <div className="timeline-item-content">
                    <h4 className="timeline-item-title">
                        The Awakening Phase
                    </h4>
                    <p className="timeline-item-desc">
                        This is where the habit begins. Micro-channels open, blood flow increases,
                        and peptides penetrate deep into the root.
                    </p>

                    <div className="timeline-card">
                        <h5 className="timeline-card-title">
                            <Droplets className="icon-blue" size={18} />
                            What you might see:
                        </h5>
                        <ul className="timeline-list">
                            <li><strong>Healthier Scalp:</strong> Less dryness as the serum hydrates.</li>
                            <li><strong>The "Shedding" Shift:</strong> A positive sign that weak strands are being pushed out.</li>
                            <li><strong>Texture Change:</strong> Existing hair may feel thicker at the root.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: "Weeks 4–5",
            content: (
                <div className="timeline-item-content">
                    <h4 className="timeline-item-title">
                        The Stabilization Phase
                    </h4>
                    <p className="timeline-item-desc">
                        The routine becomes second nature. Shedding typically stops, and your scalp
                        environment is fully primed for growth.
                    </p>

                    <div className="timeline-card">
                        <h5 className="timeline-card-title">
                            <Sparkles className="icon-yellow" size={18} />
                            What you might see:
                        </h5>
                        <ul className="timeline-list">
                            <li><strong>Thicker Roots:</strong> The base of hair shafts feels stronger and more rigid.</li>
                            <li><strong>"Peach Fuzz":</strong> Fine, colorless hairs begin to poke through thinning areas.</li>
                            <li><strong>Less Visibility:</strong> Your scalp becomes less visible under bright lights.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: "Weeks 6–10",
            content: (
                <div className="timeline-item-content">
                    <h4 className="timeline-item-title">
                        The Transformation Phase
                    </h4>
                    <p className="timeline-item-desc">
                        The biological switch has been flipped. Dormant follicles are reactivated,
                        and visible density begins to return.
                    </p>

                    <div className="timeline-card">
                        <h5 className="timeline-card-title">
                            <TrendingUp className="icon-green" size={18} />
                            What you might see:
                        </h5>
                        <ul className="timeline-list">
                            <li><strong>Darkening Growth:</strong> "Peach fuzz" turns into thick, terminal hairs.</li>
                            <li><strong>Filling Gaps:</strong> Temples and crown areas visually start to fill in.</li>
                            <li><strong>Style Confidence:</strong> You need less product to hold your hair's shape.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="timeline-demo-container">
            <Timeline data={data} />
        </div>
    );
}
