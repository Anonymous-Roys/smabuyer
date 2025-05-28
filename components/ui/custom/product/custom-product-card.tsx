"use client";
import { useEffect, useState, useMemo, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { EnhancedProductCardProps } from "@/types/product";
import ImageBlur from "../../../common/ImageBlur";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { Product, CartItem } from "@/types/product";
import CountDownShift from "@/components/ui/custom/timer/CountDownItem";

/**
 * `ProductCard` is a reusable React component that displays a product card with details such as
 * an image, name, price, discount, rating, and an "Add to Cart" button. It now includes a
 * quick view modal functionality.
 */

const ProductCard = forwardRef<HTMLDivElement, EnhancedProductCardProps>(
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
    const [isInCart, setIsInCart] = useState(false);
    const [showAddedNotification, setShowAddedNotification] =
      useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = (quantity: number = 1) => {
      const cartItem = {
        id: (product && product.id) || Date.now().toString(),
        name,
        price,
        discountedPrice: price * (1 - (discount || 0) / 100),
        quantity: quantity,
        imageUrl,
        category:
          (product && product.categories && product.categories[0]) ||
          "Uncategorized",
        farmer: (product && product.farmerId) || "Unknown",
      };

      const existingCart =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cart") || "[]")
          : [];

      const existingItemIndex = existingCart.findIndex(
        (item: { id: string }) => item.id === cartItem.id
      );

      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(existingCart));
      }

      setIsInCart(true);
      setShowAddedNotification(true);
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowAddedNotification(false);
      }, 3000);

      console.log(`${name} added to cart`);
    };

    const handleOpenModal = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      if (typeof window !== "undefined") {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const isProductInCart = existingCart.some(
          (item: CartItem) => item.name === name
        );
        setIsInCart(isProductInCart);
      }
    }, [name]);

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
    const displayProduct = useMemo((): Product => {
      if (product) return product;

      return {
        id: "mock-id",
        name: name,
        slug: "mock-slug",
        shortDescription:
          "Quick view of this product showing key details and features.",
        description:
          "This is a detailed description of the product that would include more information about features, benefits, and usage.",
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
            comparedAtPrice: discount
              ? price / (1 - discount / 100)
              : undefined,
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
        {showAddedNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-[100000] flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{name} added to cart!</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            "group relative overflow-hidden border bg-white flex flex-col justify-between shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950",
            isInCart
              ? "border-[#2C742F] shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              : "border-gray-200",
            className
          )}
          {...props}
        >
          {/* Discount tag */}
          {discount && (
            <div className="absolute  sm:left-4 sm:top-4 z-10 flex gap-3">
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
                onClick={() => handleAddToCart()}
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
              <div
                className={cn(
                  isHotDeal
                    ? "space-y-1 w-full flex-col items-center justify-center"
                    : ""
                )}
              >
                <h3
                  className={`line-clamp-1 font-medium ${
                    isHotDeal ? "text-center text-2xl" : " text-sm"
                  } ${
                    !isInCart ? "text-gray-900" : "isInCart-name-color"
                  }  dark:text-gray-50`}
                >
                  {name}
                </h3>
                <div>
                  {discountedPrice ? (
                    <div
                      className={`flex  ${
                        !isHotDeal
                          ? "flex-col sm:flex-row sm:items-center sm:space-x-2"
                          : "items-center justify-center space-x-2"
                      }`}
                    >
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
                  className={`flex  gap-1 ${
                    isHotDeal
                      ? "-ml-3 items-center justify-center"
                      : "flex-col sm:flex-row sm:items-center"
                  }`}
                >
                  <span className="text-md text-orange-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
                    ))}
                  </span>
                  <span
                    className={`text-xs text-gray-500 dark:text-gray-400 ${
                      isHotDeal ? "mt-1" : ""
                    }`}
                  >
                    ({rating.toFixed(1)} {isHotDeal ? "Feedback" : ""})
                  </span>
                </div>
              </div>
              {/* Add to cart button for non-hot deal products 
             This button is only shown when the product is not a hot deal
            */}
              {!isHotDeal && (
                <button
                  onClick={()=> handleAddToCart()}
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
              {isHotDeal ? (
                <div className="pb-4 ">
                  <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                    Hurry up! Offer ends In:
                  </p>
                  <div className="">
                    <CountDownShift />
                  </div>
                </div>
              ) : (
                isHotDeal && (
                  <p className="text-red-500 font-bold">Deal has expired</p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <ProductQuickViewModal
          product={displayProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          handleAddToCart={handleAddToCart}
        />
      </>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
