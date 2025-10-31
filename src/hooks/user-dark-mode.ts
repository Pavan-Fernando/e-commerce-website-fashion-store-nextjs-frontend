import { useEffect, useState } from "react";

export function useDarkMode() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check localStorage or system preference
        const stored = localStorage.getItem("darkMode");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored === "true" || (!stored && prefersDark);

        setIsDark(initial);
        if (initial) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggle = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        localStorage.setItem("darkMode", String(newDark));
        document.documentElement.classList.toggle("dark", newDark);
    };

    return { isDark, toggle };
}