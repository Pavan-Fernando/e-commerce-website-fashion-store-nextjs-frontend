"use client";

import { useState, useMemo } from "react";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";

interface FilterState {
    price: [number, number];
    sizes: string[];
    colors: string[];
    categories: string[];
}

export default function ProductsPage() {
    const [filters, setFilters] = useState<FilterState>({
        price: [0, 30000], // cents
        sizes: [],
        colors: [],
        categories: [],
    });

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Extract unique values
    const allSizes = Array.from(new Set(mockProducts.flatMap(p => p.sizes)));
    const allColors = Array.from(new Set(mockProducts.flatMap(p => p.colors)));
    const allCategories = Array.from(new Set(mockProducts.map(p => p.category)));

    // Filtered products
    const filteredProducts = useMemo(() => {
        return mockProducts.filter(product => {
            const inPrice = product.price >= filters.price[0] && product.price <= filters.price[1];
            const inSize = filters.sizes.length === 0 || product.sizes.some(s => filters.sizes.includes(s));
            const inColor = filters.colors.length === 0 || product.colors.some(c => filters.colors.includes(c));
            const inCategory = filters.categories.length === 0 || filters.categories.includes(product.category);

            return inPrice && inSize && inColor && inCategory;
        });
    }, [filters]);

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            price: [0, 30000],
            sizes: [],
            colors: [],
            categories: [],
        });
    };

    const FiltersSidebar = () => (
        <div className="space-y-8">
            {/* Price Range */}
            <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="px-2">
                    <Slider
                        min={0}
                        max={30000}
                        step={100}
                        value={filters.price}
                        onValueChange={(v) => updateFilter("price", v as [number, number])}
                        className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${(filters.price[0] / 100).toFixed(0)}</span>
                        <span>${(filters.price[1] / 100).toFixed(0)}</span>
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div>
                <h3 className="font-semibold mb-3">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                    {allSizes.map(size => (
                        <Label
                            key={size}
                            className="flex items-center gap-2 cursor-pointer has-[:checked]:text-primary"
                        >
                            <Checkbox
                                checked={filters.sizes.includes(size)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        updateFilter("sizes", [...filters.sizes, size]);
                                    } else {
                                        updateFilter("sizes", filters.sizes.filter(s => s !== size));
                                    }
                                }}
                            />
                            <span className="text-sm">{size}</span>
                        </Label>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div>
                <h3 className="font-semibold mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                    {allColors.map(color => (
                        <button
                            key={color}
                            onClick={() => {
                                if (filters.colors.includes(color)) {
                                    updateFilter("colors", filters.colors.filter(c => c !== color));
                                } else {
                                    updateFilter("colors", [...filters.colors, color]);
                                }
                            }}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                                filters.colors.includes(color)
                                    ? "border-primary ring-2 ring-primary/30 scale-110"
                                    : "border-border"
                            }`}
                            style={{
                                backgroundColor: color.toLowerCase() === "white" ? "#fff" : color.toLowerCase(),
                            }}
                            aria-label={`Filter by ${color}`}
                        />
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                    {allCategories.map(cat => (
                        <Label
                            key={cat}
                            className="flex items-center gap-2 cursor-pointer has-[:checked]:text-primary"
                        >
                            <Checkbox
                                checked={filters.categories.includes(cat)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        updateFilter("categories", [...filters.categories, cat]);
                                    } else {
                                        updateFilter("categories", filters.categories.filter(c => c !== cat));
                                    }
                                }}
                            />
                            <span className="text-sm capitalize">{cat}</span>
                        </Label>
                    ))}
                </div>
            </div>

            <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear All Filters
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">All Products</h1>

                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="md:hidden">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                            {(filters.sizes.length + filters.colors.length + filters.categories.length > 0) && (
                                <Badge variant="secondary" className="ml-2">
                                    {filters.sizes.length + filters.colors.length + filters.categories.length}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <FiltersSidebar />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="grid lg:grid-cols-[250px_1fr] gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block">
                    <Card className="p-6 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        </div>
                        <FiltersSidebar />
                    </Card>
                </aside>

                {/* Product Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">
                            {filteredProducts.length} products
                        </p>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <Card className="p-12 text-center">
                            <p className="text-lg text-muted-foreground">No products match your filters.</p>
                            <Button variant="outline" className="mt-4" onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}