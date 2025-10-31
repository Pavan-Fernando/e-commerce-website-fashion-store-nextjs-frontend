import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, CreditCard, Shield, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t mt-16">
            <div className="container py-12 md:py-16 mx-auto flex flex-col items-center">
                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand & Description */}
                    <div className="space-y-5">
                        <Link href="/" className="inline-block">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">
                TrendVibe
              </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            Your destination for modern fashion. Discover curated collections, premium quality, and timeless style.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, href: "#", label: "Instagram" },
                                { Icon: Facebook, href: "#", label: "Facebook" },
                                { Icon: Twitter, href: "#", label: "Twitter" },
                                { Icon: Youtube, href: "#", label: "YouTube" },
                            ].map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    aria-label={label}
                                >
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: "/products", label: "All Products" },
                                { href: "/dresses", label: "Dresses" },
                                { href: "/tops", label: "Tops" },
                                { href: "/sale", label: "Sale" },
                                { href: "/new", label: "New Arrivals" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Customer Care</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: "/contact", label: "Contact Us" },
                                { href: "/shipping", label: "Shipping Info" },
                                { href: "/returns", label: "Returns & Exchanges" },
                                { href: "/faq", label: "FAQ" },
                                { href: "/size-guide", label: "Size Guide" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-5">
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Stay Connected</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Subscribe for exclusive offers and new arrivals.
                            </p>

                            {/* Newsletter Form */}
                            <form className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 h-10 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/30 transition-all"
                                />
                                <Button type="submit" className="h-10">
                                    Subscribe
                                </Button>
                            </form>
                        </div>

                        <Separator />

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>support@trendvibe.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>New York, NY</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM BAR ── */}
                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    {/* Copyright */}
                    <p>
                        © {new Date().getFullYear()} TrendVibe. All rights reserved.
                    </p>

                    {/* Legal Links */}
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>

                    {/* Payment Icons */}
                    <div className="flex gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <Truck className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </footer>
    );
}