"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { MentawaiPattern, TattooVisual } from "@/components/ui/tattoo-visual";
import { useReveal } from "@/hooks/useReveal";

export function Aftercare() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  useReveal();

  const items = [
    { title: t.aftercare.item1, content: t.aftercare.item1Content },
    { title: t.aftercare.item2, content: t.aftercare.item2Content },
    { title: t.aftercare.item3, content: t.aftercare.item3Content },
    { title: t.aftercare.item4, content: t.aftercare.item4Content },
    { title: t.aftercare.item5, content: t.aftercare.item5Content },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--background)", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      <MentawaiDivider variant="band" className="absolute top-0 left-0 right-0 opacity-25" />

      {/* Mentawai texture bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <MentawaiPattern className="absolute inset-0 w-full h-full text-accent" />
      </div>

      {/* Right edge sectionBorder accent */}
      <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none hidden lg:block">
        <TattooVisual variant="sectionBorder" className="w-full h-full text-accent" opacity={0.07} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="section-eyebrow mb-4 reveal">
              {t.aftercare.label}
            </p>
            <h2
              className="mb-6 font-serif text-3xl italic text-foreground md:text-4xl leading-tight reveal reveal-delay-1"
            >
              {t.aftercare.heading}
            </h2>

            {/* Gold accent rule */}
            <div
              className="mb-6 h-px w-12 bg-accent reveal reveal-delay-1"
            />

            <p
              className="max-w-md font-light leading-[1.9] text-muted-foreground text-[15px] reveal reveal-delay-2"
            >
              {t.aftercare.description}
            </p>
          </div>

          {/* Right — accordion */}
          <div className="reveal reveal-delay-3">
            {items.map((item, index) => (
              <div
                key={item.title}
                className="border-b border-border"
                style={{
                  borderColor: openIndex === index
                    ? "rgba(196,162,78,0.3)"
                    : "rgba(196,162,78,0.10)",
                  transition: "border-color 0.4s ease",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between text-left py-6 group"
                >
                  <span
                    className={`font-serif text-lg italic transition-colors duration-400 ${
                      openIndex === index
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </span>

                  {/* SVG cross icon — rotates to × */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 shrink-0 ml-4 transition-transform duration-500 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "var(--accent)" }}
                  >
                    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>

                <div className={`accordion-content ${openIndex === index ? "open" : ""}`}>
                  <div>
                    <p className="pb-6 font-light leading-[1.9] text-muted-foreground text-[15px]">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MentawaiDivider variant="band" className="absolute bottom-0 left-0 right-0 opacity-25" />
    </section>
  );
}
