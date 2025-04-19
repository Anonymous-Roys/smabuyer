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
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

// nav items
interface NavItem {
  label: string;
  children?: NavItem[];
  href: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Handling scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    // Perform abort control
    const ctrl = new AbortController();
    const signal = ctrl.signal;

    window.addEventListener("scroll", handleScroll, { signal });
  }, []);
  // close mobile menu when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      href: "crowd-funding",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all  duration-300",
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
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#028F02] to-[#057505] hover:from-green-600 hover:to-green-[#057505] text-white"
            >
              Login
            </Button>
          </Link>
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
              className="absolute   inset-x-0 top-0 z-0 bg-background border-b border-border pt-24 pb-6 px-4 md:hidden"
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
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="bg-gradient-to-r w-full from-[#028F02] to-[#057505] hover:from-green-600 hover:to-green-[#057505] text-white">
                      Get Started
                    </Button>
                  </Link>
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
