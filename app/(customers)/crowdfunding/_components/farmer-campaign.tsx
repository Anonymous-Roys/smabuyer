"use client";
import ImageBlur from "@/components/common/ImageBlur";
import React from "react";
import { famerCampaignCardProps } from "@/types/investment";
import { useRouter } from "next/navigation";

const FarmerCampaignCard: React.FC<famerCampaignCardProps> = ({
    opportunity,
    farmerName,
}) => {
    const router = useRouter();
    const {
        id,
        title,
        description,
        goalAmount,
        currentAmount,
        returnRate,
        durationMonths,
        riskLevel,
        images,
        location,
        slug,
    } = opportunity;

    const progress = Math.min((currentAmount / goalAmount) * 100, 100);

    // Handler for navigating to details page
    const handleReadMore = () => {
        router.push(`/campaigns/${slug || id}`);
    };
const handleInvest = () => {
        router.push(`/campaigns/${slug || id}/invest`);
    };
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
            <div 
                className="cursor-pointer" 
                onClick={handleReadMore}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleReadMore()}
            >
                <ImageBlur
                    className="w-full h-48 object-cover"
                    src={images[0]?.url || ""}
                    width={40000}
                    height={40}
                    alt={images[0]?.alt || title}
                />
            </div>
            <div className="p-4">
                <h2 
                    className="text-lg font-semibold mb-1 cursor-pointer hover:text-green-600"
                    onClick={handleReadMore}
                >
                    {title}
                </h2>
                {farmerName && (
                    <p className="text-sm text-gray-600 mb-2">By {farmerName}</p>
                )}
                <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
                
                {/* Read More button */}
                <button 
                    onClick={handleReadMore}
                    className="text-green-600 hover:text-green-800 text-sm mb-4 font-medium"
                >
                    Read More
                </button>
                
                <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>
                            <strong>${currentAmount.toLocaleString()}</strong> raised
                        </span>
                        <span>of ${goalAmount.toLocaleString()} goal</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                    <span>
                        <strong>Return:</strong> {returnRate}%
                    </span>
                    <span>
                        <strong>Duration:</strong> {durationMonths} mo
                    </span>
                    <span>
                        <strong>Risk:</strong>{" "}
                        <span
                            className={
                                riskLevel === "low"
                                    ? "text-green-600"
                                    : riskLevel === "medium"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }
                        >
                            {riskLevel}
                        </span>
                    </span>
                </div>
                <div className="text-xs text-gray-500 mb-4">
                    {location.city}, {location.state}, {location.country}
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleInvest}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
                    >
                        Invest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FarmerCampaignCard;