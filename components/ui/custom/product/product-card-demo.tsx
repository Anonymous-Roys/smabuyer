"use client";
import React from "react";
import ProductCard from "./custom-product-card";
import products from "@/constants/mock-data";
import { Product } from "@/types/product";
import { getDiscount } from "@/lib/product-utils/price";

/**
 * Example usage page for the enhanced ProductCard and Modal components
 */
// Sample products data with all necessary fields for the modal

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
export default function ProductCardDemo() {
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Products</h1>
        
        {/* Regular products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {products.map(product => (
            <ProductCard
              key={product.id}
              imageUrl={product.images[0]?.url || "/images/Image.png"}
              name={product.name}
              price={product.variants[0]?.price || 0}
              rating={product.averageRating}
              discount={getDiscount(product)}
              imageAlt={product.images[0]?.alt || ""}
              product={product}
            />
          ))}
        </div>

    </div>
    </div>
  );
}