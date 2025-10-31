import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/products/ProductCard";

export default function Home() {
  const featured = mockProducts.filter((p) => p.featured);

  return (
      <div className="container py-8">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Summer Collection 2025</h1>
          <p className="text-xl text-muted-foreground">Fresh looks. Bold vibes.</p>
        </section>

        {/* Featured */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
  );
}