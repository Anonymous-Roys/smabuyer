import React from "react";
import { Metadata } from "next";
import Hero from "@/components/landing/HeroSection";
import BaseIcon from "@/components/landing/Base-content";
export const meta: Metadata = {
  title: "Customers",
  description: "Customers",
};
import HotDealsSection from "@/components/landing/HotDealsSection";
import FeaturedDeals from "@/components/landing/FeaturedDeals";

const HomePage = () => {
  return (
    <main className=" mx-auto">
      <Hero />
      <BaseIcon />
      <HotDealsSection />
      <FeaturedDeals />
    </main>
  );
};

export default HomePage;
