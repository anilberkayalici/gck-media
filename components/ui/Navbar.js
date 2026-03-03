"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar({ dict, locale }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const otherLocale = locale === "tr" ? "en" : "tr";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: dict.nav.services, href: "#services" },
        { label: dict.nav.voices, href: "#voices" },
        { label: dict.nav.contact, href: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-4 left-4 right-4 z-[100] rounded-2xl transition-all duration-500 ${scrolled
                        ? "glass shadow-lg shadow-black/20"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="text-xl font-bold tracking-wider text-offwhite hover:text-accent transition-colors duration-300"
                    >
                        GCK<span className="text-accent">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted hover:text-offwhite transition-colors duration-300 cursor-pointer"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Language Toggle + Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/${otherLocale}`}
                            className="relative px-3 py-1.5 text-xs font-mono font-semibold tracking-wider rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-offwhite transition-all duration-300 cursor-pointer"
                        >
                            {dict.nav.lang}
                        </Link>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-offwhite hover:text-accent transition-colors duration-300 cursor-pointer"
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] bg-deep/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        delay: i * 0.1,
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-3xl font-bold text-offwhite hover:text-accent transition-colors duration-300 cursor-pointer"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Link
                                    href={`/${otherLocale}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-6 py-2 text-sm font-mono font-semibold tracking-wider rounded-full border border-accent text-accent hover:bg-accent hover:text-offwhite transition-all duration-300 cursor-pointer"
                                >
                                    {dict.nav.lang}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
