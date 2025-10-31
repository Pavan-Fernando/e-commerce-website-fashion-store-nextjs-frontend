import { Product } from "../types/index";

export const mockProducts: Product[] = [
    {
        id: "1",
        name: "Summer Floral Dress",
        description: "Light and breezy cotton dress with floral print",
        price: 5999,
        images: ["/dress1.jpg", "/dress1b.jpg"],
        category: "Dresses",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Blue", "Pink"],
        inStock: true,
        featured: true,
    },
    {
        id: "2",
        name: "Denim Jacket",
        description: "Classic distressed denim jacket",
        price: 8999,
        images: ["/jacket1.jpg"],
        category: "Outerwear",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Light Blue", "Dark Blue"],
        inStock: true,
    },
    // Add 10+ more for demo
    ...Array.from({ length: 10 }, (_, i) => ({
        id: String(i + 3),
        name: `Product ${i + 3}`,
        description: "Stylish fashion item",
        price: Math.floor(Math.random() * 10000) + 3000,
        images: [`/placeholder.jpg`],
        category: "Tops",
        sizes: ["S", "M", "L"],
        colors: ["Black", "White"],
        inStock: true,
    })),
];