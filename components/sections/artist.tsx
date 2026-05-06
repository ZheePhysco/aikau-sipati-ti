"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { IMAGES } from "@/lib/image-config";
import { MentawaiFrame } from "@/components/ui/mentawai-frame";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { TattooVisual } from "@/components/ui/tattoo-visual";

export function Artist() {
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

  useEffect(() => {
    if (!isVisible) return;
    const frame = sectionRef.current?.querySelector('.artist-portrait-frame');
    if (frame) {
      setTimeout(() => frame.classList.add('revealed'), 350);
    }
  }, [isVisible]);

  const credentials = [
    { label: t.artist.heritage, value: t.artist.heritageValue },
    { label: t.artist.experience, value: t.artist.experienceValue },
    { label: t.artist.technique, value: t.artist.techniqueValue },
    { label: t.artist.speciality, value: t.artist.specialityValue },
  ];

  const fadeStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      id="artist"
      className="bg-background relative overflow-hidden"
      style={{ paddingTop: "5rem", paddingBottom: "6rem" }}
    >
      {/* Mentawai divider top */}
      <MentawaiDivider variant="band" className="absolute top-0 left-0 right-0 opacity-30" />

      {/* Hook spiral accent — decorative top-right */}
      <div className="absolute top-12 right-0 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-60">
        <TattooVisual
          variant="hookSpiral"
          className="w-full h-full text-accent"
          opacity={0.07}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-10">

        {/* Section eyebrow */}
        <p className="section-eyebrow mb-4" style={fadeStyle(0)}>
          {t.artist.label}
        </p>

        {/* Eyebrow divider line — consistent with all other sections */}
        <div
          className="h-px w-16 bg-accent mb-14"
          style={{
            opacity: isVisible ? 0.9 : 0,
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.07s",
          }}
        />

        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">

          {/* Portrait — MentawaiFrame treatment */}
          <div
            className="lg:col-span-2"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <MentawaiFrame variant="portrait" className="artist-portrait-frame img-curtain-wrapper relative aspect-[3/4] overflow-hidden bg-surface">
              <SmartImage
                src={IMAGES.artist}
                alt="Aikau Sipati'ti"
                fill
                fallbackPattern="spirit"
                className="object-cover"
                style={{ filter: "brightness(0.78) contrast(1.10) saturate(0.68)" }}
              />

              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[rgba(13,12,10,0.92)] to-transparent p-8 pt-28">
                {/* Gold rule above name */}
                <div className="mb-3 h-px w-10 bg-accent opacity-70" />
                <div className="flex items-end gap-4">
                  <span className="font-serif text-4xl md:text-5xl text-foreground leading-none">
                    Aikau Sipati&apos;ti
                  </span>
                </div>
                <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-accent font-light">
                  Sikerei Lineage · Mentawai
                </p>
              </div>
            </MentawaiFrame>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <h2
              className="mb-8 font-serif text-3xl italic text-foreground md:text-4xl lg:text-5xl leading-tight"
              style={fadeStyle(0.2)}
            >
              {t.artist.heading}
            </h2>

            {/* Ornament divider */}
            <div style={fadeStyle(0.25)}>
              <MentawaiDivider variant="ornament" className="justify-start mb-8" />
            </div>

            {/* Quote */}
            <blockquote
              className="mb-10 border-l-2 border-accent pl-6"
              style={fadeStyle(0.3)}
            >
              <p className="font-serif text-xl italic leading-relaxed text-foreground/90">
                &ldquo;{t.artist.quote}&rdquo;
              </p>
            </blockquote>

            {/* Bio */}
            <div className="mb-10 space-y-4" style={fadeStyle(0.38)}>
              <p className="font-light leading-[1.9] text-muted-foreground text-[15px]">
                {t.artist.bio1}
              </p>
              <p className="font-light leading-[1.9] text-muted-foreground text-[15px]">
                {t.artist.bio2}
              </p>
            </div>

            {/* Credentials — ceremonial layout */}
            <div className="space-y-0" style={fadeStyle(0.46)}>
              {credentials.map((cred, index) => (
                <div
                  key={cred.label}
                  className="flex items-center justify-between border-t border-border py-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.6s ease ${0.5 + index * 0.08}s`,
                  }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.22em] font-medium"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {cred.label}
                  </span>
                  <span className="font-serif text-sm italic text-foreground">{cred.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ceremonial divider */}
      <MentawaiDivider variant="band" className="absolute bottom-0 left-0 right-0 opacity-30" />
    </section>
  );
}
