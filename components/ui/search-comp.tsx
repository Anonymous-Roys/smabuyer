"use client";
import React from "react";
import ImageBlur from "../common/ImageBlur";
import Link from "next/link";

const SearchComp = () => {
  const [cartCount, setCartCount] = React.useState(0);

  // Load cart count from localStorage
  React.useEffect(() => {
    const updateCartCount = () => {
      const cart = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('cart') || '[]') 
        : [];
      setCartCount(cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0));
    };

    // Initial load
    updateCartCount();

    // Listen for storage changes (from other tabs/windows)
    window.addEventListener('storage', updateCartCount);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <div className="search-comp flex items-center">
      <div>
        <ImageBlur
          src="/icons/upper.png"
          alt="featured products"
          width={380}
          height={380}
          className="mr-2"
        />
      </div>
      <div className="relative">
        <Link href="/cart" className="hover:bg-[#E8F2E8] hover:rounded-md flex justify-center p-2 relative">
          <ImageBlur
            src="/icons/cart.png"
            alt="Shopping cart"
            width={30}
            height={30}
            className="mr-2"
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#2C742F] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SearchComp;