"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import * as LucideIcons from "lucide-react";

function getIcon(iconName) {
    if (!iconName) return null;
    const formatted = iconName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");

    const Icon = LucideIcons[formatted];
    return Icon || null;
}

const bentoSpans = [
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2",
];

export default function ServicesGrid({ services, dict }) {
    const items = dict.services.items || services;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {dict.services.title}
                </h2>
                <p className="text-muted text-lg max-w-xl mx-auto">
                    {dict.services.sub}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((service, i) => {
                    const iconName = service.icon_name || service.icon;
                    const Icon = getIcon(iconName);
                    const span = bentoSpans[i % bentoSpans.length];
                    const hasImage = !!service.image;

                    return (
                        <GlassCard
                            key={service.id || i}
                            delay={i * 0.08}
                            className={`${span} flex flex-col justify-between min-h-[220px] md:min-h-[260px] relative overflow-hidden group`}
                        >
                            {hasImage && (
                                <>
                                    <div
                                        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />
                                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-deep via-deep/80 to-deep/30 group-hover:via-deep/60 transition-colors duration-500" />
                                    <div className="absolute inset-0 z-0 bg-accent/5 mix-blend-overlay group-hover:bg-accent/20 transition-colors duration-500" />
                                </>
                            )}

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                {Icon && (
                                    <Icon
                                        size={32}
                                        className="text-accent mb-6"
                                        strokeWidth={1.5}
                                    />
                                )}
                                <div className="mt-auto">
                                    <h3 className="text-xl font-bold text-offwhite mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-muted/90 leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </>
    );
}
