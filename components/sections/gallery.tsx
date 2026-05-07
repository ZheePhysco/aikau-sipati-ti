"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { MentawaiFrame } from "@/components/ui/mentawai-frame";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { TattooVisual } from "@/components/ui/tattoo-visual";
import { useReveal } from "@/hooks/useReveal";
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
  const modalRef = useRef<HTMLDivElement>(null);
  useReveal();

  const [galleryPhotos, setGalleryPhotos] = useState<{ id: string; src: string; category: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalMounted, setModalMounted] = useState(false);

  const initialPhotos = galleryPhotos.slice(0, 6);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.images) {
          const photos = data.images.map((src: string, index: number) => ({
            id: `photo-${index}`,
            src,
            category: index % 3 === 0 ? "Atmosphere" : index % 2 === 0 ? "Flash" : "Recent",
          }));
          setGalleryPhotos(photos);
        }
      } catch {
        setGalleryPhotos([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGallery();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalMounted ? "hidden" : "";
  }, [modalMounted]);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".photo-card");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 1.0,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }
    gsap.fromTo(
      ".gallery-title",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );
    gsap.fromTo(
      ".gallery-eyebrow-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );
  }, { scope: sectionRef, dependencies: [isLoading] });

  const openModal = () => {
    setIsExpanded(true);
    setModalMounted(true);
  };

  useEffect(() => {
    if (isExpanded && modalRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current.querySelector(".gallery-modal-bg"), { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(modalRef.current.querySelector(".gallery-modal-header"), { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.25")
        .fromTo(
          modalRef.current.querySelectorAll(".gallery-modal-item"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    }
  }, [isExpanded]);

  const closeModal = () => {
    if (modalRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsExpanded(false);
          setModalMounted(false);
        },
      });
      tl.to(modalRef.current.querySelectorAll(".gallery-modal-item"), { y: 20, opacity: 0, duration: 0.3, stagger: 0.02 })
        .to(modalRef.current.querySelector(".gallery-modal-header"), { y: -20, opacity: 0, duration: 0.3 }, "-=0.2")
        .to(modalRef.current.querySelector(".gallery-modal-bg"), { opacity: 0, duration: 0.4 }, "-=0.2");
    } else {
      setIsExpanded(false);
      setModalMounted(false);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="relative overflow-hidden"
        style={{ background: "var(--background)", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <MentawaiDivider variant="band" className="absolute top-0 left-0 right-0 opacity-25" />

        {/* Motif accent — top left corner */}
        <div className="absolute top-10 left-0 w-44 h-44 md:w-64 md:h-64 pointer-events-none">
          <TattooVisual
            variant="hookSpiral"
            className="w-full h-full text-accent"
            opacity={0.055}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

          {/* Header */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="section-eyebrow mb-4 reveal">
                {t?.nav?.gallery ?? "Gallery"}
              </p>
              <div
                className="gallery-eyebrow-line h-px w-16 bg-accent mb-6 reveal reveal-delay-1"
                style={{ transformOrigin: "left" }}
              />
              <h2
                className="gallery-title font-serif text-4xl italic text-foreground md:text-5xl reveal reveal-delay-2"
                style={{ clipPath: "inset(100% 0 0 0)" }}
              >
                {language === "en" ? "Visual Diary" : "Buku Visual"}
              </h2>
            </div>
          </div>

          {/* Grid — sharp, no rounded corners */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-5">
                <TattooVisual variant="mandala" className="w-14 h-14 text-accent" opacity={0.3} />
                <p className="section-eyebrow text-[9px] tracking-[0.3em] animate-pulse">
                  {language === "en" ? "Unveiling the marks…" : "Membuka tanda…"}
                </p>
              </div>
            ) : initialPhotos.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-16">
                {language === "en" ? "No photos yet" : "Belum ada foto"}
              </div>
            ) : (
              initialPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="photo-card group relative w-full overflow-hidden bg-surface gallery-card"
                  style={{ aspectRatio: "3/4", borderRadius: 0 }}
                >
                  {/* Frame treatment */}
                  <MentawaiFrame variant="card" className="absolute inset-0 w-full h-full">
                    <SmartImage
                      src={photo.src}
                      alt={`Gallery Photo ${photo.id}`}
                      fill
                      fallbackPattern="forest"
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                      style={{ filter: "brightness(0.85) contrast(1.06) saturate(0.78)" }}
                    />
                  </MentawaiFrame>

                  {/* Gold curtain overlay on hover */}
                  <div className="gallery-hover-overlay" />

                  {/* Category label — revealed on hover */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-[rgba(13,12,10,0.85)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="section-eyebrow text-[9px]">{photo.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* View all CTA — sharp rectangle, gold sweep */}
          <div className="mt-14 flex justify-center">
            <button
              onClick={openModal}
              className="btn-gold-sweep px-10 py-3 text-[11px] tracking-[0.22em] uppercase"
            >
              <span>
                {language === "en" ? "View Full Gallery" : "Lihat Semua Galeri"}
              </span>
            </button>
          </div>
        </div>

        <MentawaiDivider variant="band" className="absolute bottom-0 left-0 right-0 opacity-25" />
      </section>

      {/* Full Screen Gallery Modal */}
      {isExpanded && (
        <div ref={modalRef} className="fixed inset-0 z-[100] flex flex-col overflow-hidden">
          <div className="gallery-modal-bg absolute inset-0" style={{ background: "var(--background)" }} />

          {/* Mandala texture in modal bg */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            <TattooVisual variant="mandala" className="w-[80vw] max-w-2xl text-accent" opacity={0.04} />
          </div>

          {/* Header */}
          <div
            className="gallery-modal-header relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8 shrink-0"
            style={{ zIndex: 10, borderBottom: "1px solid rgba(196,162,78,0.12)" }}
          >
            <div>
              <p className="section-eyebrow mb-1">
                {language === "en" ? "Full Visual Diary" : "Buku Visual Penuh"}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl italic text-foreground">
                {language === "en" ? "All Works" : "Semua Karya"}
              </h2>
            </div>

            <button
              onClick={closeModal}
              className="btn-gold-sweep flex items-center gap-3 px-6 py-2.5 text-[10px] tracking-[0.22em] uppercase"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
                  <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {language === "en" ? "Close" : "Tutup"}
              </span>
            </button>
          </div>

          {/* Scrollable Masonry Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 relative" style={{ zIndex: 10 }} data-lenis-prevent="true">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3 max-w-[1920px] mx-auto pb-24">
              {galleryPhotos.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  {language === "en" ? "No photos yet" : "Belum ada foto"}
                </div>
              ) : (
                galleryPhotos.map((photo) => (
                  <div
                    key={`full-${photo.id}`}
                    className="gallery-modal-item group relative w-full overflow-hidden gallery-card"
                    style={{ breakInside: "avoid", aspectRatio: "3/4", borderRadius: 0 }}
                  >
                    <MentawaiFrame variant="card" className="absolute inset-0 w-full h-full">
                      <SmartImage
                        src={photo.src}
                        alt={`Gallery Photo ${photo.id}`}
                        fill
                        fallbackPattern="forest"
                        className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                        style={{ filter: "brightness(0.85) contrast(1.06) saturate(0.80)" }}
                      />
                    </MentawaiFrame>
                    <div className="gallery-hover-overlay" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
