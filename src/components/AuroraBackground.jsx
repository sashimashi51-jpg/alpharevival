import React from "react";
import "./AuroraBackground.css";

export const AuroraBackground = ({
    className = "",
    children,
    showRadialGradient = true,
    ...props
}) => {
    return (
        <div
            className={`aurora-container ${className}`}
            {...props}
        >
            <div className="aurora-effect">
                <div
                    className={`aurora-layer ${showRadialGradient ? "mask-radial" : ""}`}
                ></div>
            </div>
            <div className="aurora-content">
                {children}
            </div>
        </div>
    );
};
