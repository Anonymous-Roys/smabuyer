import React from "react";
import { Metadata } from "next";
import Hero from "@/components/landing/HeroSection";
import BaseIcon from "@/components/landing/Base-content";

import ProductCard from "@/components/ui/custom-card";
import Banner from "@/components/landing/Banner";
import ProductCardDemo from "@/components/ui/product/product-card-demo";

export const meta: Metadata = {
  title: "Customers",
  description: "Customers",
};

const HomePage = () => {
  return (
    <main className=" mx-auto">
      <Hero />
      <BaseIcon />

      <Banner/>
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from([1, 2, 3, 4]).map((item, idx) => (
          <ProductCard
            key={idx}
            className="custom-class"
            name="Sample Product"
            price={29.99}
            rating={4.5}
            discount={10}
            imageAlt="Sample Product Image"
          
          />
        ))}
      </div>
      <ProductCardDemo/>
    </main>
  );
};

export default HomePage;
