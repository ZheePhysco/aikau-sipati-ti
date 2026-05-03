"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { IMAGES } from "@/lib/image-config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export function Gallery() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const galleryPhotos = IMAGES.gallery.map((src, index) => ({
    id: `photo-${index}`,
    src,
    category: index % 3 === 0 ? "Atmosphere" : (index % 2 === 0 ? "Flash" : "Recent")
  }));

  const [isExpanded, setIsExpanded] = useState(false);
  const initialPhotos = galleryPhotos.slice(0, 6);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isExpanded]);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.photo-card');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
      );
    }
    gsap.fromTo('.gallery-title',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, { scope: sectionRef });


  return (
    <>
      <section ref={sectionRef} id="gallery" className="bg-surface py-24 md:py-32 border-t border-border/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {t?.nav?.gallery || "Gallery"}
              </p>
              <h2 className="gallery-title font-serif text-4xl italic text-foreground md:text-5xl" style={{ clipPath: 'inset(100% 0 0 0)' }}>
                {language === "en" ? "Visual Diary" : "Buku Visual"}
              </h2>
            </div>
          </div>

          {/* Initial Grid 2x3 */}
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {initialPhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card group relative block w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/50 p-2 transition-colors hover:bg-surface"
              >
                <div className="relative w-full overflow-hidden rounded-xl aspect-[4/5]">
                  <SmartImage
                    src={photo.src}
                    alt={`Gallery Photo ${photo.id}`}
                    fill
                    fallbackPattern="forest"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/50 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="rounded-full border border-accent px-8 py-3 text-sm tracking-wide text-accent transition-colors hover:bg-accent hover:text-background"
            >
              {language === "en" ? "View Full Gallery" : "Lihat Semua Galeri"}
            </button>
          </div>
        </div>
      </section>

      {/* Full Screen Gallery Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-border/10 bg-background/80 backdrop-blur z-10 shrink-0">
            <h2 className="font-serif text-2xl italic text-foreground">
              {language === "en" ? "Full Visual Diary" : "Buku Visual Penuh"}
            </h2>
            <button 
              onClick={() => setIsExpanded(false)} 
              className="flex items-center gap-2 rounded-full bg-surface px-6 py-2 text-sm font-medium tracking-widest uppercase text-foreground/70 border border-border/20 transition-colors hover:text-accent hover:border-accent/50"
            >
              <span className="text-xl leading-none">✕</span> Kembali
            </button>
          </div>
          
          {/* Scrollable Masonry Grid */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="columns-2 lg:columns-4 gap-4 space-y-4 max-w-[1920px] mx-auto">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={`full-${photo.id}`}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/50 p-2 transition-colors hover:bg-surface"
                  style={{ breakInside: 'avoid' }}
                >
                  <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: index % 2 === 0 ? '3/4' : '4/5' }}>
                    <SmartImage
                      src={photo.src}
                      alt={`Gallery Photo ${photo.id}`}
                      fill
                      fallbackPattern="forest"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/50 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
