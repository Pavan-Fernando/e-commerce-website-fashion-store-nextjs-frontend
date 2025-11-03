"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Heart,
    Sparkles,
    Globe,
    Users,
    Leaf,
    Truck,
    Shield,
    Star
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const team = [
        { name: "Emma Rose", role: "Founder & CEO", avatar: "/team/emma.jpg" },
        { name: "Alex Chen", role: "Creative Director", avatar: "/team/alex.jpg" },
        { name: "Sofia Patel", role: "Head of Design", avatar: "/team/sofia.jpg" },
        { name: "Marcus Johnson", role: "Operations Lead", avatar: "/team/marcus.jpg" },
    ];

    const values = [
        { icon: Heart, title: "Customer First", desc: "Your style, our priority." },
        { icon: Sparkles, title: "Premium Quality", desc: "Curated with care." },
        { icon: Leaf, title: "Sustainable Fashion", desc: "Eco-friendly materials." },
        { icon: Globe, title: "Global Reach", desc: "Shipping worldwide." },
    ];

    const timeline = [
        { year: "2018", event: "TrendVibe founded in NYC" },
        { year: "2020", event: "Launched sustainable collection" },
        { year: "2022", event: "Opened first flagship store" },
        { year: "2024", event: "Reached 1M+ happy customers" },
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
            {/* Hero */}
            <section className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
                    About TrendVibe
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    We believe fashion should be effortless, sustainable, and empowering.
                    From runway to your wardrobe — we make style accessible to everyone.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="p-8 hover:shadow-lg transition-shadow">
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Star className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-muted-foreground">
                            To democratize fashion by offering high-quality, sustainable clothing
                            that fits every body, budget, and occasion.
                        </p>
                    </CardContent>
                </Card>

                <Card className="p-8 hover:shadow-lg transition-shadow">
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold">Our Vision</h2>
                        </div>
                        <p className="text-muted-foreground">
                            A world where everyone feels confident and beautiful in clothes
                            that respect people and the planet.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Our Story - Timeline */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {timeline.map((item, i) => (
                        <div key={i} className="text-center group">
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-white transition-all">
                                    {item.year}
                                </div>
                                {i < timeline.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -z-10 group-hover:bg-primary/30 transition-colors" />
                                )}
                            </div>
                            <p className="mt-4 font-medium">{item.event}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map((member) => (
                        <Card key={member.name} className="p-6 text-center hover:shadow-md transition-shadow">
                            <Avatar className="h-24 w-24 mx-auto mb-4">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {values.map((value) => (
                        <Card key={value.title} className="p-6 text-center hover:shadow-md transition-shadow">
                            <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                                <value.icon className="h-8 w-8" />
                            </div>
                            <h3 className="font-semibold mb-2">{value.title}</h3>
                            <p className="text-sm text-muted-foreground">{value.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-12 bg-muted/50 rounded-2xl">
                <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Join thousands of happy customers and discover your next favorite outfit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/products">Shop Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}