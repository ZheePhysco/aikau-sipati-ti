"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";

export function Aftercare() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      className="bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease",
              }}
            >
              {t.aftercare.label}
            </p>
            <h2
              className="mb-6 font-serif text-3xl italic text-foreground md:text-4xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              {t.aftercare.heading}
            </h2>
            <p
              className="max-w-md font-light leading-relaxed text-muted-foreground"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.2s",
              }}
            >
              {t.aftercare.description}
            </p>
          </div>

          {/* Right column - accordion */}
          <div
            className="divide-y divide-border"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease 0.3s",
            }}
          >
            {items.map((item, index) => (
              <div key={item.title} className="py-6">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between text-left"
                >
                  <span
                    className={`text-lg transition-colors ${
                      openIndex === index
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center text-xl text-accent transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`accordion-content ${
                    openIndex === index ? "open" : ""
                  }`}
                >
                  <div>
                    <p className="mt-4 font-light leading-relaxed text-muted-foreground">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
