"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  ShoppingCart,
  LogOut,
  Settings,
  Home,
  FileText,
  ShoppingBag,
  Clock,
  HelpCircle,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Dummy user data
const DUMMY_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/images/avatars/john-doe.jpg",
  roles: ["customer", "farmer"],
  primaryRole: "customer",
  hasApprovedRoles: {
    customer: true,
    farmer: true,
    investor: false,
    transit: false,
  },
  cartCount: 5,
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dummy auth state - in real app, this would come from your auth hook
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const user = isAuthenticated ? DUMMY_USER : null;

  // Simulated logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    // In a real app, this would call your auth context logout method
    console.log("User logged out");
  };

  // Handle scroll effect for transparent to solid header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Navigation links
  const navigationLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "About", href: "/about", icon: FileText },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  // Role-specific dashboard links (only shown if user has the role)
  const dashboardLinks = [
    { name: "Customer Dashboard", href: "/customer", role: "customer" },
    { name: "Farmer Dashboard", href: "/farmer", role: "farmer" },
    { name: "Investor Dashboard", href: "/investor", role: "investor" },
    { name: "Transit Dashboard", href: "/transit", role: "transit" },
  ];

  // Check if a route is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-sm py-2"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="SmaGriTrade Home"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-xl md:text-2xl text-primary"
          >
            SmartGri<span className="text-green-600">Trade</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Show crowdfunding link only for investors */}
          {isAuthenticated && user?.hasApprovedRoles.investor && (
            <Link
              href="/crowdfunding"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/crowdfunding")
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Crowdfunding
            </Link>
          )}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Shopping Cart */}
          {isAuthenticated && (
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {user?.cartCount && user.cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs"
                  variant="default"
                >
                  {user.cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          )}

          {/* User Menu (if authenticated) */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.avatar}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* User's dashboard links based on roles */}
                {dashboardLinks
                  .filter(
                    (link) =>
                      user?.hasApprovedRoles[
                        link.role as keyof typeof user.hasApprovedRoles
                      ]
                  )
                  .map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.name}</Link>
                    </DropdownMenuItem>
                  ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-full sm:max-w-sm">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="font-bold text-xl text-primary">
                    SmaGri<span className="text-green-600">Trade</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile User Info (if authenticated) */}
                {isAuthenticated && (
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase() || (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Menu Content */}
                <div className="flex-1 overflow-auto p-4">
                  {/* Navigation Links */}
                  <nav className="space-y-2">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.name}
                      </Link>
                    ))}

                    {/* Show crowdfunding link only for investors */}
                    {isAuthenticated && user?.hasApprovedRoles.investor && (
                      <Link
                        href="/crowdfunding"
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive("/crowdfunding")
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Crowdfunding
                      </Link>
                    )}
                  </nav>

                  {/* Authentication Links (if not authenticated) */}
                  {!isAuthenticated && (
                    <div className="mt-6 flex flex-col space-y-2">
                      <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/signin">Sign In</Link>
                      </Button>
                    </div>
                  )}

                  {/* Dashboard Links (if authenticated) */}
                  {isAuthenticated && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Your Dashboards
                      </h3>
                      <div className="space-y-2">
                        {dashboardLinks
                          .filter(
                            (link) =>
                              user?.hasApprovedRoles[
                                link.role as keyof typeof user.hasApprovedRoles
                              ]
                          )
                          .map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              {link.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Help Links */}
                  <div className="mt-6">
                    <Collapsible className="border rounded-md overflow-hidden">
                      <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-gray-50">
                        <div className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                          Need Help?
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border-t">
                        <div className="p-3 bg-gray-50 space-y-2">
                          <Link
                            href="/faqs"
                            className="block text-sm hover:text-primary transition-colors"
                          >
                            Frequently Asked Questions
                          </Link>
                          <Link
                            href="/contact"
                            className="block text-sm hover:text-primary transition-colors"
                          >
                            Contact Support
                          </Link>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                {isAuthenticated && (
                  <div className="p-4 border-t">
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                )}

                {/* Subtle "Join as a Farmer" link, as per requirements */}
                {isAuthenticated && !user?.hasApprovedRoles.farmer && (
                  <div className="p-4 text-center border-t text-xs text-muted-foreground">
                    <Link
                      href="/onboarding/farmer"
                      className="hover:text-primary transition-colors"
                    >
                      Join as a Farmer
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
