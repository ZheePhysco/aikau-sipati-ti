"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { IMAGES } from "@/lib/image-config";
import { BrandMark } from "@/components/ui/brand-mark";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
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
    // Slow parallax — bg drifts as user scrolls down
    if (bgRef.current && sectionRef.current) {
      gsap.fromTo(
        bgRef.current.querySelector("img")!,
        { scale: 1.08, y: 0 },
        {
          scale: 1,
          y: "-6%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }
  }, { scope: sectionRef });

  useEffect(() => {
    // Page load sequence — ceremonial, slow, deliberate
    const tl = gsap.timeline();

    gsap.set(".brand-mark-center", { scale: 0.82, opacity: 0 });
    gsap.set(".curtain", { scaleY: 1, transformOrigin: "bottom" });
    gsap.set(".hero-eyebrow", { y: 18, opacity: 0 });
    gsap.set(".divider-line", { scaleX: 0, transformOrigin: "left" });
    gsap.set(".hero-h1-1", { clipPath: "inset(100% 0 0 0)" });
    gsap.set(".hero-h1-2", { clipPath: "inset(100% 0 0 0)" });
    gsap.set(".hero-h1-3", { clipPath: "inset(100% 0 0 0)" });
    gsap.set(".hero-subtext", { y: 22, opacity: 0 });
    gsap.set(".hero-cta", { y: 18, opacity: 0 });
    gsap.set(".hero-motif", { opacity: 0, scale: 0.94 });

    tl.to(".brand-mark-center", { scale: 1, opacity: 1, duration: 0.9, delay: 0.15, ease: "power2.out" })
      .to(".brand-mark-center", { y: -220, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.55")
      .to(".curtain", { scaleY: 0, duration: 1.0, ease: "power3.inOut" }, "-=0.25")
      .to(".hero-motif", { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, "-=0.6")
      .to(".hero-eyebrow", { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.9")
      .to(".divider-line", { scaleX: 1, duration: 1.4, ease: "power3.out" }, "-=0.5")
      .to(".hero-h1-1", { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.out" }, "-=1.1")
      .to(".hero-h1-2", { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.out" }, "-=0.65")
      .to(".hero-h1-3", { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.out" }, "-=0.65")
      .to(".hero-subtext", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .to(".hero-cta", { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.5");

    const timer = setTimeout(() => setIsVisible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Page Load Curtain */}
      <div className="curtain fixed inset-0 z-40 bg-background pointer-events-none" />
      <div className="brand-mark-center fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <BrandMark size="lg" />
      </div>

      <section
        ref={sectionRef}
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-background"
      >
        {/* Background photo */}
        <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]">
          <SmartImage
            src={IMAGES.hero}
            alt="Hero Background"
            fill
            priority
            fallbackPattern="warrior"
            noOverlay
            noGrade
            className="object-cover hero-bg"
            style={{ objectPosition: "65% 15%", filter: "brightness(0.72) contrast(1.08) saturate(0.65)" }}
          />

          {/* Desktop gradient — diagonal, dark left for text, reveals subject right */}
          <div
            className="absolute inset-0 z-10 hidden md:block"
            style={{ background: "linear-gradient(105deg, rgba(13,12,10,0.94) 0%, rgba(13,12,10,0.84) 28%, rgba(13,12,10,0.1) 66%, rgba(13,12,10,0) 100%)" }}
          />
          {/* Mobile gradient — natural top vignette → clear subject → dark bottom for text */}
          <div
            className="absolute inset-0 z-10 md:hidden"
            style={{ background: "linear-gradient(to bottom, rgba(13,12,10,0.22) 0%, rgba(13,12,10,0) 22%, rgba(13,12,10,0.38) 56%, rgba(13,12,10,0.88) 76%, rgba(13,12,10,1) 100%)" }}
          />
          {/* Bottom vignette — desktop, extended for smooth page blend */}
          <div
            className="absolute inset-0 z-20 hidden md:block"
            style={{ background: "linear-gradient(to top, rgba(13,12,10,1) 0%, rgba(13,12,10,0.5) 22%, transparent 44%)" }}
          />
        </div>

        {/* Mentawai motif accent — top-right corner */}
        <div className="hero-motif absolute top-0 right-0 z-20 w-[240px] h-[240px] md:w-[380px] md:h-[380px] pointer-events-none hidden md:block">
          <TattooVisual
            variant="titiDotwork"
            className="w-full h-full text-accent"
            opacity={0.06}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20 section-spacing">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">

            {/* Eyebrow */}
            <p className="hero-eyebrow section-eyebrow mb-4">
              {t.hero.eyebrow}
            </p>
            <div className="divider-line h-px w-16 bg-accent mb-8" style={{ transformOrigin: "left" }} />

            {/* Headline — clip-path mask wipe per line */}
            <h1 className="mb-8">
              <span
                className="hero-h1-1 block font-serif text-[11vw] font-normal leading-[0.88] text-foreground md:text-[9vw]"
                style={{ clipPath: "inset(100% 0 0 0)" }}
              >
                {t.hero.line1}
              </span>
              <span
                className="hero-h1-2 block font-serif text-[11vw] font-normal leading-[0.88] text-foreground md:text-[9vw]"
                style={{ clipPath: "inset(100% 0 0 0)" }}
              >
                {t.hero.line2}
              </span>
              <span
                className="hero-h1-3 block font-serif text-[11vw] font-normal italic leading-[0.88] md:text-[9vw]"
                style={{ clipPath: "inset(100% 0 0 0)", color: "var(--accent-light)" }}
              >
                {t.hero.line3}
              </span>
            </h1>

            {/* Subtext */}
            <div className="hero-subtext mb-10 max-w-md">
              <p className="text-sm font-light leading-[1.9] text-muted-foreground tracking-wide">
                {t.hero.subtext1}
                <br />
                {t.hero.subtext2}
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-cta flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("#process")}
                className="border border-foreground/25 px-7 py-3 text-[11px] font-light tracking-[0.2em] uppercase text-foreground transition-all duration-500 hover:border-accent hover:text-accent"
              >
                {t.hero.cta1}
              </button>
              <button
                onClick={() => scrollToSection("#book")}
                className="btn-gold-sweep px-7 py-3 text-[11px] tracking-[0.2em] uppercase"
              >
                <span>{t.hero.cta2}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator — vertical text + animated line */}
        <div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-3 z-20 transition-opacity duration-1000 delay-1200"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground [writing-mode:vertical-rl]">
            Scroll
          </span>
          <div className="scroll-indicator h-14 w-px bg-accent" />
        </div>

        {/* Bottom ornament divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <MentawaiDivider variant="band" className="opacity-40" />
        </div>
      </section>
    </>
  );
}
