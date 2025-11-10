import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
    const featured = mockProducts.filter((p) => p.featured);

    return (
        <div className="group relative overflow-hidden rounded-2xl ml-80 mr-80 mt-10 mb-10">
            {/* ── HERO ── */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background dark:to-background/50 p-12 md:p-20 text-center">
                <div className="absolute inset-0 bg-grid-white/5 dark:bg-grid-muted/5" />
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
                        Summer Collection 2025
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Fresh looks. Bold vibes. Crafted for the modern trendsetter.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/*<Button size="lg" asChild>*/}
                        {/*    <a href="/products">Shop Now</a>*/}
                        {/*</Button>*/}
                        <Button size="lg" variant="outline" asChild>
                            <a href="/sale">View Sale</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── FEATURED ── */}
            <section className="mt-16 md:mt-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl md:text-4xl font-semibold">Featured</h2>
                    <Badge variant="secondary" className="text-sm">
                        {featured.length} items
                    </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {featured.map((product) => (
                        <div
                            key={product.id}
                            className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

             {/*── ALL PRODUCTS ──*/}
            <section className="mt-16 md:mt-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl md:text-4xl font-semibold">All Products</h2>
                    {/*<Button variant="ghost" size="sm" asChild>*/}
                    {/*    <a href="/products">View All</a>*/}
                    {/*</Button>*/}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {mockProducts.slice(0, 8).map((product) => (
                        <div
                            key={product.id}
                            className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Load more placeholder */}
                {mockProducts.length > 8 && (
                    <div className="mt-12 text-center">
                        {/*<Button variant="outline" size="lg" asChild>*/}
                        {/*    <a href="/products">Load More Products</a>*/}
                        {/*</Button>*/}
                    </div>
                )}
            </section>
        </div>
    );
}