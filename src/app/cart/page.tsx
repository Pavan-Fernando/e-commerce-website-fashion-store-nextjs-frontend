"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag, Tag, Truck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
    id: string;
    name: string;
    price: number; // in cents
    quantity: number;
    size: string;
    color: string;
    image: string;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0); // in cents

    // Load cart from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === "SAVE10") {
            setDiscount(subtotal * 0.1);
        } else {
            setDiscount(0);
            alert("Invalid coupon code");
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 7500 ? 0 : 599; // Free over $75
    const tax = Math.round(subtotal * 0.08); // 8% tax
    const total = subtotal - discount + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                <div className="text-center py-16">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">
                        Looks like you haven’t added anything to your cart yet.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Your Cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>
                                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="text-center">Size</TableHead>
                                            <TableHead className="text-center">Color</TableHead>
                                            <TableHead className="text-center">Quantity</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary">{item.size}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full mx-auto border"
                                                        style={{ backgroundColor: item.color.toLowerCase() }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-8 w-8"
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-8 w-8"
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    ${(item.price * item.quantity / 100).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Total</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${(subtotal / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </span>
                                    <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "Free" : `$${(shipping / 100).toFixed(2)}`}
                  </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Free shipping on orders over $75
                                    </p>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span>Tax (8%)</span>
                                    <span>${(tax / 100).toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      Discount
                    </span>
                                        <span>-${(discount / 100).toFixed(2)}</span>
                                    </div>
                                )}
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${(total / 100).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Coupon */}
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1"
                                />
                                <Button onClick={applyCoupon} variant="outline">
                                    Apply
                                </Button>
                            </div>

                            <Button size="lg" className="w-full" asChild>
                                <Link href="/checkout">
                                    <Lock className="h-5 w-5 mr-2" />
                                    Proceed to Checkout
                                </Link>
                            </Button>

                            <div className="text-xs text-center text-muted-foreground">
                                <Lock className="inline h-3 w-3 mr-1" />
                                Secure checkout powered by Stripe
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
                <Button variant="outline" size="lg" asChild>
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    );
}