import React from "react";
import { Metadata } from "next";

export const meta: Metadata = {
  title: "Crowdfunding",
  description:
    "Crowdfunding is a method of raising capital through the collective effort of a large number of individuals, typically via online platforms, to fund projects, businesses, or causes.",
};

import FundStatCard from "./_components/funds-stat";
import InvestmentCampaignCard from "./_components/investment-campaign";
import FarmerCampaignCard from "./_components/farmer-campaign";
import {
  FUND_STATS_MOCK,
  INVESTMENT_OPPORTUNITIES_MOCK,
} from "@/constants/mock-data";

const HomePage = () => {
  return (
    <main className="container mx-auto px-4 mt-[20%] sm:mt-[10%]">
      <div className="space-y-10 lg:space-y-0 flex flex-col lg:flex-row items-center gap-4 justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {FUND_STATS_MOCK.map((stat, idx) => (
            <FundStatCard key={idx} {...stat} />
          ))}
        </div>
        <div>
          <InvestmentCampaignCard />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {INVESTMENT_OPPORTUNITIES_MOCK.map((campaign, idx) => (
          <FarmerCampaignCard key={idx} {...campaign} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
