"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ProductCardProps } from "@/types/custom-card";
import ImageBlur from "../common/ImageBlur";

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
      isHotDeal = false,
      endDate,
      ...props
    },
    ref
  ) => {
    const [isInCart, setIsInCart] = React.useState(false);
    const [hotDealExpired, setHotDealExpired] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const defaultEndDate = React.useMemo(
      () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      []
    );

    const effectiveEndDate = React.useMemo(() => endDate || defaultEndDate, [endDate, defaultEndDate]);

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

    React.useEffect(() => {
      if (!isHotDeal) return;

      // Debugging logs
      const updateCountdown = () => {
      const now = new Date();
      const difference = effectiveEndDate.getTime() - now.getTime();

      if (difference <= 0) {
        console.log("Countdown expired!");
        setHotDealExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate time units
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      setTimeLeft({
        days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
      };

      // Initial call
      updateCountdown();

      // Set up interval
      const intervalId = setInterval(updateCountdown, 1000);
      console.log("Interval set with ID:", intervalId);

      // Cleanup
      return () => {
      console.log("Clearing interval with ID:", intervalId);
      clearInterval(intervalId);
      };
    }, [effectiveEndDate, isHotDeal]);

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
              aria-label={`Add ${name} to cart`}
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
              aria-label={`View ${name}`}
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
              aria-label={`View ${name}`}
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
            {/* Add to cart button for non-hot deal products 
             This button is only shown when the product is not a hot deal
            */}
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
            {isHotDeal && !hotDealExpired ? (
              <div className="pb-4">
                <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                  Hurry up! Offer ends In:
                </p>
                <ul className="flex gap-10">
                  <li className="flex flex-col items-center">
                    <span> {timeLeft.days} </span>
                    <span>DAYS</span>
                  </li>
                  <div className="flex gap-5">
                    <li className="flex flex-col items-center">
                      <span> {timeLeft.hours} </span>
                      <span>HOURS</span>
                    </li>
                    <li>:</li>
                    <li className="flex flex-col items-center">
                      <span> {timeLeft.minutes} </span>
                      <span>MINS</span>
                    </li>
                    <li>:</li>
                    <li className="flex flex-col items-center">
                      <span> {timeLeft.seconds} </span>
                      <span>SECS</span>
                    </li>
                  </div>
                </ul>
              </div>
            ) : (
              isHotDeal && (
                <p className="text-red-500 font-bold">Deal has expired</p>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "productsCard";

export default ProductCard;
