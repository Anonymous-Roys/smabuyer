"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  containerVariants, 
  itemVariants, 
  fadeInUp, 
  buttonVariants 
} from "@/constants/variants";
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Eye, 
  Share2,
  Filter,
  Search,
  Grid,
  List,
  ArrowRight,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ui/custom/product/custom-product-card";
import products from "@/constants/mock-data";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock wishlist data - in real app, this would come from localStorage or API
  useEffect(() => {
    // Simulate wishlist items (first 6 products from mock data)
    const mockWishlist = products.slice(0, 6).map(product => ({
      ...product,
      addedToWishlist: new Date(),
      isInWishlist: true
    }));
    setWishlistItems(mockWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleAddToCart = (product: any) => {
    // Add to cart logic here
    console.log('Added to cart:', product.name);
  };

  const handleShareWishlist = () => {
    // Share wishlist logic here
    console.log('Sharing wishlist');
  };

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.variants[0].price - b.variants[0].price;
      case 'rating':
        return b.averageRating - a.averageRating;
      case 'date':
        return new Date(b.addedToWishlist).getTime() - new Date(a.addedToWishlist).getTime();
      default:
        return 0;
    }
  });

  const totalValue = wishlistItems.reduce((sum, item) => 
    sum + item.variants[0].price, 0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-16 lg:py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              variants={fadeInUp}
            >
              My Wishlist
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Saved for Later
              <span className="block text-green-200">Wishlist</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Keep track of your favorite products and never miss out on the items you love.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={containerVariants}
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">{wishlistItems.length} Items</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="font-semibold">Total Value: ${totalValue.toFixed(2)}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Controls Section */}
      <motion.section
        className="py-8 bg-white border-b"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search and Filter */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
              variants={itemVariants}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
                <option value="date">Sort by Date Added</option>
              </select>
            </motion.div>

            {/* View Mode and Actions */}
            <motion.div
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleShareWishlist}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Wishlist Items */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          {wishlistItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start adding products to your wishlist to keep track of items you love.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-300"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="relative group"
                    >
                      <ProductCard
                        imageUrl={item.images[0]?.url || "/images/Image.png"}
                        name={item.name}
                        price={item.variants[0].price}
                        rating={item.averageRating}
                        discount={item.variants[0].comparedAtPrice ? 
                          Math.round(((item.variants[0].comparedAtPrice - item.variants[0].price) / item.variants[0].comparedAtPrice) * 100) : 0
                        }
                        product={item}
                      />
                      
                      {/* Remove from wishlist button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {sortedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.images[0]?.url || "/images/Image.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.shortDescription}
                              </p>
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(item.averageRating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-500 ml-1">
                                    ({item.averageRating.toFixed(1)})
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  Added {new Date(item.addedToWishlist).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                ${item.variants[0].price.toFixed(2)}
                              </div>
                              {item.variants[0].comparedAtPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${item.variants[0].comparedAtPrice.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                            <Link
                              href={`/products/${item.slug}`}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Link>
                            <button
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      {wishlistItems.length > 0 && (
        <motion.section
          className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              variants={containerVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Purchase?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Add your wishlist items to cart and complete your purchase. 
                Don't miss out on these amazing products!
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={containerVariants}
              >
                <motion.div variants={buttonVariants}>
                  <Link
                    href="/cart"
                    className="inline-block px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    View Cart
                  </Link>
                </motion.div>
                <motion.div variants={buttonVariants}>
                  <Link
                    href="/products"
                    className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-colors duration-300"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}
    </main>
  );
};

export default WishlistPage;
