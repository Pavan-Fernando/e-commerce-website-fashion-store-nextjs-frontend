"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartSheet from "@/components/cart/CartSheet";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">
                    TrendVibe
                </Link>

                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search products..." className="pl-10" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <CartSheet />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t md:hidden">
                    <div className="container py-4">
                        <Input placeholder="Search..." className="mb-4" />
                        <nav className="flex flex-col gap-2">
                            <Link href="/" className="py-2">Home</Link>
                            <Link href="/products" className="py-2">All Products</Link>
                            <Link href="/dresses" className="py-2">Dresses</Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}