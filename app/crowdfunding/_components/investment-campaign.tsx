import React from "react";

export default function InvestmentCampaignCard() {
    return (
        <div
            className="flex items-center rounded-lg p-6 shadow-lg hover:cursor-pointer"
            style={{
                backgroundImage: `linear-gradient(to right, #015F01, #028F02), url('/images/coins.jpg')`,
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
            }}
        >
            {/* SVG Icon */}
            <div className="flex-shrink-0 mr-6">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="32" cy="32" r="32" fill="#fff" fillOpacity="0.15" />
                    <path
                        d="M32 44c6.627 0 12-5.373 12-12S38.627 20 32 20s-12 5.373-12 12 5.373 12 12 12zm0-2c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-1-15v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z"
                        fill="#fff"
                    />
                </svg>
            </div>
            {/* Campaign Info */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Create a new Investment Campaign</h2>
                <p className="text-base">
                    Start a new campaign to raise funds for your next agricultural project.
                </p>
            </div>
        </div>
    );
}