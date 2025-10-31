"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setLoading(true);
        addItem(product, product.sizes[0], product.colors[0]);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setLoading(false);
        }, 1000);
    };

    return (
        <Button onClick={handleAdd} disabled={loading} size="sm" className="w-full">
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : added ? (
                <>
                    <Check className="mr-2 h-4 w-4" /> Added
                </>
            ) : (
                "Add to Cart"
            )}
        </Button>
    );
}