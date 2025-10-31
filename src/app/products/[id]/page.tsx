import { mockProducts } from "@/lib/mockData";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = mockProducts.find((p) => p.id === params.id);
    if (!product) notFound();

    return (
        <div className="container py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={product.images[0] || "/placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.slice(1).map((img, i) => (
                            <div key={i} className="aspect-square relative rounded-md overflow-hidden bg-gray-100">
                                <Image src={img} alt="" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-2xl font-bold text-primary mb-4">
                        ${(product.price / 100).toFixed(2)}
                    </p>

                    <p className="text-muted-foreground mb-6">{product.description}</p>

                    <div className="space-y-4">
                        <div>
                            <p className="font-medium mb-2">Size</p>
                            <div className="flex gap-2">
                                {product.sizes.map((size) => (
                                    <Badge key={size} variant="outline" className="cursor-pointer">
                                        {size}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="font-medium mb-2">Color</p>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <div
                                        key={color}
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                ))}
                            </div>
                        </div>

                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}