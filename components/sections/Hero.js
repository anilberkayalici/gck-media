"use client";

import { motion } from "framer-motion";
import DecryptedText from "@/components/ui/DecryptedText";

export default function Hero({ dict }) {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,27,50,0.08)_0%,transparent_70%)]" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, duration: 1 }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-6">
                    <DecryptedText
                        text={dict.hero.headline}
                        speed={40}
                        delay={4000}
                        className="inline"
                    />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
                >
                    {dict.hero.sub}
                </motion.p>

                <motion.a
                    href="#services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block px-8 py-3 rounded-full border border-accent text-accent font-semibold text-sm tracking-wider hover:bg-accent hover:text-offwhite transition-all duration-300 cursor-pointer"
                >
                    {dict.hero.cta}
                </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border-2 border-muted/40 flex justify-center pt-1.5"
                >
                    <div className="w-1 h-2 bg-muted/60 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
