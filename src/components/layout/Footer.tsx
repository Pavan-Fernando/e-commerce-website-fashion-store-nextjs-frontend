import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-muted/50 border-t mt-16">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <Link href="/public" className="text-2xl font-bold text-primary inline-block">
                            TrendVibe
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Your destination for modern fashion. Discover curated collections, premium quality, and timeless style.
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products" className="text-muted-foreground hover:text-primary transition">All Products</Link></li>
                            <li><Link href="/dresses" className="text-muted-foreground hover:text-primary transition">Dresses</Link></li>
                            <li><Link href="/tops" className="text-muted-foreground hover:text-primary transition">Tops</Link></li>
                            <li><Link href="/sale" className="text-muted-foreground hover:text-primary transition">Sale</Link></li>
                            <li><Link href="/new" className="text-muted-foreground hover:text-primary transition">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="font-semibold mb-4">Customer Care</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition">Contact Us</Link></li>
                            <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition">Shipping Info</Link></li>
                            <li><Link href="/returns" className="text-muted-foreground hover:text-primary transition">Returns & Exchanges</Link></li>
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition">FAQ</Link></li>
                            <li><Link href="/size-guide" className="text-muted-foreground hover:text-primary transition">Size Guide</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Stay Connected</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe for exclusive offers and new arrivals.
                        </p>

                        {/* Newsletter Form (Mock) */}
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
                            >
                                Subscribe
                            </button>
                        </form>

                        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>support@trendvibe.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>New York, NY</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} TrendVibe. All rights reserved.
                        <span className="mx-2">•</span>
                        <Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
                        <span className="mx-2">•</span>
                        <Link href="/terms" className="hover:text-primary transition">Terms of Service</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}