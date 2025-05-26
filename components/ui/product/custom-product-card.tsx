"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ProductCardProps } from "@/types/custom-card";
import ImageBlur from "../../common/ImageBlur";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { Product } from "@/types/product";

// Extended interface to include the product object
interface EnhancedProductCardProps extends ProductCardProps {
  product?: Product; // This would be your Product type from the types defined
}

/**
 * `ProductCard` is a reusable React component that displays a product card with details such as
 * an image, name, price, discount, rating, and an "Add to Cart" button. It now includes a
 * quick view modal functionality.
 */

const ProductCard = React.forwardRef<HTMLDivElement, EnhancedProductCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      price,
      rating,
      discount,
      imageAlt = "",
      isHotDeal = false,
      product,
      ...props
    },
    ref
  ) => {
    const [isInCart, setIsInCart] = React.useState(false);
  
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  
    const handleAddToCart = () => {
      setIsInCart((prev) => !prev);
      console.log(`${name} ${!isInCart ? "added to" : "removed from"} cart`);
    };

    const handleOpenModal = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

    const discountedPrice = discount
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price * (1 - discount / 100))
      : null;


    // Create a mock product object if not provided
    const displayProduct = React.useMemo((): Product => {
  if (product) return product;

  return {
    id: "mock-id",
    name: name,
    slug: "mock-slug",
    shortDescription: "Quick view of this product showing key details and features.",
    description: "This is a detailed description of the product that would include more information about features, benefits, and usage.",
    images: [
      {
        id: "primary-image",
        url: imageUrl || "/images/Image.png",
        alt: imageAlt || `${name} image`,
        isPrimary: true,
      },
    ],
    variants: [
      {
        id: "default-variant",
        name: "Default",
        price: price,
        comparedAtPrice: discount ? price / (1 - discount / 100) : undefined,
        sku: "SKU-12345",
        weight: 1,
        weightUnit: "kg",
        stock: 25,
        isAvailable: true,
      },
    ],
    categories: ["vegetables"],
    certifications: ["Organic", "Non-GMO"],
    isOrganic: true,
    averageRating: rating || 0,
    reviewCount: 4,
    status: "active",
    farmerId: "mock-farmer-id",
    createdAt: new Date("2025-05-15"),
    updatedAt: new Date("2025-05-15"),
    featured: false,
  };
}, [product, name, price, rating, imageUrl, imageAlt, discount]);

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "group relative overflow-hidden border bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950",
            isInCart
              ? "border-[#2C742F] shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              : "border-gray-200",
            className
          )}
          {...props}
        >
          {/* Discount tag */}
          {discount && (
            <div className="absolute left-4 top-4 z-10 flex gap-3">
              <div className="rounded-sm discount-tag-bg py-1 px-2 text-sm ">
                Sale {discount}%
              </div>
              {isHotDeal && (
                <div className="rounded-sm bg-[#2388FF] py-1 px-2 text-sm text-white">
                  Hot Deal
                </div>
              )}
            </div>
          )}

          {!isHotDeal && (
            <div className="absolute right-2 top-2 z-10 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                aria-label={`Add ${name} to favorites`}
                className={cn(
                  "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
              >
                <ImageBlur
                  src="/icons/heart.png"
                  alt="heart icon"
                  width={20}
                  height={20}
                />
              </button>
              <button
                onClick={handleOpenModal}
                aria-label={`Quick view of ${name}`}
                className={cn(
                  "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
              >
                <ImageBlur
                  src="/icons/eye.png"
                  alt="eye icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}

          {/* Image section */}
          <div className="relative aspect-square overflow-hidden">
            <ImageBlur
              src={imageUrl ? imageUrl : "/images/Image.png"}
              alt={imageAlt || `${name} image`}
              width={300}
              height={350}
              className="object-cover transition-all group-hover:scale-105 w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* actions section for a hot deal product */}
          {isHotDeal && (
            <div className="flex gap-3 justify-center px-1.5">
              <button
                aria-label={`add ${name} to favourites`}
                className={cn(
                  "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 group-hover:opacity-100 opacity-0"
                )}
              >
                <ImageBlur
                  src="/icons/heart.png"
                  alt="heart icon"
                  width={20}
                  height={20}
                />
              </button>
              <button
                onClick={handleAddToCart}
                aria-label={`Add ${name} to cart`}
                className={cn(
                  "flex h-10 w-1/2 space-x-5 items-center text-sm cursor-pointer justify-center rounded-full transition-colors",
                  isInCart
                    ? "add-to-cart-bg text-white hover:bg-green-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
              >
                <span> Add to Cart</span>
                <ImageBlur
                  src={!isInCart ? "/icons/bag.png" : "/icons/bag-white.png"}
                  alt="bag icon"
                  width={20}
                  height={20}
                />
              </button>
              <button
                onClick={handleOpenModal}
                aria-label={`Quick view of ${name}`}
                className={cn(
                  "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 group-hover:opacity-100 opacity-0"
                )}
              >
                <ImageBlur
                  src="/icons/eye.png"
                  alt="eye icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}

          {/* Details section */}
          <div className={`${!isHotDeal ? "px-4 py-2" : ""} `}>
            <div
              className={cn(
                " gap-2",
                isHotDeal
                  ? "flex flex-col items-center justify-center mt-6 w-full"
                  : "justify-between flex items-center"
              )}
            >
              <div className={cn(isHotDeal ? "space-y-1" : "")}>
                <h3
                  className={`line-clamp-1 text-sm font-medium ${
                    !isInCart ? "text-gray-900" : "isInCart-name-color"
                  }  dark:text-gray-50`}
                >
                  {name}
                </h3>
                <div>
                  {discountedPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{discountedPrice}</span>
                      <span className="text-gray-500 line-through dark:text-gray-400">
                        {formattedPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-gray-900 dark:text-gray-50">
                      {formattedPrice}
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    isHotDeal ? "-ml-3" : ""
                  }`}
                >
                  <span className="text-md text-orange-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
                    ))}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ({rating.toFixed(1)} {isHotDeal ? "Feedback" : ""})
                  </span>
                </div>
              </div>
           
              {!isHotDeal && (
                <button
                  onClick={handleAddToCart}
                  aria-label={`Add ${name} to cart`}
                  className={cn(
                    "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors",
                    isInCart
                      ? "add-to-cart-bg text-white hover:bg-green-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <ImageBlur
                    src={!isInCart ? "/icons/bag.png" : "/icons/bag-white.png"}
                    alt="bag icon"
                    width={20}
                    height={20}
                  />
                </button>
              )}
              
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <ProductQuickViewModal 
          product={displayProduct} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;