"use client";
import React from "react";
import ProductCard from "./custom-product-card";
import { Product } from "@/types/product";


/**
 * Example usage page for the enhanced ProductCard and Modal components
 */
// Sample products data with all necessary fields for the modal
export  const products: Product[] = [
    {
      id: "prod-001",
      farmerId: "farm-123",
      name: "Chinese Cabbage",
      slug: "chinese-cabbage",
      description: "Fresh Chinese cabbage harvested from our organic farm. Perfect for stir-fry dishes, salads, or as a side vegetable.",
      shortDescription: "Fresh, crisp Chinese cabbage from organic farms. Rich in vitamins A and C.",
      categories: ["vegetables"],
      images: [
        {
          id: "img-001",
          url: "/images/Image.png",
          alt: "Fresh Chinese cabbage",
          isPrimary: true
        },
        {
          id: "img-002",
          url: "/images/cabbage2.png",
          alt: "Chinese cabbage close-up",
          isPrimary: false
        },
        {
          id: "img-003",
          url: "/images/cabbage3.png",
          alt: "Chinese cabbage close-up",
          isPrimary: false
        },
        {
          id: "img-004",
          url: "/images/cabbage4.png",
          alt: "Chinese cabbage close-up",
          isPrimary: false
        },
        {
          id: "img-005",
          url: "/images/Image.png",
          alt: "Chinese cabbage close-up",
          isPrimary: false
        }
      ],
      variants: [
        {
          id: "var-001",
          name: "Regular",
          price: 17.28,
          comparedAtPrice: 48.00,
          sku: "CC-001",
          weight: 1,
          weightUnit: "kg",
          stock: 25,
          isAvailable: true
        },
        {
          id: "var-002",
          name: "Premium",
          price: 22.99,
          comparedAtPrice: 52.00,
          sku: "CC-002",
          weight: 1.5,
          weightUnit: "kg",
          stock: 10,
          isAvailable: true
        }
      ],
      harvestDate: new Date("2025-05-10"),
      bestBefore: new Date("2025-05-25"),
      certifications: ["Organic", "Non-GMO", "Pesticide-free"],
      isOrganic: true,
      status: "active",
      averageRating: 4.0,
      reviewCount: 4,
      createdAt: new Date("2025-05-12"),
      updatedAt: new Date("2025-05-12"),
      featured: true,
      tags: ["Organic", "Non-GMO", "Pesticide-free"],
    },
    {
      id: "prod-002",
      farmerId: "farm-456",
      name: "Fresh Spinach",
      slug: "fresh-spinach",
      description: "Locally grown spinach, rich in iron and vitamins. Great for salads and cooking.",
      shortDescription: "Locally grown spinach, nutrient-rich and versatile.",
      categories: ["vegetables", "greens"],
      images: [
        {
          id: "img-003",
          url: "/images/spinach.jpg",
          alt: "Fresh spinach leaves",
          isPrimary: true
        }
      ],
      variants: [
        {
          id: "var-003",
          name: "Regular",
          price: 12.99,
          sku: "SP-001",
          weight: 0.5,
          weightUnit: "kg",
          stock: 30,
          isAvailable: true
        }
      ],
      harvestDate: new Date("2025-05-15"),
      bestBefore: new Date("2025-05-22"),
      certifications: ["Organic"],
      isOrganic: true,
      status: "active",
      averageRating: 4.5,
      reviewCount: 12,
      createdAt: new Date("2025-05-15"),
      updatedAt: new Date("2025-05-15"),
      featured: false
    },
    {
      id: "prod-003",
      farmerId: "farm-789",
      name: "Red Bell Pepper",
      slug: "red-bell-pepper",
      description: "Sweet and crunchy red bell peppers. Great for salads, roasting, or stuffing.",
      shortDescription: "Sweet red bell peppers, rich in vitamin C and antioxidants.",
      categories: ["vegetables"],
      images: [
        {
          id: "img-004",
          url: "/images/red-pepper.jpg",
          alt: "Red bell pepper",
          isPrimary: true
        }
      ],
      variants: [
        {
          id: "var-004",
          name: "Regular",
          price: 9.99,
          comparedAtPrice: 15.99,
          sku: "RP-001",
          weight: 0.3,
          weightUnit: "kg",
          stock: 40,
          isAvailable: true
        }
      ],
      harvestDate: new Date("2025-05-14"),
      bestBefore: new Date("2025-05-24"),
      certifications: ["Non-GMO"],
      isOrganic: false,
      status: "active",
      averageRating: 4.2,
      reviewCount: 8,
      createdAt: new Date("2025-05-14"),
      updatedAt: new Date("2025-05-14"),
      featured: false
    },
    {
      id: "prod-004",
      farmerId: "farm-123",
      name: "Organic Carrots",
      slug: "organic-carrots",
      description: "Fresh organic carrots grown without pesticides. Sweet and perfect for salads, juicing, or cooking.",
      shortDescription: "Sweet organic carrots, great for snacking and cooking.",
      categories: ["vegetables", "roots"],
      images: [
        {
          id: "img-005",
          url: "/images/carrots.jpg",
          alt: "Organic carrots",
          isPrimary: true
        }
      ],
      variants: [
        {
          id: "var-005",
          name: "Bundle",
          price: 8.49,
          comparedAtPrice: 12.99,
          sku: "OC-001",
          weight: 1,
          weightUnit: "kg",
          stock: 35,
          isAvailable: true
        }
      ],
      harvestDate: new Date("2025-05-12"),
      bestBefore: new Date("2025-05-30"),
      certifications: ["Organic", "Pesticide-free"],
      isOrganic: true,
      status: "active",
      averageRating: 4.7,
      reviewCount: 15,
      createdAt: new Date("2025-05-13"),
      updatedAt: new Date("2025-05-13"),
      featured: true
    }
  ];

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
              discount={
                product.variants[0]?.comparedAtPrice
                  ? Math.round(
                      ((product.variants[0].comparedAtPrice - product.variants[0].price) /
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
  );
}