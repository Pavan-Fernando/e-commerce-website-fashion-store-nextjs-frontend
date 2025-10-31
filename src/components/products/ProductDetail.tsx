// src/components/products/ProductDetail.tsx

"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useState } from "react";
import { Star, Heart } from "lucide-react";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="container py-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                {/* Image Gallery */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={selectedImage || "/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-300"
                        />
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`aspect-square relative rounded-md overflow-hidden border-2 transition-all ${
                                        selectedImage === img ? "border-primary" : "border-transparent"
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} thumbnail ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

                        {/* Rating (Mock) */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">(24 reviews)</span>
                        </div>

                        <p className="text-3xl font-bold text-primary">
                            ${(product.price / 100).toFixed(2)}
                        </p>
                        {product.inStock ? (
                            <Badge variant="secondary" className="mt-2">In Stock</Badge>
                        ) : (
                            <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                        )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                    {/* Size Selector */}
                    <div>
                        <p className="font-medium mb-2">Size</p>
                        <div className="flex gap-2 flex-wrap">
                            {product.sizes.map((size) => (
                                <Badge
                                    key={size}
                                    variant={selectedSize === size ? "default" : "outline"}
                                    className="cursor-pointer transition-all"
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Color Selector */}
                    <div>
                        <p className="font-medium mb-2">Color</p>
                        <div className="flex gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                                        selectedColor === color ? "border-primary scale-110" : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color.toLowerCase().replace(" ", "") }}
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
                    </div>

                    {/* Extra Info */}
                    <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
                        <p>Free shipping on orders over $50</p>
                        <p>30-day returns • Easy exchanges</p>
                        <p>Secure checkout • Multiple payment options</p>
                    </div>
                </div>
            </div>

            {/* Related Products Section (Optional Placeholder) */}
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
                {/* Add related products grid here later */}
            </section>
        </div>
    );
}