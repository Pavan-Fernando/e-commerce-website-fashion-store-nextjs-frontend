"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function ProductGrid({ products }: { products: any[] }) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            suppressHydrationWarning
        >
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    variants={item}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group"
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
}