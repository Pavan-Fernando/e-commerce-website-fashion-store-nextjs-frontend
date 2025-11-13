"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import {authApi, userClient} from "@/lib/api";
import { triggerAuthChange } from "@/lib/auth-events";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const encodedPassword = btoa(password);
      const loginData = await authApi.login(email, encodedPassword);

      sessionStorage.setItem("accessToken", loginData.accessToken);
      sessionStorage.setItem("refreshToken", loginData.refreshToken);
      sessionStorage.setItem("expiresAt", String(Date.now() + loginData.expiresIn * 1000));

      const userData = await userClient.getUserById(loginData.userId);

      const user = {
        userId: userData.userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        imageUrl: userData.imageUrl,
      };
      sessionStorage.setItem("user", JSON.stringify(user));

      triggerAuthChange();

      // Redirect to previous page or home
      const redirectPath = redirectTo && isSafeRedirect(redirectTo) ? redirectTo : "/";
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Prevent open redirect attacks
  const isSafeRedirect = (path: string) => {
    return path.startsWith("/") && !path.startsWith("//");
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="emma@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 pl-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}