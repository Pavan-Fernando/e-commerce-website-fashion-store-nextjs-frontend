"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Globe, Package, Clock, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ShippingPage() {
    const shippingMethods = [
        {
            name: "Standard Shipping",
            cost: "Free on orders $75+",
            costBelow: "$5.99",
            time: "3–7 business days",
            icon: Truck,
            popular: true,
        },
        {
            name: "Express Shipping",
            cost: "$12.99",
            time: "1–2 business days",
            icon: Package,
            popular: false,
        },
        {
            name: "International Shipping",
            cost: "From $19.99",
            time: "5–14 business days",
            icon: Globe,
            popular: false,
        },
    ];

    const internationalZones = [
        { zone: "North America", cost: "$19.99", time: "5–7 days" },
        { zone: "Europe", cost: "$24.99", time: "5–10 days" },
        { zone: "Asia & Pacific", cost: "$29.99", time: "7–14 days" },
        { zone: "Rest of World", cost: "$39.99", time: "10–14 days" },
    ];

    const restrictedCountries = ["Cuba", "Iran", "North Korea", "Syria", "Crimea"];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                    Shipping Information
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Fast, reliable delivery worldwide. Free standard shipping on orders over $75.
                </p>
            </div>

            {/* Shipping Methods */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Shipping Options</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {shippingMethods.map((method) => (
                        <Card
                            key={method.name}
                            className={`relative overflow-hidden hover:shadow-lg transition-shadow ${
                                method.popular ? "ring-2 ring-primary" : ""
                            }`}
                        >
                            {method.popular && (
                                <Badge className="absolute top-4 right-4">Most Popular</Badge>
                            )}
                            <CardHeader>
                                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mb-4">
                                    <method.icon className="h-6 w-6" />
                                </div>
                                <CardTitle>{method.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Cost</p>
                                    <p className="text-xl font-semibold">
                                        {method.costBelow ? (
                                            <>
                        <span className="line-through text-muted-foreground">
                          {method.costBelow}
                        </span>{" "}
                                                <span className="text-green-600">{method.cost}</span>
                                            </>
                                        ) : (
                                            method.cost
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Delivery Time</p>
                                    <p className="font-medium flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {method.time}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* International Shipping */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <Globe className="h-8 w-8 text-primary" />
                    International Shipping
                </h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Zones & Rates</CardTitle>
                        <CardDescription>
                            We ship to over 50 countries. Rates vary by destination.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Zone</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Estimated Delivery</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {internationalZones.map((zone) => (
                                        <TableRow key={zone.zone}>
                                            <TableCell className="font-medium">{zone.zone}</TableCell>
                                            <TableCell>{zone.cost}</TableCell>
                                            <TableCell>{zone.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Tracking & Updates */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <Package className="h-8 w-8 text-primary" />
                    Order Tracking
                </h2>
                <Card>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <p>
                            Once your order ships, you’ll receive a <strong>tracking link</strong> via email.
                        </p>
                        <ul>
                            <li>Track your package in real-time</li>
                            <li>Get delivery updates via SMS (optional)</li>
                            <li>Contact support if delayed beyond estimated time</li>
                        </ul>
                        <Button variant="outline" size="sm" asChild className="mt-4">
                            <Link href="/profile">View Orders</Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* Restricted Countries */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-8 w-8" />
                    Shipping Restrictions
                </h2>
                <Card className="border-destructive/20">
                    <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground mb-4">
                            Due to international regulations, we currently <strong>cannot ship</strong> to:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {restrictedCountries.map((country) => (
                                <Badge key={country} variant="destructive">
                                    {country}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* FAQ CTA */}
            <section className="text-center py-12 bg-muted/50 rounded-2xl">
                <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Check our FAQ or contact support for personalized help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/faq">View FAQ</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}