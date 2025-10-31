export type Product = {
    id: string;
    name: string;
    description: string;
    price: number; // in cents
    images: string[];
    category: string;
    sizes: string[];
    colors: string[];
    inStock: boolean;
    featured?: boolean;
};

export type CartItem = {
    productId: string;
    quantity: number;
    size: string;
    color: string;
};