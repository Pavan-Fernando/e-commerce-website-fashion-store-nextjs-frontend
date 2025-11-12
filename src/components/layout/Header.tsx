"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, Sun, Moon, User, LogOut, Settings, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartSheet from "@/components/cart/CartSheet";
import { useState, useEffect } from "react";
import { useDarkMode } from "@/hooks/user-dark-mode";
import { onAuthChange, triggerAuthChange } from "@/lib/auth-events"; 
import { authApi } from "@/lib/api";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
  } | null>(null);

  // Load user from sessionStorage
  const loadUser = () => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem("user");
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const cleanup = onAuthChange(() => {
      loadUser();
    });
    return cleanup;
  }, []);

  const handleLogout = async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  try {
    if (accessToken) {
      await authApi.logout();
    }
  } catch (err) {
    console.warn("Logout API failed, clearing locally anyway");
  } finally {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("expiresAt");
    sessionStorage.removeItem("user");
    setUser(null);
    setMobileMenuOpen(false);
    router.push("/");
    triggerAuthChange();
  }
};

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
            pathname === item.href
              ? "text-primary bg-primary/10"
              : "text-foreground hover:text-primary hover:bg-muted/70"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  const displayName = user ? `${user.firstName} ${user.lastName}` : "";
  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">
            TrendVibe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          <NavLinks />
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search products..."
              className="pl-10 pr-4 h-10 bg-muted/40 focus:bg-background focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Profile / Login */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} alt={displayName} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium">{displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center gap-2">
                      <Package className="h-4 w-4" /> Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/login?redirectTo=${encodeURIComponent(pathname)}`}>
                  <User className="h-4 w-4 mr-2" /> Login
                </Link>
              </Button>
            )}
          </div>

          {/* Dark Mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="hidden md:flex"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <CartSheet />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t bg-background/95 backdrop-blur md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="container px-4 py-5 space-y-5">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 pr-4 h-10 bg-muted/40 focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Mobile Nav */}
            <nav className="flex flex-col gap-1">
              <NavLinks />
            </nav>

            {/* Mobile Profile / Login */}
            <div className="border-t pt-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{displayName}</p>
                      <button
                        onClick={handleLogout}
                        className="text-xs text-destructive hover:underline"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      router.push("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Profile
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link
                    href={`/login?redirectTo=${encodeURIComponent(pathname)}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" /> Login
                  </Link>
                </Button>
              )}
            </div>

            {/* Dark Mode (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="absolute right-4 top-20"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}