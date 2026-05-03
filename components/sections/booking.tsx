"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";

export function Booking() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactBars = [
    {
      label: t.booking.whatsapp,
      href: "https://wa.me/6282170395790",
    },
    {
      label: t.booking.instagram,
      href: "https://www.instagram.com/aikau_siberut_tattotradisional?igsh=emhpeHhxdXN2eXBw",
    },
    {
      label: t.booking.email,
      href: "mailto:Tattoomentawaiaikau@gmail.com",
    },
  ];

  const badges = [t.booking.badge1, t.booking.badge2, t.booking.badge3];

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196, 163, 90, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-20 text-center">
        {/* Label */}
        <p
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          {t.booking.label}
        </p>

        {/* Heading */}
        <h2
          className="mx-auto mb-8 max-w-3xl font-serif text-5xl italic text-foreground md:text-7xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {t.booking.heading}
        </h2>

        {/* Description */}
        <p
          className="mx-auto mb-16 max-w-xl font-light leading-relaxed text-muted-foreground"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          {t.booking.description}
        </p>

        {/* Contact bars */}
        <div
          className="mb-16 space-y-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.3s",
          }}
        >
          {contactBars.map((bar, index) => (
            <a
              key={bar.label}
              href={bar.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-bar group flex items-center justify-between border border-border px-8 py-6 transition-colors"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.4s ease ${0.4 + index * 0.1}s`,
              }}
            >
              <span className="contact-bar-content relative z-10 text-lg text-foreground transition-colors">
                {bar.label}
              </span>
              <span className="contact-bar-content relative z-10 text-2xl text-accent transition-colors group-hover:text-background">
                &rarr;
              </span>
            </a>
          ))}
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          {badges.map((badge, index) => (
            <span
              key={badge}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              {index > 0 && (
                <span className="hidden h-1 w-1 bg-accent md:block" />
              )}
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
