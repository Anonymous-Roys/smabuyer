import React from "react";
import ProductCard from "../ui/custom/product/custom-product-card";
import products from "@/constants/mock-data";
import ImageBlur from "../common/ImageBlur";
import Link from "next/link";
import { getDiscount } from "@/lib/product-utils/price";

const FeaturedDeals: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-10 space-y-8">
      <h2 className="section-title flex justify-between px-2 items-center">
        <span className="block text-2xl font-bold">Featured Products</span>
        <span className="flex text-[#00B207] gap-3 items-center">
          <Link href="/products" passHref>
            <span className="flex items-center gap-3">
              <span>View ALL </span>
              <span>
                <ImageBlur
                  src="/icons/more.png"
                  alt="more icon"
                  width={20}
                  height={20}
                />
              </span>
            </span>
          </Link>
        </span>
      </h2>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
          {products.map((product) => (
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
    </section>
  );
};

export default FeaturedDeals;
