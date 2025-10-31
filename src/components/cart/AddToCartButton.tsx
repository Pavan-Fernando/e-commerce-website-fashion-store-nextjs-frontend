"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";

interface AddToCartButtonProps {
    product: Product;
    selectedSize?: string;
    selectedColor?: string;
    quantity?: number;
    size?: "sm" | "default" | "lg";
    className?: string;
}

export function AddToCartButton({
                                    product,
                                    selectedSize = product.sizes[0],
                                    selectedColor = product.colors[0],
                                    quantity = 1,
                                    size = "default",
                                    className = "",
                                }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [state, setState] = useState<"idle" | "loading" | "success">("idle");

    const handleAdd = async () => {
        setState("loading");
        try {
            addItem(product, selectedSize, selectedColor);
            setState("success");
            setTimeout(() => setState("idle"), 1500);
        } catch (error) {
            setState("idle");
        }
    };

    return (
        <Button
            onClick={handleAdd}
            disabled={state === "loading" || state === "success"}
            size={size}
            className={`
        relative overflow-hidden transition-all duration-300
        ${state === "success" ? "bg-green-600 hover:bg-green-700" : ""}
        ${className}
      `}
        >
            {/* Background pulse on success */}
            {state === "success" && (
                <span className="absolute inset-0 bg-green-500/30 animate-ping" />
            )}

            <span className="relative flex items-center justify-center gap-2">
        {state === "loading" ? (
            <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Adding...</span>
            </>
        ) : state === "success" ? (
            <>
                <Check className="h-4 w-4" />
                <span className="font-medium">Added!</span>
            </>
        ) : (
            <>
                <ShoppingCart className="h-4 w-4" />
                <span className="font-medium">Add to Cart</span>
            </>
        )}
      </span>
        </Button>
    );
}