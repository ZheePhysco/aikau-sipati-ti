"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SmartImage } from "@/components/ui/smart-image";
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

    // Desktop: pinned horizontal scroll clipped at max-w-7xl
    mm.add('(min-width: 1024px)', () => {
      const track = cardsRef.current;
      const container = containerRef.current;
      if (!track || !container || !desktopRef.current) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - container.offsetWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: desktopRef.current!,
          start: 'top top',
          end: () => `+=${track.scrollWidth - container.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    // Mobile: vertical stack with IntersectionObserver slide
    mm.add('(max-width: 1023px)', () => {
      const cards = Array.from(
        document.querySelectorAll('.mobile-project-card')
      ) as HTMLElement[];
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-40px)';
        card.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      });
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0');
            setTimeout(() => {
              (e.target as HTMLElement).style.opacity = '1';
              (e.target as HTMLElement).style.transform = 'translateX(0)';
            }, idx * 90);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(c => io.observe(c));
      return () => io.disconnect();
    });

    return () => mm.revert();
  }, []);


  // Handle modal animation
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      if (!isNavigating.current) {
        // Initial open animation
        const tl = gsap.timeline();
        tl.fromTo(modalRef.current.querySelector('.modal-backdrop'),
          { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .fromTo(modalRef.current.querySelector('.modal-container'),
            { scale: 0.96, y: 20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "expo.out", willChange: "transform, opacity" }, "-=0.2")
          .fromTo(modalRef.current.querySelector('.modal-left'),
            { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, willChange: "transform, opacity" }, "-=0.3")
          .fromTo(modalRef.current.querySelector('.modal-right'),
            { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, willChange: "transform, opacity" }, "-=0.5")
          .fromTo(modalRef.current.querySelectorAll('.info-line'),
            { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, willChange: "transform, opacity" }, "-=0.4");
      }
      setMainImage(selectedItem.image);
    }
  }, [selectedItem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedItem]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        navigateProject("next");
      } else if (e.key === "ArrowLeft") {
        navigateProject("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const navigateProject = (direction: "next" | "prev") => {
    if (!selectedItem || isAnimating.current || !modalRef.current) return;

    isAnimating.current = true;
    isNavigating.current = true;

    const currentIndex = GALLERY_DATA.findIndex((item) => item.id === selectedItem.id);
    const newIndex = direction === "next" ? (currentIndex + 1) % GALLERY_DATA.length : (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    const exitX = direction === "next" ? -40 : 40;
    const enterX = direction === "next" ? 40 : -40;

    gsap.to(modalRef.current.querySelectorAll('.modal-content-area'), {
      x: exitX,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      willChange: "transform, opacity",
      onComplete: () => {
        setSelectedItem(GALLERY_DATA[newIndex]);
        gsap.fromTo(modalRef.current!.querySelectorAll('.modal-content-area'),
          { x: enterX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            delay: 0.1,
            ease: "power3.out",
            willChange: "transform, opacity",
            onComplete: () => {
              isAnimating.current = false;
              isNavigating.current = false;
            }
          }
        );
      }
    });
  };

  const closeModal = () => {
    if (modalRef.current) {
      const tl = gsap.timeline({ onComplete: () => setSelectedItem(null) });
      tl.to(modalRef.current.querySelectorAll('.info-line, .modal-left, .modal-right'), { opacity: 0, duration: 0.2 })
        .to(modalRef.current.querySelector('.modal-container'), { scale: 0.96, opacity: 0, duration: 0.3 }, "-=0.1")
        .to(modalRef.current.querySelector('.modal-backdrop'), { opacity: 0, duration: 0.3 }, "-=0.2");
    } else {
      setSelectedItem(null);
    }
  };

  const openModal = (item: typeof GALLERY_DATA[0]) => {
    isNavigating.current = false;
    isAnimating.current = false;
    setSelectedItem(item);
  };

  const CardContent = ({ item, index }: { item: typeof GALLERY_DATA[0]; index: number }) => (
    <>
      <SmartImage
        src={item.image}
        alt={item.title}
        fill
        fallbackPattern={item.fallbackPattern}
        className="object-cover photo-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        priority={index < 2}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.92)] via-[rgba(8,7,5,0.2)] to-transparent" />
      <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(196,163,90,0.4)] transition-colors duration-500" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[rgba(196,163,90,0)] group-hover:border-[rgba(196,163,90,0.6)] transition-all duration-500" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.3em] text-accent">
          {language === "en" ? item.category : item.categoryId}
        </p>
        <h3 className="font-serif text-lg md:text-xl italic text-foreground leading-snug mb-3">
          {language === "en" ? item.title : item.titleId}
        </h3>
        <div className="overflow-hidden h-4">
          <span className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-accent translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
            VIEW STORY <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </div>
      </div>
      <div className="absolute top-4 left-4 font-serif text-[11px] text-accent/35 tracking-widest select-none">0{index + 1}</div>
    </>
  );

  return (
    <>
      <section ref={sectionRef} id="project" className="bg-background">

        {/* ── DESKTOP: pinned horizontal scroll ─────────────────── */}
        <div ref={desktopRef} className="hidden lg:flex flex-col" style={{ height: '100svh' }}>
          {/* max-w-7xl frame — matches gallery/other sections */}
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col">

            {/* Header */}
            <div className="flex-shrink-0 px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-5">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
                {t?.nav?.work || "Selected Works"}
              </p>
              <h2 className="font-serif text-5xl lg:text-6xl italic text-foreground">
                {language === "en" ? "Our Masterpieces" : "Karya Terbaik Kami"}
              </h2>
            </div>

            {/* Track clip window — overflow hidden here */}
            <div ref={containerRef} className="flex-1 overflow-hidden pb-8">
              <div
                ref={cardsRef}
                className="flex h-full gap-5 pl-6 md:pl-12 lg:pl-20 pr-6 md:pr-12 lg:pr-20"
                style={{ willChange: 'transform' }}
              >
                {GALLERY_DATA.map((item, index) => (
                  <div
                    key={item.id}
                    data-index={index}
                    className="group cursor-pointer relative flex-shrink-0 h-full overflow-hidden"
                    style={{ aspectRatio: '3/4' }}
                    onClick={() => openModal(item)}
                  >
                    <CardContent item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── MOBILE: vertical stacked with slide animation ────── */}
        <div className="lg:hidden bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">

            {/* Header */}
            <div className="mb-10">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
                {t?.nav?.work || "Selected Works"}
              </p>
              <h2 className="font-serif text-4xl italic text-foreground">
                {language === "en" ? "Our Masterpieces" : "Karya Terbaik Kami"}
              </h2>
            </div>

            {/* Vertical cards */}
            {GALLERY_DATA.map((item, index) => (
              <div
                key={item.id}
                data-index={index}
                className="mobile-project-card border-b border-[rgba(196,163,90,0.10)]"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    fill
                    fallbackPattern={item.fallbackPattern}
                    className="object-cover photo-cinematic"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,7,5,0.8)] via-transparent to-transparent" />
                </div>
                {/* Info row */}
                <div
                  className="flex items-center justify-between py-5 cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div>
                    <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.3em] text-accent">
                      {language === "en" ? item.category : item.categoryId}
                    </p>
                    <h3 className="font-serif text-2xl italic text-foreground">
                      {language === "en" ? item.title : item.titleId}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex items-center gap-2 border border-[rgba(196,163,90,0.35)] px-4 py-2 text-[10px] tracking-widest text-accent">
                    VIEW →
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </section>

      {/* Modal — full screen, no margin */}
      {selectedItem && (() => {
        const currentIdx = GALLERY_DATA.findIndex(d => d.id === selectedItem.id);
        return (
          <div ref={modalRef} className="fixed inset-0 z-50">
            <div className="modal-backdrop absolute inset-0 bg-[rgba(8,7,5,0.92)] backdrop-blur-sm" onClick={closeModal} />

            <div className="modal-container relative w-full h-full flex flex-col md:flex-row bg-background">

              {/* ── IMAGE PANEL (left) ──────────────────────────── */}
              <div className="modal-left w-full h-[48svh] md:w-[58%] md:h-full relative modal-content-area bg-[#0a0908] flex-shrink-0">

                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <SmartImage
                    src={mainImage}
                    alt="Main Project Image"
                    fill
                    fallbackPattern={selectedItem.fallbackPattern}
                    className="object-contain"
                  />
                </div>

                {/* Bottom nav bar */}
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-6 md:px-10 py-5 bg-gradient-to-t from-[rgba(8,7,5,0.85)] to-transparent z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateProject("prev"); }}
                    className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 hover:text-accent transition-colors"
                  >
                    ← {language === "en" ? "Prev" : "Sebelum"}
                  </button>

                  {/* Progress dots */}
                  <div className="flex items-center gap-1.5">
                    {GALLERY_DATA.map((_, i) => (
                      <div
                        key={i}
                        className={`h-0.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-5 bg-accent' : 'w-1.5 bg-foreground/25'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigateProject("next"); }}
                    className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 hover:text-accent transition-colors"
                  >
                    {language === "en" ? "Next" : "Berikut"} →
                  </button>
                </div>

                {/* Thumbnails (above nav bar if exist) */}
                {selectedItem.detailImages && selectedItem.detailImages.length > 0 && (
                  <div className="absolute bottom-16 inset-x-0 flex justify-center gap-2 px-6 z-10 overflow-x-auto" data-lenis-prevent="true">
                    <button onClick={() => setMainImage(selectedItem.image)} className={`relative w-12 h-12 shrink-0 border ${mainImage === selectedItem.image ? 'border-accent' : 'border-transparent opacity-40 hover:opacity-80'} transition-all`}>
                      <SmartImage src={selectedItem.image} alt="Thumb" fill fallbackPattern={selectedItem.fallbackPattern} className="object-cover" />
                    </button>
                    {selectedItem.detailImages.map((img, i) => (
                      <button key={i} onClick={() => setMainImage(img)} className={`relative w-12 h-12 shrink-0 border ${mainImage === img ? 'border-accent' : 'border-transparent opacity-40 hover:opacity-80'} transition-all`}>
                        <SmartImage src={img} alt={`Thumb ${i + 1}`} fill fallbackPattern={selectedItem.fallbackPattern} className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── INFO PANEL (right) ──────────────────────────── */}
              <div className="modal-right w-full flex-1 md:flex-none md:w-[42%] md:h-full flex flex-col bg-background border-t border-[rgba(196,163,90,0.10)] md:border-t-0 md:border-l md:border-[rgba(196,163,90,0.10)] modal-content-area">

                {/* Header bar: category + close */}
                <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-10 py-4 border-b border-[rgba(196,163,90,0.08)]">
                  <p className="info-line text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                    {language === "en" ? selectedItem.category : selectedItem.categoryId}
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 flex items-center justify-center border border-[rgba(196,163,90,0.2)] text-foreground/50 hover:bg-accent hover:text-background hover:border-accent transition-all text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable info content */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 md:py-10" data-lenis-prevent="true">
                  <h2 className="info-line mb-8 font-serif text-3xl md:text-4xl italic text-foreground leading-tight">
                    {language === "en" ? selectedItem.title : selectedItem.titleId}
                  </h2>

                  <div className="info-line mb-8 border-y border-[rgba(196,163,90,0.12)] py-6 space-y-4">
                    <div className="grid grid-cols-[90px_1fr] gap-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.gallery.meaning}</span>
                      <span className="text-sm text-foreground">{language === "en" ? selectedItem.meaning : selectedItem.meaningId}</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.gallery.processLabel}</span>
                      <span className="text-sm text-foreground">{language === "en" ? "Traditional Hand Tapping" : "Pengetukan Tangan Tradisional"}</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.gallery.duration}</span>
                      <span className="text-sm text-foreground">{language === "en" ? selectedItem.duration : selectedItem.durationId ?? selectedItem.duration}</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.gallery.placement}</span>
                      <span className="text-sm text-foreground">{language === "en" ? selectedItem.placement : selectedItem.placementId}</span>
                    </div>
                  </div>

                  <div className="info-line mb-10">
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {t.gallery.storyBehind}
                    </p>
                    <p className="font-serif text-base md:text-lg italic leading-relaxed text-foreground/85">
                      &ldquo;{language === "en" ? selectedItem.story : selectedItem.storyId}&rdquo;
                    </p>
                  </div>

                  <button className="info-line group flex items-center gap-3 border-b border-accent pb-2 text-xs uppercase tracking-widest text-accent transition-all hover:gap-5">
                    {t.gallery.bookSimilar}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
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
