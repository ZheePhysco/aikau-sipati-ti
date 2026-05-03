"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/language-provider";
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
    {
      number: "01",
      title: t.process.step1Title,
      description: t.process.step1Desc,
    },
    {
      number: "02",
      title: t.process.step2Title,
      description: t.process.step2Desc,
    },
    {
      number: "03",
      title: t.process.step3Title,
      description: t.process.step3Desc,
    },
    {
      number: "04",
      title: t.process.step4Title,
      description: t.process.step4Desc,
    },
  ];

  useGSAP(() => {
    // Section heading reveal
    gsap.fromTo('.process-title',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );

    // Divider line animation
    gsap.fromTo('.process-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );

    // Connect line animation
    gsap.fromTo('.connect-line .line-progress',
      { height: 0 },
      { height: "100%", ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 40%", scrub: true } }
    );

    // Steps sequence animation
    const steps = gsap.utils.toArray('.step-item');
    gsap.fromTo(steps,
      { opacity: 0.3, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
  }, { scope: sectionRef });

  useEffect(() => {
    if (!isVisible) return;

    const intervals: NodeJS.Timeout[] = [];
    steps.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setActiveStep(index);
      }, 500 + index * 300);
      intervals.push(timeout);
    });

    return () => intervals.forEach(clearTimeout);
  }, [isVisible]);

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

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-spacing bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column - sticky on desktop */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="process-title mb-8 text-xs font-medium uppercase tracking-[0.2em] text-accent" style={{ clipPath: 'inset(100% 0 0 0)' }}>
              {t.process.label}
            </p>
            <div className="process-divider h-px w-16 bg-accent mb-12"></div>
            <h2 className="mb-8 font-serif text-4xl italic text-foreground md:text-5xl">
              {t.process.heading}
            </h2>
            <p className="mb-10 max-w-md font-light leading-relaxed text-muted-foreground">
              {t.process.description}
            </p>
            <button
              onClick={() => {
                const bookSection = document.querySelector("#book");
                if (bookSection) {
                  bookSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="border border-foreground/30 px-6 py-3 text-sm font-light tracking-wide text-foreground transition-all hover:border-accent hover:text-accent"
            >
              {t.process.cta}
            </button>
          </div>

          {/* Right column - steps */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="connect-line absolute left-[23px] top-8 bottom-8 w-px bg-border">
              <div className="line-progress w-full bg-accent"></div>
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`step-item relative pl-16 ${activeStep >= index ? 'opacity-100' : 'opacity-30'}`}
                >
                  {/* Step number */}
                  <div
                    className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center border transition-colors duration-300 ${
                      activeStep >= index
                        ? "border-accent bg-accent text-background"
                        : "border-border bg-surface text-muted"
                    }`}
                  >
                    <span className="text-sm font-medium">{step.number}</span>
                  </div>

                  {/* Large faded number */}
                  <div className="absolute -left-4 -top-8 select-none font-serif text-[120px] font-bold leading-none text-accent/10">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="mb-3 text-xl font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="font-light leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}