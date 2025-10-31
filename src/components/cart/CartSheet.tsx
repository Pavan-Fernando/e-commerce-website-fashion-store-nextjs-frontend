"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";

export default function CartSheet() {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Your Cart ({getTotalItems()})</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col h-full">
                    {items.length === 0 ? (
                        <p className="text-center text-muted-foreground">Your cart is empty</p>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto space-y-4">
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border-b pb-4">
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={item.product.images[0] || "/placeholder.jpg"}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.product.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {item.size} • {item.color}
                                            </p>
                                            <p className="font-semibold">
                                                ${(item.product.price * item.quantity / 100).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-between items-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(item.productId, item.size, item.color)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                                                >
                                                    -
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${(getTotalPrice() / 100).toFixed(2)}</span>
                                </div>
                                <Button className="w-full mt-4" asChild>
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}