"use client";

import { useEffect, useRef, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function DecryptedText({
    text,
    speed = 50,
    delay = 0,
    className = "",
    onComplete,
}) {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);
    const intervalRef = useRef(null);
    const indexRef = useRef(0);

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        indexRef.current = 0;

        intervalRef.current = setInterval(() => {
            const currentIndex = indexRef.current;

            if (currentIndex >= text.length) {
                clearInterval(intervalRef.current);
                setDisplayed(text);
                onComplete?.();
                return;
            }

            const revealed = text.slice(0, currentIndex);
            const scrambleLength = Math.min(3, text.length - currentIndex);
            const scrambled = Array.from({ length: scrambleLength }, () =>
                chars[Math.floor(Math.random() * chars.length)]
            ).join("");

            setDisplayed(revealed + scrambled);
            indexRef.current += 1;
        }, speed);

        return () => clearInterval(intervalRef.current);
    }, [started, text, speed, onComplete]);

    return (
        <span className={className}>
            {displayed.split("").map((char, i) => (
                <span
                    key={i}
                    className={
                        i < indexRef.current
                            ? "text-offwhite"
                            : "text-accent"
                    }
                >
                    {char}
                </span>
            ))}
        </span>
    );
}
