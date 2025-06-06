export interface FundStatCardProps {
    logo: string; // e.g. <img src="..." />
    statName: FundStatType;
    directionImage: React.ReactNode; // e.g. up/down arrow icon
    isGrowth: boolean; // true = growth, false = falling
    percentage: number; // e.g. 12.5
    isPercentageRise: boolean; // true = rise, false = fall
    totalFunds: string; // e.g. "$12,000"
}
export type FundStatType = "Funds Growth" | "Weekly Funds" | "Funds Raised";