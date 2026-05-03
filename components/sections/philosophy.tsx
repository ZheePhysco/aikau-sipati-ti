"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";

export function Philosophy() {
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

  const stats = [
    { value: t.philosophy.stat1, label: t.philosophy.stat1Label },
    { value: t.philosophy.stat2, label: t.philosophy.stat2Label },
    { value: t.philosophy.stat3, label: t.philosophy.stat3Label },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <p
          className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-accent"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          {t.philosophy.label}
        </p>

        {/* Content grid */}
        <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Quote */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <blockquote className="font-serif text-3xl italic leading-snug text-foreground md:text-4xl">
              &ldquo;{t.philosophy.quote}&rdquo;
            </blockquote>
          </div>

          {/* Text */}
          <div
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.2s",
            }}
          >
            <p className="font-light leading-relaxed text-muted-foreground">
              {t.philosophy.text1}
            </p>
            <p className="font-light leading-relaxed text-muted-foreground">
              {t.philosophy.text2}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-1 gap-px bg-accent/20 md:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-surface px-8 py-10 text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${0.4 + index * 0.1}s`,
              }}
            >
              <p className="mb-2 font-serif text-5xl text-accent md:text-6xl">
                {stat.value}
              </p>
              <p className="text-sm font-light tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
