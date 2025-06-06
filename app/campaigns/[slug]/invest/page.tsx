"use client";
import React, { useState } from "react";
import { INVESTMENT_OPPORTUNITIES_MOCK } from "@/constants/mock-data";
import { notFound } from "next/navigation";
import ImageBlur from "@/components/common/ImageBlur";
import Link from "next/link";
import router from "next/router";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CampaignInvestPage = ({ params }: PageProps) => {
  const { slug } = React.use(params);
  // State for investment amount
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("bank-transfer");
  const [notes, setNotes] = useState<string>("");

  // Modal state
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Find the campaign by slug or id
  const campaignData = INVESTMENT_OPPORTUNITIES_MOCK.find(
    (item) => item.opportunity.slug === slug || item.opportunity.id === slug
  );

  if (!campaignData) {
    return notFound();
  }

  const { opportunity } = campaignData;
  const {
    title,
    description,
    goalAmount,
    currentAmount,
    minInvestment,
    returnRate,
    durationMonths,
    images,
  } = opportunity;

  if (investmentAmount === 0) {
    setInvestmentAmount(minInvestment);
  }

  // Calculate expected returns
  const expectedReturns = (investmentAmount * returnRate) / 100;
  const totalPotentialReturn = investmentAmount + expectedReturns;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInvestmentAmount(Math.min(value, goalAmount - currentAmount));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.id);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call - replace with actual API in production
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example of what your API call might look like:
      /*
      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opportunityId: id,
          amount: investmentAmount,
          paymentMethod,
          notes,
        }),
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      */

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Investment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setShowConfirmation(false);
    setIsSuccess(false);
    setError(null);
  };

  const completeInvestment = () => {
    resetForm();
    router.push(`/campaigns/${slug}/invest/success`);
  };

  return (
    <div className="container mt-[10%] mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/campaigns/${slug}`}
          className="text-green-600 hover:text-green-800 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Campaign Summary */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Invest in {title}</h1>

          <div className="mb-6">
            <ImageBlur
              className="w-full h-96 object-cover rounded-lg"
              src={images[0]?.url || ""}
              width={600}
              height={400}
              alt={images[0]?.alt || title}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Campaign Details</h2>
            <p className="text-gray-700 mb-4">{description}</p>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Investment</span>
                <span className="font-medium">${minInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Return</span>
                <span className="font-medium">{returnRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{durationMonths} months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Investment Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Make Your Investment</h2>

          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Investment Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              min={minInvestment}
              max={goalAmount - currentAmount}
              step="10"
              value={investmentAmount}
              onChange={handleAmountChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder={`Minimum $${minInvestment}`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Available to invest: $
              {(goalAmount - currentAmount).toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="bank-transfer"
                  name="payment-method"
                  type="radio"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  checked={paymentMethod === "bank-transfer"}
                  onChange={handlePaymentMethodChange}
                />
                <label
                  htmlFor="bank-transfer"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Bank Transfer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mobile-money"
                  name="payment-method"
                  type="radio"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  checked={paymentMethod === "mobile-money"}
                  onChange={handlePaymentMethodChange}
                />
                <label
                  htmlFor="mobile-money"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Mobile Money
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="credit-card"
                  name="payment-method"
                  type="radio"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  checked={paymentMethod === "credit-card"}
                  onChange={handlePaymentMethodChange}
                />
                <label
                  htmlFor="credit-card"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Credit Card
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={handleNotesChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Any special instructions or comments..."
            />
          </div>

          <div className="bg-green-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-green-800 mb-2">
              Investment Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">
                  ${investmentAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Returns</span>
                <span className="font-medium">
                  ${expectedReturns.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-2">
                <span className="text-gray-600">Total Potential Return</span>
                <span className="font-medium text-green-600">
                  ${totalPotentialReturn.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowConfirmation(true)}
            disabled={investmentAmount < minInvestment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium"
          >
            Confirm Investment
          </button>

          <p className="text-xs text-gray-500 mt-4">
            By investing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            {!isSuccess ? (
              <>
                <h3 className="text-xl font-bold mb-4">
                  Confirm Your Investment
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign:</span>
                    <span className="font-medium">{title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      ${investmentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">
                      {paymentMethod.replace("-", " ")}
                    </span>
                  </div>
                  {notes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Notes:</span>
                      <span className="font-medium">{notes}</span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={resetForm}
                    disabled={isProcessing}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50 flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Confirm Investment"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Investment Successful!
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  You&apos;ve successfully invested $
                  {investmentAmount.toLocaleString()} in {title}.
                </p>
                <button
                  onClick={completeInvestment}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  View Investment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignInvestPage;
