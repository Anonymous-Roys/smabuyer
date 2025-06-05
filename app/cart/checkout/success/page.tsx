"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import products from "@/constants/mock-data";
import ProductCard from "@/components/ui/custom/product/custom-product-card";

const CheckoutSuccessPage = () => {
  // In a real app, you might want to fetch order details from the server
  // or pass them via query params/state management
  const orderDetails = {
    orderNumber: "#" + Math.floor(Math.random() * 1000000),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 0, // You might want to pass this from the checkout page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-50 dark:bg-green-900/30 p-6 sm:p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
              Order Confirmed!
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
              Order #: {orderDetails.orderNumber}
            </p>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Status</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  Processing
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Estimated Delivery
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {orderDetails.estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-5">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Need Help?
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              If you have any questions about your order, please contact our customer support.
            </p>
            <div className="mt-3">
              <a
                href="mailto:support@example.com"
                className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
              >
                Contact Support →
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
            <Link href="/products" passHref>
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/account/orders" passHref>
              <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                View Order Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Recommendations */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            You might also like
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0,3).map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.images[0]?.url || "/images/Image.png"}
                name={product.name}
                price={product.variants[0]?.price || 0}
                rating={product.averageRating}
                discount={
                  product.variants[0]?.comparedAtPrice
                    ? Math.round(
                        ((product.variants[0].comparedAtPrice -
                          product.variants[0].price) /
                          product.variants[0].comparedAtPrice) *
                          100
                      )
                    : 0
                }
                imageAlt={product.images[0]?.alt || ""}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;