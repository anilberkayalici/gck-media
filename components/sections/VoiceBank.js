"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import Image from "next/image";

export default function VoiceBank({ artists, dict }) {
    const [filter, setFilter] = useState("all");
    const [playingId, setPlayingId] = useState(null);
    const audioRef = useRef(null);

    const filters = [
        { key: "all", label: dict.voicebank.all },
        { key: "male", label: dict.voicebank.male },
        { key: "female", label: dict.voicebank.female },
    ];

    const filtered = artists.filter((a) => {
        if (filter === "all") return true;
        const dbGender = a.gender?.toLowerCase() || "";

        if (filter === "male" || filter === "erkek") {
            return dbGender === "male" || dbGender === "erkek";
        }
        if (filter === "female" || filter === "kadın" || dbGender === "kadin") {
            return dbGender === "female" || dbGender === "kadın" || dbGender === "kadin";
        }

        return dbGender === filter;
    });

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handlePlay = (artist) => {
        // Stop current
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        if (playingId === artist.id) {
            setPlayingId(null);
            return;
        }

        if (artist.demo_url) {
            const audio = new Audio(artist.demo_url);
            audio.addEventListener("ended", () => setPlayingId(null));
            audio.play().catch(() => { });
            audioRef.current = audio;
            setPlayingId(artist.id);
        }
    };

    return (
        <section id="voices" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        {dict.voicebank.title}
                    </h2>
                    <p className="text-muted text-lg max-w-xl mx-auto">
                        {dict.voicebank.sub}
                    </p>
                </motion.div>

                {/* Filter Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center gap-3 mb-10"
                >
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${filter === f.key
                                ? "bg-accent text-offwhite shadow-lg shadow-accent/20"
                                : "glass text-muted hover:text-offwhite"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </motion.div>

                {/* Artists Grid */}
                {filtered.length === 0 ? (
                    <p className="text-center text-muted py-12">{dict.voicebank.noArtists}</p>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((artist, i) => (
                                <motion.div
                                    key={artist.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        delay: i * 0.05,
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="glass glass-hover rounded-xl p-4 flex flex-col items-center text-center"
                                >
                                    {/* Avatar */}
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 ring-2 ring-glass-border">
                                        {artist.photo_url ? (
                                            <Image
                                                src={artist.photo_url}
                                                alt={artist.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                                                {artist.name?.charAt(0) || "?"}
                                            </div>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <h4 className="text-sm font-semibold text-offwhite truncate w-full">
                                        {artist.name}
                                    </h4>

                                    {/* Gender Tag */}
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted mt-1">
                                        {artist.gender}
                                    </span>

                                    {/* Play Button */}
                                    {artist.demo_url && (
                                        <button
                                            onClick={() => handlePlay(artist)}
                                            className="mt-3 w-8 h-8 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 cursor-pointer group"
                                            aria-label={
                                                playingId === artist.id
                                                    ? dict.voicebank.pause
                                                    : dict.voicebank.play
                                            }
                                        >
                                            {playingId === artist.id ? (
                                                <Pause
                                                    size={14}
                                                    className="text-offwhite"
                                                />
                                            ) : (
                                                <Play
                                                    size={14}
                                                    className="text-accent group-hover:text-offwhite ml-0.5"
                                                />
                                            )}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
