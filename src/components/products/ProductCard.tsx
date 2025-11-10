"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const hasSale = product.price && product.price > product.price;
    const discount = hasSale
        ? Math.round(((product.price! - product.price) / product.price!) * 100)
        : 0;

    return (
        <Card className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
            {/* ── IMAGE + OVERLAY ── */}
            <div className="aspect-square relative overflow-hidden">
                <Link href={`/products/${product.id}`} className="block">
                    <Image
                        src={product.images[0] || "/dress3.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Sale Badge */}
                {hasSale && (
                    <Badge
                        variant="destructive"
                        className="absolute top-3 left-3 text-xs font-bold animate-in fade-in slide-in-from-left-2"
                    >
                        -{discount}%
                    </Badge>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-10 w-10 rounded-full backdrop-blur-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsWishlisted(!isWishlisted);
                            }}
                            aria-label="Add to wishlist"
                        >
                            <Heart
                                className={`h-5 w-5 transition-colors ${
                                    isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"
                                }`}
                            />
                        </Button>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-10 w-10 rounded-full backdrop-blur-sm"
                            aria-label="Quick view"
                        >
                            <Eye className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* In Stock Badge */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-sm font-medium">
                            Out of Stock
                        </Badge>
                    </div>
                )}
            </div>

            {/* ── CONTENT ── */}
            <div className="p-4 space-y-2">
                <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating (Mock) */}
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`h-3.5 w-3.5 transition-colors ${
                                i < 4 ? "fill-primary text-primary" : "text-muted"
                            }`}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">(24)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <p className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        ${(product.price / 100).toFixed(2)}
                    </p>
                    {hasSale && (
                        <p className="text-sm text-muted-foreground line-through">
                            ${(product.price! / 100).toFixed(2)}
                        </p>
                    )}
                </div>

                {/* Color Swatches */}
                {product.colors.length > 1 && (
                    <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color) => (
                            <div
                                key={color}
                                className="w-5 h-5 rounded-full border border-border"
                                style={{
                                    backgroundColor:
                                        color.toLowerCase() === "white" ? "#fff" : color.toLowerCase(),
                                }}
                                title={color}
                            />
                        ))}
                        {product.colors.length > 3 && (
                            <span className="text-xs text-muted-foreground self-center ml-1">
                +{product.colors.length - 3}
              </span>
                        )}
                    </div>
                )}

                {/* Add to Cart */}
                <div className="mt-3">
                    <AddToCartButton
                        product={product}
                        size="sm"
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            </div>
        </Card>
    );
}