/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                deep: "#050505",
                accent: "#9E1B32",
                offwhite: "#F5F5F5",
                muted: "#A0A0A0",
                glass: "rgba(255,255,255,0.05)",
                "glass-border": "rgba(255,255,255,0.1)",
            },
            fontFamily: {
                heading: ["Inter", "system-ui", "sans-serif"],
                mono: ["'JetBrains Mono'", "monospace"],
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.8s ease forwards",
                shimmer: "shimmer 1.5s infinite",
            },
        },
    },
    plugins: [],
};
