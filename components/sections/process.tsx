"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";

export function Process() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  // Animate steps sequentially
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

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column - sticky on desktop */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease",
              }}
            >
              {t.process.label}
            </p>
            <h2
              className="mb-6 font-serif text-4xl italic text-foreground md:text-5xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              {t.process.heading}
            </h2>
            <p
              className="mb-8 max-w-md font-light leading-relaxed text-muted-foreground"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.2s",
              }}
            >
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
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.3s",
              }}
            >
              {t.process.cta}
            </button>
          </div>

          {/* Right column - steps */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-px bg-border">
              <div
                className="w-full bg-accent transition-all duration-1000 ease-out"
                style={{
                  height: isVisible
                    ? `${((activeStep + 1) / steps.length) * 100}%`
                    : "0%",
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative pl-16"
                  style={{
                    opacity: isVisible && activeStep >= index ? 1 : 0.3,
                    transform:
                      isVisible && activeStep >= index
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: `all 0.6s ease ${0.3 + index * 0.15}s`,
                  }}
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
