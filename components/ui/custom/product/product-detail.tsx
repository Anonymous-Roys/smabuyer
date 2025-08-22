'use client'
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Star, Heart, ShoppingBag, Facebook, Twitter, Share2, HomeIcon } from 'lucide-react';
import { CartItem, Product, ProductDetailPageProps, ProductImage, ProductVariant } from '@/types/product';
import ProductCard from './custom-product-card';
import ImageBlur from '@/components/common/ImageBlur';
import Link from 'next/link';




// Breadcrumb Component
const Breadcrumb = ({ product }: { product: Product }) => {
  return (
    <div 
      className="relative py-4 px-6 bg-gray-50 overflow-hidden"
      style={{
        backgroundImage: "url('/images/Breadcrumbs.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      
      <div className="relative z-10">
        <nav 
          className="flex items-center space-x-2 text-sm text-white"
          aria-label="Breadcrumb"
        >
          {/* Home Link */}
          <Link 
            href="/" 
            className="hover:text-green-300 transition-colors flex items-center"
          >
            <HomeIcon/>
          
          </Link>
          
          <span className="text-gray-300">/</span>
          
          {/* Products Page Link */}
          <Link 
            href="/products" 
            className="hover:text-green-300 transition-colors"
          >
            Products
          </Link>
          
          <span className="text-gray-300">/</span>
          
          {/* Category - Non-clickable */}
          <span className="capitalize text-gray-200">{product.categories[0]}</span>
          
          <span className="text-gray-300">/</span>
          
          {/* Current Product */}
          <span className="text-green-300 font-medium">{product.name}</span>
        </nav>

      </div>
    </div>
  );
};


// Image Gallery Component  
const ImageGallery = (
  { images, discount }
  :
  { images: ProductImage[]; discount: number}
) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const THUMBNAILS_TO_SHOW = 4;

  const scrollThumbnailsUp = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(thumbnailStartIndex - 1);
    }
  };

  const scrollThumbnailsDown = () => {
    if (thumbnailStartIndex + THUMBNAILS_TO_SHOW < images.length) {
      setThumbnailStartIndex(thumbnailStartIndex + 1);
    }
  };

  return (
    <div className="flex">
      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="mr-4 flex flex-col items-center">
          <button
            onClick={scrollThumbnailsUp}
            disabled={thumbnailStartIndex === 0}
            className={`mb-2 p-1 rounded ${thumbnailStartIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ChevronUp size={20} />
          </button>

          <div className="flex flex-col space-y-2">
            {images.slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_TO_SHOW).map((image, index) => {
              const actualIndex = thumbnailStartIndex + index;
              return (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(actualIndex)}
                  className={`relative h-16 w-16 overflow-hidden rounded border-2 ${selectedImageIndex === actualIndex ? 'border-green-500' : 'border-gray-200'
                    }`}
                >
                  <ImageBlur
                    src={image.url}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    width={50}
          height={50}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={scrollThumbnailsDown}
            disabled={thumbnailStartIndex + THUMBNAILS_TO_SHOW >= images.length}
            className={`mt-2 p-1 rounded ${thumbnailStartIndex + THUMBNAILS_TO_SHOW >= images.length ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <ChevronDown size={20} />
          </button>
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-square flex-1 overflow-hidden rounded-lg border">
        <ImageBlur
          src={images[selectedImageIndex]?.url}
          alt={images[selectedImageIndex]?.alt}
          className="h-full w-full object-cover"
          width={50}
          height={50}
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
            {discount}% Off
          </div>
        )}
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo = ({
  product,
  handleAddToCart,
}: {
  product: Product;
  handleAddToCart: (variant: ProductVariant, quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];

  useEffect(() => {
  const checkCart = () => {
    const existingCart: CartItem[] = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
    const itemInCart = existingCart.some(item => item.variantId === selectedVariant.id);
    setIsInCart(itemInCart);
  };

  checkCart();
}, [selectedVariant.id]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
  }).format(selectedVariant.price);

  const formattedComparedPrice = selectedVariant.comparedAtPrice
    ? new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GHS",
    }).format(selectedVariant.comparedAtPrice)
    : null;

  const discount = selectedVariant.comparedAtPrice
    ? Math.round(((selectedVariant.comparedAtPrice - selectedVariant.price) / selectedVariant.comparedAtPrice) * 100)
    : 0;
 const discountedPrice = discount
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "GHS",
        }).format(selectedVariant.price * (1 - discount / 100))
      : null;
      
  const increaseQuantity = () => {
    if (quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.averageRating) ? "fill-current" : ""}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.reviewCount} Review{product.reviewCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                SKU: <span className="text-gray-900">{selectedVariant.sku}</span>
              </div>
            </div>
          </div>
          <span className={`inline-block rounded px-3 py-1 text-sm font-medium ${selectedVariant.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}>
            {selectedVariant.isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">{formattedPrice}</span>
            {formattedComparedPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">{formattedComparedPrice}</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {discountedPrice}% Off
                </span>
              </>
            )}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-6">
          <span className="text-gray-600">Brand: </span>
          <div className="inline-flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6">{product.shortDescription}</p>

        {/* Variants */}
        {product.variants.length > 1 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Available Options</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantIndex(index)}
                  disabled={!variant.isAvailable}
                  className={`rounded-lg border px-4 py-2 text-sm transition-all ${selectedVariantIndex === index
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    } ${!variant.isAvailable && 'cursor-not-allowed opacity-50'}`}
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
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={!selectedVariant.isAvailable || quantity >= selectedVariant.stock}
                className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                +
              </button>
            </div>

            <button
  disabled={!selectedVariant.isAvailable}
  onClick={() => handleAddToCart(selectedVariant, quantity)
  }
  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-6 text-white font-medium ${selectedVariant.isAvailable
      ? isInCart 
        ? 'bg-green-600 hover:bg-green-700' 
        : 'bg-green-600 hover:bg-green-700'
      : 'bg-gray-400 cursor-not-allowed'
    }`}
>

    <>
      <ShoppingBag size={20} />
      Add to Cart
    </>

</button>


            <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 pt-6 border-t border-gray-200 mt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Category:</span>
              <div className="mt-1">
                {product.categories.map((category) => (
                  <button
                    key={category}
                    className="text-green-600 hover:text-green-700 capitalize mr-2"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <span className="text-gray-500">Tag:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
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
            <span className="text-gray-500 text-sm">Share Item:</span>
            <div className="flex gap-3 mt-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Facebook size={20} />
              </button>
              <button className="text-blue-400 hover:text-blue-600">
                <Twitter size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Tabs Component
const ProductTabs = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const selectedVariant = product.variants[0];

  return (
    <div className="border-t border-gray-200">
      <div className="flex border-b border-gray-200">
        {[
          { key: 'description', label: 'Descriptions' },
          { key: 'info', label: 'Additional Information' },
          { key: 'reviews', label: 'Customer Feedback' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.key
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>100 g of fresh vegetables provides.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Aliquam ac est at augue volutpat elementum.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Quisque nec enim eget sapien molestie.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Proin convallis odio volutpat finibus posuere.</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Cras et diam maximus, accumsan sapien sit, sollicitudin velit. Nulla blandit eros non turpis
              lobortis iaculis et ut massa.
            </p>

            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-6 flex gap-2">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-block rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🎯</div>
                  <div>
                    <div className="font-semibold">64% Discount</div>
                    <div className="text-sm text-gray-600">Save your 64% money with us</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🌱</div>
                  <div>
                    <div className="font-semibold">100% Organic</div>
                    <div className="text-sm text-gray-600">100% Organic Vegetables</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Weight:</span>
                <span className="ml-2 text-gray-700">
                  {selectedVariant.weight} {selectedVariant.weightUnit}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Stock:</span>
                <span className="ml-2 text-gray-700">{selectedVariant.stock} units available</span>
              </div>
              {product.harvestDate && (
                <div>
                  <span className="font-medium text-gray-900">Harvest Date:</span>
                  <span className="ml-2 text-gray-700">
                    {product.harvestDate.toLocaleDateString()}
                  </span>
                </div>
              )}
              {product.bestBefore && (
                <div>
                  <span className="font-medium text-gray-900">Best Before:</span>
                  <span className="ml-2 text-gray-700">
                    {product.bestBefore.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Organic:</span>
                <span className="ml-2 text-gray-700">{product.isOrganic ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Categories:</span>
                <span className="ml-2 text-gray-700 capitalize">
                  {product.categories.join(', ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Mock Reviews */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    KW
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">Kristin Watson</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Duis at ullamcorper nulla, eu dictum eros.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    JC
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">Jane Cooper</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                        <Star size={12} />
                      </div>
                      <span className="text-sm text-gray-500">30 Apr, 2021</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to <span>&apos;bolt&apos;</span>
 or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    JJ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">Jacob Jones</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    RE
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">Ralph Edwards</span>
                      <div className="flex text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. <span>Canton&apos;s </span> Choice, Bok Choi, from USA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Related Products Component
const RelatedProducts = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={
              product.images.find((img) => img.isPrimary)?.url ||
              product.images[0]?.url ||
              "/images/Image.png"
            }
            imageAlt={
              product.images.find((img) => img.isPrimary)?.alt ||
              product.images[0]?.alt ||
              ""
            }
            name={product.name}
            price={product.variants[0]?.price || 0}
            rating={product.averageRating}
            discount={
              product.variants[0]?.comparedAtPrice
                ? Math.round(
                  ((product.variants[0].comparedAtPrice - product.variants[0].price) /
                    product.variants[0].comparedAtPrice) *
                  100
                )
                : 0
            }
            product={product}
          />
        ))}
      </div>
    </div>
  );
};


// Main Product Detail Component
const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  relatedProducts 
}) => {
  const selectedVariant = product.variants[0];
  const discount = selectedVariant.comparedAtPrice
    ? Math.round(((selectedVariant.comparedAtPrice - selectedVariant.price) / selectedVariant.comparedAtPrice) * 100)
    : 0;
 
  const [showAddedNotification, setShowAddedNotification] = useState(false);

 const propHandleAddToCart = (variant: ProductVariant, quantity: number = 1) => {
  const cartItem: CartItem = {
    productId: product.id,
    variantId: variant.id,
    name: `${product.name} - ${variant.name}`, // Combine product + variant names
    price: variant.price,
    slug: product.slug,
    discountedPrice: variant.price * (1 - (discount || 0) / 100),
    quantity: quantity,
    imageUrl: product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || "",
    weight: variant.weight * quantity,
    weightUnit: variant.weightUnit,
    stock: variant.stock,
    farmerId: product.farmerId,
    category: product.categories[0],
    sku: variant.sku
  };
console.log(product.slug)
  // Get existing cart
  const existingCart: CartItem[] = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];

  // Check if this exact variant already exists in cart
  const existingItemIndex = existingCart.findIndex(
    item => item.variantId === variant.id
  );

  if (existingItemIndex >= 0) {
    // Update existing item
    existingCart[existingItemIndex].quantity += quantity;
    existingCart[existingItemIndex].weight = 
      variant.weight * existingCart[existingItemIndex].quantity;
  } else {
    // Add new item
    existingCart.push(cartItem);
  }

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(existingCart));
  }

  setShowAddedNotification(true);
  setTimeout(() => setShowAddedNotification(false), 3000);
};
  return (
    <div className="bg-white pt-24">
      {/* Breadcrumb */}
      <Breadcrumb product={product} />
      {/* Back button for mobile */}
      <div className="lg:hidden px-4 py-3 border-b">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>
      </div>

      {/* Notification */}
      {showAddedNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {product.name} added to cart!
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <ImageGallery images={product.images} discount={discount} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} handleAddToCart={propHandleAddToCart} />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
