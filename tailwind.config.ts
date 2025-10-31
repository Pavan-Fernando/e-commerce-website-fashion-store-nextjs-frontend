import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary (Blue)
                primary: "#3b82f6",
                "primary-dark": "#1e40af",

                // Background
                background: "var(--background)",
                "background-dark": "var(--background-dark)",

                // Foreground
                foreground: "var(--foreground)",
                "foreground-dark": "var(--foreground-dark)",

                // Muted
                muted: "#64748b",
                "muted-foreground": "#94a3b8",
                "muted-foreground-dark": "#cbd5e1",
                "muted-dark": "#1e293b",

                // Card
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                "card-dark": "var(--card-dark)",
                "card-foreground-dark": "var(--card-foreground-dark)",

                // Border
                border: "var(--border)",
                "border-dark": "var(--border-dark)",

                // Ash Grays
                ash: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                },
            },
        },
    },
    plugins: [],
};

export default config;