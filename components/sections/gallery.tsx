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
  const [modalMounted, setModalMounted] = useState(false);
  const initialPhotos = galleryPhotos.slice(0, 6);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalMounted]);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.photo-card');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 48, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
      );
    }
    gsap.fromTo('.gallery-title',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
    );
  }, { scope: sectionRef });

  const openModal = () => {
    setIsExpanded(true);
    setModalMounted(true);
  };

  useEffect(() => {
    if (isExpanded && modalRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current.querySelector('.gallery-modal-bg'), { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(modalRef.current.querySelector('.gallery-modal-header'), { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2")
        .fromTo(modalRef.current.querySelectorAll('.gallery-modal-item'), 
          { y: 30, opacity: 0, scale: 0.98 }, 
          { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }
  }, [isExpanded]);

  const closeModal = () => {
    if (modalRef.current) {
      const tl = gsap.timeline({ onComplete: () => {
        setIsExpanded(false);
        setModalMounted(false);
      }});
      tl.to(modalRef.current.querySelectorAll('.gallery-modal-item'), { y: 20, opacity: 0, scale: 0.98, duration: 0.3, stagger: 0.02 })
        .to(modalRef.current.querySelector('.gallery-modal-header'), { y: -20, opacity: 0, duration: 0.3 }, "-=0.2")
        .to(modalRef.current.querySelector('.gallery-modal-bg'), { opacity: 0, duration: 0.4 }, "-=0.2");
    } else {
      setIsExpanded(false);
      setModalMounted(false);
    }
  };

  return (
    <>
      <section ref={sectionRef} id="gallery" className="bg-surface section-spacing border-t border-border/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
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

          {/* Initial Grid 2-3 Columns */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3">
            {initialPhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card group relative block w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/50 p-2 transition-colors hover:bg-surface shadow-lg hover:shadow-xl"
              >
                <div className="relative w-full overflow-hidden rounded-xl aspect-[3/4]">
                  <SmartImage
                    src={photo.src}
                    alt={`Gallery Photo ${photo.id}`}
                    fill
                    fallbackPattern="forest"
                    className="photo-cinematic transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={openModal}
              className="rounded-full border border-accent px-8 py-3 text-sm tracking-wide text-accent transition-colors hover:bg-accent hover:text-background"
            >
              {language === "en" ? "View Full Gallery" : "Lihat Semua Galeri"}
            </button>
          </div>
        </div>
      </section>

      {/* Full Screen Gallery Modal */}
      {isExpanded && (
        <div ref={modalRef} className="fixed inset-0 z-[100] flex flex-col overflow-hidden">
          <div className="gallery-modal-bg absolute inset-0 bg-background" />
          
          {/* Header Bar */}
          <div className="gallery-modal-header flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8 border-b border-border/10 bg-background/80 backdrop-blur z-10 shrink-0">
            <h2 className="font-serif text-2xl md:text-3xl italic text-foreground">
              {language === "en" ? "Full Visual Diary" : "Buku Visual Penuh"}
            </h2>
            <button 
              onClick={closeModal} 
              className="flex items-center gap-2 rounded-full bg-surface/80 backdrop-blur-sm px-6 py-3 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-foreground border border-border/20 transition-all hover:bg-accent hover:text-background hover:scale-105 shadow-xl"
            >
              <span className="text-lg leading-none">✕</span> {language === "en" ? "Back to Dashboard" : "Kembali ke Beranda"}
            </button>
          </div>
          
          {/* Scrollable Masonry Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10" data-lenis-prevent="true">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-[1920px] mx-auto pb-24">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={`full-${photo.id}`}
                  className="gallery-modal-item group relative block w-full overflow-hidden rounded-2xl border border-border/10 bg-surface/50 p-2 transition-colors hover:bg-surface"
                  style={{ breakInside: 'avoid' }}
                >
                  <div className="relative w-full overflow-hidden rounded-xl aspect-[3/4]">
                    <SmartImage
                      src={photo.src}
                      alt={`Gallery Photo ${photo.id}`}
                      fill
                      fallbackPattern="forest"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
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
