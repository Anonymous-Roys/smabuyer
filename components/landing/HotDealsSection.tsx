import React from "react";
import ProductCard from "../ui/custom-card";
import { PRODUCTS } from "@/constants/products";

HOTDEAL = {
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
      <h2 className="section-title">Hot Deals</h2>
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
