import React from "react";

const TrajectoryDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width={48}
        height={48}
        viewBox="0 0 64 64"
        fill="none"
        {...props}
    >
        <path
            d="M8 16L24 32L36 20L56 40"
            stroke="#E53E3E"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M56 40V28M56 40H44"
            stroke="#E53E3E"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default TrajectoryDown;