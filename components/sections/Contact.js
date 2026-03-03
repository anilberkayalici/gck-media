"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact({ dict }) {
    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background accent glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(158,27,50,0.1)_0%,transparent_60%)]" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-6xl font-bold mb-6"
                >
                    {dict.contact.title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-muted text-lg md:text-xl mb-12 max-w-xl mx-auto"
                >
                    {dict.contact.sub}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <MagneticButton>
                        <a
                            href="mailto:gecekondublaj@gmail.com"
                            className="inline-block px-10 py-4 rounded-full bg-accent text-offwhite font-semibold text-base tracking-wider hover:shadow-[0_0_40px_rgba(158,27,50,0.4)] transition-all duration-500 cursor-pointer"
                        >
                            {dict.contact.cta}
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
