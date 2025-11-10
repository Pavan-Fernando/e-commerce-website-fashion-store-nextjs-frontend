"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Truck, CreditCard, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
    id: string;
    name: string;
    price: number; // cents
    quantity: number;
    size: string;
    color: string;
    image: string;
}

const shippingSchema = z.object({
    fullName: z.string().min(2),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    zip: z.string().min(5),
    country: z.string().min(2),
    saveAddress: z.boolean().optional(),
});

const paymentSchema = z.object({
    cardName: z.string().min(2),
    cardNumber: z.string().min(16).max(19),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/),
    cvv: z.string().min(3).max(4),
    billingSame: z.boolean().optional(),
});

type ShippingForm = z.infer<typeof shippingSchema>;
type PaymentForm = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingData, setShippingData] = useState<ShippingForm | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCartItems(JSON.parse(stored));
    }, []);

    const shippingForm = useForm<ShippingForm>({
        resolver: zodResolver(shippingSchema),
    });

    const paymentForm = useForm<PaymentForm>({
        resolver: zodResolver(paymentSchema),
    });

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 7500 ? 0 : 599;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;

    const onShippingSubmit = (data: ShippingForm) => {
        setShippingData(data);
        setStep(2);
    };

    const onPaymentSubmit = (data: PaymentForm) => {
        console.log("Order placed!", { shippingData, payment: data, cartItems, total });
        // Mock success
        setStep(3);
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                            step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                    >
                        {s}
                    </div>
                    {s < 3 && <div className="w-24 h-0.5 bg-muted mx-2" />}
                </div>
            ))}
        </div>
    );

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 md:py-12 text-center">
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Checkout
            </h1>

            <StepIndicator />

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Step 1: Shipping */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Truck className="h-5 w-5" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input id="fullName" {...shippingForm.register("fullName")} />
                                            {shippingForm.formState.errors.fullName && (
                                                <p className="text-sm text-destructive">
                                                    {shippingForm.formState.errors.fullName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Street Address</Label>
                                            <Input id="address" {...shippingForm.register("address")} />
                                            {shippingForm.formState.errors.address && (
                                                <p className="text-sm text-destructive">
                                                    {shippingForm.formState.errors.address.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" {...shippingForm.register("city")} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State / Province</Label>
                                            <Input id="state" {...shippingForm.register("state")} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zip">ZIP / Postal Code</Label>
                                            <Input id="zip" {...shippingForm.register("zip")} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Select onValueChange={(v) => shippingForm.setValue("country", v)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="US">United States</SelectItem>
                                                    <SelectItem value="CA">Canada</SelectItem>
                                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                                    <SelectItem value="EU">Europe</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="saveAddress" {...shippingForm.register("saveAddress")} />
                                        <Label htmlFor="saveAddress" className="text-sm">
                                            Save this address for future orders
                                        </Label>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Continue to Payment
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Payment */}
                    {step === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardName">Name on Card</Label>
                                        <Input id="cardName" {...paymentForm.register("cardName")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber">Card Number</Label>
                                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" {...paymentForm.register("cardNumber")} />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry Date</Label>
                                            <Input id="expiry" placeholder="MM/YY" {...paymentForm.register("expiry")} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input id="cvv" placeholder="123" {...paymentForm.register("cvv")} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="billingSame" {...paymentForm.register("billingSame")} />
                                        <Label htmlFor="billingSame" className="text-sm">
                                            Billing address same as shipping
                                        </Label>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back
                                        </Button>
                                        <Button type="submit" className="flex-1">
                                            Review Order
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Review & Confirm */}
                    {step === 3 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Review Your Order</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-2">Shipping Address</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {shippingData?.fullName}<br />
                                        {shippingData?.address}<br />
                                        {shippingData?.city}, {shippingData?.state} {shippingData?.zip}<br />
                                        {shippingData?.country}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-medium mb-2">Order Items</h3>
                                    <div className="space-y-3">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.size} • {item.color} • Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-medium">
                                                    ${(item.price * item.quantity / 100).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${(subtotal / 100).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `$${(shipping / 100).toFixed(2)}`}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${(tax / 100).toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${(total / 100).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button className="flex-1" onClick={() => {
                                        localStorage.removeItem("cart");
                                        alert("Order placed successfully!");
                                    }}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Place Order
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${(subtotal / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
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
                                    <span>Tax</span>
                                    <span>${(tax / 100).toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${(total / 100).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="text-xs text-center text-muted-foreground">
                                Secure checkout • 256-bit SSL
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}