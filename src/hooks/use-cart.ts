import { create } from "zustand";
import { CartItem, Product } from "@/types";

type CartState = {
    items: (CartItem & { product: Product })[];
    addItem: (product: Product, size: string, color: string) => void;
    removeItem: (productId: string, size: string, color: string) => void;
    updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
};

export const useCart = create<CartState>((set, get) => ({
    items: [],

    addItem: (product, size, color) => {
        set((state) => {
            const existing = state.items.find(
                (i) => i.productId === product.id && i.size === size && i.color === color
            );
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.productId === product.id && i.size === size && i.color === color
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }
            return {
                items: [...state.items, { productId: product.id, quantity: 1, size, color, product }],
            };
        });
    },

    removeItem: (productId, size, color) => {
        set((state) => ({
            items: state.items.filter(
                (i) => !(i.productId === productId && i.size === size && i.color === color)
            ),
        }));
    },

    updateQuantity: (productId, size, color, qty) => {
        if (qty === 0) {
            get().removeItem(productId, size, color);
            return;
        }
        set((state) => ({
            items: state.items.map((i) =>
                i.productId === productId && i.size === size && i.color === color
                    ? { ...i, quantity: qty }
                    : i
            ),
        }));
    },

    clearCart: () => set({ items: [] }),

    getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    getTotalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));