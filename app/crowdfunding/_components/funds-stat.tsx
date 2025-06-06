import React from "react";
import { FundStatCardProps } from "@/types/fund-stat";
import ImageBlur from "@/components/common/ImageBlur";
import TrajectoryUp from "./svg/trajectory-up";
import TrajectoryDown from "./svg/trajectory-down";


const getStatColor = (isGrowth: boolean) =>
  isGrowth ? "text-green-600" : "text-red-600";

const getPercentIcon = (isRise: boolean) =>
  isRise ? (
    <svg width={14} height={14} fill="none" viewBox="0 0 14 14">
      <path d="M7 2l4 4H3l4-4z" fill="#16A34A" />
    </svg>
  ) : (
    <svg width={14} height={14} fill="none" viewBox="0 0 14 14">
      <path d="M7 12l-4-4h8l-4 4z" fill="#DC2626" />
    </svg>
  );

const FundStatCard: React.FC<FundStatCardProps> = ({
  logo,
  statName,
  isGrowth,
  percentage,
  isPercentageRise,
  totalFunds,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-lg shadow bg-white border">
      <div className="flex">
        <div className="flex items-center gap-2">
          <ImageBlur
            className="rounded-full"
            src={logo}
            width={50}
            height={50}
            alt={`${statName} logo`}
          />
          <span className="font-bold text-gray-700">{statName}</span>
        </div>
        <div className="flex items-center gap-2">
            {isGrowth ? (
                <TrajectoryUp className="text-green-600" />
            ) : (
                <TrajectoryDown className="text-red-600" />
            )} 
        </div>
      </div>
      <div className="flex-1 self-end">
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-lg font-bold ${getStatColor(isGrowth)}`}>
            {totalFunds}
          </span>
          <span className="flex items-center gap-1 text-sm">
            {getPercentIcon(isPercentageRise)}
            <span
              className={isPercentageRise ? "text-green-600" : "text-red-600"}
            >
              {percentage > 0 ? "+" : ""}
              {percentage}%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FundStatCard;
