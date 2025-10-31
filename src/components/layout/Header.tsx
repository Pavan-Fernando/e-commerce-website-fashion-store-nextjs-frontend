"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartSheet from "@/components/cart/CartSheet";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-primary tracking-tight">TrendVibe</span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10 pr-4 h-10 bg-muted/50 focus:bg-background transition-colors"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <CartSheet />

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t bg-background/95 backdrop-blur md:hidden">
                    <div className="container px-4 py-4 space-y-4">
                        {/* Mobile Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 pr-4 h-10 bg-muted/50"
                            />
                        </div>

                        {/* Mobile Nav */}
                        <nav className="flex flex-col gap-1">
                            <Link
                                href="/"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                All Products
                            </Link>
                            <Link
                                href="/dresses"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dresses
                            </Link>
                            <Link
                                href="/sale"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sale
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}