"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    { number: "01", title: t.process.step1Title, description: t.process.step1Desc },
    { number: "02", title: t.process.step2Title, description: t.process.step2Desc },
    { number: "03", title: t.process.step3Title, description: t.process.step3Desc },
    { number: "04", title: t.process.step4Title, description: t.process.step4Desc },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".process-title",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );

    gsap.fromTo(
      ".process-divider",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );

    gsap.fromTo(
      ".connect-line .line-progress",
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "bottom 45%",
          scrub: true,
        },
      }
    );

    const stepItems = gsap.utils.toArray(".step-item");
    gsap.fromTo(
      stepItems,
      { opacity: 0.2, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      }
    );
  }, { scope: sectionRef });

  useEffect(() => {
    if (!isVisible) return;
    const intervals: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, index) => {
      const timeout = setTimeout(() => setActiveStep(index), 600 + index * 350);
      intervals.push(timeout);
    });
    return () => intervals.forEach(clearTimeout);
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.18 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden"
      style={{ background: "var(--surface)", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      <MentawaiDivider variant="band" className="absolute top-0 left-0 right-0 opacity-25" />

      {/* Right edge sectionBorder */}
      <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none hidden lg:block">
        <TattooVisual
          variant="sectionBorder"
          className="w-full h-full text-accent"
          opacity={0.07}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-2">

          {/* Left column — sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p
              className="process-title section-eyebrow mb-6"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              {t.process.label}
            </p>
            <div
              className="process-divider h-px w-16 bg-accent mb-12"
              style={{ transformOrigin: "left" }}
            />
            <h2 className="mb-8 font-serif text-4xl italic text-foreground md:text-5xl leading-tight">
              {t.process.heading}
            </h2>
            <p className="mb-10 max-w-md font-light leading-[1.9] text-muted-foreground text-[15px]">
              {t.process.description}
            </p>
            <button
              onClick={() => {
                document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold-sweep px-6 py-3 text-[11px] tracking-[0.2em] uppercase"
            >
              <span>{t.process.cta}</span>
            </button>
          </div>

          {/* Right column — steps with ceremonial diamond numbers */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="connect-line absolute left-[21px] top-8 bottom-8 w-px" style={{ background: "var(--border)" }}>
              <div className="line-progress w-full" style={{ background: "var(--accent)" }} />
            </div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`step-item relative pl-16 transition-opacity duration-700 ${
                    activeStep >= index ? "opacity-100" : "opacity-25"
                  }`}
                >
                  {/* Ceremonial diamond step number */}
                  <div className={`absolute left-0 top-0 step-diamond ${activeStep >= index ? "active" : ""}`}>
                    <span>{step.number}</span>
                  </div>

                  {/* Large faded background number */}
                  <div
                    className="absolute -left-6 -top-8 select-none font-serif font-bold leading-none pointer-events-none"
                    style={{
                      fontSize: "110px",
                      color: "var(--accent)",
                      opacity: activeStep >= index ? 0.07 : 0.03,
                      transition: "opacity 0.7s ease",
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="relative pt-1">
                    <h3 className="mb-3 font-serif text-xl italic text-foreground">{step.title}</h3>
                    <p className="font-light leading-[1.85] text-muted-foreground text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MentawaiDivider variant="band" className="absolute bottom-0 left-0 right-0 opacity-25" />
    </section>
  );
}