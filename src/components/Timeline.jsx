import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Timeline.css';

export const Timeline = ({ data }) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="timeline-container" ref={containerRef}>
            <div className="timeline-wrapper" ref={ref}>
                {data.map((item, index) => (
                    <div key={index} className="timeline-row">
                        <div className="timeline-left">
                            <div className="timeline-dot-wrapper">
                                <div className="timeline-dot" />
                            </div>
                            <h3 className="timeline-title md:hidden">{item.title}</h3>
                        </div>

                        <div className="timeline-right">
                            <h3 className="timeline-title md:visible">{item.title}</h3>
                            <div className="timeline-content">
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}

                <div
                    className="timeline-line-bg"
                    style={{ height: height + "px" }}
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="timeline-line-progress"
                    />
                </div>
            </div>
        </div>
    );
};
