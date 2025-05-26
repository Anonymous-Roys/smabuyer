"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import ImageBlur from "../../common/ImageBlur";
import { ChevronDown, ChevronUp, ArrowLeft, Star } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = React.useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<'description' | 'info' | 'reviews'>('description');

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

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700 dark:hover:text-gray-200">
              Products
            </Link>
            <span>/</span>
            <Link 
              href={`/category/${product.categories[0]}`} 
              className="hover:text-gray-700 dark:hover:text-gray-200 capitalize"
            >
              {product.categories[0]}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="flex">
                {/* Thumbnail navigation */}
                {product.images.length > 1 && (
                  <div className="mr-4 flex flex-col items-center">
                    <button
                      onClick={scrollThumbnailsUp}
                      disabled={thumbnailStartIndex === 0}
                      className={`mb-1 rounded-full p-1 ${
                        thumbnailStartIndex === 0 
                          ? 'text-gray-300' 
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                      }`}
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
                              className={`relative h-16 w-16 overflow-hidden rounded-md border ${
                                selectedImageIndex === actualIndex
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
                      className={`mt-1 rounded-full p-1 ${
                        thumbnailStartIndex + THUMBNAILS_TO_SHOW >= product.images.length 
                          ? 'text-gray-300' 
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                      }`}
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
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                  
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                      {discount}% OFF
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < Math.floor(product.averageRating) ? "fill-current" : ""}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          ({product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"})
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        SKU: <span className="text-gray-900 dark:text-white">{selectedVariant?.sku}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={cn(
                    "inline-block rounded-md px-3 py-1 text-sm font-medium",
                    selectedVariant?.isAvailable
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  )}>
                    {selectedVariant?.isAvailable ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    {formattedComparedPrice ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {formattedPrice}
                        </span>
                        <span className="text-xl text-gray-500 line-through dark:text-gray-400">
                          {formattedComparedPrice}
                        </span>
                        {discount > 0 && (
                          <span className="bg-red-100 inline-block rounded-full px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                            Save {discount}%
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formattedPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {product.shortDescription}
                </p>

                {/* Variants */}
                {product.variants.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Available Options
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, index) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantIndex(index)}
                          disabled={!variant.isAvailable}
                          className={cn(
                            "rounded-lg border px-4 py-2 text-sm transition-all",
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

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-700">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="flex h-10 w-10 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        disabled={!selectedVariant?.isAvailable || quantity >= (selectedVariant?.stock || 0)}
                        className="flex h-10 w-10 items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant?.isAvailable}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-6 text-sm font-medium text-white transition-colors",
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

                    <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
                      <ImageBlur
                        src="/icons/heart.png"
                        alt="heart icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Categories:</span>
                      <div className="mt-1">
                        {product.categories.map(category => (
                          <Link
                            key={category}
                            href={`/category/${category}`}
                            className="inline-block mr-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 capitalize"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {product.tags && product.tags.length > 0 && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Tags:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {product.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Share */}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Share:</span>
                    <div className="flex gap-3 mt-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/products/${product.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/products/${product.slug}`)}&text=Check%20out%20this%20product:%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
                { key: 'description', label: 'Description' },
                { key: 'info', label: 'Additional Info' },
                { key: 'reviews', label: `Reviews (${product.reviewCount})` }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={cn(
                    "px-6 py-4 text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {product.certifications && product.certifications.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.certifications.map(cert => (
                          <span
                            key={cert}
                            className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Weight:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {selectedVariant?.weight} {selectedVariant?.weightUnit}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Stock:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {selectedVariant?.stock} units available
                      </span>
                    </div>
                    {product.harvestDate && (
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Harvest Date:</span>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {product.harvestDate.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {product.bestBefore && (
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Best Before:</span>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {product.bestBefore.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Organic:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {product.isOrganic ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Categories:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">
                        {product.categories.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex text-amber-400 text-2xl">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className={i < Math.floor(product.averageRating) ? "fill-current" : ""}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {product.averageRating.toFixed(1)} out of 5
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Based on {product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;