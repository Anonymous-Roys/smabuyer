// components/HomePage.tsx

"use client"; // This file is a client component

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import ImageBlur from "../common/ImageBlur"; // Import custom blurred image component

/**
 * Banner Section Component
 * Includes the main large banner with a background image and a call-to-action,
 * and a Featured Section with two smaller promotional cards.
 */
export default function Banner() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Grid: 2/3 Banner + 1/3 Featured Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Banner Section */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl relative bg-gradient-to-r from-[#004518] to-[#004518]">
          
          {/* Background image with blur transition */}
          <div className="absolute inset-0">
            <ImageBlur
              src="/images/banner-big.png"
              alt="Background image"
              fill
              className="object-right object-contain scale-100 md:scale-125 lg:scale-120"
            />
          </div>

          {/* Foreground content on top of the image */}
          <div className="flex flex-row items-center relative z-10 h-full">
            <div className="w-full lg:w-1/2 p-6 lg:p-10 space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Grown by Farmers
              </h1>
              <p className="text-white/90 max-md:max-w-xs tracking-normal text-sm lg:text-base px-2 border-l-4 border-[#84D187] mb-4">
                We pride on locally sourced, farm-to-table growing practices and sustainable farming methods to provide the freshest food.
              </p>
              <Button className="bg-white text-[#00B207] hover:bg-emerald-50 group flex items-center gap-2 rounded-3xl p-4 mt-5">
                Shop now
                {/* Arrow Icon with smooth hover transition */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </div>

            {/* Right empty half to balance the design with background image */}
            <div className="hidden lg:block w-1/2"></div>
          </div>
        </div>

        {/* Featured Product Cards Section */}
        <div className="lg:col-span-1 grid grid-rows-2 gap-6">
          <FeaturedCard
            title="Special Products Deal of the Month"
            subtitle=" "
            imageSrc="/images/banner-small-1.png"
            ctaText="Shop Now"
            ctaUrl="/deals"
          />
          <FeaturedCard
            title="Special Products Deal of the Month"
            subtitle=" "
            imageSrc="/images/banner-small-2.png"
            ctaText="Shop Now"
            ctaUrl="/deals"
          />
        </div>
        
      </div>
    </div>
  );
}

/**
 * FeaturedCard Component
 * Reusable card to highlight special product deals.
 */
interface FeaturedCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  ctaText: string;
  ctaUrl: string;
}

function FeaturedCard({ title, subtitle, imageSrc, ctaText, ctaUrl }: FeaturedCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 rounded-xl h-full">
      
      {/* Semi-transparent dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Card background image */}
      <div className="absolute inset-0">
        <ImageBlur
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Centered content inside the card */}
      <div className="flex flex-col items-center justify-center h-full text-center relative z-20 py-8 px-6">
        
        <CardContent className="p-0 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Best Deal
          </p>
          <h3 className="text-white text-xl font-bold mt-1 px-3">
            {title}
          </h3>
          <p className="text-white/90 text-sm">
            {subtitle}
          </p>
        </CardContent>

        {/* Call-to-Action Link */}
        <CardFooter className="p-0">
          <Link href={ctaUrl} className="group">
            <span className="text-white flex items-center gap-2">
              {ctaText}
              {/* Arrow Icon with hover animation */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </Link>
        </CardFooter>

      </div>
    </Card>
  );
}
