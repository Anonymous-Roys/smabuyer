import React from "react";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  discount?: number;
  isInCart?: boolean;
  onAddToCart?: () => void;
  imageAlt?: string;
  imagePriority?: boolean;
}