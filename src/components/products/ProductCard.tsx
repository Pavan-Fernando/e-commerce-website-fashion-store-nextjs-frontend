"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/products/${product.id}`}>
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <Image
                        src={product.images[0] || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium truncate">{product.name}</h3>
                </Link>
                <p className="text-lg font-bold mt-1">
                    ${(product.price / 100).toFixed(2)}
                </p>

                <div className="mt-3">
                    <AddToCartButton product={product} />
                </div>
            </div>
        </Card>
    );
}