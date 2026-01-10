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
                        This is where the shift begins. Micro-channels open, blood flow increases,
                        and peptides reach follicles that haven't been fed in years.
                    </p>

                    <div className="timeline-card">
                        <h5 className="timeline-card-title">
                            <Droplets className="icon-blue" size={18} />
                            What you'll notice:
                        </h5>
                        <ul className="timeline-list">
                            <li><strong>Healthier Scalp:</strong> Less dryness, more vitality.</li>
                            <li><strong>The "Shedding" Shift:</strong> Weak strands clear the way for stronger growth.</li>
                            <li><strong>First Glimmers of Hope:</strong> That tingling sensation—blood rushing back to dormant follicles.</li>
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
                        The routine becomes ritual. Shedding stops, your scalp environment is primed,
                        and you start catching yourself checking the mirror—expecting change instead of dreading it.
                    </p>

                    <div className="timeline-card">
                        <h5 className="timeline-card-title">
                            <Sparkles className="icon-yellow" size={18} />
                            What you'll notice:
                        </h5>
                        <ul className="timeline-list">
                            <li><strong>Thicker Roots:</strong> Hair feels stronger, more anchored.</li>
                            <li><strong>"Peach Fuzz":</strong> Fine hairs appear where there was only scalp.</li>
                            <li><strong>A Shift in Posture:</strong> You stop tilting your head to hide. You just… look.</li>
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
                        This is where it clicks. Dormant follicles reactivate. Visibility returns.
                        And somewhere along the way, you stop avoiding photos—you start asking for them.
                    </p>

                    <div className="timeline-card">
                        <h5 className="timeline-card-title">
                            <TrendingUp className="icon-green" size={18} />
                            What you'll notice:
                        </h5>
                        <ul className="timeline-list">
                            <li><strong>Darkening Growth:</strong> "Peach fuzz" becomes real, visible hair.</li>
                            <li><strong>Filling Gaps:</strong> Temples and crown areas visually restore.</li>
                            <li><strong>Confidence Restored:</strong> You recognize the man in the mirror again.</li>
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
