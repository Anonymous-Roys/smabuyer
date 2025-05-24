import React from "react";
import ProductCard from "../ui/custom-card";
import PRODUCTS from "@/constants/products";
import ImageBlur from "../common/ImageBlur";
import SummerSaleCard from "../ui/summer-sale-card";
import { HOTDEAL } from "@/constants/products";
import Link from "next/link";

const HotDealsSection: React.FC = () => {
  return (
    <section className="hot-deals-section px-3 sm:px-6  py-10 space-y-8">
      <h2 className="section-title flex justify-between items-center px-2">
        <span className="block text-2xl font-bold ">Hot Deals</span>
        <span className="flex text-[#00B207] gap-3 items-center cursor-pointer">
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="col-span-2 sm:col-span-2 md:col-span-2 row-span-1 sm:row-span-2">
          <ProductCard
        imageUrl={HOTDEAL.imageUrl}
        name={HOTDEAL.name}
        price={HOTDEAL.price}
        rating={HOTDEAL.rating}
        discount={HOTDEAL.discount}
        imageAlt={HOTDEAL.imageAlt}
        isHotDeal={HOTDEAL.isHotDeal}
          />
        </div>
        {PRODUCTS.map((product, index) => (
          <ProductCard
        key={index}
        imageUrl={product.imageUrl}
        name={product.name}
        price={product.price}
        rating={product.rating}
        discount={product.discount}
        imageAlt={product.imageAlt}
        farmer={product.farmer}
        category={product.category}
        tags={product.tags}
        description={product.description}
        additionalInfo={product.additionalInfo}
        bulkPrice={product.bulkPrice}
          />
        ))}
      </div>
      <div className="flex w-full mt-10">
        <SummerSaleCard />
      </div>
    </section>
  );
};

export default HotDealsSection;
