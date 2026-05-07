"use client";

import { useReveal } from "@/hooks/useReveal";

const testimonials = [
    {
        name: "Raka Wirawan",
        location: "Jakarta, Indonesia",
        year: "2024",
        text: "Pengalaman yang benar-benar berbeda. Setiap torehan terasa seperti percakapan dengan para leluhur. Ini bukan sekadar tato — ini identitas.",
    },
    {
        name: "Maren Schultz",
        location: "Berlin, Germany",
        year: "2024",
        text: "I flew from Berlin specifically for this. The ritual, the patience, the story behind every motif — it changed how I see my own body and its story.",
    },
    {
        name: "Yusuf Hakim",
        location: "Bandung, Indonesia",
        year: "2023",
        text: "Bukan sekadar tato. Ini adalah pengakuan identitas yang terukir selamanya di kulit. Aikau adalah seniman sekaligus penjaga tradisi.",
    },
    {
        name: "Sophie Laurent",
        location: "Paris, France",
        year: "2024",
        text: "An unforgettable experience. The marks are beautiful, but what stays with you is the ceremony — the intention, the presence, the silence.",
    },
];

export function TestimonialSection() {
    useReveal();

    return (
        <section
            className="section"
            style={{ borderTop: "1px solid var(--c-smoke)" }}
        >
            {/* Header */}
            <div className="section-header">
                <div>
                    <span className="text-eyebrow reveal">Client Voices</span>
                    <h2
                        className="reveal reveal-delay-1"
                        style={{ fontStyle: "italic", marginTop: 8 }}
                    >
                        What they carry home
                    </h2>
                </div>
                <p
                    className="reveal reveal-delay-2"
                    style={{
                        maxWidth: 320,
                        fontSize: "0.85rem",
                        color: "var(--c-peat)",
                        paddingTop: 8,
                    }}
                >
                    Every mark tells a story. Here are a few from those who made the
                    journey.
                </p>
            </div>

            {/* Grid testimonial */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 2,
                }}
            >
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className={`card-surface reveal reveal-delay-${i + 1}`}
                        style={{
                            padding: "32px 28px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: 24,
                            minHeight: 240,
                        }}
                    >
                        {/* Tanda kutip dekoratif */}
                        <div>
                            <div
                                style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontSize: 52,
                                    lineHeight: 0.8,
                                    color: "var(--c-gold-dim)",
                                    marginBottom: 16,
                                    userSelect: "none",
                                }}
                            >
                                "
                            </div>
                            <p
                                style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontStyle: "italic",
                                    fontWeight: 300,
                                    fontSize: "1.05rem",
                                    color: "var(--c-bone)",
                                    lineHeight: 1.65,
                                    margin: 0,
                                }}
                            >
                                {t.text}
                            </p>
                        </div>

                        {/* Identitas */}
                        <div>
                            <div className="divider" style={{ margin: "0 0 16px" }} />
                            <div
                                style={{ fontSize: "0.82rem", color: "var(--c-ivory)", fontWeight: 400 }}
                            >
                                {t.name}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.7rem",
                                    color: "var(--c-peat)",
                                    marginTop: 4,
                                    letterSpacing: "0.1em",
                                }}
                            >
                                {t.location} · {t.year}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}