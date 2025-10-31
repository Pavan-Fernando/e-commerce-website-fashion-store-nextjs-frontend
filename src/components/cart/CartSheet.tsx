"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Package } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartSheet() {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const subtotal = getTotalPrice();
    const hasItems = items.length > 0;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-in fade-in zoom-in duration-200">
              {getTotalItems()}
            </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
                <SheetHeader className="p-6 pb-4 border-b">
                    <SheetTitle className="flex items-center gap-2 text-xl">
                        <ShoppingCart className="h-5 w-5" />
                        Your Cart {hasItems && <span className="text-sm font-normal text-muted-foreground">({getTotalItems()})</span>}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {hasItems ? (
                        items.map((item, idx) => (
                            <div
                                key={`${item.productId}-${item.size}-${item.color}`}
                                className="flex gap-4 animate-in slide-in-from-top-2 duration-300"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-card border border-border">
                                    <Image
                                        src={item.product.images[0] || "/placeholder.jpg"}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-medium text-foreground line-clamp-2">
                                        {item.product.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {item.size} • {item.color}
                                    </p>
                                    <p className="font-semibold text-primary">
                                        ${(item.product.price * item.quantity / 100).toFixed(2)}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col justify-between items-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive hover:text-destructive/80"
                                        onClick={() => removeItem(item.productId, item.size, item.color)}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-7 w-7 text-xs"
                                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                        >
                                            −
                                        </Button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-7 w-7 text-xs"
                                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                            <div className="relative w-24 h-24">
                                <Package className="h-24 w-24 text-muted-foreground/30" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl text-muted-foreground/20">?</span>
                                </div>
                            </div>
                            <p className="text-lg font-medium text-foreground">Your cart is empty</p>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                Looks like you haven’t added anything to your cart yet.
                            </p>
                            <Button asChild onClick={() => setIsOpen(false)}>
                                <Link href="/products">Continue Shopping</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer - Only show when items exist */}
                {hasItems && (
                    <SheetFooter className="p-6 pt-4 border-t bg-muted/30">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Subtotal</span>
                                <span className="text-primary">${(subtotal / 100).toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Button className="w-full" size="lg" asChild>
                                    <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                        Proceed to Checkout
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                                        View Full Cart
                                    </Link>
                                </Button>
                            </div>
                            <p className="text-xs text-center text-muted-foreground">
                                Shipping & taxes calculated at checkout
                            </p>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}