"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { SmartImage } from "@/components/ui/smart-image";
import { IMAGES } from "@/lib/image-config";
import { BrandMark } from "@/components/ui/brand-mark";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    if (bgRef.current && sectionRef.current) {
      gsap.fromTo(bgRef.current,
        { yPercent: 0 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }
  }, { scope: sectionRef });

  useEffect(() => {
    // Sequence load logic according to GSAP plan
    const tl = gsap.timeline();
    
    // Initial state setup (if not handled via CSS initially)
    gsap.set('.brand-mark-center', { scale: 0.8, opacity: 0 });
    gsap.set('.curtain', { scaleY: 1, transformOrigin: "top" });
    gsap.set('.hero-eyebrow', { y: 20, opacity: 0 });
    gsap.set('.hero-h1-1', { y: 80, skewY: 3, opacity: 0 });
    gsap.set('.hero-h1-2', { y: 80, skewY: 3, opacity: 0 });
    gsap.set('.hero-h1-3', { y: 80, skewY: 3, opacity: 0 });
    gsap.set('.hero-subtext', { y: 20, opacity: 0 });
    gsap.set('.hero-cta', { y: 20, opacity: 0 });

    tl.to('.brand-mark-center', { scale: 1, opacity: 1, duration: 0.8, delay: 0.2 })
      .to('.brand-mark-center', { y: -200, opacity: 0, duration: 0.4 }, "+=0.4") // Move up and fade out before curtain
      .to('.curtain', { scaleY: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.2")
      .to('.hero-eyebrow', { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
      .to('.hero-h1-1', { y: 0, skewY: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .to('.hero-h1-2', { y: 0, skewY: 0, opacity: 1, duration: 0.6 }, "-=0.45")
      .to('.hero-h1-3', { y: 0, skewY: 0, opacity: 1, duration: 0.6 }, "-=0.45")
      .to('.hero-subtext', { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .to('.hero-cta', { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      
    // Set traditional state as well just in case
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Page Load Sequence Elements */}
      <div className="curtain fixed inset-0 z-40 bg-background pointer-events-none" />
      <div className="brand-mark-center fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
         <BrandMark size="lg" />
      </div>

      <section
        ref={sectionRef}
        className="relative flex min-h-screen items-end overflow-hidden bg-background pb-20 pt-32"
      >
        {/* Background photo */}
        <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]">
          <SmartImage
            src={IMAGES.hero}
            alt="Hero Background"
            fill
            priority
            fallbackPattern="warrior"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Mandala decoration */}
        <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 text-accent lg:-right-16 z-10">
          <TattooVisual
            variant="mandala"
            className="h-[600px] w-[600px] lg:h-[800px] lg:w-[800px]"
            opacity={0.08}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p className="hero-eyebrow mb-8 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t.hero.eyebrow}
            </p>

            {/* Headline */}
            <h1 className="mb-8">
              <span className="hero-h1-1 block font-serif text-[12vw] font-normal leading-[0.9] text-foreground md:text-[10vw]">
                {t.hero.line1}
              </span>
              <span className="hero-h1-2 block font-serif text-[12vw] font-normal leading-[0.9] text-foreground md:text-[10vw]">
                {t.hero.line2}
              </span>
              <span className="hero-h1-3 block font-serif text-[12vw] font-normal italic leading-[0.9] text-accent-light md:text-[10vw]">
                {t.hero.line3}
              </span>
            </h1>

            {/* Subtext */}
            <div className="hero-subtext mb-10 max-w-md">
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                {t.hero.subtext1}
                <br />
                {t.hero.subtext2}
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-cta flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("#process")}
                className="border border-foreground/30 px-6 py-3 text-sm font-light tracking-wide text-foreground transition-all hover:border-accent hover:text-accent"
              >
                {t.hero.cta1}
              </button>
              <button
                onClick={() => scrollToSection("#book")}
                className="bg-accent px-6 py-3 text-sm font-light tracking-wide text-background transition-all hover:bg-accent-light"
              >
                {t.hero.cta2}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3 z-20 transition-opacity duration-1000 delay-1000" style={{ opacity: isVisible ? 1 : 0 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
            SCROLL
          </span>
          <div className="scroll-indicator h-12 w-px bg-accent" />
        </div>
      </section>
    </>
  );
}
