import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TrendVibe - Fashion Store",
    description: "Modern fashion e-commerce",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* Toast container */}
        <Toaster position="top-right" reverseOrder={false} />
        </body>
        </html>
    );
}