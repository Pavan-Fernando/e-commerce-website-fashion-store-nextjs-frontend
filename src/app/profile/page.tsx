"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Package, Heart, Settings, LogOut, CheckCircle, AlertCircle } from "lucide-react";

interface User {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    avatar?: string;
}

// ── Schemas ──
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    address: z.string().optional(),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(6, "Current password required"),
    newPassword: z.string().min(8, "New password must be 8+ characters"),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Load user from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            router.push("/login");
        }
    }, [router]);

    // Profile Form
    const profileForm = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: user || {},
    });

    // Password Form
    const passwordForm = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    });

    // Save Profile
    const onProfileSubmit = async (data: ProfileForm) => {
        setError(null);
        setSuccess(null);
        try {
            // Mock API
            await new Promise((r) => setTimeout(r, 1000));
            const updatedUser = { ...user, ...data };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(null), 4000);
        } catch {
            setError("Failed to update profile.");
        }
    };

    // Change Password
    const onPasswordSubmit = async (data: PasswordForm) => {
        setError(null);
        setSuccess(null);
        try {
            // Mock API
            await new Promise((r) => setTimeout(r, 1000));
            setSuccess("Password changed successfully!");
            passwordForm.reset();
            setTimeout(() => setSuccess(null), 4000);
        } catch {
            setError("Failed to change password.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>

            {/* Success / Error */}
            {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle className="h-5 w-5" />
                    {error}
                </div>
            )}

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                {/* ── ACCOUNT TAB ── */}
                <TabsContent value="account" className="space-y-6 mt-6">
                    {/* Edit Profile */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Profile</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            {...profileForm.register("name")}
                                            placeholder="Emma Rose"
                                        />
                                        {profileForm.formState.errors.name && (
                                            <p className="text-sm text-destructive">
                                                {profileForm.formState.errors.name.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...profileForm.register("email")}
                                            placeholder="emma@example.com"
                                        />
                                        {profileForm.formState.errors.email && (
                                            <p className="text-sm text-destructive">
                                                {profileForm.formState.errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            {...profileForm.register("phone")}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Shipping Address</Label>
                                        <Input
                                            id="address"
                                            {...profileForm.register("address")}
                                            placeholder="123 Fashion St, NYC"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full sm:w-auto">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* Change Password */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Keep your account secure</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        {...passwordForm.register("currentPassword")}
                                    />
                                    {passwordForm.formState.errors.currentPassword && (
                                        <p className="text-sm text-destructive">
                                            {passwordForm.formState.errors.currentPassword.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            {...passwordForm.register("newPassword")}
                                        />
                                        {passwordForm.formState.errors.newPassword && (
                                            <p className="text-sm text-destructive">
                                                {passwordForm.formState.errors.newPassword.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            {...passwordForm.register("confirmPassword")}
                                        />
                                        {passwordForm.formState.errors.confirmPassword && (
                                            <p className="text-sm text-destructive">
                                                {passwordForm.formState.errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" variant="outline" className="w-full sm:w-auto">
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── ORDERS TAB ── */}
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">Order #TV{i}001</p>
                                                <p className="text-sm text-muted-foreground">Apr {i + 10}, 2025</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">$129.99</p>
                                            <Badge variant="secondary" className="text-xs">
                                                {i === 1 ? "Delivered" : "Shipped"}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── WISHLIST TAB ── */}
                <TabsContent value="wishlist">
                    <Card>
                        <CardHeader>
                            <CardTitle>Wishlist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted mb-2">
                                            <div className="flex items-center justify-center h-full">
                                                <Heart className="h-8 w-8 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium truncate">Summer Dress {i}</p>
                                        <p className="text-sm text-primary font-bold">$79.99</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}