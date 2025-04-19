import React from "react";
import { Metadata } from "next";
import Hero from "@/components/landing/HeroSection";
import BaseIcon from "@/components/landing/Base-content";

export const meta: Metadata = {
  title: "Customers",
  description: "Customers",
};

const HomePage = () => {
  return (
    <main className=" mx-auto">
      <Hero />
      <BaseIcon />
    </main>
  );
};

export default HomePage;
