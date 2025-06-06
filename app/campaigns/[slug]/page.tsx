import React from "react";
import { INVESTMENT_OPPORTUNITIES_MOCK } from "@/constants/mock-data";
import ImageBlur from "@/components/common/ImageBlur";
import { notFound } from "next/navigation";
import ProgressBar from "@/components/common/ProgressBar";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CampaignDetailsPage = ({ params }: PageProps) => {
  const {slug} = React.use(params)
  // Find the campaign by slug or id
  const campaignData = INVESTMENT_OPPORTUNITIES_MOCK.find(
    (item) =>
      item.opportunity.slug === slug ||
      item.opportunity.id === slug
  );

  if (!campaignData) {
    return notFound();
  }

  const { opportunity, farmerName } = campaignData;
  const {
    title,
    description,
    goalAmount,
    currentAmount,
    returnRate,
    durationMonths,
    riskLevel,
    images,
    location,
    status,
    type,
    investors,
    startDate,
    endDate,
    milestones,
  } = opportunity;

  const progress = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <main className="container mt-[10%] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div>
          <div className="rounded-lg overflow-hidden mb-4">
            <ImageBlur
              className="w-full h-96 object-cover"
              src={images[0]?.url || ""}
              width={800}
              height={600}
              alt={images[0]?.alt || title}
            />
          </div>
          {/* Additional images could go here */}
        </div>

        {/* Right Column - Campaign Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {farmerName && (
              <p className="text-lg text-gray-600 mb-4">By {farmerName}</p>
            )}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  status === "open"
                    ? "bg-blue-100 text-blue-800"
                    : status === "in_progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : status === "completed"
                    ? "bg-green-100 text-green-800"
                    : status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {status.replace("_", " ")}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                {type.replace("_", " ")}
              </span>
            </div>

            <div className="mb-6">
              <ProgressBar progress={progress} />
              <div className="flex justify-between mt-2">
                <span className="font-medium">
                  ${currentAmount.toLocaleString()} raised
                </span>
                <span className="text-gray-600">
                  ${goalAmount.toLocaleString()} goal
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {investors} investors
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">
                About this campaign
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">Return Rate</h3>
              <p className="text-2xl font-bold">{returnRate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">Duration</h3>
              <p className="text-2xl font-bold">{durationMonths} months</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500">Risk Level</h3>
              <p
                className={`text-2xl font-bold ${
                  riskLevel === "low"
                    ? "text-green-600"
                    : riskLevel === "medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {riskLevel}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <p className="text-gray-700">
              {location.city}, {location.state}, {location.country}
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">
                  {startDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium">
                  {endDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Invest Button */}
          <Link
            href={`/campaigns/${opportunity.slug || opportunity.id}/invest`}
          >
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium text-lg">
              Invest in this campaign
            </button>
          </Link>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Project Milestones</h2>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="border-l-4 border-green-500 pl-4 py-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Due: {new Date(milestone.targetDate).toLocaleDateString()}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      milestone.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : milestone.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : milestone.status === "delayed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {milestone.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CampaignDetailsPage;
