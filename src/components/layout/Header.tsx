"use client";

import Link from "next/link";
import {Search, Menu, X, Sun, Moon, User, LogOut, Settings, Package} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CartSheet from "@/components/cart/CartSheet";
import { useState } from "react";
import { useDarkMode } from "@/hooks/user-dark-mode";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDark, toggle } = useDarkMode();

    // ── Mock Auth State (Replace with real auth later) ──
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = isLoggedIn
        ? { name: "Emma R.", email: "emma@trendvibe.com", avatar: "/avatar.jpg" }
        : null;

    const handleLogout = () => {
        setIsLoggedIn(false);
        setMobileMenuOpen(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* ── Top Toolbar ── */}
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">
            TrendVibe
          </span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
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

                    {/* ── PROFILE ICON (Desktop) ── */}
                    <div className="hidden md:block">
                        {isLoggedIn && user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            My Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/orders" className="flex items-center gap-2">
                                            <Package className="h-4 w-4" />
                                            Orders
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="outline" size="sm" onClick={handleLogin}>
                                <User className="h-4 w-4 mr-2" />
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Dark Mode Toggle */}
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

            {/* ── MOBILE MENU ── */}
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

                        {/* ── PROFILE (Mobile) ── */}
                        <div className="flex items-center justify-between">
                            {isLoggedIn && user ? (
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <button
                                            onClick={handleLogout}
                                            className="text-xs text-destructive hover:underline"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Button variant="outline" size="sm" onClick={handleLogin} className="w-full">
                                    <User className="h-4 w-4 mr-2" />
                                    Login
                                </Button>
                            )}
                        </div>

                        {/* Dark Mode (Mobile) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="absolute right-4 top-5"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        {/* Mobile Nav */}
                        <nav className="flex flex-col gap-1">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/products", label: "All Products" },
                                { href: "/dresses", label: "Dresses" },
                                { href: "/sale", label: "Sale" },
                                { href: "/new", label: "New Arrivals" },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted/70 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}