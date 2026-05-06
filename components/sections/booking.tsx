"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";

export function Booking() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactBars = [
    {
      label: t.booking.whatsapp,
      href: "https://wa.me/6282170395790",
      symbol: "W",
    },
    {
      label: t.booking.instagram,
      href: "https://www.instagram.com/aikau_siberut_tattotradisional?igsh=emhpeHhxdXN2eXBw",
      symbol: "IG",
    },
    {
      label: t.booking.email,
      href: "mailto:Tattoomentawaiaikau@gmail.com",
      symbol: "@",
    },
  ];

  const badges = [t.booking.badge1, t.booking.badge2, t.booking.badge3];

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--surface)", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      <MentawaiDivider variant="band" className="absolute top-0 left-0 right-0 opacity-25" />

      {/* Mandala SVG background — cultural, not generic radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <TattooVisual
          variant="mandala"
          className="w-[90vw] max-w-3xl text-accent"
          opacity={0.05}
        />
      </div>

      {/* Side accents */}
      <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none hidden lg:block">
        <TattooVisual variant="sectionBorder" className="w-full h-full text-accent" opacity={0.07} />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none hidden lg:block" style={{ transform: "scaleX(-1)" }}>
        <TattooVisual variant="sectionBorder" className="w-full h-full text-accent" opacity={0.07} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-20 text-center">

        {/* Label */}
        <p
          className="section-eyebrow mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {t.booking.label}
        </p>

        {/* Ornament divider between label and heading */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          <MentawaiDivider variant="ornament" className="mb-6 opacity-70" />
        </div>

        {/* Heading */}
        <h2
          className="mx-auto mb-8 max-w-3xl font-serif italic text-foreground leading-tight"
          style={{
            fontSize: "clamp(2.4rem, 8vw, 6rem)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s",
          }}
        >
          {t.booking.heading}
        </h2>

        {/* Description */}
        <p
          className="mx-auto mb-16 max-w-xl font-light leading-[1.9] text-muted-foreground text-[15px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s",
          }}
        >
          {t.booking.description}
        </p>

        {/* Contact bars */}
        <div
          className="mb-16 space-y-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.32s",
          }}
        >
          {contactBars.map((bar, index) => (
            <a
              key={bar.label}
              href={bar.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-bar group flex items-center justify-between border border-border px-8 py-6 text-left"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${0.38 + index * 0.08}s`,
                borderColor: "rgba(196,162,78,0.15)",
              }}
            >
              <div className="flex items-center gap-5">
                {/* Channel symbol */}
                <span
                  className="contact-bar-content relative z-10 font-serif text-xs italic transition-colors duration-500"
                  style={{ color: "var(--accent)", minWidth: 24 }}
                >
                  {bar.symbol}
                </span>
                {/* Thin divider */}
                <span
                  className="contact-bar-content relative z-10 w-px h-5 transition-colors duration-500"
                  style={{ background: "rgba(196,162,78,0.3)" }}
                />
                <span className="contact-bar-content relative z-10 text-base text-foreground transition-colors duration-500">
                  {bar.label}
                </span>
              </div>
              <span className="contact-bar-content relative z-10 text-2xl transition-colors duration-500" style={{ color: "var(--accent)" }}>
                →
              </span>
            </a>
          ))}
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.65s",
          }}
        >
          {badges.map((badge, index) => (
            <span
              key={badge}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              {index > 0 && (
                /* Chevron separator instead of dot */
                <svg viewBox="0 0 10 14" className="hidden md:block w-2 h-3" style={{ color: "var(--accent)", opacity: 0.5 }}>
                  <path d="M2 2 L8 7 L2 12" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              )}
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
