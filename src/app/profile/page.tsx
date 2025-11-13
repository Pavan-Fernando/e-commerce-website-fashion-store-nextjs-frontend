"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, LogOut, Loader2, Camera } from "lucide-react";
import { authApi, userClient } from "@/lib/api";
import { triggerAuthChange } from "@/lib/auth-events";

// ── Schemas ──
const profileSchema = z.object({
    firstName: z.string().min(2, "First name too short"),
    lastName: z.string().min(2, "Last name too short"),
    phoneNumber: z.string().optional(),
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

interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    imageUrl?: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Load user
    useEffect(() => {
        const loadUser = async () => {
            const stored = sessionStorage.getItem("user");
            if (!stored) {
                router.push("/login");
                return;
            }

            try {
                const parsed = JSON.parse(stored);
                const userData = await userClient.getUserById(parsed.userId);
                setUser(userData);
            } catch {
                sessionStorage.clear();
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [router]);

    // Forms
    const profileForm = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
        },
    });

    const passwordForm = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    });

    // Sync form with loaded user
    useEffect(() => {
        if (user) {
            profileForm.reset({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, [user, profileForm]);

    // Update profile
    const onProfileSubmit = async (data: ProfileForm) => {
        if (!user) return;
        setLoading(true);

        try {
            const updated = await userClient.updateUser(user.userId, data);
            const newUser = { ...user, ...updated };
            sessionStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
            triggerAuthChange();
            toast.success("Profile updated successfully!");
        } catch (err: any) {
            toast.error(err.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    // Change password
    const onPasswordSubmit = async (data: PasswordForm) => {
        setLoading(true);
        const encodedCurrentPassword = btoa(data.currentPassword);
        const encodedNewPassword = btoa(data.newPassword);
        try {
            await userClient.changePassword(
                { currentPassword: encodedCurrentPassword, newPassword: encodedNewPassword },
                user?.userId
            );
            toast.success("Password changed successfully!");
            passwordForm.reset();
        } catch (err: any) {
            toast.error(err.message || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    // Upload avatar
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }

        setUploading(true);
        try {
            const { url } = await userClient.uploadAvatar(file);

            const updateUserPayload = {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                imageUrl: url,
            };

            await userClient.updateUser(user.userId, updateUserPayload);

            const newUser = { ...user, imageUrl: url };
            sessionStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
            triggerAuthChange();

            toast.success("Avatar updated!");
        } catch (err: any) {
            toast.error(err.message || "Failed to upload image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Logout
    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch {}
        sessionStorage.clear();
        triggerAuthChange();
        toast.success("Logged out successfully!");
        router.push("/login");
    };

    if (loading || !user) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-20 w-20 ring-4 ring-background">
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback>
                                {user.firstName[0]}{user.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                            aria-label="Change avatar"
                        >
                            {uploading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                                <Camera className="h-3 w-3" />
                            )}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} disabled={loading}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                {/* ACCOUNT TAB */}
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
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            {...profileForm.register("firstName")}
                                            placeholder="First Name"
                                        />
                                        {profileForm.formState.errors.firstName && (
                                            <p className="text-sm text-destructive">
                                                {profileForm.formState.errors.firstName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            {...profileForm.register("lastName")}
                                            placeholder="Last Name"
                                        />
                                        {profileForm.formState.errors.lastName && (
                                            <p className="text-sm text-destructive">
                                                {profileForm.formState.errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            {...profileForm.register("phoneNumber")}
                                            placeholder="+94 77 123 4567"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Settings className="h-4 w-4 mr-2" />}
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
                                <Button type="submit" variant="outline" disabled={loading}>
                                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* MOCK TABS */}
                <TabsContent value="orders">
                    <Card>
                        <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">No orders yet.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                    <Card>
                        <CardHeader><CardTitle>Wishlist</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Your wishlist is empty.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}