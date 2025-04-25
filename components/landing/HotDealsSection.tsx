import React from "react";
import ProductCard from "../ui/custom-card";
import { PRODUCTS } from "@/constants/products";
import ImageBlur from "../common/ImageBlur";

const HOTDEAL = {
  imageUrl: "/images/product5.jpg",
  name: "Green Capsicum",
  price: 20.99,
  rating: 4.7,
  discount: 50,
  imageAlt: "Product 5 Image",
  isHotDeal: true,
};

const HotDealsSection: React.FC = () => {
  return (
    <section className="hot-deals-section">
      <h2 className="section-title flex justify-between">
        <span className="block text-2xl font-bold">Hot Deals</span>
        <span className="flex text-[#00B207] gap-4">
          View ALL{" "}
          <ImageBlur
            src="/icons/more.png"
            alt="more icon"
            width={20}
            height={20}
          />
        </span>
      </h2>
      <div className="products-grid">
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            rating={product.rating}
            discount={product.discount}
            imageAlt={product.imageAlt}
          />
        ))}
      </div>
    </section>
  );
};

export default HotDealsSection;
