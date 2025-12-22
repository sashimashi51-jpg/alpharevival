import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FlowButton.css';

export function FlowButton({ text = "Shop Now", to, type = "button", className = "", ...props }) {
    const content = (
        <>
            <ArrowRight className="flow-icon flow-icon-left" />
            <span className="flow-text">{text}</span>
            <span className="flow-circle"></span>
            <ArrowRight className="flow-icon flow-icon-right" />
        </>
    );

    const classes = `flow-btn ${className}`;

    if (to) {
        return <Link to={to} className={classes} {...props}>{content}</Link>;
    }

    return (
        <button type={type} className={classes} {...props}>
            {content}
        </button>
    );
}

export default FlowButton;
