"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactForm) => {
        setIsLoading(true);
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Contact form submitted:", data);
        setIsSubmitted(true);
        setIsLoading(false);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
                    Get in Touch
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                {/* ── CONTACT FORM ── */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <CardDescription>
                            Fill out the form below and we'll get back to you within 24 hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                                <p className="text-lg font-medium">Thank you!</p>
                                <p className="text-sm text-muted-foreground">Your message has been sent successfully.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Emma Rose"
                                        {...register("name")}
                                        className={errors.name ? "border-destructive" : ""}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="emma@trendvibe.com"
                                        {...register("email")}
                                        className={errors.email ? "border-destructive" : ""}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can we help you today?"
                                        rows={5}
                                        {...register("message")}
                                        className={errors.message ? "border-destructive" : ""}
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-destructive">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Send className="mr-2 h-4 w-4 animate-pulse" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* ── CONTACT INFO + MAP ── */}
                <div className="space-y-8">

                    {/* Info Cards */}
                    <div className="grid gap-4 md:grid-cols-1">
                        {[
                            {
                                icon: Mail,
                                title: "Email Us",
                                content: "support@trendvibe.com",
                                href: "mailto:support@trendvibe.com",
                            },
                            {
                                icon: Phone,
                                title: "Call Us",
                                content: "+1 (555) 123-4567",
                                href: "tel:+15551234567",
                            },
                            {
                                icon: MapPin,
                                title: "Visit Us",
                                content: "123 Fashion Ave, New York, NY 10001",
                                href: "https://maps.google.com",
                            },
                            {
                                icon: Clock,
                                title: "Business Hours",
                                content: "Mon–Fri: 9AM–6PM EST\nSat–Sun: 10AM–4PM EST",
                            },
                        ].map((item, i) => (
                            <Card key={i} className="hover:shadow-md transition-shadow">
                                <CardContent className="flex items-start gap-4 p-5">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-sm text-primary hover:underline break-all"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.content}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                {item.content}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Map Placeholder */}
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Our Store Location</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="aspect-video bg-muted flex items-center justify-center">
                                <div className="text-center space-y-2">
                                    <MapPin className="h-10 w-10 text-muted-foreground mx-auto" />
                                    <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ── FAQ CTA ── */}
            <div className="mt-16 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                    Looking for quick answers?
                </p>
                <Button variant="outline" size="lg">
                    View FAQ
                </Button>
            </div>
        </div>
    );
}