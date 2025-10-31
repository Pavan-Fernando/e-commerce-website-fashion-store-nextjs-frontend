"use client";

import { mockProducts } from "@/lib/mockData";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = mockProducts.find((p) => p.id === params.id);
    if (!product) notFound();

    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="container py-8 md:py-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                {/* ── IMAGE GALLERY ── */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square relative overflow-hidden rounded-xl bg-card border border-border shadow-lg">
                        <Image
                            src={selectedImage || "/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === img
                                            ? "border-primary ring-2 ring-primary/20"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── PRODUCT INFO ── */}
                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < 4 ? "fill-primary text-primary" : "text-muted"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">(24 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                ${(product.price / 100).toFixed(2)}
                            </p>
                            {product.price > 5000 && (
                                <Badge variant="secondary" className="text-xs">
                                    Save 20%
                                </Badge>
                            )}
                        </div>

                        {/* Stock */}
                        {product.inStock ? (
                            <Badge variant="secondary" className="mt-3">
                                In Stock
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="mt-3">
                                Out of Stock
                            </Badge>
                        )}
                    </div>

                    <Separator />

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    {/* Size */}
                    <div>
                        <p className="font-medium mb-3 flex items-center gap-2">
                            Size <span className="text-xs text-muted-foreground">(Size Guide)</span>
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {product.sizes.map((size) => (
                                <Badge
                                    key={size}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    className="cursor-pointer transition-all hover:scale-105"
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div>
                        <p className="font-medium mb-3">Color</p>
                        <div className="flex gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                                        selectedColor === color
                                            ? "border-primary ring-2 ring-primary/30"
                                            : "border-border"
                                    }`}
                                    style={{
                                        backgroundColor:
                                            color.toLowerCase() === "white"
                                                ? "#fff"
                                                : color.toLowerCase(),
                                    }}
                                    aria-label={`Select ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <AddToCartButton
                            product={product}
                            // selectedSize={selectedSize}
                            // selectedColor={selectedColor}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={isWishlisted ? "text-red-500" : ""}
                        >
                            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-t">
                        <div className="flex flex-col items-center text-center text-sm">
                            <Truck className="h-6 w-6 text-primary mb-1" />
                            <span className="font-medium">Free Shipping</span>
                            <span className="text-muted-foreground">On orders over $50</span>
                        </div>
                        <div className="flex flex-col items-center text-center text-sm">
                            <RefreshCw className="h-6 w-6 text-primary mb-1" />
                            <span className="font-medium">Easy Returns</span>
                            <span className="text-muted-foreground">30-day policy</span>
                        </div>
                        <div className="flex flex-col items-center text-center text-sm">
                            <Shield className="h-6 w-6 text-primary mb-1" />
                            <span className="font-medium">Secure Checkout</span>
                            <span className="text-muted-foreground">SSL encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RELATED PRODUCTS (Placeholder) ── */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
                {/* Add related products grid here */}
            </section>
        </div>
    );
}