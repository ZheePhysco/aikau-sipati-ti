"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { MentawaiFrame } from "@/components/ui/mentawai-frame";
import { MentawaiDivider } from "@/components/ui/mentawai-divider";
import { MentawaiPattern } from "@/components/ui/tattoo-visual";
import { GALLERY_DATA } from "@/lib/gallery-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const { language, t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_DATA[0] | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const sectionRef = useRef<HTMLElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const isNavigating = useRef(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = cardsRef.current;
      const container = containerRef.current;
      if (!track || !container || !desktopRef.current) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: desktopRef.current!,
          start: "top top",
          end: () => `+=${track.scrollWidth - container.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = Array.from(document.querySelectorAll(".mobile-project-card")) as HTMLElement[];
      cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateX(-36px)";
        card.style.transition = "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)";
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const idx = parseInt((e.target as HTMLElement).getAttribute("data-index") || "0");
              setTimeout(() => {
                (e.target as HTMLElement).style.opacity = "1";
                (e.target as HTMLElement).style.transform = "translateX(0)";
              }, idx * 80);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      cards.forEach((c) => io.observe(c));
      return () => io.disconnect();
    });

    return () => mm.revert();
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      if (!isNavigating.current) {
        const tl = gsap.timeline();
        tl.fromTo(modalRef.current.querySelector(".modal-backdrop"), { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .fromTo(
            modalRef.current.querySelector(".modal-container"),
            { scale: 0.97, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
            "-=0.2"
          )
          .fromTo(modalRef.current.querySelector(".modal-left"), { x: -36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.4")
          .fromTo(modalRef.current.querySelector(".modal-right"), { x: 36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.6")
          .fromTo(
            modalRef.current.querySelectorAll(".info-line"),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.06, duration: 0.5 },
            "-=0.5"
          );
      }
      setMainImage(selectedItem.image);
    }
  }, [selectedItem]);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
  }, [selectedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") navigateProject("next");
      else if (e.key === "ArrowLeft") navigateProject("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const navigateProject = (direction: "next" | "prev") => {
    if (!selectedItem || isAnimating.current || !modalRef.current) return;
    isAnimating.current = true;
    isNavigating.current = true;

    const currentIndex = GALLERY_DATA.findIndex((item) => item.id === selectedItem.id);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % GALLERY_DATA.length
        : (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    const exitX = direction === "next" ? -36 : 36;
    const enterX = direction === "next" ? 36 : -36;

    gsap.to(modalRef.current.querySelectorAll(".modal-content-area"), {
      x: exitX,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setSelectedItem(GALLERY_DATA[newIndex]);
        gsap.fromTo(
          modalRef.current!.querySelectorAll(".modal-content-area"),
          { x: enterX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.08,
            ease: "power3.out",
            onComplete: () => {
              isAnimating.current = false;
              isNavigating.current = false;
            },
          }
        );
      },
    });
  };

  const closeModal = () => {
    if (modalRef.current) {
      const tl = gsap.timeline({ onComplete: () => setSelectedItem(null) });
      tl.to(modalRef.current.querySelectorAll(".info-line, .modal-left, .modal-right"), { opacity: 0, duration: 0.22 })
        .to(modalRef.current.querySelector(".modal-container"), { scale: 0.97, opacity: 0, duration: 0.35 }, "-=0.1")
        .to(modalRef.current.querySelector(".modal-backdrop"), { opacity: 0, duration: 0.3 }, "-=0.2");
    } else {
      setSelectedItem(null);
    }
  };

  const openModal = (item: typeof GALLERY_DATA[0]) => {
    isNavigating.current = false;
    isAnimating.current = false;
    setSelectedItem(item);
  };

  /* ── Card content (shared desktop/mobile) ── */
  const CardContent = ({ item, index }: { item: typeof GALLERY_DATA[0]; index: number }) => (
    <>
      <SmartImage
        src={item.image}
        alt={item.title}
        fill
        fallbackPattern={item.fallbackPattern}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        style={{ filter: "brightness(0.82) contrast(1.08) saturate(0.75)" }}
        priority={index < 2}
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,12,10,0.95)] via-[rgba(13,12,10,0.18)] to-transparent" />

      {/* Gold curtain hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-[600ms]"
        style={{
          background: "linear-gradient(to bottom, transparent 40%, rgba(196,162,78,0.14) 100%)",
          opacity: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
      />

      {/* Card frame — MentawaiFrame corner hooks */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        style={{ zIndex: 10 }}
      >
        <path d="M2 14 L2 2 L14 2" stroke="rgba(196,162,78,0)" strokeWidth="0.8" className="group-hover:[stroke:rgba(196,162,78,0.7)] transition-all duration-500" />
        <path d="M86 2 L98 2 L98 14" stroke="rgba(196,162,78,0)" strokeWidth="0.8" className="group-hover:[stroke:rgba(196,162,78,0.7)] transition-all duration-500" />
        <path d="M2 86 L2 98 L14 98" stroke="rgba(196,162,78,0)" strokeWidth="0.8" className="group-hover:[stroke:rgba(196,162,78,0.7)] transition-all duration-500" />
        <path d="M86 98 L98 98 L98 86" stroke="rgba(196,162,78,0)" strokeWidth="0.8" className="group-hover:[stroke:rgba(196,162,78,0.7)] transition-all duration-500" />
      </svg>

      {/* Info */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5">
        <p className="mb-1 section-eyebrow text-[9px]">
          {language === "en" ? item.category : item.categoryId}
        </p>
        <h3 className="font-serif text-lg italic text-foreground leading-snug mb-1.5">
          {language === "en" ? item.title : item.titleId}
        </h3>
        {/* Short description — meaning */}
        <p className="text-[9px] font-light text-muted-foreground mb-2.5 line-clamp-1 tracking-[0.04em] opacity-80">
          {language === "en" ? item.meaning : item.meaningId}
        </p>
        <div className="overflow-hidden h-4">
          <span className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-accent translate-y-5 group-hover:translate-y-0 transition-transform duration-400">
            VIEW STORY <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </div>
      </div>

      {/* Index number */}
      <div className="absolute top-4 left-4 z-20 font-serif text-[11px] text-accent/30 tracking-widest select-none">
        0{index + 1}
      </div>
    </>
  );

  return (
    <>
      <section ref={sectionRef} id="project" className="bg-background">

        {/* ── DESKTOP: pinned horizontal scroll ── */}
        <div ref={desktopRef} className="hidden lg:flex flex-col" style={{ height: "100svh" }}>
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col">

            {/* Header */}
            <div className="flex-shrink-0 px-6 md:px-12 lg:px-20 pt-16 pb-6">
              <p className="section-eyebrow mb-3">
                {t?.nav?.work ?? "Selected Works"}
              </p>
              <div className="h-px w-16 bg-accent mb-5" style={{ transformOrigin: "left" }} />
              <h2 className="font-serif text-5xl lg:text-6xl italic text-foreground">
                {language === "en" ? "The Sacred Works" : "Karya Sakral"}
              </h2>
            </div>

            {/* Track */}
            <div ref={containerRef} className="flex-1 overflow-hidden pb-8">
              <div
                ref={cardsRef}
                className="flex h-full gap-4 pl-6 md:pl-12 lg:pl-20 pr-6"
                style={{ willChange: "transform" }}
              >
                {GALLERY_DATA.map((item, index) => (
                  <div
                    key={item.id}
                    data-index={index}
                    className="group cursor-pointer relative flex-shrink-0 h-full overflow-hidden"
                    style={{ aspectRatio: "3/4", borderRadius: 0 }}
                    onClick={() => openModal(item)}
                  >
                    <CardContent item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: vertical stacked ── */}
        <div className="lg:hidden py-20" style={{ background: "var(--background)" }}>
          <div className="mx-auto max-w-7xl px-6 md:px-12">

            <div className="mb-10">
              <p className="section-eyebrow mb-3">
                {t?.nav?.work ?? "Selected Works"}
              </p>
              <div className="h-px w-16 bg-accent mb-5" style={{ transformOrigin: "left" }} />
              <h2 className="font-serif text-4xl italic text-foreground">
                {language === "en" ? "The Sacred Works" : "Karya Sakral"}
              </h2>
            </div>

            {GALLERY_DATA.map((item, index) => (
              <div
                key={item.id}
                data-index={index}
                className="mobile-project-card"
                style={{ borderBottom: "1px solid rgba(196,162,78,0.10)" }}
              >
                {/* Photo */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <MentawaiFrame variant="card" className="absolute inset-0 w-full h-full">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      fill
                      fallbackPattern={item.fallbackPattern}
                      className="object-cover"
                      style={{ filter: "brightness(0.90) contrast(1.10) saturate(0.75)" }}
                      priority={index === 0}
                    />
                  </MentawaiFrame>
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,12,10,0.8)] via-transparent to-transparent z-10" />
                </div>

                {/* Info row */}
                <div
                  className="flex items-center justify-between py-5 cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div>
                    <p className="mb-1 section-eyebrow text-[9px]">
                      {language === "en" ? item.category : item.categoryId}
                    </p>
                    <h3 className="font-serif text-2xl italic text-foreground mb-1">
                      {language === "en" ? item.title : item.titleId}
                    </h3>
                    <p className="text-[9px] font-light text-muted-foreground line-clamp-1 tracking-[0.04em] opacity-75">
                      {language === "en" ? item.meaning : item.meaningId}
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 ml-4 btn-gold-sweep px-4 py-2 text-[9px] tracking-widest"
                  >
                    <span>VIEW →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selectedItem &&
        (() => {
          const currentIdx = GALLERY_DATA.findIndex((d) => d.id === selectedItem.id);
          return (
            <div ref={modalRef} className="fixed inset-0 z-50">
              <div
                className="modal-backdrop absolute inset-0 backdrop-blur-sm"
                style={{ background: "rgba(13,12,10,0.94)" }}
                onClick={closeModal}
              />

              <div
                className="modal-container relative w-full h-full flex flex-col md:flex-row"
                style={{ background: "var(--background)" }}
              >
                {/* Mentawai texture in modal */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <MentawaiPattern className="absolute inset-0 w-full h-full text-accent" />
                </div>

                {/* ── IMAGE PANEL ── */}
                <div
                  className="modal-left w-full h-[48svh] md:w-[58%] md:h-full relative modal-content-area flex-shrink-0"
                  style={{ background: "var(--natural-ink)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <SmartImage
                      src={mainImage}
                      alt="Main Project Image"
                      fill
                      fallbackPattern={selectedItem.fallbackPattern}
                      className="object-contain"
                    />
                  </div>

                  {/* Nav bar */}
                  <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-6 md:px-10 py-5 bg-gradient-to-t from-[rgba(13,12,10,0.9)] to-transparent z-10">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigateProject("prev"); }}
                      className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground/50 hover:text-accent transition-colors duration-400"
                    >
                      ← {language === "en" ? "Prev" : "Sebelum"}
                    </button>

                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5">
                      {GALLERY_DATA.map((_, i) => (
                        <div
                          key={i}
                          className="h-px rounded-full transition-all duration-400"
                          style={{
                            width: i === currentIdx ? 20 : 6,
                            background: i === currentIdx ? "var(--accent)" : "rgba(240,232,213,0.22)",
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); navigateProject("next"); }}
                      className="text-[10px] font-light uppercase tracking-[0.25em] text-foreground/50 hover:text-accent transition-colors duration-400"
                    >
                      {language === "en" ? "Next" : "Berikut"} →
                    </button>
                  </div>

                  {/* Thumbnails */}
                  {selectedItem.detailImages && selectedItem.detailImages.length > 0 && (
                    <div
                      className="absolute bottom-16 inset-x-0 flex justify-center gap-2 px-6 z-10 overflow-x-auto"
                      data-lenis-prevent="true"
                    >
                      <button
                        onClick={() => setMainImage(selectedItem.image)}
                        className="relative w-12 h-12 shrink-0 transition-all duration-300"
                        style={{ border: `1px solid ${mainImage === selectedItem.image ? "var(--accent)" : "transparent"}`, opacity: mainImage === selectedItem.image ? 1 : 0.4 }}
                      >
                        <SmartImage src={selectedItem.image} alt="Thumb" fill fallbackPattern={selectedItem.fallbackPattern} className="object-cover" />
                      </button>
                      {selectedItem.detailImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setMainImage(img)}
                          className="relative w-12 h-12 shrink-0 transition-all duration-300"
                          style={{ border: `1px solid ${mainImage === img ? "var(--accent)" : "transparent"}`, opacity: mainImage === img ? 1 : 0.4 }}
                        >
                          <SmartImage src={img} alt={`Thumb ${i + 1}`} fill fallbackPattern={selectedItem.fallbackPattern} className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── INFO PANEL ── */}
                <div
                  className="modal-right w-full flex-1 min-h-[52svh] md:flex-none md:w-[42%] md:h-full flex flex-col relative modal-content-area"
                  style={{
                    background: "var(--background)",
                    borderTop: "1px solid rgba(196,162,78,0.10)",
                  }}
                >
                  {/* Header bar */}
                  <div
                    className="flex-shrink-0 flex items-center justify-between px-6 md:px-10 py-4"
                    style={{ borderBottom: "1px solid rgba(196,162,78,0.10)" }}
                  >
                    <p className="info-line section-eyebrow text-[9px]">
                      {language === "en" ? selectedItem.category : selectedItem.categoryId}
                    </p>
                    <button
                      onClick={closeModal}
                      className="info-line w-8 h-8 flex items-center justify-center border hover:bg-accent hover:text-background transition-all duration-500 text-foreground/50"
                      style={{ borderColor: "rgba(196,162,78,0.25)" }}
                    >
                      <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none">
                        <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </button>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 md:py-10" data-lenis-prevent="true">

                    <h2 className="info-line mb-6 font-serif text-3xl md:text-4xl italic text-foreground leading-tight">
                      {language === "en" ? selectedItem.title : selectedItem.titleId}
                    </h2>

                    {/* Ornament between title and details */}
                    <div className="info-line mb-6">
                      <MentawaiDivider variant="ornament" className="justify-start opacity-60" />
                    </div>

                    {/* Details table */}
                    <div
                      className="info-line mb-8 py-6 space-y-4"
                      style={{ borderTop: "1px solid rgba(196,162,78,0.18)", borderBottom: "1px solid rgba(196,162,78,0.18)" }}
                    >
                      {[
                        { label: t.gallery.meaning, value: language === "en" ? selectedItem.meaning : selectedItem.meaningId },
                        { label: t.gallery.processLabel, value: language === "en" ? "Traditional Hand Tapping" : "Pengetukan Tangan Tradisional" },
                        { label: t.gallery.duration, value: language === "en" ? selectedItem.duration : (selectedItem.durationId ?? selectedItem.duration) },
                        { label: t.gallery.placement, value: language === "en" ? selectedItem.placement : selectedItem.placementId },
                      ].map((row) => (
                        <div key={row.label} className="grid grid-cols-[90px_1fr] gap-4">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{row.label}</span>
                          <span className="font-serif text-sm italic text-foreground">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Story */}
                    <div className="info-line mb-10">
                      <p className="mb-3 section-eyebrow text-[9px]">{t.gallery.storyBehind}</p>
                      <p className="font-serif text-base md:text-lg italic leading-relaxed text-foreground/85">
                        &ldquo;{language === "en" ? selectedItem.story : selectedItem.storyId}&rdquo;
                      </p>
                    </div>

                    {/* Book CTA */}
                    <button
                      className="info-line btn-gold-sweep flex items-center gap-3 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase"
                      onClick={() => {
                        closeModal();
                        setTimeout(() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" }), 400);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {t.gallery.bookSimilar}
                        <span>→</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
