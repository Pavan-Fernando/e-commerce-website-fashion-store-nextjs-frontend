"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FAQ {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQ[] = [
    // General
    { question: "What is TrendVibe?", answer: "TrendVibe is a premium online fashion store offering sustainable, stylish clothing for men, women, and kids.", category: "General" },
    { question: "Where are you located?", answer: "Our headquarters are in New York City, with warehouses across the US and Europe.", category: "General" },
    { question: "Do you have physical stores?", answer: "We currently operate online-only, but plan to open flagship stores in 2026.", category: "General" },

    // Shipping
    { question: "How long does shipping take?", answer: "Standard: 3–7 business days\nExpress: 1–2 business days", category: "Shipping" },
    { question: "Do you ship internationally?", answer: "Yes! We ship to over 50 countries. Free on orders over $100.", category: "Shipping" },
    { question: "Can I track my order?", answer: "Yes, you'll receive a tracking link via email once your order ships.", category: "Shipping" },

    // Returns
    { question: "What is your return policy?", answer: "30-day free returns. Items must be unworn with tags attached.", category: "Returns" },
    { question: "How do I return an item?", answer: "Log in → Orders → Select item → Print return label.", category: "Returns" },
    { question: "Are returns free?", answer: "Yes, for all US orders. International returns: $15 fee.", category: "Returns" },

    // Payments
    { question: "What payment methods do you accept?", answer: "Credit/Debit cards, PayPal, Apple Pay, Google Pay, Klarna.", category: "Payments" },
    { question: "Is my payment secure?", answer: "Yes, we use 256-bit SSL encryption and PCI-DSS compliance.", category: "Payments" },

    // Size & Fit
    { question: "How do I know my size?", answer: "Check our <a href='/size-guide' class='text-primary underline'>Size Guide</a> with detailed measurements.", category: "Size & Fit" },
    { question: "What if an item doesn't fit?", answer: "Exchange or return within 30 days — no questions asked.", category: "Size & Fit" },
];

const categories = Array.from(new Set(faqs.map(f => f.category)));

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openItems, setOpenItems] = useState<string[]>([]);

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedFAQs = categories.reduce((acc, cat) => {
        acc[cat] = filteredFAQs.filter(f => f.category === cat);
        return acc;
    }, {} as Record<string, FAQ[]>);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find answers to common questions about shopping, shipping, returns, and more.
                </p>
            </div>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-10">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                />
            </div>

            {/* FAQ Content */}
            {filteredFAQs.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-lg text-muted-foreground">No FAQs found matching your search.</p>
                </Card>
            ) : (
                <div className="space-y-8">
                    {categories.map((category) => {
                        const items = groupedFAQs[category];
                        if (items.length === 0) return null;

                        return (
                            <div key={category}>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    {category}
                                </h2>
                                <Accordion
                                    type="multiple"
                                    value={openItems}
                                    onValueChange={setOpenItems}
                                    className="space-y-3"
                                >
                                    {items.map((faq, i) => (
                                        <AccordionItem
                                            key={i}
                                            value={`${category}-${i}`}
                                            className="border rounded-lg overflow-hidden"
                                        >
                                            <AccordionTrigger className="px-5 py-4 text-left hover:bg-muted/50 transition-colors">
                                                <span className="font-medium">{faq.question}</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-5 pb-4 text-muted-foreground">
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                    className="prose prose-sm dark:prose-invert max-w-none"
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* CTA */}
            <Card className="mt-16 p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                    <CardTitle>Still have questions?</CardTitle>
                    <CardDescription>
                        Our support team is here to help 24/7
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button size="lg" asChild>
                            <a href="/contact">Contact Us</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="mailto:support@trendvibe.com">Email Support</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}