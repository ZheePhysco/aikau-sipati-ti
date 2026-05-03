"use client";

import { useRef } from "react";
import { useLanguage } from "@/components/providers/language-provider";
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
    // Section heading reveal
    gsap.fromTo('.philosophy-title',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );

    // Divider line animation
    gsap.fromTo('.philosophy-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );

    // Reveal content elements
    const animateElements = gsap.utils.toArray('[data-animate]');
    if (animateElements.length > 0) {
      gsap.to(animateElements, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-spacing bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <p className="philosophy-title mb-8 text-xs font-medium uppercase tracking-[0.2em] text-accent" style={{ clipPath: 'inset(100% 0 0 0)' }}>
          {t.philosophy.label}
        </p>
        <div className="philosophy-divider h-px w-16 bg-accent mb-12"></div>

        {/* Content grid */}
        <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Quote */}
          <div className="opacity-0 translate-y-12" data-animate>
            <blockquote className="font-serif text-3xl italic leading-snug text-foreground md:text-4xl">
              &ldquo;{t.philosophy.quote}&rdquo;
            </blockquote>
          </div>

          {/* Text */}
          <div className="space-y-6 opacity-0 translate-y-12" data-animate>
            <p className="font-light leading-relaxed text-muted-foreground">
              {t.philosophy.text1}
            </p>
            <p className="font-light leading-relaxed text-muted-foreground">
              {t.philosophy.text2}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="opacity-0 translate-y-8" data-animate>
          <div className="grid grid-cols-1 gap-px bg-accent/20 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={stat.label} className="bg-surface px-8 py-10 text-center opacity-0 translate-y-8" data-animate style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}>
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
      </div>
    </section>
  );
}
