"use client";

import Link from "next/link";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartSheet from "@/components/cart/CartSheet";
import { useState } from "react";
import { useDarkMode } from "@/hooks/user-dark-mode";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDark, toggle } = useDarkMode();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* ── Top line ── */}
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

                {/* Right actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Dark‑mode toggle (desktop) */}
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

                    {/* Mobile menu toggle */}
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

            {/* ── Mobile menu (slide‑in) ── */}
            {mobileMenuOpen && (
                <div className="border-t bg-background/95 backdrop-blur md:hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="container px-4 py-5 space-y-5">

                        {/* Mobile search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 pr-4 h-10 bg-muted/40 focus:ring-2 focus:ring-primary/30"
                            />
                        </div>

                        {/* Dark‑mode toggle (mobile) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="absolute right-4 top-5"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        {/* Mobile nav */}
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