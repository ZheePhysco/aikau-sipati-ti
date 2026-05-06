"use client";

import { useRef } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Philosophy() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: t.philosophy.stat1, label: t.philosophy.stat1Label },
    { value: t.philosophy.stat2, label: t.philosophy.stat2Label },
    { value: t.philosophy.stat3, label: t.philosophy.stat3Label },
  ];

  useGSAP(() => {
    // Section heading reveal — mask wipe
    gsap.fromTo(
      ".philosophy-title",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );

    // Divider line
    gsap.fromTo(
      ".philosophy-divider",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );

    // Content elements
    const animateElements = gsap.utils.toArray("[data-animate]");
    if (animateElements.length > 0) {
      gsap.fromTo(
        animateElements,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 62%" },
        }
      );
    }

    // Stats counter-like entrance
    gsap.fromTo(
      ".stat-item",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".philosophy-stats", start: "top 78%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ background: "var(--surface)", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* Mentawai divider top */}
      <MentawaiDivider variant="band" className="absolute top-0 left-0 right-0 opacity-25" />

      {/* Section border accent — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none hidden lg:block">
        <TattooVisual
          variant="sectionBorder"
          className="w-full h-full text-accent"
          opacity={0.08}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Section label */}
        <p
          className="philosophy-title section-eyebrow mb-6"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          {t.philosophy.label}
        </p>
        <div
          className="philosophy-divider h-px w-16 bg-accent mb-14"
          style={{ transformOrigin: "left" }}
        />

        {/* Content grid */}
        <div className="mb-20 grid gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Quote */}
          <div className="opacity-0 translate-y-9" data-animate>
            <div className="ceremonial-quote">
              <blockquote className="font-serif text-3xl italic leading-snug text-foreground md:text-4xl lg:text-5xl">
                &ldquo;{t.philosophy.quote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 opacity-0 translate-y-9" data-animate>
            <p className="font-light leading-[1.95] text-muted-foreground text-[15px]">
              {t.philosophy.text1}
            </p>
            <p className="font-light leading-[1.95] text-muted-foreground text-[15px]">
              {t.philosophy.text2}
            </p>
          </div>
        </div>

        {/* Chevron band separator */}
        <div className="mb-14 opacity-0 translate-y-8" data-animate>
          <TattooVisual
            variant="bandChevron"
            className="w-full text-accent"
            opacity={0.3}
          />
        </div>

        {/* Stats */}
        <div className="philosophy-stats opacity-0 translate-y-8" data-animate>
          <div className="grid grid-cols-1 gap-px md:grid-cols-3" style={{ background: "rgba(196,162,78,0.12)" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item relative overflow-hidden px-8 py-12 text-center"
                style={{ background: "var(--surface)" }}
              >
                {/* SVG watermark in each stat cell */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <TattooVisual
                    variant="pattern1"
                    className="w-32 h-32 text-accent"
                    opacity={0.04}
                  />
                </div>
                <p className="relative mb-3 font-serif text-5xl md:text-6xl" style={{ color: "var(--accent)" }}>
                  {stat.value}
                </p>
                <p className="relative text-[11px] font-light tracking-[0.2em] uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <MentawaiDivider variant="band" className="absolute bottom-0 left-0 right-0 opacity-25" />
    </section>
  );
}
