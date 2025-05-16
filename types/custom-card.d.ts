import React from "react";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  name: string;
  price: number;
  rating: number;
  discount?: number;
  imageAlt?: string;
  imagePriority?: boolean;
  isHotDeal?: boolean;
  endDate?: Date;
}
