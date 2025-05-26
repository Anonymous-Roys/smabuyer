"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import ImageBlur from "../../common/ImageBlur";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Product } from "@/types/product";
import { Separator } from "../separator";


interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = React.useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [thumbnailStartIndex, setThumbnailStartIndex] = React.useState(0);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close modal when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC key to close modal
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const increaseQuantity = () => {
    if (product && selectedVariantIndex >= 0) {
      const variant = product.variants[selectedVariantIndex];
      if (quantity < variant.stock) {
        setQuantity(quantity + 1);
      }
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const selectedVariant = product?.variants[selectedVariantIndex];

  const formattedPrice = selectedVariant ? new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(selectedVariant.price) : "";

  const formattedComparedPrice = selectedVariant?.comparedAtPrice ? new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(selectedVariant.comparedAtPrice) : null;

  const discount = selectedVariant?.comparedAtPrice
    ? Math.round(((selectedVariant.comparedAtPrice - selectedVariant.price) / selectedVariant.comparedAtPrice) * 100)
    : 0;

  if (!isOpen || !product) return null;
  const THUMBNAILS_TO_SHOW = 4;

  const scrollThumbnailsUp = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(thumbnailStartIndex - 1);
    }
  };

  const scrollThumbnailsDown = () => {
    if (thumbnailStartIndex + THUMBNAILS_TO_SHOW < product.images.length) {
      setThumbnailStartIndex(thumbnailStartIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000009f] p-4">
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full  overflow-auto rounded-lg bg-white shadow-xl dark:bg-gray-900"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-1 text-gray-500 shadow-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Images */}

          <div className="p-6">
            <div className="flex">
              {/* Thumbnail navigation */}
              {product.images.length > 1 && (
                <div className="mr-4 flex flex-col items-center">
                  <button
                    onClick={scrollThumbnailsUp}
                    disabled={thumbnailStartIndex === 0}
                    className={`mb-1 rounded-full p-1 ${thumbnailStartIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronUp size={20} />
                  </button>

                  <div className="flex flex-col space-y-2">
                    {product.images
                      .slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_TO_SHOW)
                      .map((image, index) => {
                        const actualIndex = thumbnailStartIndex + index;
                        return (
                          <button
                            key={image.id}
                            onClick={() => setSelectedImageIndex(actualIndex)}
                            className={`relative h-16 w-16 overflow-hidden rounded-md border ${selectedImageIndex === actualIndex
                              ? "border-green-500"
                              : "border-gray-200 dark:border-gray-700"
                              }`}
                          >
                            <ImageBlur
                              src={image.url}
                              alt={image.alt}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        );
                      })}
                  </div>

                  <button
                    onClick={scrollThumbnailsDown}
                    disabled={thumbnailStartIndex + THUMBNAILS_TO_SHOW >= product.images.length}
                    className={`mt-1 rounded-full p-1 ${thumbnailStartIndex + THUMBNAILS_TO_SHOW >= product.images.length ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>
              )}

              {/* Main image */}
              <div className="relative aspect-square flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <ImageBlur
                  src={product.images[selectedImageIndex]?.url || "/images/Image.png"}
                  alt={product.images[selectedImageIndex]?.alt || product.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />

              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8 p-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white inline">{product.name}</h2>
                <span className={cn(
                  "inline-block rounded-md px-3 py-1 text-xs font-medium",
                  selectedVariant?.isAvailable
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                )}>
                  {selectedVariant?.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mb-2 mt-4 flex items-center gap-5">
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.averageRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </div>
                <div>

                  <span className="text-gray-500 dark:text-gray-400">SKU:</span>
                  <span className="text-gray-900 dark:text-white">{selectedVariant?.sku}</span>
                </div>

              </div>


              <div className="mt-4 mb-4">
                <div className="flex items-center space-x-2">
                  {formattedComparedPrice ? (
                    <>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formattedPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                        {formattedComparedPrice}
                      </span>
                      {discount > 0 && (
                        <span className="bg-red-100 ml-2 inline-block rounded-full  px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                          {discount}% OFF
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formattedPrice}
                    </span>
                  )}
                </div>
              </div>

              <Separator />

              {/* Product Description */}
              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300">{product.shortDescription}</p>
              </div>

              {/* Variants */}
              <div className="flex flex-wrap gap- 8 md:gap-15">
                {product.variants.length > 1 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Variants</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.variants.map((variant, index) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantIndex(index)}
                          disabled={!variant.isAvailable}
                          className={cn(
                            "rounded border px-3 py-1 text-sm transition-all",
                            selectedVariantIndex === index
                              ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500",
                            !variant.isAvailable && "cursor-not-allowed opacity-50"
                          )}
                        >
                          {variant.name} - {variant.weight}{variant.weightUnit}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 gap-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Share item</h3>
                  <div className="flex gap-3 mt-4">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/products/${product.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/products/${product.slug}`)}&text=Check%20out%20this%20product:%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                      className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>

                    {/* Pinterest */}
                    <a
                      href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`${window.location.origin}/products/${product.slug}`)}&media=${encodeURIComponent(product.images[0]?.url)}&description=${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Pinterest"
                      className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                      </svg>
                    </a>

                    {/* Instagram - Note: Instagram doesn't have a direct share link like others */}
                    <a
                      href={`https://www.instagram.com/?url=${encodeURIComponent(`${window.location.origin}/products/${product.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Instagram"
                      className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            {/* Add to Cart section */}
            <div className="mt-4">
              <div className="flex items-center">
                <div className="mr-4 flex items-center rounded-full border border-gray-300 dark:border-gray-700">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 box-border font-bold m-1 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 bg-[#dbdbdbee] rounded-full"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    disabled={!selectedVariant?.isAvailable || quantity >= (selectedVariant?.stock || 0)}
                    className="flex font-bold m-1 h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 bg-[#dbdbdbee] rounded-full"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => { console.log(`Added ${quantity} ${product.name} to cart`); }}
                  disabled={!selectedVariant?.isAvailable}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-white transition-colors",
                    selectedVariant?.isAvailable
                      ? "bg-green-600 hover:bg-green-700"
                      : "cursor-not-allowed bg-gray-400"
                  )}
                >
                  <ImageBlur
                    src="/icons/bag-white.png"
                    alt="bag icon"
                    width={20}
                    height={20}
                  />
                  Add to Cart
                </button>

                <button
                  className="bg-[#dbdbdbee] ml-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <ImageBlur
                    src="/icons/heart.png"
                    alt="heart icon"
                    width={20}
                    height={20}
              
                  />
                </button>
              </div>


              {/* Product metadata */}
              <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-y-2 text-sm">

                  <div className="grid grid-cols-2">
                    <span className="text-gray-500 dark:text-gray-400">Categories:</span>
                    <span className="text-gray-900 dark:text-white">
                      {product.categories.join(", ")}
                    </span>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-500 dark:text-gray-400">Tags:</span>
                      <span> 
                        {product.tags.map(tag => (
                          <span key={tag} className="l-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 mr-2">{tag}</span>
                        ))}
                      </span>

                    </div>
                  )}




                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;