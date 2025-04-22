import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ProductCardProps } from "@/types/custom-card";

/**
 * `ProductCard` is a reusable React component that displays a product card with details such as
 * an image, name, price, discount, rating, and an "Add to Cart" button. It supports customization
 * through props and is styled to adapt to light and dark themes.
 *
 * @component
 * @param {ProductCardProps} props - The props for the `ProductCard` component.
 * @param {string} [props.className] - Additional CSS classes to apply to the card container.
 * @param {string} props.imageUrl - The URL of the product image to display.
 * @param {string} props.name - The name of the product.
 * @param {number} props.price - The price of the product in USD.
 * @param {number} props.rating - The rating of the product (0 to 5).
 * @param {number} [props.discount] - The discount percentage applied to the product (optional).
 * @param {string} [props.imageAlt=""] - Alternative text for the product image.
 * @param {boolean} [props.imagePriority=false] - Determines if the product image should be prioritized for loading.
 * @param {React.Ref<HTMLDivElement>} ref - A React ref to access the card's root DOM element.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Additional HTML attributes to apply to the card container.
 *
 *
 * @example
 * ```tsx
 * <ProductCard
 *   className="custom-class"
 *   imageUrl="/path/to/image.jpg"
 *   name="Sample Product"
 *   price={29.99}
 *   rating={4.5}
 *   discount={10}
 *   imageAlt="Sample Product Image"
 *   imagePriority={true}
 * />
 * ```
 *
 * @remarks
 * - The component uses `Intl.NumberFormat` to format prices and discounts.
 * - The `rating` prop is displayed as a combination of filled and empty stars.
 * - The "Add to Cart" button is disabled if the product is already in the cart.
 * - The component supports hover effects for enhanced interactivity.
 *
 * @see {@link https://react.dev/reference/react/forwardRef | React.forwardRef}
 */
const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      price,
      rating,
      discount,
      imageAlt = "",
      imagePriority = false,
      ...props
    },
    ref
  ) => {
    const [isInCart, setIsInCart] = React.useState(false);

    const handleAddToCart = () => {
      setIsInCart((prev) => !prev);
      console.log(`${name} ${!isInCart ? "added to" : "removed from"} cart`);
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

    return (
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
          <div className="absolute left-4 top-4 z-10 rounded-sm discount-tag-bg py-1 px-2 text-sm ">
            Sale {discount}%
          </div>
        )}

        <div className="absolute right-2 top-2 z-10 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            aria-label={`Add ${name} to cart`}
            className={cn(
              "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            <Image
              src="/icons/heart.png"
              alt="heart icon"
              width={20}
              height={20}
            />
          </button>
          <button
            aria-label={`View ${name}`}
            className={cn(
              "flex h-10 w-10 items-center cursor-pointer justify-center rounded-full transition-colors bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            <Image src="/icons/eye.png" alt="eye icon" width={20} height={20} />
          </button>
        </div>

        {/* Image section */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt || `${name} image`}
            fill
            className="object-cover transition-all group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={imagePriority}
          />
        </div>

        {/* Details section */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
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
              <div className="flex items-center gap-1">
                <span className="text-md text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
                  ))}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ({rating.toFixed(1)})
                </span>
              </div>
            </div>
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
              <Image
                src={!isInCart ? "/icons/bag.png" : "/icons/bag-white.png"}
                alt="bag icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "productsCard";

export default ProductCard;
