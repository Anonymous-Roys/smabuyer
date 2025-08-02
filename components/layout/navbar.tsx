"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Menu, X, User, Heart, ShoppingCart, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { isAuthenticated, clearToken } from "@/lib/utils/auth";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// nav items
interface NavItem {
  label: string;
  children?: NavItem[];
  href: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const pathname = usePathname();

  // Check auth status on mount and route changes
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) setProfileImage(storedImage);
  }, [pathname]);

  // Handling scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    const ctrl = new AbortController();
    const signal = ctrl.signal;

    window.addEventListener("scroll", handleScroll, { signal });
    return () => ctrl.abort();
  }, []);

  // close mobile menu when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    // Optional: Redirect to home page after logout
    window.location.href = '/';
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Crowdfunding",
      href: "/crowdfunding",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border/40 py-3"
          : "bg-transparent py-5 backdrop-blur-md"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image
            width={200}
            height={200}
            alt="logo"
            src={isScrolled ? "/icons/black-logo.svg" : "/icons/white-logo.svg"}
            className="h-[20px] w-[200px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-x-8"
          >
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition">
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${
                    !isScrolled && "hover:text-white"
                  } text-muted-foreground hover:text-foreground transition`}
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        </nav>
        
        {/* Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-x-4"
        >
          {isLoggedIn ? (
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-green-500 text-white">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/wishlist" className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/orders" className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#028F02] to-[#057505] hover:from-green-600 hover:to-green-700 text-white"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-10 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-0 z-0 bg-background border-b border-border pt-24 pb-6 px-4 md:hidden"
            >
              <nav className="flex flex-col gap-y-6">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div className="space-y-3">
                        <div className="font-medium">{item.label}</div>
                        <div className="space-y-2 pl-4 border-l border-border">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block text-muted-foreground hover:text-foreground transition"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-y-3 pt-6 border-t border-border">
                  {isLoggedIn ? (
                    <>
                      
                      <Button 
                        onClick={handleLogout}
                        variant="destructive" 
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="w-full">
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/signup" className="w-full">
                        <Button className="bg-gradient-to-r w-full from-[#028F02] to-[#057505] hover:from-green-600 hover:to-green-700 text-white">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;