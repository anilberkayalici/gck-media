"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
    useEffect(() => {
        // Disable automatic browser scroll restoration on refresh
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        // Force scroll to top when the component mounts (on refresh/load)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    return null;
}
