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
  productsRemaining?: number;
  bulkPrice?: number;
  category?: string;
  tags?: string[];
  farmer?: string;
  description?: string;
  // additionalInfo?: Record<string, string | number | boolean>;
}
