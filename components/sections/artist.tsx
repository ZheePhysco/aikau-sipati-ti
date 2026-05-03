"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { SmartImage } from "@/components/ui/smart-image";
import { IMAGES } from "@/lib/image-config";

export function Artist() {
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

  const credentials = [
    { label: t.artist.heritage, value: t.artist.heritageValue },
    { label: t.artist.experience, value: t.artist.experienceValue },
    { label: t.artist.technique, value: t.artist.techniqueValue },
    { label: t.artist.speciality, value: t.artist.specialityValue },
  ];

  return (
    <section
      ref={sectionRef}
      id="artist"
      className="bg-background py-24 md:py-32"
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
          {t.artist.label}
        </p>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Portrait card */}
          <div
            className="relative aspect-[3/4] overflow-hidden bg-surface lg:col-span-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <SmartImage
              src={IMAGES.artist}
              alt="Aikau Sipati'ti"
              fill
              fallbackPattern="spirit"
              className="object-cover"
            />

            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-8 pt-24">
              <div className="flex items-end gap-4">
                <span className="font-serif text-6xl text-foreground">Aikau Sipati'ti</span>
                <span className="mb-2 h-1 w-12 bg-accent" />
              </div>
            </div>

            {/* Corner marks */}
            <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-accent/50" />
            <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-accent/50" />
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <h2
              className="mb-8 font-serif text-3xl italic text-foreground md:text-4xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.2s",
              }}
            >
              {t.artist.heading}
            </h2>

            {/* Quote */}
            <blockquote
              className="mb-10 border-l-2 border-accent pl-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.3s",
              }}
            >
              <p className="font-serif text-xl italic leading-relaxed text-foreground">
                &ldquo;{t.artist.quote}&rdquo;
              </p>
            </blockquote>

            {/* Bio */}
            <div
              className="mb-10 space-y-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.4s",
              }}
            >
              <p className="font-light leading-relaxed text-muted-foreground">
                {t.artist.bio1}
              </p>
              <p className="font-light leading-relaxed text-muted-foreground">
                {t.artist.bio2}
              </p>
            </div>

            {/* Credentials */}
            <div
              className="space-y-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.5s",
              }}
            >
              {credentials.map((cred, index) => (
                <div
                  key={cred.label}
                  className="flex items-center justify-between border-t border-border py-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.6 + index * 0.1}s`,
                  }}
                >
                  <span className="text-sm text-muted">{cred.label}</span>
                  <span className="text-sm text-foreground">{cred.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
