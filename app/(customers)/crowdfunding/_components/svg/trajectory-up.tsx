import React from "react";

const TrajectoryUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        {...props}
    >
        <path
            d="M6 38L20 24L28 32L42 14"
            stroke="#22C55E"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx={42} cy={14} r={2.5} fill="#22C55E" />
        <circle cx={6} cy={38} r={2} fill="#22C55E" />
        <circle cx={20} cy={24} r={2} fill="#22C55E" />
        <circle cx={28} cy={32} r={2} fill="#22C55E" />
        <polyline
            points="38,18 42,14 46,18"
            fill="none"
            stroke="#22C55E"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default TrajectoryUp;