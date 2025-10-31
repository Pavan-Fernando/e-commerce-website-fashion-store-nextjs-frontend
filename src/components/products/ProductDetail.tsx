"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Star, Heart, ChevronLeft, ChevronRight, Info, Package } from "lucide-react";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 300); // Simulate load
    }, []);

    const handlePrevImage = () => {
        const idx = product.images.indexOf(selectedImage);
        setSelectedImage(product.images[idx === 0 ? product.images.length - 1 : idx - 1]);
    };

    const handleNextImage = () => {
        const idx = product.images.indexOf(selectedImage);
        setSelectedImage(product.images[idx === product.images.length - 1 ? 0 : idx + 1]);
    };

    return (
        <div className="container py-8 md:py-12 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                {/* ── IMAGE GALLERY ── */}
                <div className="relative space-y-4">
                    {isLoading ? (
                        <Skeleton className="aspect-square rounded-xl" />
                    ) : (
                        <>
                            <div className="aspect-square relative overflow-hidden rounded-xl bg-card border border-border shadow-xl group">
                                <Image
                                    src={selectedImage || "/placeholder.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImage(img)}
                                            className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                                selectedImage === img
                                                    ? "border-primary ring-2 ring-primary/20 scale-105"
                                                    : "border-border hover:border-primary/60"
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
                        </>
                    )}
                </div>

                {/* ── PRODUCT INFO ── */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3.5 w-3.5 transition-colors ${
                                        i < 4 ? "fill-primary text-primary" : "text-muted"
                                    }`}
                                />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">(24 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-2">
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                ${(product.price / 100).toFixed(2)}
                            </p>
                            {product.price && product.price > product.price && (
                                <p className="text-lg text-muted-foreground line-through">
                                    ${(product.price / 100).toFixed(2)}
                                </p>
                            )}
                        </div>

                        {/* Stock */}
                        {product.inStock ? (
                            <Badge variant="secondary" className="mt-2">
                                In Stock
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="mt-2">
                                Out of Stock
                            </Badge>
                        )}
                    </div>

                    <Separator />

                    <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    {/* Size */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <p className="font-medium">Size</p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <Info className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click for size guide</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
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
                                            color.toLowerCase() === "white" ? "#fff" : color.toLowerCase(),
                                    }}
                                    aria-label={`Select ${color}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <p className="font-medium mb-3">Quantity</p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity === 1}
                            >
                                −
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <AddToCartButton
                            product={product}
                            selectedSize={selectedSize}
                            selectedColor={selectedColor}
                            quantity={quantity}
                            size="lg"
                            className="flex-1"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={isWishlisted ? "text-red-500" : ""}
                        >
                            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-t">
                        <div className="flex flex-col items-center text-center text-sm">
                            <Package className="h-6 w-6 text-primary mb-1" />
                            <span className="font-medium">Free Shipping</span>
                            <span className="text-muted-foreground text-xs">On orders over $50</span>
                        </div>
                        <div className="flex flex-col items-center text-center text-sm">
                            <Package className="h-6 w-6 text-primary mb-1" />
                            <span className="font-medium">Easy Returns</span>
                            <span className="text-muted-foreground text-xs">30-day policy</span>
                        </div>
                        <div className="flex flex-col items-center text-center text-sm">
                            <Package className="h-6 w-6 text-primary mb-1" />
                            <span className="font-medium">Secure Checkout</span>
                            <span className="text-muted-foreground text-xs">SSL encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── TABS ── */}
            <Tabs defaultValue="details" className="mt-16">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Product Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ul>
                            <li>Premium cotton blend</li>
                            <li>Machine wash cold</li>
                            <li>Imported</li>
                        </ul>
                    </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                    <p className="text-muted-foreground">No reviews yet.</p>
                </TabsContent>
                <TabsContent value="shipping" className="mt-6">
                    <p className="text-muted-foreground">Free shipping on orders over $50.</p>
                </TabsContent>
            </Tabs>

            {/* ── RELATED PRODUCTS ── */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Mock related products */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <Skeleton className="aspect-square rounded-lg mb-3" />
                            <Skeleton className="h-4 w-3/4 mb-1" />
                            <Skeleton className="h-5 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}